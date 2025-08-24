-- User Invite System Migration
-- Enables secure, role-based user onboarding with full RLS integration

-- Create invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'owner', 'manager', 'user', 'viewer')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_invitations_email ON public.invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_company ON public.invitations(company_id);
CREATE INDEX IF NOT EXISTS idx_invitations_expires ON public.invitations(expires_at);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invitations
CREATE POLICY "Users can view invitations they created" ON public.invitations
  FOR SELECT USING (invited_by = auth.uid() OR is_super_admin());

CREATE POLICY "Users can create invitations for their company" ON public.invitations
  FOR INSERT WITH CHECK (
    is_company_member(company_id) AND 
    (has_role(company_id, 'admin') OR has_role(company_id, 'owner') OR is_super_admin()) AND
    -- Prevent users from inviting higher roles than themselves
    (is_super_admin() OR 
     (role != 'super_admin' AND 
      (role != 'admin' OR has_role(company_id, 'owner') OR is_super_admin())))
  );

CREATE POLICY "Users can update invitations they created" ON public.invitations
  FOR UPDATE USING (invited_by = auth.uid() OR is_super_admin());

CREATE POLICY "Users can delete invitations they created" ON public.invitations
  FOR DELETE USING (invited_by = auth.uid() OR is_super_admin());

-- Function to check if user can invite specific role
CREATE OR REPLACE FUNCTION public.can_invite_role(_company_id UUID, _role TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT CASE
    WHEN is_super_admin() THEN TRUE
    WHEN _role = 'super_admin' THEN FALSE
    WHEN _role = 'admin' AND (has_role(_company_id, 'owner') OR is_super_admin()) THEN TRUE
    WHEN _role IN ('owner', 'manager') AND has_role(_company_id, 'admin') THEN TRUE
    WHEN _role IN ('user', 'viewer') AND has_role(_company_id, 'manager') THEN TRUE
    ELSE FALSE
  END;
$$;

-- Function to create invitation with validation
CREATE OR REPLACE FUNCTION public.create_invitation(
  _email TEXT,
  _role TEXT,
  _company_id UUID,
  _metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _invitation_id UUID;
BEGIN
  -- Validate permissions
  IF NOT can_invite_role(_company_id, _role) THEN
    RAISE EXCEPTION 'Insufficient permissions to invite role: %', _role;
  END IF;

  -- Check if email already has pending invitation
  IF EXISTS (
    SELECT 1 FROM public.invitations 
    WHERE email = _email AND status = 'pending' AND company_id = _company_id
  ) THEN
    RAISE EXCEPTION 'User already has a pending invitation';
  END IF;

  -- Create invitation
  INSERT INTO public.invitations (email, role, company_id, invited_by, metadata)
  VALUES (_email, _role, _company_id, auth.uid(), _metadata)
  RETURNING id INTO _invitation_id;

  -- Log the invitation
  PERFORM public.log_sensitive_operation(
    _company_id, 
    'user_invited', 
    'invitation', 
    _invitation_id::text, 
    jsonb_build_object('email', _email, 'role', _role, 'invited_by', auth.uid())
  );

  RETURN _invitation_id;
END;
$$;

-- Function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_invitation(_invitation_id UUID)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _invitation RECORD;
BEGIN
  -- Get invitation details
  SELECT * INTO _invitation 
  FROM public.invitations 
  WHERE id = _invitation_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invitation not found or already processed';
  END IF;

  IF _invitation.expires_at < NOW() THEN
    -- Mark as expired
    UPDATE public.invitations SET status = 'expired' WHERE id = _invitation_id;
    RAISE EXCEPTION 'Invitation has expired';
  END IF;

  -- Update invitation status
  UPDATE public.invitations 
  SET status = 'accepted', accepted_at = NOW() 
  WHERE id = _invitation_id;

  -- Log the acceptance
  PERFORM public.log_sensitive_operation(
    _invitation.company_id, 
    'invitation_accepted', 
    'invitation', 
    _invitation_id::text, 
    jsonb_build_object('email', _invitation.email, 'role', _invitation.role)
  );

  RETURN TRUE;
END;
$$;

-- Function to expire old invitations
CREATE OR REPLACE FUNCTION public.expire_old_invitations()
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _expired_count INTEGER;
BEGIN
  UPDATE public.invitations 
  SET status = 'expired' 
  WHERE status = 'pending' AND expires_at < NOW();

  GET DIAGNOSTICS _expired_count = ROW_COUNT;
  RETURN _expired_count;
END;
$$;

-- Create view for invitation statistics
CREATE OR REPLACE VIEW public.v_invitation_stats AS
SELECT 
  company_id,
  COUNT(*) as total_invitations,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_invitations,
  COUNT(*) FILTER (WHERE status = 'accepted') as accepted_invitations,
  COUNT(*) FILTER (WHERE status = 'expired') as expired_invitations,
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_invitations,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as invitations_last_30_days
FROM public.invitations
GROUP BY company_id;

-- Enable RLS on the view
ALTER VIEW public.v_invitation_stats SET (security_invoker = true);

-- Create trigger to auto-expire invitations
CREATE OR REPLACE FUNCTION public.auto_expire_invitations_trigger()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Expire invitations older than 7 days
  PERFORM public.expire_old_invitations();
  RETURN NEW;
END;
$$;

-- Create a scheduled job to expire invitations (runs daily)
-- Note: This would be set up via pg_cron or similar in production
-- For now, we'll rely on the trigger

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invitations TO authenticated;
GRANT SELECT ON public.v_invitation_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_invitation(TEXT, TEXT, UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.accept_invitation(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_invite_role(UUID, TEXT) TO authenticated;

-- Insert sample data for testing (optional)
-- INSERT INTO public.invitations (email, role, company_id, invited_by) VALUES 
-- ('test@example.com', 'user', (SELECT id FROM public.companies LIMIT 1), (SELECT id FROM auth.users LIMIT 1));

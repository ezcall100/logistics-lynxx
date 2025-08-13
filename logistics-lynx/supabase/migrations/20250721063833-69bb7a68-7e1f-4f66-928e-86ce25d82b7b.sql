-- Update the driver_invitations table to match the expected structure
ALTER TABLE public.driver_invitations DROP COLUMN IF EXISTS invitation_token;
ALTER TABLE public.driver_invitations DROP COLUMN IF EXISTS invited_by;
ALTER TABLE public.driver_invitations ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update the owner_operator_invitations table to match the expected structure  
ALTER TABLE public.owner_operator_invitations DROP COLUMN IF EXISTS invitation_token;
ALTER TABLE public.owner_operator_invitations DROP COLUMN IF EXISTS invited_by;
ALTER TABLE public.owner_operator_invitations ADD COLUMN IF NOT EXISTS sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
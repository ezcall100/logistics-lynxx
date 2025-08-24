import { supabase } from '@/lib/supabase';

export interface CreateInvitationParams {
  email: string;
  role: string;
  company_id: string;
  message?: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  created_at: string;
  accepted_at?: string;
  expires_at: string;
  company_id: string;
  invited_by: string;
  metadata?: Record<string, any>;
}

export interface InvitationStats {
  company_id: string;
  total_invitations: number;
  pending_invitations: number;
  accepted_invitations: number;
  expired_invitations: number;
  cancelled_invitations: number;
  invitations_last_30_days: number;
}

/**
 * Create a new invitation using Supabase function
 */
export async function createInvitation(params: CreateInvitationParams): Promise<Invitation> {
  const { data, error } = await supabase.rpc('create_invitation', {
    _email: params.email,
    _role: params.role,
    _company_id: params.company_id,
    _metadata: params.message ? { message: params.message } : {}
  });

  if (error) {
    console.error('Create invitation error:', error);
    throw new Error(error.message || 'Failed to create invitation');
  }

  // Send email invitation via Supabase Auth
  const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(params.email, {
    data: {
      role: params.role,
      company_id: params.company_id,
      invitation_id: data,
      message: params.message
    }
  });

  if (emailError) {
    console.error('Email invitation error:', emailError);
    // Don't throw here as the invitation was created successfully
    // The email can be resent later
  }

  // Fetch the created invitation
  const { data: invitation, error: fetchError } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', data)
    .single();

  if (fetchError) {
    console.error('Fetch invitation error:', fetchError);
    throw new Error('Failed to fetch created invitation');
  }

  return invitation;
}

/**
 * Get all invitations for the current user's company
 */
export async function getInvitations(): Promise<Invitation[]> {
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      *,
      invited_by_user:profiles!invitations_invited_by_fkey(
        email,
        full_name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get invitations error:', error);
    throw new Error(error.message || 'Failed to fetch invitations');
  }

  return data.map(invitation => ({
    ...invitation,
    invited_by: invitation.invited_by_user?.full_name || invitation.invited_by_user?.email || 'Unknown'
  }));
}

/**
 * Get invitation statistics for the current user's company
 */
export async function getInvitationStats(): Promise<InvitationStats | null> {
  const { data, error } = await supabase
    .from('v_invitation_stats')
    .select('*')
    .single();

  if (error) {
    console.error('Get invitation stats error:', error);
    throw new Error(error.message || 'Failed to fetch invitation statistics');
  }

  return data;
}

/**
 * Resend an invitation
 */
export async function resendInvitation(invitationId: string): Promise<void> {
  // First, get the invitation details
  const { data: invitation, error: fetchError } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', invitationId)
    .single();

  if (fetchError) {
    console.error('Fetch invitation error:', fetchError);
    throw new Error('Failed to fetch invitation');
  }

  if (!invitation) {
    throw new Error('Invitation not found');
  }

  // Update the expiry date
  const { error: updateError } = await supabase
    .from('invitations')
    .update({
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq('id', invitationId);

  if (updateError) {
    console.error('Update invitation error:', updateError);
    throw new Error('Failed to update invitation');
  }

  // Resend the email invitation
  const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(invitation.email, {
    data: {
      role: invitation.role,
      company_id: invitation.company_id,
      invitation_id: invitationId,
      message: invitation.metadata?.message
    }
  });

  if (emailError) {
    console.error('Resend email error:', emailError);
    throw new Error('Failed to resend invitation email');
  }
}

/**
 * Cancel an invitation
 */
export async function cancelInvitation(invitationId: string): Promise<void> {
  const { error } = await supabase
    .from('invitations')
    .update({ status: 'cancelled' })
    .eq('id', invitationId);

  if (error) {
    console.error('Cancel invitation error:', error);
    throw new Error(error.message || 'Failed to cancel invitation');
  }
}

/**
 * Accept an invitation (called when user clicks invitation link)
 */
export async function acceptInvitation(invitationId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('accept_invitation', {
    _invitation_id: invitationId
  });

  if (error) {
    console.error('Accept invitation error:', error);
    throw new Error(error.message || 'Failed to accept invitation');
  }

  return data;
}

/**
 * Get invitation by ID
 */
export async function getInvitation(invitationId: string): Promise<Invitation | null> {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', invitationId)
    .single();

  if (error) {
    console.error('Get invitation error:', error);
    throw new Error(error.message || 'Failed to fetch invitation');
  }

  return data;
}

/**
 * Get invitation by email
 */
export async function getInvitationByEmail(email: string): Promise<Invitation | null> {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('Get invitation by email error:', error);
    throw new Error(error.message || 'Failed to fetch invitation');
  }

  return data;
}

/**
 * Check if user can invite specific role
 */
export async function canInviteRole(companyId: string, role: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('can_invite_role', {
    _company_id: companyId,
    _role: role
  });

  if (error) {
    console.error('Check invite role error:', error);
    throw new Error(error.message || 'Failed to check role permissions');
  }

  return data;
}

/**
 * Get available roles for invitation based on current user's permissions
 */
export async function getAvailableRoles(companyId: string): Promise<string[]> {
  const allRoles = ['super_admin', 'admin', 'owner', 'manager', 'user', 'viewer'];
  const availableRoles: string[] = [];

  for (const role of allRoles) {
    try {
      const canInvite = await canInviteRole(companyId, role);
      if (canInvite) {
        availableRoles.push(role);
      }
    } catch (error) {
      console.error(`Error checking role ${role}:`, error);
    }
  }

  return availableRoles;
}

/**
 * Expire old invitations (admin function)
 */
export async function expireOldInvitations(): Promise<number> {
  const { data, error } = await supabase.rpc('expire_old_invitations');

  if (error) {
    console.error('Expire invitations error:', error);
    throw new Error(error.message || 'Failed to expire invitations');
  }

  return data;
}

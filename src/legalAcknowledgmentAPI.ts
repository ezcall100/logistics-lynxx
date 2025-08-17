// Legal Acknowledgment API
// Phase 7.2: Legal Acknowledgment & Consent System

import { createClient } from '@supabase/supabase-js';
import { legalDocumentManager } from './legalDocuments';

// Types
export interface LegalAcknowledgmentRequest {
  userId: string;
  sessionId?: string;
  documentId: string;
  fullLegalName: string;
  signatureData: string; // Base64 encoded signature
  ipAddress?: string;
  userAgent?: string;
  acknowledgmentStatus: 'accepted' | 'declined';
  declineReason?: string;
}

export interface LegalAcknowledgmentResponse {
  success: boolean;
  acknowledgmentId?: string;
  signatureId?: string;
  error?: string;
  legalConsentScore?: number;
  consentCompleted?: boolean;
}

export interface UserSignature {
  id: string;
  userId: string;
  sessionId?: string;
  signatureType: 'legal_consent' | 'insurance_verification' | 'compliance_agreement';
  fullLegalName: string;
  signatureData: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  createdAt: Date;
}

export interface LegalAcknowledgment {
  id: string;
  userId: string;
  sessionId?: string;
  documentId: string;
  signatureId?: string;
  acknowledgmentStatus: 'pending' | 'accepted' | 'declined' | 'expired';
  ipAddress?: string;
  userAgent?: string;
  acceptedAt?: Date;
  declinedAt?: Date;
  declineReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalConsentStatus {
  documentType: string;
  documentTitle: string;
  version: string;
  status: string;
  acceptedAt?: Date;
  signatureId?: string;
}

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export class LegalAcknowledgmentAPI {
  private supabase;

  constructor() {
    this.supabase = supabase;
  }

  /**
   * Capture legal acknowledgment and signature
   */
  async captureLegalAcknowledgment(
    request: LegalAcknowledgmentRequest
  ): Promise<LegalAcknowledgmentResponse> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      // Validate request
      const validation = this.validateAcknowledgmentRequest(request);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      // Create signature record
      const signatureResponse = await this.createUserSignature({
        userId: request.userId,
        sessionId: request.sessionId,
        signatureType: 'legal_consent',
        fullLegalName: request.fullLegalName,
        signatureData: request.signatureData,
        ipAddress: request.ipAddress,
        userAgent: request.userAgent
      });

      if (!signatureResponse.success) {
        return { success: false, error: signatureResponse.error };
      }

      // Create acknowledgment record
      const acknowledgmentData = {
        user_id: request.userId,
        session_id: request.sessionId,
        document_id: request.documentId,
        signature_id: signatureResponse.signatureId,
        acknowledgment_status: request.acknowledgmentStatus,
        ip_address: request.ipAddress,
        user_agent: request.userAgent,
        accepted_at: request.acknowledgmentStatus === 'accepted' ? new Date().toISOString() : null,
        declined_at: request.acknowledgmentStatus === 'declined' ? new Date().toISOString() : null,
        decline_reason: request.declineReason
      };

      const { data: acknowledgment, error: acknowledgmentError } = await this.supabase
        .from('legal_acknowledgments')
        .insert(acknowledgmentData)
        .select()
        .single();

      if (acknowledgmentError) {
        // Clean up signature if acknowledgment fails
        if (signatureResponse.signatureId) {
          await this.supabase
            .from('user_signatures')
            .delete()
            .eq('id', signatureResponse.signatureId);
        }
        return { success: false, error: acknowledgmentError.message };
      }

      // Calculate legal consent score
      const legalConsentScore = await this.calculateLegalConsentScore(request.userId);
      const consentCompleted = await this.checkLegalConsentCompletion(request.userId);

      // Log acknowledgment for audit
      await this.logAcknowledgmentAudit({
        userId: request.userId,
        documentId: request.documentId,
        status: request.acknowledgmentStatus,
        ipAddress: request.ipAddress,
        userAgent: request.userAgent
      });

      return {
        success: true,
        acknowledgmentId: acknowledgment.id,
        signatureId: signatureResponse.signatureId,
        legalConsentScore,
        consentCompleted
      };

    } catch (error) {
      console.error('Error capturing legal acknowledgment:', error);
      return { success: false, error: 'Internal server error' };
    }
  }

  /**
   * Create user signature record
   */
  private async createUserSignature(signatureData: {
    userId: string;
    sessionId?: string;
    signatureType: 'legal_consent' | 'insurance_verification' | 'compliance_agreement';
    fullLegalName: string;
    signatureData: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<{ success: boolean; signatureId?: string; error?: string }> {
    try {
      const { data: signature, error } = await this.supabase
        .from('user_signatures')
        .insert({
          user_id: signatureData.userId,
          session_id: signatureData.sessionId,
          signature_type: signatureData.signatureType,
          full_legal_name: signatureData.fullLegalName,
          signature_data: signatureData.signatureData,
          ip_address: signatureData.ipAddress,
          user_agent: signatureData.userAgent,
          timestamp: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, signatureId: signature.id };

    } catch (error) {
      console.error('Error creating user signature:', error);
      return { success: false, error: 'Failed to create signature' };
    }
  }

  /**
   * Get legal consent status for user
   */
  async getLegalConsentStatus(userId: string): Promise<LegalConsentStatus[]> {
    try {
      const { data, error } = await this.supabase
        .rpc('get_legal_consent_status', { user_uuid: userId });

      if (error) {
        console.error('Error getting legal consent status:', error);
        return [];
      }

      return data || [];

    } catch (error) {
      console.error('Error getting legal consent status:', error);
      return [];
    }
  }

  /**
   * Check if user has completed legal consent
   */
  async checkLegalConsentCompletion(userId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .rpc('has_completed_legal_consent', { user_uuid: userId });

      if (error) {
        console.error('Error checking legal consent completion:', error);
        return false;
      }

      return data || false;

    } catch (error) {
      console.error('Error checking legal consent completion:', error);
      return false;
    }
  }

  /**
   * Calculate legal consent score for user
   */
  async calculateLegalConsentScore(userId: string): Promise<number> {
    try {
      const { data, error } = await this.supabase
        .rpc('calculate_legal_consent_score', { user_uuid: userId });

      if (error) {
        console.error('Error calculating legal consent score:', error);
        return 0;
      }

      return data || 0;

    } catch (error) {
      console.error('Error calculating legal consent score:', error);
      return 0;
    }
  }

  /**
   * Get user's legal acknowledgments
   */
  async getUserLegalAcknowledgments(userId: string): Promise<LegalAcknowledgment[]> {
    try {
      const { data, error } = await this.supabase
        .from('legal_acknowledgments')
        .select(`
          *,
          legal_documents (
            document_type,
            title,
            version
          ),
          user_signatures (
            full_legal_name,
            timestamp
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting user legal acknowledgments:', error);
        return [];
      }

      return data || [];

    } catch (error) {
      console.error('Error getting user legal acknowledgments:', error);
      return [];
    }
  }

  /**
   * Get legal audit summary for admin
   */
  async getLegalAuditSummary(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('legal_audit_summary')
        .select('*')
        .order('last_updated_at', { ascending: false });

      if (error) {
        console.error('Error getting legal audit summary:', error);
        return [];
      }

      return data || [];

    } catch (error) {
      console.error('Error getting legal audit summary:', error);
      return [];
    }
  }

  /**
   * Validate acknowledgment request
   */
  private validateAcknowledgmentRequest(request: LegalAcknowledgmentRequest): {
    isValid: boolean;
    error?: string;
  } {
    if (!request.userId) {
      return { isValid: false, error: 'User ID is required' };
    }

    if (!request.documentId) {
      return { isValid: false, error: 'Document ID is required' };
    }

    if (!request.fullLegalName || request.fullLegalName.trim().length === 0) {
      return { isValid: false, error: 'Full legal name is required' };
    }

    if (!request.signatureData || request.signatureData.trim().length === 0) {
      return { isValid: false, error: 'Signature data is required' };
    }

    if (!['accepted', 'declined'].includes(request.acknowledgmentStatus)) {
      return { isValid: false, error: 'Invalid acknowledgment status' };
    }

    if (request.acknowledgmentStatus === 'declined' && !request.declineReason) {
      return { isValid: false, error: 'Decline reason is required when declining' };
    }

    return { isValid: true };
  }

  /**
   * Log acknowledgment for audit purposes
   */
  private async logAcknowledgmentAudit(auditData: {
    userId: string;
    documentId: string;
    status: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    try {
      // Log to onboarding audit log
      await this.supabase
        .from('onboarding_audit_log')
        .insert({
          user_id: auditData.userId,
          verification_type: 'legal_acknowledgment',
          verification_data: {
            document_id: auditData.documentId,
            status: auditData.status,
            ip_address: auditData.ipAddress,
            user_agent: auditData.userAgent,
            timestamp: new Date().toISOString()
          },
          verification_score: auditData.status === 'accepted' ? 10 : 0,
          verification_status: auditData.status === 'accepted' ? 'verified' : 'failed',
          created_at: new Date().toISOString()
        });

    } catch (error) {
      console.error('Error logging acknowledgment audit:', error);
    }
  }

  /**
   * Get required legal documents for user
   */
  async getRequiredLegalDocuments(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('legal_documents')
        .select('*')
        .eq('is_active', true)
        .order('document_type');

      if (error) {
        console.error('Error getting required legal documents:', error);
        return [];
      }

      return data || [];

    } catch (error) {
      console.error('Error getting required legal documents:', error);
      return [];
    }
  }

  /**
   * Update acknowledgment status
   */
  async updateAcknowledgmentStatus(
    acknowledgmentId: string,
    status: 'accepted' | 'declined',
    declineReason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = {
        acknowledgment_status: status,
        updated_at: new Date().toISOString()
      };

      if (status === 'accepted') {
        updateData.accepted_at = new Date().toISOString();
      } else if (status === 'declined') {
        updateData.declined_at = new Date().toISOString();
        updateData.decline_reason = declineReason;
      }

      const { error } = await this.supabase
        .from('legal_acknowledgments')
        .update(updateData)
        .eq('id', acknowledgmentId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };

    } catch (error) {
      console.error('Error updating acknowledgment status:', error);
      return { success: false, error: 'Failed to update acknowledgment status' };
    }
  }

  /**
   * Get signature by ID
   */
  async getSignatureById(signatureId: string): Promise<UserSignature | null> {
    try {
      const { data, error } = await this.supabase
        .from('user_signatures')
        .select('*')
        .eq('id', signatureId)
        .single();

      if (error) {
        console.error('Error getting signature:', error);
        return null;
      }

      return data;

    } catch (error) {
      console.error('Error getting signature:', error);
      return null;
    }
  }

  /**
   * Verify signature authenticity
   */
  async verifySignature(signatureId: string, userId: string): Promise<boolean> {
    try {
      const signature = await this.getSignatureById(signatureId);
      if (!signature) {
        return false;
      }

      // Verify signature belongs to user
      if (signature.userId !== userId) {
        return false;
      }

      // Verify signature data is not empty
      if (!signature.signatureData || signature.signatureData.trim().length === 0) {
        return false;
      }

      // Additional verification logic can be added here
      // (e.g., cryptographic verification, timestamp validation, etc.)

      return true;

    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }
}

// Export singleton instance
export const legalAcknowledgmentAPI = new LegalAcknowledgmentAPI();

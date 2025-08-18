/**
 * Entity Validation Business Logic
 * Coordinates FMCSA and TIN verification to confirm entity matching
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import { fmcsaClient, FMCSAVerificationRequest, FMCSAVerificationResponse } from '../verification/fmcsaClient';
import { tinVerifier, TINVerificationRequest, TINVerificationResponse } from '../verification/tinVerifier';

export interface EntityValidationRequest {
  org_id: string;
  entity_type: 'shipper' | 'broker' | 'carrier';
  entity_id?: string;
  
  // Identity Information
  legal_business_name: string;
  ein_tin?: string;
  dot_number?: string;
  mc_number?: string;
  business_license_url?: string;
  contact_email: string;
  contact_phone?: string;
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  
  // Additional Context
  ip_address?: string;
  user_agent?: string;
  session_id?: string;
}

export interface EntityValidationResponse {
  success: boolean;
  validation_id: string;
  overall_status: 'pending' | 'verified' | 'failed' | 'requires_review';
  verification_score: number;
  
  // Individual Verification Results
  fmcsa_verification: {
    status: 'pending' | 'verified' | 'failed' | 'not_found';
    details?: any;
    response?: FMCSAVerificationResponse;
  };
  
  tin_verification: {
    status: 'pending' | 'verified' | 'failed' | 'not_found';
    details?: any;
    response?: TINVerificationResponse;
  };
  
  cross_validation: {
    status: 'pending' | 'verified' | 'failed' | 'mismatch';
    details?: any;
    confidence_score: number;
  };
  
  // Compliance Flags
  compliance_flags: {
    has_operating_authority: boolean;
    has_insurance_coverage: boolean;
    has_safety_rating: boolean;
    additional_flags: Record<string, any>;
  };
  
  // Audit Information
  created_at: string;
  verified_at?: string;
  verification_attempts: number;
  error_message?: string;
  
  // Recommendations
  recommendations: string[];
  next_steps: string[];
}

export interface ValidationConfig {
  enableParallelVerification: boolean;
  crossValidationThreshold: number;
  autoApproveScore: number;
  requireManualReviewScore: number;
  maxVerificationAttempts: number;
  retryDelayMinutes: number;
}

export class EntityValidator {
  private config: ValidationConfig;
  private supabase: any;

  constructor(config: Partial<ValidationConfig> = {}) {
    this.config = {
      enableParallelVerification: true,
      crossValidationThreshold: 0.8,
      autoApproveScore: 80,
      requireManualReviewScore: 50,
      maxVerificationAttempts: 3,
      retryDelayMinutes: 5,
      ...config
    };

    // Initialize Supabase client
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  /**
   * Main validation method - orchestrates the entire verification process
   */
  async validateEntity(request: EntityValidationRequest): Promise<EntityValidationResponse> {
    const validationId = this.generateValidationId();
    const timestamp = new Date().toISOString();

    try {
      // Create initial audit log entry
      const auditLogId = await this.createAuditLogEntry(request, validationId);

      // Perform parallel verification if enabled
      let fmcsaResult: FMCSAVerificationResponse | null = null;
      let tinResult: TINVerificationResponse | null = null;

      if (this.config.enableParallelVerification) {
        [fmcsaResult, tinResult] = await Promise.allSettled([
          this.performFMCSAVerification(request),
          this.performTINVerification(request)
        ]).then(results => [
          results[0].status === 'fulfilled' ? results[0].value : null,
          results[1].status === 'fulfilled' ? results[1].value : null
        ]);
      } else {
        // Sequential verification
        fmcsaResult = await this.performFMCSAVerification(request);
        tinResult = await this.performTINVerification(request);
      }

      // Perform cross-validation
      const crossValidationResult = await this.performCrossValidation(
        request,
        fmcsaResult,
        tinResult
      );

      // Calculate compliance flags
      const complianceFlags = this.calculateComplianceFlags(fmcsaResult, tinResult);

      // Calculate overall verification score
      const verificationScore = this.calculateVerificationScore(
        fmcsaResult,
        tinResult,
        crossValidationResult,
        complianceFlags
      );

      // Determine overall status
      const overallStatus = this.determineOverallStatus(verificationScore);

      // Generate recommendations and next steps
      const recommendations = this.generateRecommendations(
        fmcsaResult,
        tinResult,
        crossValidationResult,
        complianceFlags,
        verificationScore
      );

      const nextSteps = this.generateNextSteps(overallStatus, recommendations);

      // Build response
      const response: EntityValidationResponse = {
        success: overallStatus === 'verified',
        validation_id: validationId,
        overall_status: overallStatus,
        verification_score: verificationScore,
        fmcsa_verification: {
          status: this.mapFMCSAStatus(fmcsaResult),
          details: fmcsaResult?.entity,
          response: fmcsaResult || undefined
        },
        tin_verification: {
          status: this.mapTINStatus(tinResult),
          details: tinResult?.entity,
          response: tinResult || undefined
        },
        cross_validation: crossValidationResult,
        compliance_flags: complianceFlags,
        created_at: timestamp,
        verified_at: overallStatus === 'verified' ? timestamp : undefined,
        verification_attempts: 1,
        recommendations,
        next_steps: nextSteps
      };

      // Update audit log with results
      await this.updateAuditLogEntry(auditLogId, response);

      return response;

    } catch (error) {
      const errorResponse: EntityValidationResponse = {
        success: false,
        validation_id: validationId,
        overall_status: 'failed',
        verification_score: 0,
        fmcsa_verification: { status: 'failed' },
        tin_verification: { status: 'failed' },
        cross_validation: { status: 'failed', confidence_score: 0 },
        compliance_flags: {
          has_operating_authority: false,
          has_insurance_coverage: false,
          has_safety_rating: false,
          additional_flags: {}
        },
        created_at: timestamp,
        verification_attempts: 1,
        error_message: error instanceof Error ? error.message : 'Unknown error occurred',
        recommendations: ['Contact support for manual verification'],
        next_steps: ['Submit support ticket for manual review']
      };

      // Log error in audit log
      await this.logValidationError(validationId, error, request);

      return errorResponse;
    }
  }

  /**
   * Perform FMCSA verification
   */
  private async performFMCSAVerification(request: EntityValidationRequest): Promise<FMCSAVerificationResponse | null> {
    if (!request.dot_number && !request.legal_business_name) {
      return null;
    }

    const fmcsaRequest: FMCSAVerificationRequest = {
      dot_number: request.dot_number,
      business_name: request.legal_business_name,
      mc_number: request.mc_number
    };

    return await fmcsaClient.verifyEntity(fmcsaRequest);
  }

  /**
   * Perform TIN verification
   */
  private async performTINVerification(request: EntityValidationRequest): Promise<TINVerificationResponse | null> {
    if (!request.ein_tin) {
      return null;
    }

    const tinRequest: TINVerificationRequest = {
      ein_tin: request.ein_tin,
      business_name: request.legal_business_name,
      address: request.address
    };

    return await tinVerifier.verifyTIN(tinRequest);
  }

  /**
   * Perform cross-validation between FMCSA and TIN results
   */
  private async performCrossValidation(
    request: EntityValidationRequest,
    fmcsaResult: FMCSAVerificationResponse | null,
    tinResult: TINVerificationResponse | null
  ): Promise<EntityValidationResponse['cross_validation']> {
    const details: any = {};
    let confidenceScore = 0;
    let status: EntityValidationResponse['cross_validation']['status'] = 'pending';

    // If both verifications failed, cross-validation fails
    if (!fmcsaResult?.success && !tinResult?.success) {
      return {
        status: 'failed',
        details: { reason: 'Both FMCSA and TIN verification failed' },
        confidence_score: 0
      };
    }

    // If only one verification succeeded, partial confidence
    if (fmcsaResult?.success && !tinResult?.success) {
      confidenceScore = 0.6;
      status = 'verified';
      details.reason = 'FMCSA verification successful, TIN verification failed';
    } else if (!fmcsaResult?.success && tinResult?.success) {
      confidenceScore = 0.5;
      status = 'verified';
      details.reason = 'TIN verification successful, FMCSA verification failed';
    } else if (fmcsaResult?.success && tinResult?.success) {
      // Both succeeded - check for consistency
      const consistencyScore = this.calculateConsistencyScore(
        request,
        fmcsaResult.entity!,
        tinResult.entity!
      );

      confidenceScore = consistencyScore;
      
      if (consistencyScore >= this.config.crossValidationThreshold) {
        status = 'verified';
        details.reason = 'High consistency between FMCSA and TIN verification results';
      } else if (consistencyScore >= 0.5) {
        status = 'verified';
        details.reason = 'Moderate consistency between verification results';
      } else {
        status = 'mismatch';
        details.reason = 'Low consistency between FMCSA and TIN verification results';
      }

      details.consistency_score = consistencyScore;
      details.fmcsa_entity = fmcsaResult.entity;
      details.tin_entity = tinResult.entity;
    }

    return {
      status,
      details,
      confidence_score: confidenceScore
    };
  }

  /**
   * Calculate consistency score between FMCSA and TIN entities
   */
  private calculateConsistencyScore(
    request: EntityValidationRequest,
    fmcsaEntity: any,
    tinEntity: any
  ): number {
    let score = 0;
    let totalChecks = 0;

    // Business name consistency
    if (fmcsaEntity.legal_name && tinEntity.legal_business_name) {
      totalChecks++;
      const nameSimilarity = this.calculateStringSimilarity(
        fmcsaEntity.legal_name.toLowerCase(),
        tinEntity.legal_business_name.toLowerCase()
      );
      score += nameSimilarity;
    }

    // Address consistency
    if (fmcsaEntity.address && tinEntity.address) {
      totalChecks++;
      const addressSimilarity = this.calculateAddressSimilarity(
        fmcsaEntity.address,
        tinEntity.address
      );
      score += addressSimilarity;
    }

    // Entity type consistency (if available)
    if (fmcsaEntity.entity_type && tinEntity.entity_type) {
      totalChecks++;
      const typeMatch = fmcsaEntity.entity_type === tinEntity.entity_type ? 1 : 0.5;
      score += typeMatch;
    }

    return totalChecks > 0 ? score / totalChecks : 0;
  }

  /**
   * Calculate string similarity using Levenshtein distance
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 1;

    const distance = this.levenshteinDistance(str1, str2);
    return 1 - distance / maxLength;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Calculate address similarity
   */
  private calculateAddressSimilarity(addr1: any, addr2: any): number {
    let score = 0;
    let totalChecks = 0;

    // City comparison
    if (addr1.city && addr2.city) {
      totalChecks++;
      score += this.calculateStringSimilarity(
        addr1.city.toLowerCase(),
        addr2.city.toLowerCase()
      );
    }

    // State comparison
    if (addr1.state && addr2.state) {
      totalChecks++;
      score += addr1.state.toLowerCase() === addr2.state.toLowerCase() ? 1 : 0;
    }

    // ZIP code comparison
    if (addr1.zip && addr2.zip) {
      totalChecks++;
      score += addr1.zip === addr2.zip ? 1 : 0.8;
    }

    return totalChecks > 0 ? score / totalChecks : 0;
  }

  /**
   * Calculate compliance flags based on verification results
   */
  private calculateComplianceFlags(
    fmcsaResult: FMCSAVerificationResponse | null,
    tinResult: TINVerificationResponse | null
  ): EntityValidationResponse['compliance_flags'] {
    const flags = {
      has_operating_authority: false,
      has_insurance_coverage: false,
      has_safety_rating: false,
      additional_flags: {} as Record<string, any>
    };

    if (fmcsaResult?.success && fmcsaResult.entity) {
      flags.has_operating_authority = fmcsaResult.entity.operating_authority.has_authority;
      flags.has_insurance_coverage = fmcsaResult.entity.insurance.has_coverage;
      flags.has_safety_rating = fmcsaResult.entity.safety_rating.has_rating;
      
      // Additional FMCSA flags
      flags.additional_flags.operating_status = fmcsaResult.entity.operating_status;
      flags.additional_flags.safety_rating = fmcsaResult.entity.safety_rating.rating;
      flags.additional_flags.hazmat_authority = fmcsaResult.entity.hazmat_authority;
      flags.additional_flags.passenger_authority = fmcsaResult.entity.passenger_authority;
    }

    if (tinResult?.success && tinResult.entity) {
      flags.additional_flags.business_status = tinResult.entity.business_status;
      flags.additional_flags.entity_type = tinResult.entity.entity_type;
    }

    return flags;
  }

  /**
   * Calculate overall verification score
   */
  private calculateVerificationScore(
    fmcsaResult: FMCSAVerificationResponse | null,
    tinResult: TINVerificationResponse | null,
    crossValidation: EntityValidationResponse['cross_validation'],
    complianceFlags: EntityValidationResponse['compliance_flags']
  ): number {
    let score = 0;

    // FMCSA verification (30 points)
    if (fmcsaResult?.success) {
      score += 30;
    } else if (fmcsaResult?.error?.includes('not found')) {
      score += 15;
    }

    // TIN verification (25 points)
    if (tinResult?.success) {
      score += 25;
    } else if (tinResult?.error?.includes('not found')) {
      score += 10;
    }

    // Cross-validation (20 points)
    score += crossValidation.confidence_score * 20;

    // Compliance flags (25 points)
    if (complianceFlags.has_operating_authority) score += 10;
    if (complianceFlags.has_insurance_coverage) score += 10;
    if (complianceFlags.has_safety_rating) score += 5;

    return Math.min(score, 100);
  }

  /**
   * Determine overall status based on verification score
   */
  private determineOverallStatus(score: number): EntityValidationResponse['overall_status'] {
    if (score >= this.config.autoApproveScore) {
      return 'verified';
    } else if (score >= this.config.requireManualReviewScore) {
      return 'requires_review';
    } else {
      return 'failed';
    }
  }

  /**
   * Generate recommendations based on verification results
   */
  private generateRecommendations(
    fmcsaResult: FMCSAVerificationResponse | null,
    tinResult: TINVerificationResponse | null,
    crossValidation: EntityValidationResponse['cross_validation'],
    complianceFlags: EntityValidationResponse['compliance_flags'],
    verificationScore: number
  ): string[] {
    const recommendations: string[] = [];

    if (!fmcsaResult?.success) {
      recommendations.push('Verify DOT number and business name with FMCSA');
    }

    if (!tinResult?.success) {
      recommendations.push('Verify EIN/TIN with IRS or business registration');
    }

    if (crossValidation.status === 'mismatch') {
      recommendations.push('Review business information for consistency between FMCSA and TIN records');
    }

    if (!complianceFlags.has_operating_authority) {
      recommendations.push('Obtain operating authority from FMCSA');
    }

    if (!complianceFlags.has_insurance_coverage) {
      recommendations.push('Provide proof of insurance coverage');
    }

    if (verificationScore < this.config.autoApproveScore) {
      recommendations.push('Consider manual review for approval');
    }

    return recommendations;
  }

  /**
   * Generate next steps based on overall status
   */
  private generateNextSteps(
    overallStatus: EntityValidationResponse['overall_status'],
    recommendations: string[]
  ): string[] {
    const nextSteps: string[] = [];

    switch (overallStatus) {
      case 'verified':
        nextSteps.push('Entity approved for onboarding');
        nextSteps.push('Proceed with account activation');
        break;
      case 'requires_review':
        nextSteps.push('Submit for manual review');
        nextSteps.push('Provide additional documentation if requested');
        break;
      case 'failed':
        nextSteps.push('Address verification issues');
        nextSteps.push('Contact support for assistance');
        break;
      default:
        nextSteps.push('Wait for verification to complete');
    }

    return nextSteps;
  }

  /**
   * Map FMCSA verification status
   */
  private mapFMCSAStatus(result: FMCSAVerificationResponse | null): EntityValidationResponse['fmcsa_verification']['status'] {
    if (!result) return 'pending';
    if (result.success) return 'verified';
    if (result.error?.includes('not found')) return 'not_found';
    return 'failed';
  }

  /**
   * Map TIN verification status
   */
  private mapTINStatus(result: TINVerificationResponse | null): EntityValidationResponse['tin_verification']['status'] {
    if (!result) return 'pending';
    if (result.success) return 'verified';
    if (result.error?.includes('not found')) return 'not_found';
    return 'failed';
  }

  /**
   * Create audit log entry
   */
  private async createAuditLogEntry(request: EntityValidationRequest, validationId: string): Promise<string> {
    const { data, error } = await this.supabase
      .from('onboarding_audit_log')
      .insert({
        org_id: request.org_id,
        entity_type: request.entity_type,
        entity_id: request.entity_id,
        legal_business_name: request.legal_business_name,
        ein_tin: request.ein_tin,
        dot_number: request.dot_number,
        mc_number: request.mc_number,
        business_license_url: request.business_license_url,
        contact_email: request.contact_email,
        contact_phone: request.contact_phone,
        overall_status: 'pending',
        verification_score: 0,
        created_by: (await this.supabase.auth.getUser()).data.user?.id,
        ip_address: request.ip_address,
        user_agent: request.user_agent,
        session_id: request.session_id
      })
      .select('id')
      .single();

    if (error) throw new Error(`Failed to create audit log: ${error.message}`);
    return data.id;
  }

  /**
   * Update audit log entry with results
   */
  private async updateAuditLogEntry(auditLogId: string, response: EntityValidationResponse): Promise<void> {
    const { error } = await this.supabase
      .from('onboarding_audit_log')
      .update({
        overall_status: response.overall_status,
        verification_score: response.verification_score,
        fmcsa_verification_status: response.fmcsa_verification.status,
        fmcsa_verification_details: response.fmcsa_verification.details,
        tin_verification_status: response.tin_verification.status,
        tin_verification_details: response.tin_verification.details,
        cross_validation_status: response.cross_validation.status,
        cross_validation_details: response.cross_validation.details,
        has_operating_authority: response.compliance_flags.has_operating_authority,
        has_insurance_coverage: response.compliance_flags.has_insurance_coverage,
        has_safety_rating: response.compliance_flags.has_safety_rating,
        compliance_flags: response.compliance_flags.additional_flags,
        fmcsa_api_response: response.fmcsa_verification.response,
        tin_api_response: response.tin_verification.response,
        verified_at: response.verified_at,
        verification_attempts: response.verification_attempts,
        api_errors: response.error_message ? { error: response.error_message } : null
      })
      .eq('id', auditLogId);

    if (error) throw new Error(`Failed to update audit log: ${error.message}`);
  }

  /**
   * Log validation error
   */
  private async logValidationError(validationId: string, error: any, request: EntityValidationRequest): Promise<void> {
    try {
      await this.supabase
        .from('onboarding_audit_log')
        .insert({
          org_id: request.org_id,
          entity_type: request.entity_type,
          entity_id: request.entity_id,
          legal_business_name: request.legal_business_name,
          overall_status: 'failed',
          verification_score: 0,
          api_errors: { error: error instanceof Error ? error.message : 'Unknown error' },
          created_by: (await this.supabase.auth.getUser()).data.user?.id,
          ip_address: request.ip_address,
          user_agent: request.user_agent,
          session_id: request.session_id
        });
    } catch (logError) {
      console.error('Failed to log validation error:', logError);
    }
  }

  /**
   * Generate unique validation ID
   */
  private generateValidationId(): string {
    return `validation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Retry validation for failed entities
   */
  async retryValidation(auditLogId: string): Promise<EntityValidationResponse> {
    // Get the original request from audit log
    const { data: auditLog, error } = await this.supabase
      .from('onboarding_audit_log')
      .select('*')
      .eq('id', auditLogId)
      .single();

    if (error || !auditLog) {
      throw new Error('Audit log entry not found');
    }

    // Check if max attempts reached
    if (auditLog.verification_attempts >= this.config.maxVerificationAttempts) {
      throw new Error('Maximum verification attempts reached');
    }

    // Build request from audit log
    const request: EntityValidationRequest = {
      org_id: auditLog.org_id,
      entity_type: auditLog.entity_type,
      entity_id: auditLog.entity_id,
      legal_business_name: auditLog.legal_business_name,
      ein_tin: auditLog.ein_tin,
      dot_number: auditLog.dot_number,
      mc_number: auditLog.mc_number,
      business_license_url: auditLog.business_license_url,
      contact_email: auditLog.contact_email,
      contact_phone: auditLog.contact_phone,
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
      }
    };

    // Perform validation
    const response = await this.validateEntity(request);
    
    // Update attempt count
    response.verification_attempts = auditLog.verification_attempts + 1;

    return response;
  }

  /**
   * Get validation history for an entity
   */
  async getValidationHistory(entityId: string): Promise<EntityValidationResponse[]> {
    const { data, error } = await this.supabase
      .from('onboarding_audit_log')
      .select('*')
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to get validation history: ${error.message}`);

    return data.map(log => ({
      success: log.overall_status === 'verified',
      validation_id: log.id,
      overall_status: log.overall_status,
      verification_score: log.verification_score,
      fmcsa_verification: {
        status: log.fmcsa_verification_status,
        details: log.fmcsa_verification_details
      },
      tin_verification: {
        status: log.tin_verification_status,
        details: log.tin_verification_details
      },
      cross_validation: {
        status: log.cross_validation_status,
        details: log.cross_validation_details,
        confidence_score: 0
      },
      compliance_flags: {
        has_operating_authority: log.has_operating_authority,
        has_insurance_coverage: log.has_insurance_coverage,
        has_safety_rating: log.has_safety_rating,
        additional_flags: log.compliance_flags || {}
      },
      created_at: log.created_at,
      verified_at: log.verified_at,
      verification_attempts: log.verification_attempts,
      error_message: log.api_errors?.error,
      recommendations: [],
      next_steps: []
    }));
  }
}

// Export singleton instance
export const entityValidator = new EntityValidator();

// Export types for external use
export type { EntityValidationRequest, EntityValidationResponse, ValidationConfig };

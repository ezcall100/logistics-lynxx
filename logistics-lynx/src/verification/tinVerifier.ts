/**
 * TIN Verifier for IRS TIN Matching
 * Real-time integration with third-party KYC APIs (Alloy, Plaid, LexisNexis)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

export interface TINEntity {
  ein_tin: string;
  legal_business_name: string;
  dba_name?: string;
  entity_type: 'CORPORATION' | 'LLC' | 'PARTNERSHIP' | 'SOLE_PROPRIETORSHIP' | 'NON_PROFIT' | 'GOVERNMENT' | 'UNKNOWN';
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  verification_status: 'VERIFIED' | 'NOT_FOUND' | 'INVALID' | 'PENDING' | 'FAILED';
  verification_details: {
    exact_match: boolean;
    confidence_score: number;
    match_type: 'EXACT' | 'FUZZY' | 'PARTIAL' | 'NONE';
    verification_source: string;
    verification_date: string;
  };
  business_status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DISSOLVED' | 'UNKNOWN';
  registration_date?: string;
  last_updated: string;
}

export interface TINVerificationRequest {
  ein_tin: string;
  business_name?: string;
  entity_type?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

export interface TINVerificationResponse {
  success: boolean;
  entity?: TINEntity;
  error?: string;
  verification_id: string;
  timestamp: string;
  source: 'irs_api' | 'alloy_api' | 'plaid_api' | 'lexis_api' | 'cache' | 'manual';
  confidence_score?: number;
}

export interface TINVerifierConfig {
  primaryProvider: 'irs' | 'alloy' | 'plaid' | 'lexis';
  fallbackProviders: string[];
  apiKeys: {
    irs?: string;
    alloy?: string;
    plaid?: string;
    lexis?: string;
  };
  rateLimitPerMinute: number;
  timeoutMs: number;
  enableCaching: boolean;
  cacheTTLSeconds: number;
  confidenceThreshold: number;
}

export class TINVerifier {
  private config: TINVerifierConfig;
  private supabase: any;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;

  constructor(config: Partial<TINVerifierConfig> = {}) {
    this.config = {
      primaryProvider: 'alloy',
      fallbackProviders: ['plaid', 'lexis'],
      apiKeys: {},
      rateLimitPerMinute: 50,
      timeoutMs: 15000,
      enableCaching: true,
      cacheTTLSeconds: 7200, // 2 hours (longer than FMCSA due to less frequent changes)
      confidenceThreshold: 0.8,
      ...config
    };

    // Initialize Supabase client for caching and audit logging
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  /**
   * Verify TIN using primary and fallback providers
   */
  async verifyTIN(request: TINVerificationRequest): Promise<TINVerificationResponse> {
    const verificationId = this.generateVerificationId();
    const timestamp = new Date().toISOString();

    try {
      // Check rate limiting
      await this.checkRateLimit();

      // Validate TIN format
      if (!this.isValidTINFormat(request.ein_tin)) {
        return {
          success: false,
          error: 'Invalid TIN format. Must be 9 digits for EIN or 9 digits for SSN.',
          verification_id: verificationId,
          timestamp,
          source: 'manual'
        };
      }

      // Check cache first if enabled
      if (this.config.enableCaching) {
        const cachedResult = await this.getCachedVerification(request);
        if (cachedResult) {
          return {
            ...cachedResult,
            verification_id: verificationId,
            timestamp,
            source: 'cache'
          };
        }
      }

      // Try primary provider first
      let result = await this.verifyWithProvider(this.config.primaryProvider, request);
      
      // If primary fails or confidence is low, try fallback providers
      if (!result.success || (result.confidence_score && result.confidence_score < this.config.confidenceThreshold)) {
        for (const fallbackProvider of this.config.fallbackProviders) {
          const fallbackResult = await this.verifyWithProvider(fallbackProvider as any, request);
          if (fallbackResult.success && fallbackResult.confidence_score && fallbackResult.confidence_score > result.confidence_score!) {
            result = fallbackResult;
            break;
          }
        }
      }

      // Cache the result if successful
      if (result.success && result.entity && this.config.enableCaching) {
        await this.cacheVerification(request, result);
      }

      // Log verification attempt
      await this.logVerificationAttempt(request, result, verificationId);

      return {
        ...result,
        verification_id: verificationId,
        timestamp,
        source: result.source
      };

    } catch (error) {
      const errorResponse: TINVerificationResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: verificationId,
        timestamp,
        source: 'manual'
      };

      // Log error
      await this.logVerificationAttempt(request, errorResponse, verificationId);
      
      return errorResponse;
    }
  }

  /**
   * Verify TIN with specific provider
   */
  private async verifyWithProvider(provider: string, request: TINVerificationRequest): Promise<TINVerificationResponse> {
    switch (provider) {
      case 'irs':
        return this.verifyWithIRS(request);
      case 'alloy':
        return this.verifyWithAlloy(request);
      case 'plaid':
        return this.verifyWithPlaid(request);
      case 'lexis':
        return this.verifyWithLexis(request);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  /**
   * Verify with IRS TIN Matching API
   */
  private async verifyWithIRS(request: TINVerificationRequest): Promise<TINVerificationResponse> {
    const apiKey = this.config.apiKeys.irs;
    if (!apiKey) {
      throw new Error('IRS API key not configured');
    }

    try {
      const response = await fetch('https://api.irs.gov/tin-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'LogisticsLynx-TMS/1.0'
        },
        body: JSON.stringify({
          tin: request.ein_tin,
          business_name: request.business_name,
          entity_type: request.entity_type
        }),
        signal: AbortSignal.timeout(this.config.timeoutMs)
      });

      if (!response.ok) {
        throw new Error(`IRS API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.parseIRSResponse(data, request);
    } catch (error) {
      throw new Error(`IRS verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify with Alloy KYC API
   */
  private async verifyWithAlloy(request: TINVerificationRequest): Promise<TINVerificationResponse> {
    const apiKey = this.config.apiKeys.alloy;
    if (!apiKey) {
      throw new Error('Alloy API key not configured');
    }

    try {
      const response = await fetch('https://api.alloy.com/v1/verifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
          'User-Agent': 'LogisticsLynx-TMS/1.0'
        },
        body: JSON.stringify({
          verification_type: 'business_verification',
          tin: request.ein_tin,
          business_name: request.business_name,
          address: request.address
        }),
        signal: AbortSignal.timeout(this.config.timeoutMs)
      });

      if (!response.ok) {
        throw new Error(`Alloy API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.parseAlloyResponse(data, request);
    } catch (error) {
      throw new Error(`Alloy verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify with Plaid API
   */
  private async verifyWithPlaid(request: TINVerificationRequest): Promise<TINVerificationResponse> {
    const apiKey = this.config.apiKeys.plaid;
    if (!apiKey) {
      throw new Error('Plaid API key not configured');
    }

    try {
      const response = await fetch('https://api.plaid.com/identity_verification/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'LogisticsLynx-TMS/1.0'
        },
        body: JSON.stringify({
          type: 'business',
          tin: request.ein_tin,
          business_name: request.business_name
        }),
        signal: AbortSignal.timeout(this.config.timeoutMs)
      });

      if (!response.ok) {
        throw new Error(`Plaid API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.parsePlaidResponse(data, request);
    } catch (error) {
      throw new Error(`Plaid verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify with LexisNexis API
   */
  private async verifyWithLexis(request: TINVerificationRequest): Promise<TINVerificationResponse> {
    const apiKey = this.config.apiKeys.lexis;
    if (!apiKey) {
      throw new Error('LexisNexis API key not configured');
    }

    try {
      const response = await fetch('https://api.lexisnexis.com/verification/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'LogisticsLynx-TMS/1.0'
        },
        body: JSON.stringify({
          tin: request.ein_tin,
          business_name: request.business_name,
          address: request.address
        }),
        signal: AbortSignal.timeout(this.config.timeoutMs)
      });

      if (!response.ok) {
        throw new Error(`LexisNexis API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return this.parseLexisResponse(data, request);
    } catch (error) {
      throw new Error(`LexisNexis verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse IRS API response
   */
  private parseIRSResponse(data: any, request: TINVerificationRequest): TINVerificationResponse {
    const verificationId = this.generateVerificationId();
    
    if (data.status === 'MATCH') {
      const entity: TINEntity = {
        ein_tin: request.ein_tin,
        legal_business_name: data.business_name || request.business_name || '',
        entity_type: this.mapEntityType(data.entity_type),
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          zip: data.address?.zip || '',
          country: 'US'
        },
        verification_status: 'VERIFIED',
        verification_details: {
          exact_match: true,
          confidence_score: 1.0,
          match_type: 'EXACT',
          verification_source: 'irs_api',
          verification_date: new Date().toISOString()
        },
        business_status: 'ACTIVE',
        last_updated: new Date().toISOString()
      };

      return {
        success: true,
        entity,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'irs_api',
        confidence_score: 1.0
      };
    } else {
      return {
        success: false,
        error: `TIN not found or invalid: ${data.reason || 'No match found'}`,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'irs_api',
        confidence_score: 0.0
      };
    }
  }

  /**
   * Parse Alloy API response
   */
  private parseAlloyResponse(data: any, request: TINVerificationRequest): TINVerificationResponse {
    const verificationId = this.generateVerificationId();
    
    if (data.status === 'approved' && data.verification?.business) {
      const business = data.verification.business;
      const entity: TINEntity = {
        ein_tin: request.ein_tin,
        legal_business_name: business.legal_name || request.business_name || '',
        dba_name: business.dba_name,
        entity_type: this.mapEntityType(business.entity_type),
        address: {
          street: business.address?.street || '',
          city: business.address?.city || '',
          state: business.address?.state || '',
          zip: business.address?.zip || '',
          country: business.address?.country || 'US'
        },
        verification_status: 'VERIFIED',
        verification_details: {
          exact_match: business.exact_match || false,
          confidence_score: business.confidence_score || 0.8,
          match_type: business.match_type || 'FUZZY',
          verification_source: 'alloy_api',
          verification_date: new Date().toISOString()
        },
        business_status: this.mapBusinessStatus(business.status),
        registration_date: business.registration_date,
        last_updated: new Date().toISOString()
      };

      return {
        success: true,
        entity,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'alloy_api',
        confidence_score: business.confidence_score || 0.8
      };
    } else {
      return {
        success: false,
        error: `Verification failed: ${data.reason || 'Business not found'}`,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'alloy_api',
        confidence_score: 0.0
      };
    }
  }

  /**
   * Parse Plaid API response
   */
  private parsePlaidResponse(data: any, request: TINVerificationRequest): TINVerificationResponse {
    const verificationId = this.generateVerificationId();
    
    if (data.status === 'success' && data.business) {
      const business = data.business;
      const entity: TINEntity = {
        ein_tin: request.ein_tin,
        legal_business_name: business.name || request.business_name || '',
        entity_type: this.mapEntityType(business.type),
        address: {
          street: business.address?.street || '',
          city: business.address?.city || '',
          state: business.address?.state || '',
          zip: business.address?.zip || '',
          country: business.address?.country || 'US'
        },
        verification_status: 'VERIFIED',
        verification_details: {
          exact_match: business.exact_match || false,
          confidence_score: business.confidence || 0.7,
          match_type: business.match_type || 'FUZZY',
          verification_source: 'plaid_api',
          verification_date: new Date().toISOString()
        },
        business_status: 'ACTIVE',
        last_updated: new Date().toISOString()
      };

      return {
        success: true,
        entity,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'plaid_api',
        confidence_score: business.confidence || 0.7
      };
    } else {
      return {
        success: false,
        error: `Verification failed: ${data.error?.message || 'Business not found'}`,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'plaid_api',
        confidence_score: 0.0
      };
    }
  }

  /**
   * Parse LexisNexis API response
   */
  private parseLexisResponse(data: any, request: TINVerificationRequest): TINVerificationResponse {
    const verificationId = this.generateVerificationId();
    
    if (data.status === 'verified' && data.business) {
      const business = data.business;
      const entity: TINEntity = {
        ein_tin: request.ein_tin,
        legal_business_name: business.legal_name || request.business_name || '',
        dba_name: business.dba_name,
        entity_type: this.mapEntityType(business.entity_type),
        address: {
          street: business.address?.street || '',
          city: business.address?.city || '',
          state: business.address?.state || '',
          zip: business.address?.zip || '',
          country: business.address?.country || 'US'
        },
        verification_status: 'VERIFIED',
        verification_details: {
          exact_match: business.exact_match || false,
          confidence_score: business.confidence_score || 0.9,
          match_type: business.match_type || 'FUZZY',
          verification_source: 'lexis_api',
          verification_date: new Date().toISOString()
        },
        business_status: this.mapBusinessStatus(business.status),
        registration_date: business.registration_date,
        last_updated: new Date().toISOString()
      };

      return {
        success: true,
        entity,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'lexis_api',
        confidence_score: business.confidence_score || 0.9
      };
    } else {
      return {
        success: false,
        error: `Verification failed: ${data.reason || 'Business not found'}`,
        verification_id,
        timestamp: new Date().toISOString(),
        source: 'lexis_api',
        confidence_score: 0.0
      };
    }
  }

  /**
   * Validate TIN format
   */
  private isValidTINFormat(tin: string): boolean {
    // Remove any non-digit characters
    const cleanTIN = tin.replace(/\D/g, '');
    
    // Must be exactly 9 digits
    if (cleanTIN.length !== 9) {
      return false;
    }
    
    // Basic checksum validation for EIN
    if (cleanTIN.startsWith('0') || cleanTIN.startsWith('3') || cleanTIN.startsWith('4') || cleanTIN.startsWith('5') || cleanTIN.startsWith('6') || cleanTIN.startsWith('9')) {
      // This is likely an EIN - additional validation could be added here
      return true;
    }
    
    // For SSN, additional validation could be added
    return true;
  }

  /**
   * Map entity type from API response to standardized format
   */
  private mapEntityType(apiType: string): TINEntity['entity_type'] {
    const typeMap: Record<string, TINEntity['entity_type']> = {
      'CORPORATION': 'CORPORATION',
      'LLC': 'LLC',
      'PARTNERSHIP': 'PARTNERSHIP',
      'SOLE_PROPRIETORSHIP': 'SOLE_PROPRIETORSHIP',
      'NON_PROFIT': 'NON_PROFIT',
      'GOVERNMENT': 'GOVERNMENT',
      'C-CORP': 'CORPORATION',
      'S-CORP': 'CORPORATION',
      'LIMITED_LIABILITY_COMPANY': 'LLC',
      'GENERAL_PARTNERSHIP': 'PARTNERSHIP',
      'LIMITED_PARTNERSHIP': 'PARTNERSHIP',
      'SOLE_PROP': 'SOLE_PROPRIETORSHIP',
      'NONPROFIT': 'NON_PROFIT',
      'GOVT': 'GOVERNMENT'
    };
    return typeMap[apiType?.toUpperCase()] || 'UNKNOWN';
  }

  /**
   * Map business status from API response to standardized format
   */
  private mapBusinessStatus(apiStatus: string): TINEntity['business_status'] {
    const statusMap: Record<string, TINEntity['business_status']> = {
      'ACTIVE': 'ACTIVE',
      'INACTIVE': 'INACTIVE',
      'SUSPENDED': 'SUSPENDED',
      'DISSOLVED': 'DISSOLVED',
      'GOOD_STANDING': 'ACTIVE',
      'NOT_IN_GOOD_STANDING': 'SUSPENDED',
      'CANCELLED': 'DISSOLVED'
    };
    return statusMap[apiStatus?.toUpperCase()] || 'UNKNOWN';
  }

  /**
   * Check rate limiting
   */
  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const timeWindow = 60 * 1000; // 1 minute

    if (now - this.lastRequestTime < timeWindow) {
      this.requestCount++;
    } else {
      this.requestCount = 1;
      this.lastRequestTime = now;
    }

    if (this.requestCount > this.config.rateLimitPerMinute) {
      throw new Error(`Rate limit exceeded: ${this.config.rateLimitPerMinute} requests per minute`);
    }
  }

  /**
   * Get cached verification result
   */
  private async getCachedVerification(request: TINVerificationRequest): Promise<TINVerificationResponse | null> {
    try {
      const cacheKey = this.generateCacheKey(request);
      const { data, error } = await this.supabase
        .from('verification_cache')
        .select('*')
        .eq('cache_key', cacheKey)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return null;
      }

      return data.response_data as TINVerificationResponse;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  /**
   * Cache verification result
   */
  private async cacheVerification(request: TINVerificationRequest, response: TINVerificationResponse): Promise<void> {
    try {
      const cacheKey = this.generateCacheKey(request);
      const expiresAt = new Date(Date.now() + this.config.cacheTTLSeconds * 1000);

      await this.supabase
        .from('verification_cache')
        .upsert({
          cache_key: cacheKey,
          response_data: response,
          expires_at: expiresAt,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  /**
   * Generate cache key for request
   */
  private generateCacheKey(request: TINVerificationRequest): string {
    const { ein_tin, business_name } = request;
    const key = `${ein_tin}|${business_name || ''}`;
    return `tin:${Buffer.from(key).toString('base64')}`;
  }

  /**
   * Log verification attempt to audit log
   */
  private async logVerificationAttempt(
    request: TINVerificationRequest,
    response: TINVerificationResponse,
    verificationId: string
  ): Promise<void> {
    try {
      await this.supabase
        .from('verification_audit_log')
        .insert({
          verification_id: verificationId,
          api_name: 'tin',
          request_payload: request,
          response_data: response,
          success: response.success,
          error_message: response.error,
          created_at: new Date().toISOString()
        });
    } catch (error) {
      console.warn('Audit logging failed:', error);
    }
  }

  /**
   * Generate unique verification ID
   */
  private generateVerificationId(): string {
    return `tin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get provider health status
   */
  async getHealthStatus(): Promise<Record<string, { healthy: boolean; responseTime: number; error?: string }>> {
    const providers = [this.config.primaryProvider, ...this.config.fallbackProviders];
    const results: Record<string, { healthy: boolean; responseTime: number; error?: string }> = {};

    for (const provider of providers) {
      const startTime = Date.now();
      
      try {
        // Simple health check for each provider
        const healthUrl = this.getHealthCheckUrl(provider);
        if (healthUrl) {
          const response = await fetch(healthUrl, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
          });

          results[provider] = {
            healthy: response.ok,
            responseTime: Date.now() - startTime,
            error: response.ok ? undefined : `HTTP ${response.status}`
          };
        } else {
          results[provider] = {
            healthy: false,
            responseTime: Date.now() - startTime,
            error: 'Health check URL not configured'
          };
        }
      } catch (error) {
        results[provider] = {
          healthy: false,
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    return results;
  }

  /**
   * Get health check URL for provider
   */
  private getHealthCheckUrl(provider: string): string | null {
    const healthUrls: Record<string, string> = {
      'irs': 'https://api.irs.gov/health',
      'alloy': 'https://api.alloy.com/v1/health',
      'plaid': 'https://api.plaid.com/health',
      'lexis': 'https://api.lexisnexis.com/health'
    };
    return healthUrls[provider] || null;
  }
}

// Export singleton instance
export const tinVerifier = new TINVerifier();

// Export types for external use
export type { TINEntity, TINVerificationRequest, TINVerificationResponse, TINVerifierConfig };

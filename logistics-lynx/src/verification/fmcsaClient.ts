/**
 * FMCSA Client for US DOT Verification
 * Real-time API integration with FMCSA/US DOT databases
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';

export interface FMCSAEntity {
  dot_number: string;
  legal_name: string;
  dba_name?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  operating_status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_SERVICE' | 'UNKNOWN';
  operating_authority: {
    has_authority: boolean;
    authority_type: string[];
    mc_number?: string;
    mc_status?: string;
  };
  insurance: {
    has_coverage: boolean;
    coverage_amount?: number;
    insurance_company?: string;
    policy_number?: string;
    expiration_date?: string;
  };
  safety_rating: {
    has_rating: boolean;
    rating?: 'SATISFACTORY' | 'CONDITIONAL' | 'UNSATISFACTORY' | 'UNRATED';
    review_date?: string;
  };
  cargo_carried: string[];
  hazmat_authority: boolean;
  passenger_authority: boolean;
  last_updated: string;
}

export interface FMCSAVerificationRequest {
  dot_number?: string;
  business_name?: string;
  mc_number?: string;
}

export interface FMCSAVerificationResponse {
  success: boolean;
  entity?: FMCSAEntity;
  error?: string;
  verification_id: string;
  timestamp: string;
  source: 'fmcsa_api' | 'cache' | 'manual';
}

export interface FMCSAConfig {
  apiEndpoint: string;
  apiKey?: string;
  rateLimitPerMinute: number;
  timeoutMs: number;
  enableCaching: boolean;
  cacheTTLSeconds: number;
}

export class FMCSAClient {
  private config: FMCSAConfig;
  private supabase: any;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;

  constructor(config: Partial<FMCSAConfig> = {}) {
    this.config = {
      apiEndpoint: 'https://safer.fmcsa.dot.gov/api/v1',
      rateLimitPerMinute: 100,
      timeoutMs: 10000,
      enableCaching: true,
      cacheTTLSeconds: 3600, // 1 hour
      ...config
    };

    // Initialize Supabase client for caching and audit logging
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  /**
   * Verify entity using DOT number or business name
   */
  async verifyEntity(request: FMCSAVerificationRequest): Promise<FMCSAVerificationResponse> {
    const verificationId = this.generateVerificationId();
    const timestamp = new Date().toISOString();

    try {
      // Check rate limiting
      await this.checkRateLimit();

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

      // Perform API verification
      const apiResult = await this.performAPIVerification(request);
      
      // Cache the result if successful
      if (apiResult.success && apiResult.entity && this.config.enableCaching) {
        await this.cacheVerification(request, apiResult);
      }

      // Log verification attempt
      await this.logVerificationAttempt(request, apiResult, verificationId);

      return {
        ...apiResult,
        verification_id: verificationId,
        timestamp,
        source: 'fmcsa_api'
      };

    } catch (error) {
      const errorResponse: FMCSAVerificationResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        verification_id: verificationId,
        timestamp,
        source: 'fmcsa_api'
      };

      // Log error
      await this.logVerificationAttempt(request, errorResponse, verificationId);
      
      return errorResponse;
    }
  }

  /**
   * Perform actual API verification
   */
  private async performAPIVerification(request: FMCSAVerificationRequest): Promise<FMCSAVerificationResponse> {
    const { dot_number, business_name, mc_number } = request;

    if (!dot_number && !business_name && !mc_number) {
      throw new Error('At least one identifier (DOT number, business name, or MC number) is required');
    }

    // Build API request URL
    let apiUrl = `${this.config.apiEndpoint}/companies`;
    const params = new URLSearchParams();

    if (dot_number) {
      params.append('dot_number', dot_number);
    }
    if (business_name) {
      params.append('legal_name', business_name);
    }
    if (mc_number) {
      params.append('mc_number', mc_number);
    }

    apiUrl += `?${params.toString()}`;

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'LogisticsLynx-TMS/1.0',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      signal: AbortSignal.timeout(this.config.timeoutMs)
    });

    if (!response.ok) {
      throw new Error(`FMCSA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Parse and validate response
    if (!data || !data.companies || data.companies.length === 0) {
      return {
        success: false,
        error: 'No matching entities found',
        verification_id: this.generateVerificationId(),
        timestamp: new Date().toISOString(),
        source: 'fmcsa_api'
      };
    }

    // Return the first (most relevant) match
    const entity = this.parseFMCSAEntity(data.companies[0]);
    
    return {
      success: true,
      entity,
      verification_id: this.generateVerificationId(),
      timestamp: new Date().toISOString(),
      source: 'fmcsa_api'
    };
  }

  /**
   * Parse FMCSA API response into standardized entity format
   */
  private parseFMCSAEntity(apiData: any): FMCSAEntity {
    return {
      dot_number: apiData.dot_number || '',
      legal_name: apiData.legal_name || '',
      dba_name: apiData.dba_name,
      address: {
        street: apiData.address?.street || '',
        city: apiData.address?.city || '',
        state: apiData.address?.state || '',
        zip: apiData.address?.zip || '',
        country: apiData.address?.country || 'US'
      },
      operating_status: this.mapOperatingStatus(apiData.operating_status),
      operating_authority: {
        has_authority: Boolean(apiData.operating_authority?.has_authority),
        authority_type: apiData.operating_authority?.authority_type || [],
        mc_number: apiData.operating_authority?.mc_number,
        mc_status: apiData.operating_authority?.mc_status
      },
      insurance: {
        has_coverage: Boolean(apiData.insurance?.has_coverage),
        coverage_amount: apiData.insurance?.coverage_amount,
        insurance_company: apiData.insurance?.insurance_company,
        policy_number: apiData.insurance?.policy_number,
        expiration_date: apiData.insurance?.expiration_date
      },
      safety_rating: {
        has_rating: Boolean(apiData.safety_rating?.has_rating),
        rating: this.mapSafetyRating(apiData.safety_rating?.rating),
        review_date: apiData.safety_rating?.review_date
      },
      cargo_carried: apiData.cargo_carried || [],
      hazmat_authority: Boolean(apiData.hazmat_authority),
      passenger_authority: Boolean(apiData.passenger_authority),
      last_updated: apiData.last_updated || new Date().toISOString()
    };
  }

  /**
   * Map API operating status to standardized format
   */
  private mapOperatingStatus(status: string): FMCSAEntity['operating_status'] {
    const statusMap: Record<string, FMCSAEntity['operating_status']> = {
      'ACTIVE': 'ACTIVE',
      'INACTIVE': 'INACTIVE',
      'OUT_OF_SERVICE': 'OUT_OF_SERVICE',
      'OOS': 'OUT_OF_SERVICE'
    };
    return statusMap[status?.toUpperCase()] || 'UNKNOWN';
  }

  /**
   * Map API safety rating to standardized format
   */
  private mapSafetyRating(rating: string): FMCSAEntity['safety_rating']['rating'] {
    const ratingMap: Record<string, FMCSAEntity['safety_rating']['rating']> = {
      'SATISFACTORY': 'SATISFACTORY',
      'CONDITIONAL': 'CONDITIONAL',
      'UNSATISFACTORY': 'UNSATISFACTORY',
      'UNRATED': 'UNRATED'
    };
    return ratingMap[rating?.toUpperCase()] || 'UNRATED';
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
  private async getCachedVerification(request: FMCSAVerificationRequest): Promise<FMCSAVerificationResponse | null> {
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

      return data.response_data as FMCSAVerificationResponse;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  /**
   * Cache verification result
   */
  private async cacheVerification(request: FMCSAVerificationRequest, response: FMCSAVerificationResponse): Promise<void> {
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
  private generateCacheKey(request: FMCSAVerificationRequest): string {
    const { dot_number, business_name, mc_number } = request;
    const key = `${dot_number || ''}|${business_name || ''}|${mc_number || ''}`;
    return `fmcsa:${Buffer.from(key).toString('base64')}`;
  }

  /**
   * Log verification attempt to audit log
   */
  private async logVerificationAttempt(
    request: FMCSAVerificationRequest,
    response: FMCSAVerificationResponse,
    verificationId: string
  ): Promise<void> {
    try {
      await this.supabase
        .from('verification_audit_log')
        .insert({
          verification_id: verificationId,
          api_name: 'fmcsa',
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
    return `fmcsa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get API health status
   */
  async getHealthStatus(): Promise<{ healthy: boolean; responseTime: number; error?: string }> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.config.apiEndpoint}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });

      const responseTime = Date.now() - startTime;
      
      return {
        healthy: response.ok,
        responseTime,
        error: response.ok ? undefined : `HTTP ${response.status}`
      };
    } catch (error) {
      return {
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Batch verify multiple entities
   */
  async batchVerify(requests: FMCSAVerificationRequest[]): Promise<FMCSAVerificationResponse[]> {
    const results: FMCSAVerificationResponse[] = [];
    
    // Process in batches to respect rate limits
    const batchSize = Math.floor(this.config.rateLimitPerMinute / 2); // Conservative batch size
    
    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(request => this.verifyEntity(request));
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach(result => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            success: false,
            error: result.reason?.message || 'Batch verification failed',
            verification_id: this.generateVerificationId(),
            timestamp: new Date().toISOString(),
            source: 'fmcsa_api'
          });
        }
      });

      // Add delay between batches to respect rate limits
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

// Export singleton instance
export const fmcsaClient = new FMCSAClient();

// Export types for external use
export type { FMCSAEntity, FMCSAVerificationRequest, FMCSAVerificationResponse, FMCSAConfig };

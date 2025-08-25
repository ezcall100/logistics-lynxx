import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with MCP API configuration
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_MCP_API_URL || 'http://localhost:3001/api',
  withCredentials: true,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication and CSRF
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add CSRF token if available
    const csrfToken = localStorage.getItem('csrf-token');
    if (csrfToken) {
      config.headers = {
        ...config.headers,
        'X-CSRF-Token': csrfToken,
      };
    }

    // Add request ID for tracking
    config.headers = {
      ...config.headers,
      'X-Request-ID': crypto.randomUUID(),
    };

    console.log(`🌐 MCP API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for authentication refresh and error handling
http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ MCP API Response: ${response.status} ${response.config.url}`);
    
    // Extract CSRF token from response headers
    const csrfToken = response.headers['x-csrf-token'];
    if (csrfToken) {
      localStorage.setItem('csrf-token', csrfToken);
    }
    
    return response;
  },
  async (error) => {
    const { response, config } = error || {};
    
    console.error(`❌ MCP API Error: ${response?.status} ${config?.url}`, {
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      url: config?.url,
    });

    // Handle 401 Unauthorized - attempt token refresh
    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      
      try {
        console.log('🔄 Attempting token refresh...');
        await axios.post('/auth/refresh', {}, { 
          withCredentials: true,
          baseURL: import.meta.env.NEXT_PUBLIC_MCP_API_URL || 'http://localhost:3001/api'
        });
        
        console.log('✅ Token refresh successful, retrying request');
        return http.request(config);
      } catch (refreshError) {
        console.error('❌ Token refresh failed, redirecting to login');
        localStorage.removeItem('csrf-token');
        window.location.assign('/login');
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden - insufficient permissions
    if (response?.status === 403) {
      console.error('🚫 Insufficient permissions for this operation');
      // Could redirect to unauthorized page or show permission error
    }

    // Handle 500+ server errors
    if (response?.status >= 500) {
      console.error('🔥 Server error, please try again later');
    }

    return Promise.reject(error);
  }
);

// Utility functions for common HTTP operations
export const httpUtils = {
  // Retry wrapper for failed requests
  retry: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Attempt ${attempt} failed, ${attempt < maxRetries ? 'retrying...' : 'giving up'}`);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    
    throw lastError;
  },

  // Handle API errors consistently
  handleError: (error: any, context: string = 'API call') => {
    const message = error?.response?.data?.message || 
                   error?.message || 
                   'An unexpected error occurred';
    
    console.error(`❌ ${context} failed:`, message);
    
    return {
      error: true,
      message,
      status: error?.response?.status,
      data: error?.response?.data,
    };
  },

  // Validate response data
  validateResponse: <T>(response: AxiosResponse<T>, expectedFields?: string[]): T => {
    if (!response.data) {
      throw new Error('Empty response from server');
    }
    
    if (expectedFields) {
      const missingFields = expectedFields.filter(field => 
        !(field in (response.data as any))
      );
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
    }
    
    return response.data;
  },
};

export default http;

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  status: 'active' | 'inactive' | 'expired';
  created_at: string;
  last_used: string;
  usage_count: number;
  rate_limit: number;
}

export interface APILog {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status_code: number;
  response_time: number;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  api_key_id: string;
  request_size: number;
  response_size: number;
}

export interface APIError {
  id: string;
  error_code: string;
  error_message: string;
  endpoint: string;
  method: string;
  timestamp: string;
  ip_address: string;
  api_key_id: string;
  stack_trace: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_51HyJq2LkdIwHu0C4G7VY2Nk...',
    permissions: ['read', 'write', 'delete'],
    status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    last_used: '2024-06-17T14:22:00Z',
    usage_count: 15420,
    rate_limit: 1000
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_51HyJq2LkdIwHu0C4G7VY2Nk...',
    permissions: ['read', 'write'],
    status: 'active',
    created_at: '2024-02-01T09:15:00Z',
    last_used: '2024-06-17T13:45:00Z',
    usage_count: 8934,
    rate_limit: 500
  },
  {
    id: '3',
    name: 'Mobile App Key',
    key: 'pk_live_41HyJq2LkdIwHu0C4G7VY2Nk...',
    permissions: ['read'],
    status: 'inactive',
    created_at: '2024-03-10T16:20:00Z',
    last_used: '2024-06-10T11:30:00Z',
    usage_count: 2145,
    rate_limit: 100
  },
  {
    id: '4',
    name: 'Analytics Key',
    key: 'pk_test_31HyJq2LkdIwHu0C4G7VY2Nk...',
    permissions: ['read'],
    status: 'expired',
    created_at: '2024-01-01T00:00:00Z',
    last_used: '2024-05-15T08:20:00Z',
    usage_count: 45672,
    rate_limit: 2000
  }
];

export const mockAPILogs: APILog[] = [
  {
    id: '1',
    endpoint: '/api/v1/shipments',
    method: 'GET',
    status_code: 200,
    response_time: 142,
    timestamp: '2024-06-17T14:22:15Z',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    api_key_id: '1',
    request_size: 1024,
    response_size: 8192
  },
  {
    id: '2',
    endpoint: '/api/v1/carriers',
    method: 'POST',
    status_code: 201,
    response_time: 89,
    timestamp: '2024-06-17T14:21:45Z',
    ip_address: '10.0.0.50',
    user_agent: 'PostmanRuntime/7.32.3',
    api_key_id: '2',
    request_size: 2048,
    response_size: 512
  },
  {
    id: '3',
    endpoint: '/api/v1/drivers/123',
    method: 'PUT',
    status_code: 200,
    response_time: 234,
    timestamp: '2024-06-17T14:20:30Z',
    ip_address: '172.16.0.25',
    user_agent: 'curl/7.68.0',
    api_key_id: '1',
    request_size: 1536,
    response_size: 1024
  },
  {
    id: '4',
    endpoint: '/api/v1/loads',
    method: 'GET',
    status_code: 404,
    response_time: 45,
    timestamp: '2024-06-17T14:19:12Z',
    ip_address: '203.0.113.42',
    user_agent: 'TMS-Client/1.2.0',
    api_key_id: '3',
    request_size: 512,
    response_size: 256
  },
  {
    id: '5',
    endpoint: '/api/v1/analytics',
    method: 'GET',
    status_code: 500,
    response_time: 1205,
    timestamp: '2024-06-17T14:18:55Z',
    ip_address: '198.51.100.15',
    user_agent: 'Analytics-Bot/2.1',
    api_key_id: '4',
    request_size: 768,
    response_size: 0
  }
];

export const mockAPIErrors: APIError[] = [
  {
    id: '1',
    error_code: 'RATE_LIMIT_EXCEEDED',
    error_message: 'API rate limit exceeded for key pk_live_51HyJq2LkdIwHu0C4G7VY2Nk...',
    endpoint: '/api/v1/shipments',
    method: 'GET',
    timestamp: '2024-06-17T14:15:30Z',
    ip_address: '192.168.1.100',
    api_key_id: '1',
    stack_trace: 'RateLimitError: Too many requests\n    at validateApiKey (middleware.js:45)\n    at processRequest (app.js:123)',
    severity: 'medium',
    resolved: false
  },
  {
    id: '2',
    error_code: 'INVALID_API_KEY',
    error_message: 'The provided API key is invalid or has been revoked',
    endpoint: '/api/v1/carriers',
    method: 'POST',
    timestamp: '2024-06-17T13:45:22Z',
    ip_address: '203.0.113.42',
    api_key_id: '3',
    stack_trace: 'AuthenticationError: Invalid API key\n    at authenticateRequest (auth.js:78)\n    at middleware (app.js:89)',
    severity: 'high',
    resolved: true
  },
  {
    id: '3',
    error_code: 'DATABASE_CONNECTION_FAILED',
    error_message: 'Failed to establish connection to the database',
    endpoint: '/api/v1/analytics',
    method: 'GET',
    timestamp: '2024-06-17T12:30:15Z',
    ip_address: '198.51.100.15',
    api_key_id: '4',
    stack_trace: 'DatabaseError: Connection timeout\n    at connectToDatabase (db.js:34)\n    at queryData (analytics.js:156)',
    severity: 'critical',
    resolved: true
  },
  {
    id: '4',
    error_code: 'VALIDATION_ERROR',
    error_message: 'Required field "driver_license" is missing from request body',
    endpoint: '/api/v1/drivers',
    method: 'POST',
    timestamp: '2024-06-17T11:22:08Z',
    ip_address: '10.0.0.50',
    api_key_id: '2',
    stack_trace: 'ValidationError: Missing required field\n    at validateRequest (validation.js:23)\n    at createDriver (drivers.js:89)',
    severity: 'low',
    resolved: false
  }
];

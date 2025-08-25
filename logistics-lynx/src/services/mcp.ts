import { http, httpUtils } from '@/lib/http';

// TypeScript interfaces for MCP API responses
export interface MCPMetrics {
  agents: {
    online: number;
    total: number;
    healthy: number;
    degraded: number;
    offline: number;
  };
  jobs: {
    queued: number;
    running: number;
    completed: number;
    failed: number;
    success_rate: number;
  };
  system: {
    uptime: number;
    version: string;
    last_deployment: string;
    error_rate: number;
    response_time: number;
  };
  resources: {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_throughput: number;
  };
}

export interface MCPUser {
  id: string;
  external_id?: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  features: string[];
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  company?: string;
  department?: string;
  last_login?: string;
  created_at: string;
  updated_at: string;
  two_factor_enabled: boolean;
  login_count: number;
  last_activity?: string;
}

export interface MCPUserCreate {
  email: string;
  name: string;
  role: string;
  permissions?: string[];
  features?: string[];
  company?: string;
  department?: string;
  external_id?: string;
}

export interface MCPUserUpdate {
  name?: string;
  role?: string;
  permissions?: string[];
  features?: string[];
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  company?: string;
  department?: string;
}

export interface MCPSettings {
  organization: {
    name: string;
    timezone: string;
    base_urls: string[];
    contact_email: string;
  };
  security: {
    session_length_minutes: number;
    two_factor_required: boolean;
    ip_allowlist: string[];
    ip_denylist: string[];
    audit_logging_enabled: boolean;
    password_policy: {
      min_length: number;
      require_uppercase: boolean;
      require_lowercase: boolean;
      require_numbers: boolean;
      require_special: boolean;
    };
  };
  integrations: {
    webhooks: Array<{
      id: string;
      url: string;
      events: string[];
      enabled: boolean;
      secret?: string;
    }>;
    api_keys: Array<{
      id: string;
      name: string;
      key_prefix: string;
      permissions: string[];
      created_at: string;
      last_used?: string;
    }>;
    outbound_events: Array<{
      id: string;
      name: string;
      endpoint: string;
      events: string[];
      enabled: boolean;
    }>;
  };
  version: string;
  last_updated: string;
}

export interface MCPAgent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  capabilities: string[];
  last_heartbeat: string;
  version: string;
  desired_concurrency: number;
  current_concurrency: number;
  location?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MCPWorkflow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  triggers: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  steps: Array<{
    id: string;
    name: string;
    type: string;
    config: Record<string, any>;
    dependencies: string[];
  }>;
  created_at: string;
  updated_at: string;
  activated_at?: string;
  created_by: string;
}

export interface MCPLog {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  service: string;
  user_id?: string;
  message: string;
  metadata: Record<string, any>;
  trace_id?: string;
  span_id?: string;
}

export interface MCPTask {
  id: string;
  type: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  payload: Record<string, any>;
  result?: Record<string, any>;
  error?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
  created_by: string;
  agent_id?: string;
  priority: number;
}

export interface MCPAssistantResponse {
  conversation_id: string;
  message: string;
  tool_calls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, any>;
  }>;
  metadata: Record<string, any>;
}

// User Profile interfaces
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  timezone?: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language: string;
  };
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  department?: string;
  timezone?: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ProfilePreferences {
  theme?: 'light' | 'dark' | 'auto';
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  language?: string;
}

export interface AvatarUploadResponse {
  uploadUrl: string;
  avatarId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

// Mock data for development and fallback
const mockMCPMetrics: MCPMetrics = {
  agents: {
    online: 12,
    total: 15,
    healthy: 10,
    degraded: 2,
    offline: 3
  },
  jobs: {
    queued: 45,
    running: 23,
    completed: 1250,
    failed: 12,
    success_rate: 0.985
  },
  system: {
    uptime: 99.8,
    version: '2.1.4',
    last_deployment: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    error_rate: 0.015,
    response_time: 245
  },
  resources: {
    cpu_usage: 45,
    memory_usage: 68,
    disk_usage: 34,
    network_throughput: 2.4
  }
};

// MCP API Service
export const MCP = {
  // Metrics and Overview
  metrics: {
    overview: async (): Promise<{ data: MCPMetrics; isMock: boolean }> => {
      try {
        const response = await http.get<{ success: boolean; data: MCPMetrics; message: string }>('/mcp/metrics/overview');
        // The MCP API returns { success: true, data: {...}, message: "..." }
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          // Validate the data structure
          if (data.agents && data.jobs && data.system) {
            return { data, isMock: false };
          }
        }
        throw new Error('Invalid response format from MCP API');
      } catch (error) {
        console.warn('MCP API unavailable, using mock data:', error);
        // Return mock data with slight randomization for realistic feel
        const mockData = {
          ...mockMCPMetrics,
          agents: {
            ...mockMCPMetrics.agents,
            online: mockMCPMetrics.agents.online + Math.floor(Math.random() * 3) - 1,
            healthy: mockMCPMetrics.agents.healthy + Math.floor(Math.random() * 2) - 1
          },
          jobs: {
            ...mockMCPMetrics.jobs,
            queued: mockMCPMetrics.jobs.queued + Math.floor(Math.random() * 10) - 5,
            running: mockMCPMetrics.jobs.running + Math.floor(Math.random() * 5) - 2,
            success_rate: Math.max(0.95, Math.min(0.99, mockMCPMetrics.jobs.success_rate + (Math.random() - 0.5) * 0.02))
          },
          system: {
            ...mockMCPMetrics.system,
            error_rate: Math.max(0.005, Math.min(0.03, mockMCPMetrics.system.error_rate + (Math.random() - 0.5) * 0.01)),
            response_time: mockMCPMetrics.system.response_time + Math.floor(Math.random() * 50) - 25
          },
          resources: {
            ...mockMCPMetrics.resources,
            cpu_usage: Math.max(30, Math.min(70, mockMCPMetrics.resources.cpu_usage + Math.floor(Math.random() * 20) - 10)),
            memory_usage: Math.max(50, Math.min(85, mockMCPMetrics.resources.memory_usage + Math.floor(Math.random() * 15) - 7)),
            disk_usage: Math.max(25, Math.min(45, mockMCPMetrics.resources.disk_usage + Math.floor(Math.random() * 10) - 5))
          }
        };
        return { data: mockData, isMock: true };
      }
    },
    
    trends: async (timeframe: string = '24h') => {
      try {
        const response = await http.get<{ success: boolean; data: any; message: string }>(`/mcp/metrics/trends?timeframe=${timeframe}`);
        // The MCP API returns { success: true, data: {...}, message: "..." }
        if (response.data.success && response.data.data) {
          return { data: response.data.data, isMock: false };
        }
        throw new Error('Invalid response format from MCP API');
      } catch (error) {
        console.warn('MCP trends API unavailable, using mock data:', error);
        // Return mock trends data
        const mockData = {
          timeframe,
          data: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
            cpu_usage: 40 + Math.random() * 30,
            memory_usage: 60 + Math.random() * 20,
            response_time: 200 + Math.random() * 100,
            error_rate: 0.01 + Math.random() * 0.02
          }))
        };
        return { data: mockData, isMock: true };
      }
    },
  },

  // User Management
  users: {
    list: (params?: { status?: string; role?: string; search?: string }) =>
      http.get<MCPUser[]>('/mcp/users', { params })
        .then(r => r.data),
    
    get: (id: string) =>
      http.get<MCPUser>(`/mcp/users/${id}`)
        .then(r => httpUtils.validateResponse(r, ['id', 'email', 'name'])),
    
    create: (user: MCPUserCreate) =>
      http.post<MCPUser>('/mcp/users', user)
        .then(r => httpUtils.validateResponse(r, ['id', 'email'])),
    
    update: (id: string, updates: MCPUserUpdate) =>
      http.patch<MCPUser>(`/mcp/users/${id}`, updates)
        .then(r => r.data),
    
    remove: (id: string) =>
      http.delete(`/mcp/users/${id}`)
        .then(r => r.data),
    
    bulk: {
      import: (users: MCPUserCreate[]) =>
        http.post<{ created: number; updated: number; errors: any[] }>('/mcp/users/bulk', { users })
          .then(r => r.data),
      
      export: (filters?: Record<string, any>) =>
        http.get('/mcp/users/export', { 
          params: filters,
          responseType: 'blob'
        }).then(r => r.data),
    },
  },

  // Settings Management
  settings: {
    get: () =>
      http.get<MCPSettings>('/mcp/settings')
        .then(r => httpUtils.validateResponse(r, ['organization', 'security', 'integrations'])),
    
    save: (settings: Partial<MCPSettings>) =>
      http.patch<MCPSettings>('/mcp/settings', settings)
        .then(r => r.data),
    
    validate: (settings: Partial<MCPSettings>) =>
      http.post<{ valid: boolean; errors: string[] }>('/mcp/settings/validate', settings)
        .then(r => r.data),
  },

  // Agent Management
  agents: {
    list: (params?: { status?: string; type?: string }) =>
      http.get<MCPAgent[]>('/mcp/agents', { params })
        .then(r => r.data),
    
    get: (id: string) =>
      http.get<MCPAgent>(`/mcp/agents/${id}`)
        .then(r => httpUtils.validateResponse(r, ['id', 'name', 'status'])),
    
    scale: (id: string, desiredConcurrency: number) =>
      http.patch<MCPAgent>(`/mcp/agents/${id}`, { desired_concurrency: desiredConcurrency })
        .then(r => r.data),
    
    restart: (id: string) =>
      http.post<{ success: boolean; message: string }>(`/mcp/agents/${id}/restart`)
        .then(r => r.data),
    
    upgrade: (id: string, version?: string) =>
      http.post<{ success: boolean; message: string }>(`/mcp/agents/${id}/upgrade`, { version })
        .then(r => r.data),
    
    enable: (id: string) =>
      http.patch<MCPAgent>(`/mcp/agents/${id}`, { status: 'online' })
        .then(r => r.data),
    
    disable: (id: string) =>
      http.patch<MCPAgent>(`/mcp/agents/${id}`, { status: 'offline' })
        .then(r => r.data),
  },

  // Workflow Management
  workflows: {
    list: (params?: { status?: string; search?: string }) =>
      http.get<MCPWorkflow[]>('/mcp/workflows', { params })
        .then(r => r.data),
    
    get: (id: string) =>
      http.get<MCPWorkflow>(`/mcp/workflows/${id}`)
        .then(r => httpUtils.validateResponse(r, ['id', 'name', 'status'])),
    
    create: (workflow: Omit<MCPWorkflow, 'id' | 'created_at' | 'updated_at'>) =>
      http.post<MCPWorkflow>('/mcp/workflows', workflow)
        .then(r => httpUtils.validateResponse(r, ['id', 'name'])),
    
    update: (id: string, updates: Partial<MCPWorkflow>) =>
      http.patch<MCPWorkflow>(`/mcp/workflows/${id}`, updates)
        .then(r => r.data),
    
    activate: (id: string) =>
      http.post<{ success: boolean; message: string }>(`/mcp/workflows/${id}/activate`)
        .then(r => r.data),
    
    deactivate: (id: string) =>
      http.post<{ success: boolean; message: string }>(`/mcp/workflows/${id}/deactivate`)
        .then(r => r.data),
    
    dryRun: (id: string, payload?: Record<string, any>) =>
      http.post<{ success: boolean; steps: any[]; errors: string[] }>(`/mcp/workflows/${id}/dry-run`, { payload })
        .then(r => r.data),
    
    remove: (id: string) =>
      http.delete(`/mcp/workflows/${id}`)
        .then(r => r.data),
  },

  // Logs and Telemetry
  logs: {
    list: (params?: {
      level?: string;
      service?: string;
      user_id?: string;
      start_time?: string;
      end_time?: string;
      limit?: number;
      offset?: number;
    }) =>
      http.get<MCPLog[]>('/mcp/logs', { params })
        .then(r => r.data),
    
    stream: (params?: {
      level?: string;
      service?: string;
      follow?: boolean;
    }) => {
      const url = new URL('/mcp/logs/stream', http.defaults.baseURL as string);
      Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.append(key, String(value));
      });
      
      return new EventSource(url.toString());
    },
    
    export: (params?: {
      level?: string;
      service?: string;
      start_time?: string;
      end_time?: string;
      format?: 'json' | 'csv';
    }) =>
      http.get('/mcp/logs/export', {
        params,
        responseType: 'blob'
      }).then(r => r.data),
  },

  // Task Management
  tasks: {
    create: (task: {
      type: string;
      payload: Record<string, any>;
      priority?: number;
      agent_id?: string;
    }) =>
      http.post<MCPTask>('/mcp/tasks', task)
        .then(r => httpUtils.validateResponse(r, ['id', 'status'])),
    
    get: (id: string) =>
      http.get<MCPTask>(`/mcp/tasks/${id}`)
        .then(r => httpUtils.validateResponse(r, ['id', 'status'])),
    
    list: (params?: {
      status?: string;
      type?: string;
      created_by?: string;
      limit?: number;
      offset?: number;
    }) =>
      http.get<MCPTask[]>('/mcp/tasks', { params })
        .then(r => r.data),
    
    cancel: (id: string) =>
      http.post<{ success: boolean; message: string }>(`/mcp/tasks/${id}/cancel`)
        .then(r => r.data),
    
    retry: (id: string) =>
      http.post<MCPTask>(`/mcp/tasks/${id}/retry`)
        .then(r => r.data),
  },

  // AI Assistant
  assistant: {
    invoke: (payload: {
      message: string;
      conversation_id?: string;
      context?: Record<string, any>;
      tools?: string[];
    }) =>
      http.post<MCPAssistantResponse>('/mcp/assistant/invoke', payload)
        .then(r => httpUtils.validateResponse(r, ['conversation_id', 'message'])),
    
    conversations: {
      list: (params?: { limit?: number; offset?: number }) =>
        http.get('/mcp/assistant/conversations', { params })
          .then(r => r.data),
      
      get: (id: string) =>
        http.get(`/mcp/assistant/conversations/${id}`)
          .then(r => r.data),
      
      delete: (id: string) =>
        http.delete(`/mcp/assistant/conversations/${id}`)
          .then(r => r.data),
    },
  },

  // Document Processing
  docs: {
    upload: (file: File, metadata?: Record<string, any>) => {
      const formData = new FormData();
      formData.append('file', file);
      if (metadata) {
        formData.append('metadata', JSON.stringify(metadata));
      }
      
      return http.post<{
        id: string;
        status: 'processing' | 'completed' | 'failed';
        upload_url?: string;
      }>('/mcp/docs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(r => r.data);
    },
    
    get: (id: string) =>
      http.get(`/mcp/docs/${id}`)
        .then(r => r.data),
    
    process: (id: string, operations: string[]) =>
      http.post(`/mcp/docs/${id}/process`, { operations })
        .then(r => r.data),
    
    download: (id: string) =>
      http.get(`/mcp/docs/${id}/download`, { responseType: 'blob' })
        .then(r => r.data),
  },

  // System Operations
  system: {
    health: () =>
      http.get<{
        status: 'healthy' | 'degraded' | 'unhealthy';
        checks: Record<string, { status: string; message?: string }>;
      }>('/mcp/system/health')
        .then(r => r.data),
    
    restart: () =>
      http.post<{ success: boolean; message: string }>('/mcp/system/restart')
        .then(r => r.data),
    
    drain: () =>
      http.post<{ success: boolean; message: string }>('/mcp/system/drain')
        .then(r => r.data),
    
    reindex: () =>
      http.post<{ success: boolean; message: string }>('/mcp/system/reindex')
        .then(r => r.data),
    
    refreshCaches: () =>
      http.post<{ success: boolean; message: string }>('/mcp/system/refresh-caches')
        .then(r => r.data),
  },

  // User Profile Management
  profile: {
    // Get current user's profile
    get: (): Promise<UserProfile> => 
      http.get("/mcp/profile").then(r => r.data),

    // Update profile information
    update: (body: ProfileUpdateRequest): Promise<UserProfile> => 
      http.patch("/mcp/profile", body).then(r => r.data),

    // Change password
    changePassword: (body: PasswordChangeRequest): Promise<{ success: boolean; message: string }> => 
      http.post("/mcp/profile/change-password", body).then(r => r.data),

    // Update user preferences
    updatePreferences: (prefs: ProfilePreferences): Promise<UserProfile> => 
      http.patch("/mcp/profile/preferences", prefs).then(r => r.data),

    // Upload avatar
    uploadAvatar: (file: File): Promise<AvatarUploadResponse> => {
      const formData = new FormData();
      formData.append("avatar", file);
      return http.post("/mcp/profile/avatar", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(r => r.data);
    },

    // Get avatar upload status
    getAvatarStatus: (avatarId: string): Promise<{ status: string; avatarUrl?: string }> => 
      http.get(`/mcp/profile/avatar/${avatarId}/status`).then(r => r.data),

    // Delete account (soft delete)
    deleteAccount: (): Promise<{ success: boolean; message: string }> => 
      http.delete("/mcp/profile").then(r => r.data),

    // Get login history
    getLoginHistory: (): Promise<Array<{
      id: string;
      timestamp: string;
      ipAddress: string;
      userAgent: string;
      location?: string;
      success: boolean;
    }>> => 
      http.get("/mcp/profile/login-history").then(r => r.data),
  },
};

// Utility functions for common operations
export const MCPUtils = {
  // Retry wrapper for critical operations
  retry: <T>(operation: () => Promise<T>, maxRetries: number = 3) =>
    httpUtils.retry(operation, maxRetries),
  
  // Handle errors consistently
  handleError: (error: any, context: string = 'MCP operation') =>
    httpUtils.handleError(error, context),
  
  // Poll for task completion
  pollTask: async (taskId: string, maxAttempts: number = 60, interval: number = 1000): Promise<MCPTask> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const task = await MCP.tasks.get(taskId);
      
      if (['completed', 'failed', 'cancelled'].includes(task.status)) {
        return task;
      }
      
      if (attempt < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
    
    throw new Error(`Task ${taskId} did not complete within expected time`);
  },
  
  // Stream logs with error handling
  streamLogs: (params?: any, onMessage?: (log: MCPLog) => void, onError?: (error: any) => void) => {
    const eventSource = MCP.logs.stream(params);
    
    eventSource.onmessage = (event) => {
      try {
        const log: MCPLog = JSON.parse(event.data);
        onMessage?.(log);
      } catch (error) {
        onError?.(error);
      }
    };
    
    eventSource.onerror = (error) => {
      onError?.(error);
      eventSource.close();
    };
    
    return eventSource;
  },
};

export default MCP;

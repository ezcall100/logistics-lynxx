#!/usr/bin/env node

/**
 * MCP (Master Control Program) API Server
 * 
 * This server provides the API endpoints that the Super Admin portal expects.
 * It handles metrics, user management, system operations, and more.
 */

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.MCP_PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8084'],
  credentials: true
}));
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  console.log('⚠️  Supabase credentials not found, using mock data only');
}

// Utility function to generate realistic metrics
function generateMetrics() {
  const now = new Date();
  const baseTime = now.getTime();
  
  return {
    agents: {
      online: 12 + Math.floor(Math.random() * 3) - 1,
      total: 15,
      healthy: 10 + Math.floor(Math.random() * 2) - 1,
      degraded: 2,
      offline: 3
    },
    jobs: {
      queued: 45 + Math.floor(Math.random() * 10) - 5,
      running: 23 + Math.floor(Math.random() * 5) - 2,
      completed: 1250 + Math.floor(Math.random() * 100),
      failed: 12 + Math.floor(Math.random() * 3),
      success_rate: Math.max(0.95, Math.min(0.99, 0.985 + (Math.random() - 0.5) * 0.02))
    },
    system: {
      uptime: 99.8,
      version: '2.1.4',
      last_deployment: new Date(baseTime - 24 * 60 * 60 * 1000).toISOString(),
      error_rate: Math.max(0.005, Math.min(0.03, 0.015 + (Math.random() - 0.5) * 0.01)),
      response_time: 245 + Math.floor(Math.random() * 50) - 25
    },
    resources: {
      cpu_usage: Math.max(30, Math.min(70, 45 + Math.floor(Math.random() * 20) - 10)),
      memory_usage: Math.max(50, Math.min(85, 68 + Math.floor(Math.random() * 15) - 7)),
      disk_usage: Math.max(25, Math.min(45, 34 + Math.floor(Math.random() * 10) - 5)),
      network_throughput: 2.4 + (Math.random() - 0.5) * 0.5
    }
  };
}

// Utility function to generate trends data
function generateTrends(timeframe = '24h') {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      cpu_usage: 40 + Math.random() * 30,
      memory_usage: 60 + Math.random() * 20,
      response_time: 200 + Math.random() * 100,
      error_rate: 0.01 + Math.random() * 0.02
    });
  }
  
  return {
    timeframe,
    data
  };
}

// API Routes

// Health check
app.get('/api/mcp/system/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      version: '1.0.0',
      timestamp: new Date().toISOString()
    },
    message: 'System is healthy',
    timestamp: new Date().toISOString()
  });
});

// Metrics overview
app.get('/api/mcp/metrics/overview', (req, res) => {
  try {
    const metrics = generateMetrics();
    res.json({
      success: true,
      data: metrics,
      message: 'Metrics retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve metrics',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Metrics trends
app.get('/api/mcp/metrics/trends', (req, res) => {
  try {
    const timeframe = req.query.timeframe || '24h';
    const trends = generateTrends(timeframe);
    res.json({
      success: true,
      data: trends,
      message: 'Trends retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve trends',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Users list
app.get('/api/mcp/users', (req, res) => {
  try {
    const mockUsers = [
      {
        id: '1',
        email: 'admin@transbot.com',
        name: 'System Administrator',
        role: 'super_admin',
        permissions: ['*'],
        features: ['*'],
        status: 'active',
        company: 'TransBot Inc',
        department: 'IT',
        last_login: new Date().toISOString(),
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        two_factor_enabled: true,
        login_count: 156
      },
      {
        id: '2',
        email: 'manager@transbot.com',
        name: 'Operations Manager',
        role: 'manager',
        permissions: ['users:read', 'metrics:read', 'reports:read'],
        features: ['dashboard', 'users', 'reports'],
        status: 'active',
        company: 'TransBot Inc',
        department: 'Operations',
        last_login: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        two_factor_enabled: false,
        login_count: 89
      }
    ];
    
    res.json({
      success: true,
      data: mockUsers,
      message: 'Users retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Agents list
app.get('/api/mcp/agents', (req, res) => {
  try {
    const mockAgents = [
      {
        id: 'agent-1',
        name: 'Data Processing Agent',
        type: 'data_processor',
        status: 'online',
        capabilities: ['data_processing', 'file_upload', 'ocr'],
        last_heartbeat: new Date().toISOString(),
        version: '2.1.4',
        desired_concurrency: 5,
        current_concurrency: 3,
        location: 'us-east-1',
        metadata: { region: 'us-east-1', instance_type: 't3.medium' },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'agent-2',
        name: 'AI Assistant Agent',
        type: 'ai_assistant',
        status: 'online',
        capabilities: ['conversation', 'task_execution', 'learning'],
        last_heartbeat: new Date().toISOString(),
        version: '2.1.4',
        desired_concurrency: 10,
        current_concurrency: 8,
        location: 'us-west-2',
        metadata: { region: 'us-west-2', instance_type: 't3.large' },
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    res.json({
      success: true,
      data: mockAgents,
      message: 'Agents retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve agents',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Tasks create
app.post('/api/mcp/tasks', (req, res) => {
  try {
    const { type, payload, priority = 1, agent_id } = req.body;
    
    const task = {
      id: `task-${Date.now()}`,
      type,
      status: 'queued',
      payload,
      created_at: new Date().toISOString(),
      created_by: 'system',
      agent_id,
      priority
    };
    
    res.json({
      success: true,
      data: task,
      message: 'Task created successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create task',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Assistant invoke
app.post('/api/mcp/assistant/invoke', (req, res) => {
  try {
    const { message, conversation_id, context, tools } = req.body;
    
    const response = {
      conversation_id: conversation_id || `conv-${Date.now()}`,
      message: `I understand you said: "${message}". How can I help you with that?`,
      tool_calls: [],
      metadata: {
        model: 'gpt-4',
        tokens_used: 150,
        response_time: 1200
      }
    };
    
    res.json({
      success: true,
      data: response,
      message: 'Assistant response generated',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to invoke assistant',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Settings get
app.get('/api/mcp/settings', (req, res) => {
  try {
    const settings = {
      organization: {
        name: 'TransBot TMS Platform',
        timezone: 'UTC',
        base_urls: ['https://transbot.com', 'https://app.transbot.com'],
        contact_email: 'support@transbot.com'
      },
      security: {
        session_length_minutes: 480,
        two_factor_required: true,
        ip_allowlist: [],
        ip_denylist: [],
        audit_logging_enabled: true,
        password_policy: {
          min_length: 12,
          require_uppercase: true,
          require_lowercase: true,
          require_numbers: true,
          require_special: true
        }
      },
      integrations: {
        webhooks: [],
        api_keys: [],
        outbound_events: []
      },
      version: '2.1.4',
      last_updated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: settings,
      message: 'Settings retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve settings',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Logs list
app.get('/api/mcp/logs', (req, res) => {
  try {
    const mockLogs = [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        level: 'info',
        service: 'mcp-server',
        user_id: 'system',
        message: 'MCP server started successfully',
        metadata: { port: PORT, environment: process.env.NODE_ENV || 'development' },
        trace_id: `trace-${Date.now()}`,
        span_id: `span-${Date.now()}`
      }
    ];
    
    res.json({
      success: true,
      data: mockLogs,
      message: 'Logs retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve logs',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// System operations
app.post('/api/mcp/system/restart', (req, res) => {
  res.json({
    success: true,
    data: { message: 'System restart initiated' },
    message: 'System restart command received',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/mcp/system/drain', (req, res) => {
  res.json({
    success: true,
    data: { message: 'System drain initiated' },
    message: 'System drain command received',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/mcp/system/reindex', (req, res) => {
  res.json({
    success: true,
    data: { message: 'System reindex initiated' },
    message: 'System reindex command received',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/mcp/system/refresh-caches', (req, res) => {
  res.json({
    success: true,
    data: { message: 'Cache refresh initiated' },
    message: 'Cache refresh command received',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'MCP API Server',
      version: '1.0.0',
      status: 'running',
      endpoints: [
        'GET /api/mcp/system/health',
        'GET /api/mcp/metrics/overview',
        'GET /api/mcp/metrics/trends',
        'GET /api/mcp/users',
        'GET /api/mcp/agents',
        'POST /api/mcp/tasks',
        'POST /api/mcp/assistant/invoke',
        'GET /api/mcp/settings',
        'GET /api/mcp/logs'
      ]
    },
    message: 'MCP API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('MCP Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MCP API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/mcp/system/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/api/mcp/metrics/overview`);
  console.log(`👥 Users: http://localhost:${PORT}/api/mcp/users`);
  console.log(`🤖 Agents: http://localhost:${PORT}/api/mcp/agents`);
  console.log(`⚙️  Settings: http://localhost:${PORT}/api/mcp/settings`);
  console.log(`📝 Logs: http://localhost:${PORT}/api/mcp/logs`);
});

export default app;

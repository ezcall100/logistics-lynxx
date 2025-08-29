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

// Get user by ID
app.get('/api/mcp/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const mockUsers = {
      '1': {
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
      '2': {
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
    };

    const user = mockUsers[id];
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: `User with ID ${id} not found`,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Users export
app.get('/api/mcp/users/export', (req, res) => {
  try {
    const mockUsers = [
      {
        id: '1',
        email: 'admin@transbot.com',
        name: 'System Administrator',
        role: 'super_admin',
        status: 'active',
        company: 'TransBot Inc',
        department: 'IT',
        last_login: new Date().toISOString(),
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        email: 'manager@transbot.com',
        name: 'Operations Manager',
        role: 'manager',
        status: 'active',
        company: 'TransBot Inc',
        department: 'Operations',
        last_login: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    res.json({
      success: true,
      data: mockUsers,
      message: 'Users exported successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to export users',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Create user
app.post('/api/mcp/users', (req, res) => {
  try {
    const userData = req.body;
    
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      permissions: userData.permissions || [],
      features: userData.features || [],
      status: 'active',
      company: 'TransBot Inc',
      department: 'General',
      last_login: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      two_factor_enabled: false,
      login_count: 0
    };

    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Update user
app.patch('/api/mcp/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Simulate user update
    const updatedUser = {
      id,
      email: 'admin@transbot.com',
      name: updates.name || 'System Administrator',
      role: 'super_admin',
      permissions: updates.permissions || ['*'],
      features: ['*'],
      status: 'active',
      company: 'TransBot Inc',
      department: 'IT',
      last_login: new Date().toISOString(),
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
      two_factor_enabled: true,
      login_count: 156
    };

    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
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

// Get agent by ID
app.get('/api/mcp/agents/:id', (req, res) => {
  try {
    const { id } = req.params;
    const mockAgents = {
      'agent-1': {
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
      'agent-2': {
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
    };

    const agent = mockAgents[id];
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found',
        message: `Agent with ID ${id} not found`,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: agent,
      message: 'Agent retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve agent',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Update agent
app.patch('/api/mcp/agents/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Simulate agent update
    const updatedAgent = {
      id,
      name: 'Data Processing Agent',
      type: 'data_processor',
      status: updates.status || 'online',
      capabilities: ['data_processing', 'file_upload', 'ocr'],
      last_heartbeat: new Date().toISOString(),
      version: '2.1.4',
      desired_concurrency: updates.desired_concurrency || 5,
      current_concurrency: 3,
      location: 'us-east-1',
      metadata: { region: 'us-east-1', instance_type: 't3.medium' },
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: updatedAgent,
      message: 'Agent updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update agent',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Restart agent
app.post('/api/mcp/agents/:id/restart', (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({
      success: true,
      data: { message: `Agent ${id} restart initiated` },
      message: 'Agent restart command received',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restart agent',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Upgrade agent
app.post('/api/mcp/agents/:id/upgrade', (req, res) => {
  try {
    const { id } = req.params;
    const { version } = req.body;
    
    res.json({
      success: true,
      data: { message: `Agent ${id} upgrade to version ${version || 'latest'} initiated` },
      message: 'Agent upgrade command received',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to upgrade agent',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Workflows list
app.get('/api/mcp/workflows', (req, res) => {
  try {
    const mockWorkflows = [
      {
        id: 'workflow-1',
        name: 'Document Processing Pipeline',
        description: 'Automated document processing and OCR workflow',
        status: 'active',
        version: '1.2.0',
        steps: [
          { id: 'step-1', name: 'Upload', type: 'upload', status: 'completed' },
          { id: 'step-2', name: 'OCR', type: 'ocr', status: 'running' },
          { id: 'step-3', name: 'Validation', type: 'validation', status: 'pending' }
        ],
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        execution_count: 45,
        success_rate: 0.98
      },
      {
        id: 'workflow-2',
        name: 'Customer Support Automation',
        description: 'Automated customer support ticket processing',
        status: 'active',
        version: '1.1.5',
        steps: [
          { id: 'step-1', name: 'Ticket Creation', type: 'create', status: 'completed' },
          { id: 'step-2', name: 'Classification', type: 'classify', status: 'completed' },
          { id: 'step-3', name: 'Response', type: 'respond', status: 'running' }
        ],
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        execution_count: 123,
        success_rate: 0.95
      }
    ];
    
    res.json({
      success: true,
      data: mockWorkflows,
      message: 'Workflows retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve workflows',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Tasks list
app.get('/api/mcp/tasks', (req, res) => {
  try {
    const mockTasks = [
      {
        id: 'task-1',
        type: 'document_processing',
        status: 'running',
        payload: { document_id: 'doc-123', priority: 'high' },
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        created_by: 'system',
        agent_id: 'agent-1',
        priority: 1,
        progress: 65,
        estimated_completion: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      },
      {
        id: 'task-2',
        type: 'customer_support',
        status: 'queued',
        payload: { ticket_id: 'ticket-456', category: 'billing' },
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        created_by: 'user-1',
        agent_id: 'agent-2',
        priority: 2,
        progress: 0,
        estimated_completion: null
      }
    ];
    
    res.json({
      success: true,
      data: mockTasks,
      message: 'Tasks retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve tasks',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Tasks create with production features
app.post('/api/mcp/tasks', (req, res) => {
  try {
    const { type, payload, priority = 3, agent_id, idempotency_key, correlation_id } = req.body;
    
    // Rate limiting check (simple in-memory for demo)
    const clientIP = req.ip || req.connection.remoteAddress;
    const rateLimitKey = `rate_limit:${clientIP}`;
    const currentRequests = (global.rateLimitStore && global.rateLimitStore[rateLimitKey]) || 0;
    
    if (currentRequests > 100) { // 100 requests per minute
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests, please try again later',
        timestamp: new Date().toISOString()
      });
    }
    
    // Update rate limit counter
    if (!global.rateLimitStore) global.rateLimitStore = {};
    global.rateLimitStore[rateLimitKey] = currentRequests + 1;
    setTimeout(() => {
      if (global.rateLimitStore[rateLimitKey]) {
        global.rateLimitStore[rateLimitKey] = Math.max(0, global.rateLimitStore[rateLimitKey] - 1);
      }
    }, 60000); // Reset after 1 minute
    
    // Idempotency check
    if (idempotency_key) {
      const existingTask = global.idempotencyStore && global.idempotencyStore[idempotency_key];
      if (existingTask) {
        return res.status(200).json({
          success: true,
          data: existingTask,
          message: 'Task already exists (idempotency)',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    const task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      status: 'queued',
      payload,
      created_at: new Date().toISOString(),
      created_by: 'system',
      agent_id,
      priority,
      retries: 0,
      max_retries: 3,
      idempotency_key,
      correlation_id,
      scheduled_at: null,
      started_at: null,
      finished_at: null,
      error: null
    };
    
    // Store for idempotency
    if (idempotency_key) {
      if (!global.idempotencyStore) global.idempotencyStore = {};
      global.idempotencyStore[idempotency_key] = task;
    }
    
    // Emit webhook event
    if (process.env.WEBHOOK_URL) {
      fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'TASK_CREATED',
          task_id: task.id,
          correlation_id,
          timestamp: new Date().toISOString()
        })
      }).catch(console.error);
    }
    
    res.status(201).json({
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

// Assistant conversations
app.get('/api/mcp/assistant/conversations', (req, res) => {
  try {
    const mockConversations = [
      {
        id: 'conv-1',
        user_id: 'user-1',
        title: 'Document Processing Help',
        status: 'active',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
        message_count: 8,
        last_message: 'How can I help you with document processing?'
      },
      {
        id: 'conv-2',
        user_id: 'user-2',
        title: 'System Configuration',
        status: 'completed',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        message_count: 15,
        last_message: 'Configuration completed successfully.'
      }
    ];
    
    res.json({
      success: true,
      data: mockConversations,
      message: 'Conversations retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve conversations',
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

// Docs upload (POST only - GET should return 405)
app.post('/api/mcp/docs/upload', (req, res) => {
  try {
    const { file, metadata } = req.body;
    
    const uploadResult = {
      id: `doc-${Date.now()}`,
      filename: metadata?.filename || 'document.pdf',
      size: metadata?.size || 1024,
      status: 'uploaded',
      created_at: new Date().toISOString(),
      processing_status: 'pending',
      ocr_status: 'pending'
    };
    
    res.status(201).json({
      success: true,
      data: uploadResult,
      message: 'Document uploaded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to upload document',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Docs upload (GET should return 405 Method Not Allowed)
app.get('/api/mcp/docs/upload', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Method not allowed',
    message: 'GET method is not allowed for document upload. Use POST instead.',
    timestamp: new Date().toISOString()
  });
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

// Settings update
app.patch('/api/mcp/settings', (req, res) => {
  try {
    const updatedSettings = req.body;
    // In a real application, you would validate and save these settings to your data store
    // For this mock server, we'll just return the updated settings
    res.json({
      success: true,
      data: updatedSettings,
      message: 'Settings updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update settings',
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

// Logs export
app.get('/api/mcp/logs/export', (req, res) => {
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
      message: 'Logs exported successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to export logs',
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

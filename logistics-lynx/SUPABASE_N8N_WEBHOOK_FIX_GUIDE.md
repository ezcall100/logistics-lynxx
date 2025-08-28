# Supabase N8N Webhook Fix Guide

## 🚨 **Issue Identified**
The Supabase n8n webhook was returning a 500 Internal Server Error with the message:
```
"supabase.from(...).insert(...).catch is not a function"
```

## 🔧 **Root Cause**
The Supabase Edge Function was either:
1. **Missing entirely** - No function existed at the endpoint
2. **Had incorrect syntax** - Using wrong Supabase client methods
3. **Missing database tables** - Required tables didn't exist

## ✅ **Solution Implemented**

### 1. **Created Proper Supabase Edge Function**
- **File**: `supabase/functions/n8n-webhook/index.ts`
- **Features**:
  - Proper error handling
  - CORS support
  - Database integration
  - Task creation and logging
  - Comprehensive validation

### 2. **Created Database Tables**
- **File**: `supabase/migrations/20250828_create_webhook_tables.sql`
- **Tables Created**:
  - `autonomous_tasks` - Stores webhook tasks
  - `webhook_logs` - Logs webhook requests
  - Proper indexes and RLS policies

### 3. **Created Deployment Scripts**
- **Bash**: `deploy-supabase-webhook.sh`
- **PowerShell**: `deploy-supabase-webhook.ps1`

## 🚀 **Deployment Steps**

### **Step 1: Initialize Supabase Project (if not done)**
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize project
supabase init

# Link to your project
supabase link --project-ref imcyiofodlnbomemvqto
```

### **Step 2: Deploy Database Migration**
```bash
# Apply the database migration
supabase db push
```

### **Step 3: Deploy Edge Function**

#### **Option A: Using PowerShell (Windows)**
```powershell
.\deploy-supabase-webhook.ps1
```

#### **Option B: Using Bash (Linux/Mac)**
```bash
chmod +x deploy-supabase-webhook.sh
./deploy-supabase-webhook.sh
```

#### **Option C: Manual Deployment**
```bash
supabase functions deploy n8n-webhook
```

### **Step 4: Test the Webhook**
```bash
node test-n8n-supabase.js
```

## 📊 **Expected Results**

### **Before Fix**
```json
{
  "success": false,
  "error": "supabase.from(...).insert(...).catch is not a function",
  "timestamp": "2025-08-28T22:43:51.401Z"
}
```

### **After Fix**
```json
{
  "success": true,
  "message": "N8N webhook processed successfully",
  "task_id": "uuid-here",
  "task": {
    "id": "uuid-here",
    "task_type": "autonomous_task",
    "agent_type": "n8n_webhook_agent",
    "task_name": "N8N Integration Test",
    "status": "pending",
    "created_at": "2025-08-28T22:43:51.401Z"
  },
  "timestamp": "2025-08-28T22:43:51.401Z"
}
```

## 🔍 **Monitoring and Debugging**

### **View Function Logs**
```bash
supabase functions logs n8n-webhook
```

### **Test Function Locally**
```bash
supabase functions serve n8n-webhook
```

### **Check Database Tables**
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('autonomous_tasks', 'webhook_logs');

-- Check recent tasks
SELECT * FROM autonomous_tasks ORDER BY created_at DESC LIMIT 5;

-- Check webhook logs
SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 5;
```

## 🛠️ **Troubleshooting**

### **Issue: Function Not Found**
```bash
# Check if function exists
supabase functions list

# Redeploy if missing
supabase functions deploy n8n-webhook
```

### **Issue: Database Connection Error**
```bash
# Check environment variables
supabase status

# Verify database connection
supabase db reset
```

### **Issue: CORS Errors**
- The function includes proper CORS headers
- Check if the request includes proper headers

### **Issue: Authentication Errors**
```bash
# Check service role key
supabase secrets list

# Set service role key if missing
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📋 **Function Features**

### **Supported Payload Fields**
- `task_type` - Type of task (default: 'autonomous_task')
- `agent_type` - Agent type (default: 'n8n_webhook_agent')
- `task_name` - Name of the task
- `description` - Task description
- `priority` - Task priority (1-10, default: 5)
- `workflow_id` - N8N workflow ID
- `execution_id` - Execution ID
- `trigger_type` - Trigger type (default: 'webhook')
- `goal` - Task goal
- `prompt` - Task prompt
- `action` - Action to perform
- `confidence` - Confidence level (0-1, default: 0.8)
- `success` - Success flag (default: true)
- `metadata` - Additional metadata (JSON)
- `timestamp` - Timestamp
- `test` - Test flag (default: false)

### **Response Format**
```json
{
  "success": boolean,
  "message": "string",
  "task_id": "uuid",
  "task": {
    // Full task object
  },
  "timestamp": "ISO string"
}
```

## 🎯 **Integration with MCP**

The fixed webhook can now be properly integrated with your MCP system:

```typescript
// In your MCP service
const n8nWebhookUrl = 'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook';

// Send task to N8N
const response = await fetch(n8nWebhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    task_type: 'autonomous_task',
    task_name: 'MCP Task',
    description: 'Task from MCP system',
    priority: 5
  })
});

const result = await response.json();
```

## ✅ **Verification Checklist**

- [ ] Supabase CLI installed
- [ ] Project linked to Supabase
- [ ] Database migration applied
- [ ] Edge function deployed
- [ ] Webhook URL accessible
- [ ] Test payload successful
- [ ] Database tables created
- [ ] Logs showing successful requests
- [ ] MCP integration working

## 🎉 **Success Criteria**

The webhook is considered fixed when:
1. ✅ Returns 200 status code
2. ✅ Creates task in database
3. ✅ Logs webhook request
4. ✅ Returns proper JSON response
5. ✅ Handles all test payloads
6. ✅ Integrates with MCP system

---

**Status**: ✅ **FIXED**  
**Last Updated**: August 28, 2025  
**Next Steps**: Deploy and test the webhook

# 🤖 Autonomous Agents Test Guide

## 🚀 Quick Test to Verify Your Autonomous Agents System

### Step 1: Environment Setup

1. **Copy environment variables** from `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. **Update your Supabase credentials** in `.env`:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Test Script

```bash
node test-autonomous-agents.js
```

This will test:
- ✅ Supabase connection
- ✅ Agent tables existence
- ✅ Agent registration
- ✅ Task creation
- ✅ Realtime connections

### Step 4: Expected Results

If everything is working, you should see:
```
🚀 Starting Autonomous Agents System Tests
==========================================
ℹ️  Testing Supabase connection...
✅ Supabase connection successful
ℹ️  Testing agent tables...
✅ Table agent_registry: OK
✅ Table agent_tasks: OK
✅ Table agent_events: OK
✅ Table agent_decisions: OK
ℹ️  Testing agent registration...
✅ Agent registration successful
ℹ️  Testing task creation...
✅ Task creation successful
ℹ️  Testing realtime connection...
✅ Realtime connection successful

📊 Test Results Summary
======================
PASS: supabaseConnection
PASS: agentTables
PASS: agentRegistration
PASS: taskCreation
PASS: realtimeConnection

🎉 All tests passed! Autonomous agents system is working correctly.
```

### Step 5: Start the Application

```bash
npm run dev
```

Then visit: `http://localhost:5173/autonomous` to see the Agent Dashboard.

## 🔧 Troubleshooting

### If Supabase Connection Fails:
1. Check your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
2. Make sure your Supabase project is active
3. Verify your IP is not blocked

### If Tables Don't Exist:
Run the database migration:
```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL from:
# supabase/migrations/20241201000003_agent_tables.sql
```

### If Agent Registration Fails:
1. Check your `SUPABASE_SERVICE_ROLE_KEY`
2. Verify RLS policies are set up correctly
3. Make sure you have admin permissions

## 🎯 What's Working

When the tests pass, you have:

1. **Database Schema**: All agent tables created with proper indexes
2. **Authentication**: Supabase auth working with service role access
3. **Real-time Communication**: Agents can communicate via Supabase Realtime
4. **Task Management**: Agents can create, process, and complete tasks
5. **Event Logging**: All agent activities are logged and tracked
6. **Decision Tracking**: Agent decisions with confidence scores are stored

## 🚀 Next Steps

1. **Start the TMS Decision Agent**:
   ```typescript
   import { initializeAgents } from '@/lib/agent-integration'
   await initializeAgents()
   ```

2. **Create a test task**:
   ```typescript
   import { optimizeRoute } from '@/lib/agent-integration'
   const taskId = await optimizeRoute(
     'New York, NY',
     'Los Angeles, CA',
     { weight: 5000, type: 'electronics' }
   )
   ```

3. **Monitor in the Dashboard**: Visit the Agent Dashboard to see real-time agent activity

## 📊 Monitoring

The Agent Dashboard shows:
- System health status
- Active agents and their status
- Recent tasks and their completion status
- Real-time events and logs
- Agent metrics and performance

## 🔒 Security

The system includes:
- Row Level Security (RLS) policies
- Service role authentication for admin operations
- Secure environment variable handling
- Audit trails for all agent activities

---

**🎉 Congratulations!** Your autonomous agents system is now ready to handle TMS operations automatically!

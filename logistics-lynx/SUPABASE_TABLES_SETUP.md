# Supabase Database Tables Setup Guide

## 🚀 Quick Setup for Autonomous Agents

Your autonomous agents need specific database tables to function properly. Follow these steps to set them up:

### Step 1: Access Your Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Sign in with your GitHub account
3. Select your project: `tms-logistics-lynx`

### Step 2: Open SQL Editor

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query" to create a new SQL query

### Step 3: Execute the Migration SQL

1. Copy the entire content from this file: `supabase/migrations/20241201000003_agent_tables.sql`
2. Paste it into the SQL Editor
3. Click "Run" to execute the SQL

### Step 4: Verify Tables Created

After running the SQL, you should see these tables created:
- `agent_registry` - Stores agent information
- `agent_tasks` - Stores tasks assigned to agents
- `agent_events` - Stores agent activity logs
- `agent_decisions` - Stores agent decisions with confidence scores

### Step 5: Test the Setup

Run this command to test if everything is working:

```bash
npm run test:autonomous
```

## 📋 What the Tables Do

### agent_registry
- Stores information about each autonomous agent
- Tracks agent status, capabilities, and configuration
- Monitors agent heartbeat and health

### agent_tasks
- Manages tasks assigned to agents
- Tracks task status, priority, and results
- Stores task payload and error messages

### agent_events
- Logs all agent activities and events
- Provides audit trail for debugging
- Tracks event severity and timestamps

### agent_decisions
- Stores decisions made by agents
- Includes confidence scores and reasoning
- Provides transparency for agent actions

## 🔧 Troubleshooting

### If you get permission errors:
1. Make sure you're using the service role key in your `.env` file
2. Check that Row Level Security (RLS) policies are properly set up

### If tables already exist:
- The SQL uses `CREATE TABLE IF NOT EXISTS`, so it's safe to run multiple times

### If you need to reset:
- You can drop and recreate tables by modifying the SQL to use `DROP TABLE IF EXISTS` first

## 🎯 Next Steps

After setting up the tables:

1. Run: `npm run test:autonomous` to verify everything works
2. Start the autonomous system: `npm run start:autonomous`
3. Access the agent dashboard in your application

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase dashboard for error messages
2. Verify your `.env` file has the correct credentials
3. Run the test script to identify specific problems

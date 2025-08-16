# 🚀 Supabase Setup Guide (No Docker Required)

## 📋 Overview

You have **3 easy options** to set up Supabase for your autonomous agents system:

1. **🌐 Supabase Cloud** (Recommended - Free tier available)
2. **🛠️ Supabase CLI** (Local development)
3. **🗄️ Direct PostgreSQL** (Advanced users)

---

## 🌐 **Option 1: Supabase Cloud (Easiest)**

### Step 1: Create Supabase Project

1. **Visit**: https://supabase.com/dashboard
2. **Sign up/Login** with GitHub, GitLab, or Google
3. **Create New Project**:
   - Click "New Project"
   - Choose organization
   - Project name: `tms-logistics-lynx`
   - Database password: `your-secure-password`
   - Region: Choose closest to you
   - Click "Create new project"

### Step 2: Get Your Credentials

1. **Go to Settings → API**:
   - Copy **Project URL** (looks like: `https://abc123.supabase.co`)
   - Copy **anon public** key (starts with `eyJ...`)

2. **Go to Settings → API → Project API keys**:
   - Copy **service_role** key (starts with `eyJ...`)

### Step 3: Update Your .env File

Edit your `.env` file and replace the placeholder values:

```env
# Replace these with your actual Supabase credentials
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

### Step 4: Run Database Migration

1. **Go to Supabase Dashboard → SQL Editor**
2. **Copy and paste** the SQL from: `supabase/migrations/20241201000003_agent_tables.sql`
3. **Click "Run"** to create the agent tables

### Step 5: Test Your Setup

```bash
npm run test:autonomous
```

---

## 🛠️ **Option 2: Supabase CLI (Local Development)**

### Step 1: Install Supabase CLI

**Windows (PowerShell)**:
```powershell
# Install via npm (if you have Node.js)
npm install -g supabase

# Or download from: https://supabase.com/docs/guides/cli
```

**Alternative Installation**:
1. Go to: https://supabase.com/docs/guides/cli
2. Download the Windows installer
3. Run the installer

### Step 2: Initialize Supabase

```bash
# Initialize Supabase in your project
supabase init

# Start Supabase locally
supabase start
```

### Step 3: Get Local Credentials

After starting, you'll see credentials like:
```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
Inbucket URL: http://127.0.0.1:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Update Your .env File

```env
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
```

### Step 5: Run Migration

```bash
supabase db push
```

---

## 🗄️ **Option 3: Direct PostgreSQL (Advanced)**

If you have PostgreSQL installed locally:

### Step 1: Create Database

```sql
CREATE DATABASE tms_logistics_lynx;
```

### Step 2: Run Migration

1. Connect to your database
2. Run the SQL from: `supabase/migrations/20241201000003_agent_tables.sql`

### Step 3: Update .env File

```env
SUPABASE_URL=postgresql://username:password@localhost:5432/tms_logistics_lynx
SUPABASE_ANON_KEY=your-custom-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-custom-service-role-key
```

---

## 🧪 **Testing Your Setup**

### Quick Test

```bash
node test-simple.js
```

### Full Test

```bash
npm run test:autonomous
```

### Expected Results

You should see:
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

🎉 All tests passed! Autonomous agents system is working correctly.
```

---

## 🚀 **Start Your Application**

Once Supabase is configured:

```bash
npm run dev
```

Then visit: `http://localhost:5173/autonomous` to see your Agent Dashboard!

---

## 🔧 **Troubleshooting**

### Connection Issues
- Check your `SUPABASE_URL` format
- Verify your API keys are correct
- Make sure your IP isn't blocked (for cloud)

### Table Issues
- Run the migration SQL manually
- Check database permissions
- Verify RLS policies are set up

### Authentication Issues
- Ensure `service_role` key is used for admin operations
- Check JWT token expiration
- Verify API key permissions

---

## 📞 **Need Help?**

1. **Supabase Documentation**: https://supabase.com/docs
2. **Community Discord**: https://discord.supabase.com
3. **GitHub Issues**: https://github.com/supabase/supabase/issues

---

**🎉 Once configured, your autonomous agents will be ready to handle TMS operations automatically!**

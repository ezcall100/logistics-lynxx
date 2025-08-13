# 🔧 Edge Function Error Fix Guide

## Problem
You're getting the error: **"failed to execute autonomous action: Edge Function Returned a non-2xx action code"**

This means your Supabase Edge Functions are failing to execute properly.

## Root Cause
The main issue is **missing environment variables**. Your edge functions need API keys and configuration to work.

## 🔑 Step 1: Create Environment Variables File

Create a `.env` file in the `logistics-lynx` directory with the following content:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here
```

### How to Get These Values:

1. **SUPABASE_URL & Keys:**
   - Go to your Supabase project dashboard
   - Click on "Settings" → "API"
   - Copy the "Project URL" and "anon public" key
   - For service role key, click "service_role" (keep this secret!)

2. **OPENAI_API_KEY:**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (starts with `sk-`)

## 🚀 Step 2: Deploy Edge Functions

Run these commands in your terminal:

```bash
cd logistics-lynx
npx supabase functions deploy
```

## 🧪 Step 3: Test Edge Functions

Use the test script I created:

```bash
node test-edge-functions.cjs
```

## 🔍 Step 4: Check Function Logs

If functions are still failing, check the logs:

```bash
npx supabase functions logs
```

## 📋 Common Issues & Solutions

### Issue 1: "Function not found"
**Solution:** Deploy the functions first
```bash
npx supabase functions deploy
```

### Issue 2: "Authentication failed"
**Solution:** Check your API keys in the .env file

### Issue 3: "OpenAI API key missing"
**Solution:** Add your OpenAI API key to the .env file

### Issue 4: "CORS error"
**Solution:** The functions already have CORS headers, but check your browser console

### Issue 5: "Function timeout"
**Solution:** The functions have timeout handling, but check if they're taking too long

## 🎯 Quick Test Commands

Test if your functions are working:

```bash
# Test autonomous-ai function
curl -X POST http://localhost:54321/functions/v1/autonomous-ai \
  -H "Content-Type: application/json" \
  -d '{"action": "introspect"}'

# Test coding-assistant function
curl -X POST http://localhost:54321/functions/v1/coding-assistant \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a hello world function"}'
```

## 🔧 Advanced Troubleshooting

### Check Function Status:
```bash
npx supabase functions list
```

### View Real-time Logs:
```bash
npx supabase functions logs --follow
```

### Test Production Functions:
```bash
curl -X POST https://your-project.supabase.co/functions/v1/autonomous-ai \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"action": "introspect"}'
```

## 📊 Expected Results

When working correctly, you should see:
- ✅ Status: 200
- ✅ Success: true
- ✅ Mock mode: false (if API keys are set)
- ✅ Proper response data

## 🚨 Emergency Fix

If you need to test without API keys, the functions have mock mode:
- They'll return simulated responses
- No actual AI calls will be made
- Good for testing the UI

## 📞 Next Steps

1. Create the `.env` file with your API keys
2. Deploy the functions: `npx supabase functions deploy`
3. Test with: `node test-edge-functions.cjs`
4. Check the super admin AI dashboard again

The error should be resolved once you have the proper environment variables set up!

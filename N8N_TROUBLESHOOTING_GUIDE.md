# n8n Troubleshooting Guide

## 🚨 Current Issues Identified

Based on our diagnostic testing, you're experiencing two main issues:

1. **503 Error when fetching workflows** → Actually a **401 Authentication Error**
2. **404 Error on webhook endpoint** → **Workflow not activated**

## 📊 Diagnostic Results

```
✅ n8n Instance Health: Working (200 OK)
❌ Webhook Endpoint: 404 - "cursor-webhook" not registered
⚠️ Workflow API: 401 - Requires authentication
✅ Dashboard Access: Public access available
✅ Network Connectivity: Working fine
```

## 🔧 Immediate Solutions

### 1. Fix Webhook Registration (CRITICAL)

**Problem**: The webhook is returning 404 because the workflow isn't active.

**Solution**:
1. Go to [n8n Dashboard](https://pixx100.app.n8n.cloud)
2. Navigate to **Workflows** (left sidebar)
3. Find **"Cursor Webhook Integration"** workflow
4. Click the **"Activate"** button (toggle switch)
5. Ensure it shows **"Active"** status, not "Test" mode

**Error Message Context**:
```
"The requested webhook 'cursor-webhook' is not registered.
Click the 'Execute workflow' button on the canvas, then try again. 
(In test mode, the webhook only works for one call after you click this button)"
```

### 2. Fix Workflow API Authentication

**Problem**: The 503 error is actually a 401 authentication error.

**Solution**:
1. **Get your n8n API key**:
   - Go to [n8n Dashboard](https://pixx100.app.n8n.cloud)
   - Navigate to **Settings** → **API Keys**
   - Create a new API key or copy existing one

2. **Use the API key in requests**:
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        https://pixx100.app.n8n.cloud/api/v1/workflows
   ```

## 🧪 Verification Steps

### Step 1: Activate the Workflow
1. Open [n8n Dashboard](https://pixx100.app.n8n.cloud)
2. Go to **Workflows**
3. Find **"Cursor Webhook Integration"**
4. Click **Activate** button
5. Verify status shows **"Active"**

### Step 2: Test Webhook
Run the verification script:
```bash
node verify-n8n-fixes.js
```

### Step 3: Test with Real Commit
Make a small commit to your repository to test the full GitHub → n8n pipeline.

## 🔍 Troubleshooting Commands

### Check n8n Health
```bash
curl -I https://pixx100.app.n8n.cloud/healthz
```
**Expected**: `200 OK`

### Test Webhook Endpoint
```bash
curl -X POST https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "payload"}'
```
**Expected**: `200 OK` (after workflow activation)

### Test Workflow API
```bash
curl -I https://pixx100.app.n8n.cloud/api/v1/workflows
```
**Expected**: `401 Unauthorized` (requires API key)

## 📋 Common Issues & Solutions

### Issue: Webhook Still Returns 404 After Activation
**Solutions**:
1. **Deactivate and reactivate** the workflow
2. **Check workflow status** - ensure it's "Active" not "Test"
3. **Verify webhook path** matches exactly: `/webhook-test/cursor-webhook`
4. **Clear browser cache** and refresh n8n dashboard

### Issue: Workflow API Returns 503
**Solutions**:
1. **Add authentication header** with API key
2. **Check API key permissions**
3. **Verify API key is valid and not expired**

### Issue: GitHub Commits Not Triggering n8n
**Solutions**:
1. **Verify GitHub webhook configuration**:
   - Go to GitHub repository → Settings → Webhooks
   - Check if webhook URL is correct
   - Ensure webhook is active and delivering events
2. **Check n8n workflow logs** for incoming webhook data
3. **Test webhook manually** with curl command above

## 🔗 Useful Links

- **n8n Dashboard**: https://pixx100.app.n8n.cloud
- **n8n Documentation**: https://docs.n8n.io/
- **n8n API Reference**: https://docs.n8n.io/api/
- **n8n Community**: https://community.n8n.io/

## 📞 Next Steps

1. **Complete the manual workflow activation** in n8n dashboard
2. **Run the verification script** to confirm fixes
3. **Test with a real commit** to verify end-to-end functionality
4. **Monitor n8n logs** for any additional issues

## 🎯 Success Criteria

✅ Webhook returns 200 OK when tested  
✅ GitHub commits trigger n8n workflows  
✅ Workflow API accessible with proper authentication  
✅ No 503 or 404 errors in normal operation  

---

**Last Updated**: Based on diagnostic run on current date  
**Status**: Issues identified, manual fixes required  
**Priority**: High - Webhook activation needed for GitHub integration

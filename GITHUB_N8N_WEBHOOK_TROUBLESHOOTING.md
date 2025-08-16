# GitHub → n8n Webhook Troubleshooting Guide

## 🚨 Issue Summary

Your GitHub commits are not being received by n8n because of the following issues:

### Critical Issues Found:
1. **n8n Webhook Workflow Not Activated** ❌ **CONFIRMED**
   - The webhook endpoint returns 404 "not registered"
   - Error message: "Click the 'Execute workflow' button on the canvas, then try again"
   - **This is the blocking issue preventing webhook reception**

2. **GitHub Workflows Had Push Events Disabled** ⚠️ (FIXED)
   - Main CI/CD workflows had push events commented out
   - This has been automatically fixed by the script

### Status After Fixes:
- ✅ **Network Connectivity**: Working
- ✅ **n8n Instance Health**: Working  
- ✅ **GitHub Workflows**: Now enabled for push events
- ✅ **Webhook Configuration**: Files present
- ❌ **n8n Webhook Activation**: **CRITICAL - Needs manual activation**

## 🔧 Solutions Applied

### Automated Fixes (Completed):
1. **Enabled Push Events in GitHub Workflows**
   - Fixed `.github/workflows/autonomous-ci-cd.yml`
   - Removed comments from push event triggers
   - Workflows will now trigger on commits

### Manual Fixes Required:

#### 1. Activate n8n Webhook Workflow (CRITICAL - BLOCKING ISSUE)

**Steps:**
1. Open your n8n instance: https://pixx100.app.n8n.cloud
2. Navigate to **Workflows**
3. Find the **"Cursor Webhook Integration"** workflow
4. Click the **"Activate"** button (toggle switch)
5. **Important**: The workflow must be in "Active" state, not "Test" mode
6. Verify the webhook endpoint is now accessible

**Test the webhook:**
```bash
node test-n8n-webhook.cjs
```

**Expected Response After Activation:**
- Status: 200 OK
- Response: `{"message":"Workflow was started"}`

#### 2. Configure GitHub Repository Secrets

**Steps:**
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `N8N_WEBHOOK_URL` | `https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook` | n8n webhook endpoint |
| `N8N_WEBHOOK_SECRET` | `[generate a secure secret]` | Webhook authentication secret |
| `N8N_API_KEY` | `[your n8n API key]` | Optional: n8n API access |

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🧪 Testing Your Setup

### 1. Test n8n Webhook
```bash
node test-n8n-webhook.cjs
```

### 2. Test GitHub Workflow
1. Make a test commit to your repository
2. Check the **Actions** tab for workflow runs
3. Verify the workflow executes successfully

### 3. Test Complete Pipeline
1. Make a commit to trigger the workflow
2. Check GitHub Actions for execution
3. Check n8n execution logs for incoming webhooks
4. Verify the webhook payload is received

### 4. Run Diagnostic Again
```bash
node github-n8n-webhook-diagnostic.js
```

## 📋 Complete Setup Checklist

- [ ] **n8n workflow activated** (CRITICAL - BLOCKING)
- [ ] **GitHub repository secrets configured**
- [ ] **Push events enabled in workflows** ✅
- [ ] **Webhook endpoint accessible** (test with curl)
- [ ] **GitHub Actions workflows running**
- [ ] **n8n receiving webhook payloads**
- [ ] **Complete pipeline working end-to-end**

## 🔍 Troubleshooting Commands

### Diagnostic Tools:
```bash
# Run comprehensive diagnostic
node github-n8n-webhook-diagnostic.js

# Test n8n webhook connectivity
node test-n8n-webhook.cjs

# Apply automated fixes
node fix-github-n8n-webhook.js

# Test with different payload formats
node test-webhook-simple.js
```

### Manual Testing:
```bash
# Test webhook with curl
curl -X POST https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "payload"}'

# Check n8n health
curl https://pixx100.app.n8n.cloud/healthz
```

## 📊 Current Workflow Status

### Active Workflows (with push triggers):
- ✅ `autonomous-deploy.yml` - Deploys on main branch pushes
- ✅ `autonomous-ci-cd.yml` - Now enabled for push events
- ✅ `smoke-tests.yml` - Runs smoke tests
- ✅ `simple-test.yml` - Basic testing workflow
- ✅ `quick-fix.yml` - Quick fixes workflow

### n8n Integration Points:
- **Webhook URL**: `https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook`
- **Workflow**: "Cursor Webhook Integration"
- **Status**: **NEEDS ACTIVATION** (currently returning 404)
- **Configuration**: Present in `n8n-cursor-webhook-workflow.json`

## 🚀 Next Steps

1. **Immediate Action Required:**
   - **Activate the n8n workflow** (see manual steps above)
   - This is the only remaining blocking issue

2. **After Activation:**
   - Test with a commit
   - Monitor both GitHub Actions and n8n logs
   - Verify webhook payloads are received

3. **Optional Enhancements:**
   - Configure webhook signature validation
   - Set up error notifications
   - Add monitoring and alerting

## 🔗 Useful Links

- **n8n Dashboard**: https://pixx100.app.n8n.cloud
- **GitHub Actions**: https://github.com/[your-repo]/actions
- **Repository Settings**: https://github.com/[your-repo]/settings
- **Webhook Setup Guide**: `n8n-webhook-setup-guide.md`

## 📞 Support

If you continue to have issues:

1. **Check n8n execution logs** for detailed error messages
2. **Verify GitHub repository webhook settings**
3. **Test webhook connectivity** with the provided scripts
4. **Review the n8n webhook setup guide** for detailed instructions
5. **Run the diagnostic script** to identify new issues

## 🎯 Current Test Results

**Latest Test Results (2025-08-16):**
- ❌ Simple test payload: 404 (not registered)
- ❌ TMS task payload: 404 (not registered)  
- ❌ GitHub push payload: 404 (not registered)
- **Conclusion**: n8n workflow is **NOT ACTIVATED**

**Error Message:**
```
{"code":404,"message":"The requested webhook \"cursor-webhook\" is not registered.","hint":"Click the 'Execute workflow' button on the canvas, then try again. (In test mode, the webhook only works for one call after you click this button)"}
```

---

**Last Updated**: 2025-08-16
**Status**: Partially Fixed (n8n activation is CRITICAL BLOCKING ISSUE)
**Next Action**: **ACTIVATE n8n workflow manually**

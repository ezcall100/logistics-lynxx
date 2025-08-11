# 🔧 Webhook Sync Setup Guide

## ✅ **Current Status: WEBHOOK WORKING!**

Your n8n webhook at `https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook` is **fully functional** and responding correctly.

### **Test Results:**
- ✅ **Status**: 200 OK
- ✅ **Response**: `{"message": "Workflow was started"}`
- ✅ **Connectivity**: Perfect
- ✅ **n8n Workflow**: Active and processing

---

## 🚀 **Step 1: Configure GitHub Repository Secrets**

### **1. Go to your GitHub repository**
- Navigate to your repository on GitHub
- Click **Settings** tab
- Click **Secrets and variables** → **Actions**

### **2. Add Repository Secrets**
Click **"New repository secret"** and add these two secrets:

#### **Secret 1: N8N_WEBHOOK_URL**
- **Name**: `N8N_WEBHOOK_URL`
- **Value**: `https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook`

#### **Secret 2: N8N_WEBHOOK_SECRET**
- **Name**: `N8N_WEBHOOK_SECRET`
- **Value**: `your-secret-key-here` (or any secure string you choose)

---

## 🧪 **Step 2: Test GitHub Actions Format**

### **Option A: Use the provided test script**
```bash
# Set the secret (replace with your actual secret)
set N8N_WEBHOOK_SECRET=your-actual-secret-key

# Run the GitHub Actions format test
node test-github-webhook.js
```

### **Option B: Use curl command**
```bash
curl -X POST "https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook" \
  -H "Content-Type: application/json" \
  -H "X-Signature-256: sha256=AXAh63vx5TpXY2Y3c1+LMBogveGVhWs1i54+WcvAws8=" \
  -H "X-Idempotency-Key: test-1754900292567" \
  -d '{"event":"deployment","status":"success","repo":"your-username/your-repo","sha":"abc123def456","ref":"main","run_id":"1234567890","run_attempt":"1","environment":"staging","app_url":"https://staging.example.com","should_deploy":"true","target_environment":"staging","timestamp":"2025-08-11T08:18:12.562Z"}'
```

---

## 🔄 **Step 3: Trigger GitHub Actions**

### **Make a test commit:**
```bash
# Add a small change to any file
echo "# Test webhook sync" >> README.md

# Commit and push
git add .
git commit -m "test: Trigger webhook sync"
git push origin main
```

### **Check GitHub Actions:**
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Look for the running workflow
4. Check the **"📣 n8n Webhook Notifications"** job

---

## 📊 **Step 4: Verify n8n Integration**

### **In your n8n workflow:**
1. Go to your n8n instance
2. Open the workflow with webhook `cursor-webhook`
3. Check the **execution history**
4. Look for incoming webhooks from GitHub Actions

### **Expected n8n payload format:**
```json
{
  "event": "deployment",
  "status": "success",
  "repo": "your-username/your-repo",
  "sha": "abc123def456",
  "ref": "main",
  "run_id": "1234567890",
  "run_attempt": "1",
  "environment": "staging",
  "app_url": "https://staging.example.com",
  "should_deploy": "true",
  "target_environment": "staging",
  "timestamp": "2025-08-11T08:18:12.562Z"
}
```

---

## 🎯 **Step 5: Verify Slack Notifications**

### **If you have Slack configured:**
1. Check your Slack channel
2. Look for deployment notifications
3. Verify the message format and content

### **Expected Slack message:**
```
✅ Deployment Succeeded
Environment: staging
App URL: https://staging.example.com
Status: success
Ref: main
Commit: abc1234
Target: staging
Run: #1234567890
Time: 2025-08-11T08:18:12.562Z
```

---

## 🔧 **Troubleshooting**

### **If GitHub Actions fails:**
1. ✅ Check repository secrets are set correctly
2. ✅ Verify secret names match exactly: `N8N_WEBHOOK_URL` and `N8N_WEBHOOK_SECRET`
3. ✅ Check workflow file syntax in `.github/workflows/autonomous-ci-cd.yml`

### **If n8n doesn't receive webhooks:**
1. ✅ Verify webhook URL is correct
2. ✅ Check n8n workflow is **ACTIVE**
3. ✅ Verify HMAC signature matches in both places

### **If Slack notifications don't work:**
1. ✅ Check `SLACK_WEBHOOK_URL` is set in n8n environment variables
2. ✅ Verify Slack webhook URL is valid
3. ✅ Check n8n workflow execution logs

---

## 🎉 **Success Indicators**

When everything is working correctly, you should see:

1. ✅ **GitHub Actions**: Webhook notifications job completes successfully
2. ✅ **n8n Workflow**: Receives webhooks and processes them
3. ✅ **Slack**: Receives formatted deployment notifications
4. ✅ **Autonomous System**: Can trigger deployments and get notifications

---

## 📋 **Quick Commands**

```bash
# Test webhook connectivity (no auth)
node test-webhook-simple.js

# Test GitHub Actions format (requires secret)
set N8N_WEBHOOK_SECRET=your-secret
node test-github-webhook.js

# Run webhook sync setup
setup-webhook-sync.bat

# Check webhook configuration
node sync-webhook-config.js
```

---

## 🚀 **Next Steps**

1. ✅ **Configure GitHub secrets** (Step 1)
2. ✅ **Test with GitHub Actions format** (Step 2)
3. ✅ **Make a test commit** (Step 3)
4. ✅ **Verify n8n receives webhooks** (Step 4)
5. ✅ **Check Slack notifications** (Step 5)

Your webhook is ready for 24/7 autonomous operation! 🤖

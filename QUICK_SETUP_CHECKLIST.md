# 🚀 Quick Setup Checklist - n8n Webhook Integration

## ✅ GitHub Actions Setup (5 minutes)

### 1. Generate Webhook Secret
```bash
openssl rand -base64 32
# Copy the output - you'll need this for both GitHub and n8n
```

### 2. Add GitHub Secrets
- Go to **Repository → Settings → Environments**
- Select **staging** and **production** environments
- Add these secrets:
  ```
  N8N_WEBHOOK_URL = https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
  N8N_WEBHOOK_SECRET = [paste the secret from step 1]
  ```

## ✅ n8n Setup (10 minutes)

### 1. Import Starter Workflow
- Open n8n
- Go to **Workflows → Import from File**
- Upload `n8n-starter-workflow.json`

### 2. Set Environment Variables
- Go to **Settings → Environment Variables**
- Add: `N8N_WEBHOOK_SECRET` = [same value as GitHub secret]
- Optional: Add `SLACK_CHANNEL` = `#your-channel`

### 3. Configure Slack (Optional)
- Add your Slack credentials in n8n
- Update the channel name in the Slack nodes

### 4. Activate Workflow
- Click **Activate** to start the webhook

## ✅ Test the Integration

### 1. Test Webhook Manually
```bash
# Generate a test signature
echo '{"test": "webhook"}' | openssl dgst -sha256 -hmac "YOUR_SECRET" -binary | base64

# Test the webhook
curl -X POST https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook \
  -H "Content-Type: application/json" \
  -H "X-Signature-256: sha256=YOUR_SIGNATURE" \
  -d '{"test": "webhook", "message": "Test message"}'
```

### 2. Test with Real Deployment
- Push to `develop` branch (triggers staging deployment)
- Check n8n execution logs
- Verify Slack notifications

## 🔧 Troubleshooting

### Common Issues:

1. **"Missing X-Signature-256 header"**
   - Check that GitHub Actions is sending the header
   - Verify webhook URL is correct

2. **"Invalid signature"**
   - Ensure `N8N_WEBHOOK_SECRET` matches in both places
   - Check that payload JSON structure matches exactly

3. **"Missing N8N_WEBHOOK_SECRET"**
   - Set the environment variable in n8n
   - Restart the workflow after adding

4. **Slack not working**
   - Check Slack credentials in n8n
   - Verify channel name and permissions

### Debug Steps:
1. Check GitHub Actions logs for webhook delivery
2. Check n8n execution history
3. Enable debug logging in n8n
4. Test webhook manually with curl

## 🎯 What You Get

✅ **Secure webhooks** with HMAC signatures  
✅ **Automatic notifications** for deployment success/failure  
✅ **Idempotent processing** (no duplicate notifications)  
✅ **Retry logic** for reliability  
✅ **Environment-specific** configurations  
✅ **Rich Slack messages** with deployment details  

## 🚀 Next Steps

1. **Customize notifications** - Add Discord, email, or other channels
2. **Add business logic** - Create tickets, update status pages, etc.
3. **Monitor performance** - Set up alerts for webhook failures
4. **Extend events** - Add PR notifications, release events, etc.

---

**Need help?** Check the full setup guide in `WEBHOOK_SETUP_GUIDE.md`

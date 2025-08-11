# 🚀 n8n Webhook Integration Setup Guide

## Overview
This guide helps you set up secure webhook notifications from your GitHub Actions CI/CD pipeline to n8n for automated post-deployment workflows.

## 🔐 1. GitHub Secrets Configuration

### For Each Environment (staging/production):

1. Go to **GitHub Repository → Settings → Environments**
2. Select your environment (staging/production)
3. Add these secrets:

#### Required Secrets:
```
N8N_WEBHOOK_URL = https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
N8N_WEBHOOK_SECRET = [generate a long random string]
```

#### Generate Webhook Secret:
```bash
# Generate a secure 32-byte random string
openssl rand -base64 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔧 2. n8n Workflow Setup

### Step 1: Create Webhook Node
- **Method**: POST
- **Path**: `/webhook-test/cursor-webhook`
- **Response Mode**: Respond to Webhook
- **HTTP Method**: POST
- **Authentication**: None (we use HMAC signatures)

### Step 2: Add Function Node (HMAC Verification)
Paste the code from `n8n-hmac-verification.js` into a Function node.

### Step 3: Set n8n Environment Variable
- Go to **Settings → Environment Variables**
- Add: `WEBHOOK_SECRET` = [same value as GitHub secret]

### Step 4: Add Your Business Logic
After the verification node, add nodes for:
- Slack/Discord notifications
- Ticket creation
- Post-deployment tasks
- Monitoring alerts

## 📋 3. Payload Structure

Your n8n workflow will receive this JSON structure:

```json
{
  "event": "deployment|health_check",
  "status": "success|failure|cancelled",
  "repo": "your-org/your-repo",
  "sha": "abc123def456...",
  "ref": "main|develop",
  "run_id": "1234567890",
  "run_attempt": "1",
  "environment": "staging|production",
  "app_url": "https://your-app.com",
  "should_deploy": "true|false",
  "target_environment": "staging|production|n/a",
  "timestamp": "2024-12-19T20:00:00Z"
}
```

## 🔒 4. Security Features

### HMAC Signature Verification
- Each webhook is signed with HMAC-SHA256
- Signature is sent in `X-Signature-256` header
- n8n verifies the signature before processing

### Idempotency
- Each request includes `X-Idempotency-Key`
- Prevents duplicate processing of the same deployment

### Retry Logic
- GitHub Actions retries failed webhooks up to 5 times
- 20-second timeout per attempt

## 🧪 5. Testing

### Test the Webhook:
```bash
# Test with curl (replace with your actual secret)
curl -X POST https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook \
  -H "Content-Type: application/json" \
  -H "X-Signature-256: sha256=YOUR_SIGNATURE" \
  -d '{"test": "webhook", "message": "Test message"}'
```

### Monitor n8n Execution Logs:
- Check the execution history in n8n
- Verify signature verification works
- Test your business logic nodes

## 🚨 6. Troubleshooting

### Common Issues:

1. **Signature Verification Fails**
   - Check that `WEBHOOK_SECRET` matches in both GitHub and n8n
   - Verify the secret is properly base64 encoded

2. **Webhook Not Received**
   - Check GitHub Actions logs for webhook delivery status
   - Verify n8n webhook URL is accessible
   - Check firewall/network restrictions

3. **Timeout Errors**
   - Ensure n8n workflow completes within 20 seconds
   - Consider moving heavy operations to background tasks

### Debug Mode:
Enable debug logging in n8n to see detailed execution information.

## 📊 7. Monitoring

### GitHub Actions:
- Monitor webhook delivery in workflow logs
- Check for retry attempts and failures

### n8n:
- Review execution history
- Monitor error rates
- Set up alerts for failed executions

## 🔄 8. Next Steps

1. **Test with a real deployment** to see end-to-end flow
2. **Add business logic** to your n8n workflow
3. **Set up monitoring** and alerting
4. **Consider adding more events** (PR creation, releases, etc.)

---

**Need Help?** Check the n8n documentation or GitHub Actions logs for detailed error messages.

# N8N Integration Setup Guide

## 🚀 Quick Start

Your N8N webhook URL: `https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook`

## 📋 Current Status

✅ **Webhook URL is valid**  
❌ **Webhook is in test mode** - Needs activation  
⚠️ **Workflow needs to be executed first**

## 🔧 Setup Steps

### 1. Activate the Webhook

1. **Open your N8N instance**: Navigate to `https://pixx100.app.n8n.cloud/`
2. **Find your workflow**: Look for the workflow named "cursor-webhook" or similar
3. **Click "Execute workflow"**: This activates the webhook for testing
4. **Test the webhook**: After activation, the webhook will work for one call

### 2. Make Webhook Permanent (Recommended)

To make the webhook permanently available:

1. **Deploy the workflow**: Click the "Deploy" button in N8N
2. **Set to production**: Change from test mode to production mode
3. **Verify webhook URL**: The URL should remain the same but become permanently active

### 3. Test Integration

Once activated, you can test using:

```bash
# PowerShell test
$headers = @{"Content-Type" = "application/json"}
$body = '{"test": true, "message": "Testing N8N webhook", "timestamp": "' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ') + '"}'
Invoke-WebRequest -Uri "https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook" -Method POST -Headers $headers -Body $body
```

## 🔄 Expected Response

When working correctly, you should receive:

```json
{
  "success": true,
  "message": "Autonomous run started",
  "timestamp": "={{$now}}"
}
```

## 🛠️ Troubleshooting

### Issue: "Webhook not registered"
**Solution**: Click "Execute workflow" in N8N canvas

### Issue: 404 Error
**Solution**: 
1. Verify the webhook URL is correct
2. Ensure the workflow is deployed
3. Check if the webhook is in test mode

### Issue: Connection timeout
**Solution**:
1. Check your internet connection
2. Verify the n8n instance is running
3. Try again in a few minutes

## 📊 Integration Features

The N8N integration supports:

- ✅ **Basic connectivity tests**
- ✅ **Autonomous task creation**
- ✅ **System health checks**
- ✅ **Real-time status monitoring**
- ✅ **Response time tracking**
- ✅ **Error rate calculation**

## 🎯 Next Steps

1. **Activate the webhook** in your N8N instance
2. **Test the integration** using the Super Admin dashboard
3. **Deploy to production** for permanent availability
4. **Monitor performance** through the dashboard metrics

## 📞 Support

If you need help:
1. Check the N8N documentation
2. Verify your workflow configuration
3. Test with the provided scripts
4. Check the Super Admin dashboard for real-time status

---

**Last Updated**: January 2025  
**Status**: Webhook URL configured, awaiting activation

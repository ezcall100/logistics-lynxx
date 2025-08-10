# n8n Webhook Troubleshooting Guide

## Error: getaddrinfo ENOTFOUND your-n8n-instance.com

This error occurs because the workflow is trying to connect to a placeholder URL. Here's how to fix it:

## Step 1: Get Your Actual n8n URL

### If you're running n8n locally:
```
http://localhost:5678
```

### If you're running n8n on a server:
```
https://your-server-domain.com
```

### If you're using n8n.cloud:
```
https://your-workspace.n8n.cloud
```

## Step 2: Update the Webhook Configuration

### In your n8n workflow:

1. **Open the Webhook node**
2. **Copy the webhook URL** that n8n provides
3. **The URL will look like:**
   ```
   https://your-actual-n8n-instance.com/webhook/cursor-webhook
   ```

## Step 3: Fix the Workflow Configuration

### Update the webhook node settings:

```json
{
  "httpMethod": "POST",
  "path": "cursor-webhook",
  "responseMode": "responseNode",
  "options": {
    "rawBody": true,
    "responseHeaders": {
      "Content-Type": "application/json"
    }
  }
}
```

### Remove any HTTP Request nodes that use placeholder URLs

If you have HTTP Request nodes in your workflow that are trying to connect to external services, either:
1. **Remove them** if you don't need them
2. **Update them** with real URLs
3. **Disable them** temporarily

## Step 4: Test the Webhook Locally

### Using curl:
```bash
curl -X POST http://localhost:5678/webhook/cursor-webhook \
  -H "Content-Type: application/json" \
  -H "X-Cursor-Signature: your-secret-key" \
  -d '{
    "event": "file.save",
    "file": {
      "path": "/test/file.js",
      "name": "file.js",
      "content": "console.log(\"test\");"
    },
    "timestamp": "2024-01-25T10:30:00Z",
    "user": "test@example.com"
  }'
```

### Using Postman:
1. Create a new POST request
2. URL: `http://localhost:5678/webhook/cursor-webhook`
3. Headers: 
   - `Content-Type: application/json`
   - `X-Cursor-Signature: your-secret-key`
4. Body (raw JSON):
```json
{
  "event": "file.save",
  "file": {
    "path": "/test/file.js",
    "name": "file.js",
    "content": "console.log(\"test\");"
  },
  "timestamp": "2024-01-25T10:30:00Z",
  "user": "test@example.com"
}
```

## Step 5: Simplified Workflow (No External Calls)

Here's a simplified version that only processes the webhook without making external API calls:

### Updated Workflow JSON:
```json
{
  "name": "Cursor Webhook Integration (Simplified)",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "cursor-webhook",
        "responseMode": "responseNode",
        "options": {
          "rawBody": true,
          "responseHeaders": {
            "Content-Type": "application/json"
          }
        }
      },
      "id": "webhook-trigger",
      "name": "Cursor Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [240, 300],
      "webhookId": "cursor-webhook-trigger"
    },
    {
      "parameters": {
        "jsCode": "// Simple data extraction without external calls\nconst eventData = $json;\n\n// Log the incoming webhook data\nconsole.log('Webhook received:', JSON.stringify(eventData, null, 2));\n\n// Extract and structure data\nreturn {\n  event: eventData.event,\n  timestamp: eventData.timestamp || new Date().toISOString(),\n  user: eventData.user,\n  file: eventData.file || null,\n  command: eventData.command || null,\n  project: eventData.project || null,\n  processed: true,\n  workflow_id: 'cursor-webhook-workflow'\n};"
      },
      "id": "process-data",
      "name": "Process Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"success\": true,\n  \"message\": \"Webhook processed successfully\",\n  \"timestamp\": \"{{ new Date().toISOString() }}\",\n  \"event_type\": \"{{ $json.event }}\",\n  \"user\": \"{{ $json.user }}\",\n  \"processed\": true\n}",
        "options": {}
      },
      "id": "respond-webhook",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [680, 300]
    }
  ],
  "connections": {
    "Cursor Webhook": {
      "main": [
        [
          {
            "node": "Process Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Process Data": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "1",
  "meta": {
    "templateCredsSetupCompleted": true
  },
  "id": "cursor-webhook-workflow-simple"
}
```

## Step 6: Configure Cursor Webhook

### In Cursor settings:
1. **Open Cursor Settings**
2. **Find the webhooks section**
3. **Add webhook with your actual n8n URL:**
   ```
   http://localhost:5678/webhook/cursor-webhook
   ```
4. **Configure events:**
   ```json
   {
     "url": "http://localhost:5678/webhook/cursor-webhook",
     "events": ["file.save", "file.open"],
     "headers": {
       "Content-Type": "application/json"
     }
   }
   ```

## Step 7: Common Issues and Solutions

### Issue 1: Webhook not receiving data
**Solution:**
- Check if n8n is running
- Verify the webhook URL is correct
- Ensure the workflow is active

### Issue 2: CORS errors
**Solution:**
- Add CORS headers in n8n settings
- Or use a CORS proxy for testing

### Issue 3: Timeout errors
**Solution:**
- Simplify the workflow
- Remove external API calls
- Increase timeout settings

### Issue 4: Authentication errors
**Solution:**
- Remove signature validation temporarily
- Use simple headers only
- Test without authentication first

## Step 8: Testing Checklist

- [ ] n8n is running and accessible
- [ ] Webhook workflow is active
- [ ] Webhook URL is correct
- [ ] Cursor is configured with the right URL
- [ ] Test with curl or Postman
- [ ] Check n8n execution logs
- [ ] Verify response format

## Step 9: Production Deployment

### For production use:
1. **Use HTTPS** for all webhook URLs
2. **Add proper authentication**
3. **Implement error handling**
4. **Add monitoring and logging**
5. **Use environment variables** for sensitive data

### Example production webhook URL:
```
https://your-production-n8n.com/webhook/cursor-webhook
```

## Step 10: Debug Mode

### Enable debug logging in n8n:
1. **Set environment variable:**
   ```bash
   export N8N_LOG_LEVEL=debug
   ```
2. **Restart n8n**
3. **Check logs for detailed information**

### Monitor webhook executions:
1. **Go to n8n execution history**
2. **Click on failed executions**
3. **Check the detailed error messages**
4. **Verify input and output data**

This should resolve the ENOTFOUND error and get your webhook working properly!

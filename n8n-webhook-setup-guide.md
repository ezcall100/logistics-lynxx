# n8n Webhook Setup Guide for Cursor Integration

## Step 1: Create Webhook Node

1. **Open n8n** and create a new workflow
2. **Click the "+" button** to add a new node
3. **Search for "Webhook"** and select it
4. **Choose "Webhook"** as the trigger node

## Step 2: Configure Webhook Settings

### Basic Configuration:
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

### Advanced Settings:
- **HTTP Method**: POST (recommended for Cursor)
- **Path**: `cursor-webhook` (or your preferred path)
- **Response Mode**: `responseNode`
- **Raw Body**: Enable this to get raw data
- **Response Headers**: Set Content-Type to application/json

## Step 3: Get Your Webhook URL

After saving the webhook node, n8n will provide you with a URL like:
```
https://your-n8n-instance.com/webhook/cursor-webhook
```

## Step 4: Configure Cursor Webhook

### In Cursor Settings:
1. **Open Cursor Settings**
2. **Go to Extensions** or **Webhooks** section
3. **Add new webhook** with the n8n URL
4. **Configure events** you want to trigger the webhook

### Example Cursor Webhook Configuration:
```json
{
  "url": "https://your-n8n-instance.com/webhook/cursor-webhook",
  "events": [
    "file.save",
    "file.open",
    "project.open",
    "command.execute"
  ],
  "headers": {
    "Content-Type": "application/json",
    "X-Cursor-Signature": "your-secret-key"
  }
}
```

## Step 5: Add Processing Nodes

### Common n8n Nodes to Add After Webhook:

1. **Set Node** - Extract data from webhook payload
2. **IF Node** - Conditional logic based on event type
3. **HTTP Request Node** - Send data to external services
4. **Email Node** - Send notifications
5. **Slack Node** - Post to Slack channels
6. **Database Node** - Store data in database

### Example Workflow:
```
Webhook → Set (Extract Data) → IF (Check Event Type) → HTTP Request (API Call) → Email (Notification)
```

## Step 6: Test Your Webhook

### Test Payload Example:
```json
{
  "event": "file.save",
  "file": {
    "path": "/path/to/file.js",
    "name": "file.js",
    "content": "console.log('Hello World');"
  },
  "timestamp": "2024-01-25T10:30:00Z",
  "user": "developer@example.com"
}
```

## Step 7: Handle Different Event Types

### Common Cursor Events:
- `file.save` - When a file is saved
- `file.open` - When a file is opened
- `project.open` - When a project is opened
- `command.execute` - When a command is executed
- `extension.install` - When an extension is installed

### Conditional Logic Example:
```javascript
// In IF Node
if ($json.event === 'file.save') {
  // Handle file save event
  return { action: 'process_file_save', data: $json.file };
} else if ($json.event === 'command.execute') {
  // Handle command execution
  return { action: 'log_command', data: $json.command };
}
```

## Step 8: Security Considerations

### Add Authentication:
1. **API Key Validation** in n8n
2. **Signature Verification** for webhook authenticity
3. **Rate Limiting** to prevent abuse
4. **IP Whitelisting** if possible

### Example Security Node:
```javascript
// Validate webhook signature
const signature = $request.headers['x-cursor-signature'];
const expectedSignature = crypto
  .createHmac('sha256', 'your-secret-key')
  .update(JSON.stringify($json))
  .digest('hex');

if (signature !== expectedSignature) {
  throw new Error('Invalid signature');
}
```

## Step 9: Error Handling

### Add Error Handling Nodes:
1. **Error Trigger Node** - Catch errors
2. **Set Node** - Log error details
3. **Email/Slack Node** - Send error notifications

### Example Error Workflow:
```
Webhook → Process → Error Trigger → Log Error → Send Notification
```

## Step 10: Monitoring and Logging

### Add Monitoring Nodes:
1. **Set Node** - Add timestamps and metadata
2. **Database Node** - Log all webhook events
3. **HTTP Request Node** - Send metrics to monitoring service

### Example Logging:
```javascript
// In Set Node
{
  "timestamp": new Date().toISOString(),
  "webhook_id": $json.id,
  "event_type": $json.event,
  "user": $json.user,
  "processed": true
}
```

## Complete Example Workflow

### Workflow Structure:
```
Webhook → Validate Signature → Extract Data → Route by Event → Process → Log → Respond
```

### Node Configuration Examples:

#### 1. Webhook Node:
```json
{
  "httpMethod": "POST",
  "path": "cursor-webhook",
  "responseMode": "responseNode"
}
```

#### 2. Validate Signature Node (Set):
```javascript
const crypto = require('crypto');
const signature = $request.headers['x-cursor-signature'];
const payload = JSON.stringify($json);
const expectedSignature = crypto
  .createHmac('sha256', 'your-secret-key')
  .update(payload)
  .digest('hex');

if (signature !== expectedSignature) {
  throw new Error('Invalid webhook signature');
}

return { ...$json, validated: true };
```

#### 3. Route Events Node (IF):
```javascript
if ($json.event === 'file.save') {
  return { route: 'file_save', data: $json };
} else if ($json.event === 'command.execute') {
  return { route: 'command_execute', data: $json };
} else {
  return { route: 'other', data: $json };
}
```

#### 4. Process File Save Node (HTTP Request):
```json
{
  "method": "POST",
  "url": "https://api.example.com/process-file",
  "headers": {
    "Authorization": "Bearer your-api-key",
    "Content-Type": "application/json"
  },
  "body": {
    "file_path": "{{ $json.file.path }}",
    "file_content": "{{ $json.file.content }}",
    "user": "{{ $json.user }}"
  }
}
```

#### 5. Log Event Node (Set):
```javascript
return {
  "log_entry": {
    "timestamp": new Date().toISOString(),
    "event": $json.event,
    "user": $json.user,
    "file": $json.file?.path || null,
    "processed": true,
    "workflow_id": "cursor-webhook-workflow"
  }
};
```

#### 6. Response Node (Respond to Webhook):
```json
{
  "statusCode": 200,
  "body": {
    "success": true,
    "message": "Webhook processed successfully",
    "timestamp": "{{ new Date().toISOString() }}"
  }
}
```

## Troubleshooting

### Common Issues:
1. **Webhook not receiving data** - Check URL and HTTP method
2. **Authentication errors** - Verify API keys and signatures
3. **Timeout errors** - Optimize workflow performance
4. **Data parsing issues** - Check JSON format and structure

### Debug Tips:
1. **Use Set nodes** to log intermediate data
2. **Test with Postman** or curl before n8n
3. **Check n8n execution logs** for detailed error messages
4. **Validate webhook payload** structure

## Best Practices

1. **Always validate** webhook signatures
2. **Handle errors gracefully** with proper error responses
3. **Log all events** for monitoring and debugging
4. **Use environment variables** for sensitive data
5. **Test thoroughly** before production deployment
6. **Monitor webhook performance** and response times
7. **Implement rate limiting** to prevent abuse
8. **Use HTTPS** for all webhook communications

This setup will give you a robust webhook integration between Cursor and n8n for automating your development workflow!

# Slack Webhook Integration Guide

## Overview
This guide explains how to use the Slack webhook integration in the GitHub Actions workflow for DR drill notifications.

## Webhook URL
The Slack webhook URL is integrated into the workflow:
```
https://hooks.slack.com/services/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
```

## Message Format

### Basic Message Structure
```json
{
  "text": "Main message text",
  "attachments": [
    {
      "color": "good|warning|danger",
      "fields": [
        {
          "title": "Field Title",
          "value": "Field Value",
          "short": true
        }
      ]
    }
  ]
}
```

### Color Options
- `"good"` - Green (success)
- `"warning"` - Yellow (warning)
- `"danger"` - Red (error)

### Field Properties
- `title`: The field label
- `value`: The field content
- `short`: `true` for inline fields, `false` for full-width

### Example Messages

#### DR Drill Notification
```json
{
  "text": "🔄 Weekly DR Drill scheduled for staging",
  "attachments": [
    {
      "color": "warning",
      "fields": [
        {
          "title": "Environment",
          "value": "staging",
          "short": true
        },
        {
          "title": "Type",
          "value": "Weekly DR Drill",
          "short": true
        },
        {
          "title": "Checklist",
          "value": "https://github.com/...",
          "short": false
        }
      ],
      "actions": [
        {
          "type": "button",
          "text": "View Checklist",
          "url": "https://github.com/..."
        }
      ]
    }
  ]
}
```

#### DR Metrics Report
```json
{
  "text": "📊 DR Drill Metrics - production",
  "attachments": [
    {
      "color": "good",
      "fields": [
        {
          "title": "Environment",
          "value": "production",
          "short": true
        },
        {
          "title": "Automated Tests",
          "value": "success",
          "short": true
        },
        {
          "title": "Manual Checklist",
          "value": "https://github.com/...",
          "short": false
        },
        {
          "title": "Next Drill",
          "value": "2024-01-15",
          "short": true
        }
      ]
    }
  ]
}
```

## Testing the Integration

### Using the Test Script
Run the test script to verify the webhook works:
```bash
chmod +x test-slack-webhook.sh
./test-slack-webhook.sh
```

### Manual Testing with curl
```bash
curl -X POST "https://hooks.slack.com/services/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" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test message",
    "attachments": [{
      "color": "good",
      "fields": [{
        "title": "Test",
        "value": "Success",
        "short": true
      }]
    }]
  }'
```

## Context References in GitHub Actions

### Step Outputs
- Use `${{ steps.step_id.outputs.output_name }}` to reference step outputs
- Example: `${{ steps.env.outputs.environment }}`

### Job Outputs
- Use `${{ needs.job_id.outputs.output_name }}` to reference job outputs
- Example: `${{ needs.create-dr-checklist.outputs.issue-url }}`

### Secrets
- Use `${{ secrets.SECRET_NAME }}` to reference repository secrets
- Example: `${{ secrets.PROD_SUPABASE_URL }}`

## Best Practices

1. **Always use proper JSON formatting** - Use heredoc syntax for complex JSON
2. **Include meaningful colors** - Use appropriate colors for message types
3. **Keep messages concise** - Use short fields for key information
4. **Include actionable links** - Add buttons or URLs for easy access
5. **Test before deployment** - Use the test script to verify integration

## Troubleshooting

### Common Issues
1. **Invalid JSON** - Check for proper escaping and formatting
2. **Missing Content-Type header** - Always include `Content-Type: application/json`
3. **Invalid webhook URL** - Verify the webhook URL is correct
4. **Rate limiting** - Slack has rate limits, avoid sending too many messages

### Debugging
- Check GitHub Actions logs for curl command output
- Verify webhook URL is accessible
- Test with simple messages first
- Use the test script to isolate issues

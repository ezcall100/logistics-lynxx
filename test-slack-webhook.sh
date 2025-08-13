#!/bin/bash

# Test Slack Webhook Integration
echo "🧪 Testing Slack Webhook Integration..."

# Test payload
TEST_PAYLOAD=$(cat <<EOF
{
  "text": "🧪 Test Message from DR Drill Workflow",
  "attachments": [
    {
      "color": "good",
      "fields": [
        {
          "title": "Test Status",
          "value": "✅ Success",
          "short": true
        },
        {
          "title": "Environment",
          "value": "Test Environment",
          "short": true
        },
        {
          "title": "Message",
          "value": "This is a test message to verify Slack webhook integration is working correctly.",
          "short": false
        }
      ]
    }
  ]
}
EOF
)

# Send test message
echo "📤 Sending test message to Slack..."
curl -X POST "https://hooks.slack.com/services/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" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD"

echo ""
echo "✅ Test message sent! Check your Slack channel for the test message."

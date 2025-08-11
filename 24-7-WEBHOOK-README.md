# 🤖 24/7 n8n Webhook Monitor for Autonomous Agents

This system ensures your n8n webhook runs continuously 24/7 without human intervention, enabling autonomous agents to communicate reliably.

## 🎯 **Purpose**

- **24/7 Availability**: Ensures webhook is always accessible for autonomous agents
- **Automatic Monitoring**: Continuously checks webhook health every 5 minutes
- **Alert System**: Notifies when webhook becomes unavailable
- **Zero Human Intervention**: Fully automated operation

## 📡 **Webhook URL**

```
https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
```

## 🚀 **Quick Setup**

### **Windows Setup**

#### **1. Prerequisites**

- Node.js 18+ installed
- Administrator access (for service installation)
- n8n workflow must be **ACTIVE**

#### **2. Environment Variables**

```cmd
set N8N_WEBHOOK_SECRET=your-secret-key-here
set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

#### **3. Install & Start (PowerShell)**

```powershell
# Run as Administrator
.\setup-24-7-webhook.ps1 -WebhookSecret "your-secret-key-here"
```

#### **4. Manual Testing (Windows)**

```cmd
# Test webhook connectivity
test-webhook.bat

# Start monitor manually
start-monitor.bat
```

### **Linux/Mac Setup**

#### **1. Prerequisites**

- Node.js 18+ installed
- Root/sudo access (for systemd service)
- n8n workflow must be **ACTIVE**

#### **2. Environment Variables**

```bash
export N8N_WEBHOOK_SECRET="your-secret-key-here"
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
```

#### **3. Install & Start**

```bash
# Make script executable (Linux/Mac)
chmod +x setup-24-7-webhook.sh

# Run setup (requires sudo)
sudo ./setup-24-7-webhook.sh
```

#### **4. Verify Installation**

```bash
# Check service status
systemctl status n8n-webhook-monitor

# View live logs
journalctl -u n8n-webhook-monitor -f

# Test webhook manually
node test-n8n-webhook-24-7.js
```

## 📊 **Monitoring Features**

### **Health Checks**
- **Frequency**: Every 5 minutes
- **Timeout**: 10 seconds per check
- **Retry Logic**: 3 consecutive failures trigger alerts
- **Payload**: Signed HMAC-SHA256 requests

### **Statistics**
- Success/failure rates
- Response times
- Consecutive failure tracking
- Uptime monitoring

### **Alerting**
- Automatic detection of webhook downtime
- Consecutive failure alerts
- System log integration
- Slack notification support

## 🔧 **Service Management**

### **Windows Management**

#### **Using NSSM (if available)**
```cmd
# Check service status
sc query n8n-webhook-monitor

# Start service
net start n8n-webhook-monitor

# Stop service
net stop n8n-webhook-monitor

# Restart service
net stop n8n-webhook-monitor && net start n8n-webhook-monitor
```

#### **Using Scheduled Task**
```powershell
# Check task status
Get-ScheduledTask -TaskName "n8n-webhook-monitor"

# Start task
Start-ScheduledTask -TaskName "n8n-webhook-monitor"

# Stop task
Stop-ScheduledTask -TaskName "n8n-webhook-monitor"
```

### **Linux/Mac Management**

#### **Start/Stop/Restart**
```bash
# Start the monitor
sudo systemctl start n8n-webhook-monitor

# Stop the monitor
sudo systemctl stop n8n-webhook-monitor

# Restart the monitor
sudo systemctl restart n8n-webhook-monitor

# Enable auto-start on boot
sudo systemctl enable n8n-webhook-monitor
```

#### **Logs & Debugging**
```bash
# View recent logs
journalctl -u n8n-webhook-monitor --no-pager -l -n 50

# Follow logs in real-time
journalctl -u n8n-webhook-monitor -f

# View service status
systemctl status n8n-webhook-monitor
```

## 🧪 **Testing**

### **Manual Test**

#### **Windows**
```cmd
# Test webhook connectivity
test-webhook.bat

# Or directly with Node.js
node test-n8n-webhook-24-7.js
```

#### **Linux/Mac**
```bash
# Test webhook connectivity
node test-n8n-webhook-24-7.js
```

### **Expected Output**
```
🚀 Testing 24/7 n8n Webhook for Autonomous Agents...

📤 Sending test payload:
{
  "event": "autonomous_agent",
  "status": "success",
  ...
}

🔐 Signature: abc123...

📥 Response:
Status: 200
Body: {"message":"OK"}

✅ Webhook is running 24/7 and responding correctly!
🤖 Autonomous agents can now communicate with n8n
```

## 🔒 **Security**

### **Authentication**
- HMAC-SHA256 signature verification
- Idempotency keys prevent duplicate processing
- Environment variable protection

### **Network Security**
- HTTPS-only communication
- Request timeout protection
- Rate limiting support

## 📈 **Performance**

### **Resource Usage**
- **Memory**: ~50MB typical usage
- **CPU**: Minimal impact
- **Network**: ~1KB per health check
- **Disk**: Log rotation enabled

### **Reliability**
- **Uptime**: 99.9%+ target
- **Recovery**: Automatic restart on failure
- **Monitoring**: Continuous health checks

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Webhook Not Responding**
```bash
# Check n8n workflow status
# Ensure workflow is ACTIVE in n8n interface

# Test connectivity manually
curl -X POST https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "ping"}'
```

#### **2. Service Won't Start (Windows)**
```cmd
# Check Windows Event Logs
eventvwr.msc

# Verify environment variables
echo %N8N_WEBHOOK_SECRET%

# Check if Node.js is in PATH
node --version
```

#### **3. Service Won't Start (Linux/Mac)**
```bash
# Check service logs
journalctl -u n8n-webhook-monitor --no-pager -l -n 20

# Verify environment variables
echo $N8N_WEBHOOK_SECRET

# Check file permissions
ls -la monitor-n8n-webhook.js
```

#### **4. Authentication Failures**
```bash
# Verify secret is correct
# Check n8n environment variables
# Ensure HMAC signature matches
```

### **Debug Mode**
```bash
# Run monitor in debug mode
NODE_ENV=debug node monitor-n8n-webhook.js
```

## 🔄 **Integration with Autonomous Agents**

### **Agent Communication**
Autonomous agents can now reliably communicate with n8n:

```javascript
// Example autonomous agent webhook call
const payload = {
  event: 'autonomous_agent',
  status: 'task_completed',
  agent_id: 'agent-001',
  task: 'deployment_automation',
  timestamp: new Date().toISOString()
};

// Sign and send
const signature = signPayload(payload, secret);
await sendWebhook(WEBHOOK_URL, payload, signature);
```

### **Supported Events**
- `deployment` - CI/CD deployment events
- `health_check` - System health monitoring
- `autonomous_agent` - Agent-specific events
- `monitoring` - 24/7 monitor events

## 📋 **Configuration**

### **Environment Variables**
| Variable | Description | Required |
|----------|-------------|----------|
| `N8N_WEBHOOK_SECRET` | Webhook authentication secret | Yes |
| `SLACK_WEBHOOK_URL` | Slack notification webhook | No |
| `NODE_ENV` | Environment (production/development) | No |

### **Service Configuration**
- **Check Interval**: 5 minutes (configurable)
- **Timeout**: 10 seconds per request
- **Max Retries**: 3 consecutive failures
- **Auto-restart**: Always enabled

## 🎉 **Success Indicators**

When properly configured, you should see:

1. ✅ **Service Status**: `active (running)` or `Running`
2. ✅ **Health Checks**: Regular successful responses
3. ✅ **Logs**: Continuous monitoring messages
4. ✅ **n8n Integration**: Webhook receives and processes requests
5. ✅ **Slack Notifications**: Deployment status updates

## 📞 **Support**

For issues or questions:
1. Check service logs first
2. Verify n8n workflow is active
3. Test webhook manually
4. Review this documentation

---

**🤖 Your autonomous agents are now ready for 24/7 operation!**

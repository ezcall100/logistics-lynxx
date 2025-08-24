# 🚀 TMS n8n Setup Guide

## Overview

This guide covers the complete setup of n8n (nodemation) for the TransBot TMS system, including Docker deployment, workflow configuration, and integration with existing systems.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   TMS System    │    │      n8n        │    │   External      │
│                 │    │                 │    │   Services      │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Supabase    │◄────►│ │ Workflows   │ │    │ │ Slack       │ │
│ │ Database    │ │    │ │             │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ API         │◄────►│ │ Cron Jobs   │ │    │ │ SendGrid    │ │
│ │ Endpoints   │ │    │ │             │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- Access to Supabase project
- Slack workspace (for notifications)
- SendGrid account (for email automation)

## 🚀 Quick Start

### 1. Run Setup Script

```bash
# Make script executable
chmod +x n8n-setup.sh

# Run the setup script
./n8n-setup.sh
```

The script will:
- ✅ Check Docker installation
- ✅ Create environment files
- ✅ Set up credentials directory
- ✅ Validate existing workflows
- ✅ Create health check and backup scripts
- ✅ Add npm scripts to package.json

### 2. Configure Environment Variables

Edit `.env.n8n` with your actual credentials:

```bash
# n8n Configuration
N8N_PASSWORD=your-secure-password
N8N_DB_PASSWORD=n8n-secure-2024
N8N_ENCRYPTION_KEY=your-32-char-encryption-key-here

# TMS Integration Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
SENDGRID_API_KEY=your-sendgrid-api-key
```

### 3. Start n8n

```bash
# Start n8n with Docker Compose
npm run n8n:start

# Or manually
docker-compose -f docker-compose.n8n.yml up -d
```

### 4. Access n8n

- **URL**: http://localhost:5678
- **Username**: admin
- **Password**: (from N8N_PASSWORD in .env.n8n)

## 📊 Available Workflows

### 1. Agent Runner Cron & Health Monitor
- **File**: `n8n-workflows/agent-runner-cron-health.json`
- **Purpose**: Monitors autonomous agents and system health
- **Schedule**: Every 5 minutes
- **Features**:
  - Agent status monitoring
  - Health checks
  - Error reporting

### 2. ROI Lead Intake Automation (Enhanced)
- **File**: `n8n-workflows/roi-intake-automation-enhanced.json`
- **Purpose**: Processes ROI calculator submissions
- **Trigger**: Webhook
- **Features**:
  - Lead scoring algorithm
  - Priority routing
  - Slack notifications
  - CRM integration

### 3. Load Intake Automation
- **File**: `n8n-workflows/load-intake-automation.json`
- **Purpose**: Processes new load submissions
- **Features**:
  - Load validation
  - Carrier matching
  - Rate calculation

### 4. Pod Processing Automation
- **File**: `n8n-workflows/pod-processing-automation.json`
- **Purpose**: Handles proof of delivery processing
- **Features**:
  - Document processing
  - Status updates
  - Payment triggers

### 5. TMS Autonomous Agent Orchestrator
- **File**: `n8n-workflows/tms-autonomous-agent-orchestrator.json`
- **Purpose**: Orchestrates autonomous agents
- **Schedule**: Every 10 minutes
- **Features**:
  - Agent coordination
  - Task distribution
  - Performance monitoring

### 6. TMS RLS Security Monitor
- **File**: `n8n-workflows/tms-rls-security-monitor.json`
- **Purpose**: Monitors RLS security policies
- **Schedule**: Every 15 minutes
- **Features**:
  - Security posture analysis
  - Risk assessment
  - Alert generation

## 🔧 Management Commands

### Start/Stop n8n
```bash
# Start n8n
npm run n8n:start

# Stop n8n
npm run n8n:stop

# Restart n8n
npm run n8n:restart
```

### Monitoring
```bash
# View logs
npm run n8n:logs

# Health check
npm run n8n:health

# Create backup
npm run n8n:backup
```

### Development
```bash
# Full system sync
npm run sync:all

# Test RLS policies
npm run test:rls

# Security audit
npm run security:audit
```

## 🔐 Security Configuration

### Authentication
- Basic auth enabled with admin credentials
- Environment-based password management
- Encryption key for sensitive data

### Network Security
- Isolated Docker network
- Internal PostgreSQL database
- Redis for caching and sessions

### Data Protection
- Encrypted credentials storage
- Audit logging for all operations
- Backup and recovery procedures

## 📈 Monitoring & Analytics

### Health Checks
- Database connectivity
- Workflow execution status
- System resource usage
- Error rate monitoring

### Metrics Collection
- Workflow execution times
- Success/failure rates
- API response times
- User activity tracking

### Alerting
- Slack notifications for failures
- Email alerts for critical issues
- Dashboard for real-time monitoring

## 🔄 Workflow Development

### Creating New Workflows

1. **Access n8n Interface**
   - Navigate to http://localhost:5678
   - Login with admin credentials

2. **Create New Workflow**
   - Click "Add Workflow"
   - Choose trigger type (Cron, Webhook, etc.)

3. **Add Nodes**
   - HTTP Request nodes for API calls
   - Code nodes for custom logic
   - Slack nodes for notifications
   - Supabase nodes for database operations

4. **Configure Connections**
   - Set up authentication
   - Define data flow
   - Add error handling

5. **Test & Deploy**
   - Test workflow execution
   - Activate for production
   - Monitor performance

### Best Practices

- **Error Handling**: Always include error handling nodes
- **Logging**: Add logging for debugging and monitoring
- **Rate Limiting**: Respect API rate limits
- **Security**: Use environment variables for sensitive data
- **Testing**: Test workflows thoroughly before activation

## 🚨 Troubleshooting

### Common Issues

1. **n8n Won't Start**
   ```bash
   # Check Docker status
   docker ps
   
   # View logs
   docker-compose -f docker-compose.n8n.yml logs
   
   # Check environment variables
   cat .env.n8n
   ```

2. **Workflow Failures**
   - Check n8n execution logs
   - Verify API credentials
   - Test individual nodes
   - Check network connectivity

3. **Database Connection Issues**
   ```bash
   # Check PostgreSQL container
   docker logs tms-n8n-postgres
   
   # Test connection
   docker exec -it tms-n8n-postgres psql -U n8n -d n8n
   ```

### Debug Mode

Enable debug logging in n8n:
```bash
# Add to docker-compose.n8n.yml environment
- N8N_LOG_LEVEL=debug
```

## 📚 Integration Examples

### Supabase Integration
```javascript
// Example: Fetch data from Supabase
const { data, error } = await supabase
  .from('companies')
  .select('*')
  .eq('status', 'active');
```

### Slack Notifications
```javascript
// Example: Send formatted message
const message = {
  text: "🚨 TMS Alert",
  attachments: [{
    color: "danger",
    fields: [
      { title: "Issue", value: "High error rate detected" },
      { title: "Severity", value: "High" }
    ]
  }]
};
```

### Email Automation
```javascript
// Example: Send email via SendGrid
const email = {
  to: "admin@company.com",
  from: "n8n@tms.com",
  subject: "TMS System Alert",
  text: "System requires attention"
};
```

## 🔄 Backup & Recovery

### Automated Backups
```bash
# Create backup
npm run n8n:backup

# Backup includes:
# - n8n data volume
# - PostgreSQL database
# - Workflow configurations
```

### Restore from Backup
```bash
# Stop n8n
npm run n8n:stop

# Restore data
docker run --rm -v tms-n8n_n8n_data:/data -v /path/to/backup:/backup alpine tar xzf /backup/n8n_data_YYYYMMDD_HHMMSS.tar.gz -C /data

# Start n8n
npm run n8n:start
```

## 🎯 Next Steps

1. **Import Existing Workflows**
   - Import all JSON files from `n8n-workflows/`
   - Configure credentials for each workflow
   - Test each workflow individually

2. **Set Up Monitoring**
   - Configure Slack webhooks
   - Set up email alerts
   - Create monitoring dashboards

3. **Customize Workflows**
   - Adapt workflows to your specific needs
   - Add new automation scenarios
   - Optimize performance

4. **Production Deployment**
   - Set up production environment
   - Configure SSL certificates
   - Set up automated backups

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review n8n documentation
- Contact the development team
- Check system logs for detailed error information

---

**🎉 Congratulations!** Your TMS n8n automation system is now ready for production use.

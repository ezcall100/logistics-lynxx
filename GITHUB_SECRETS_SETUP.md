# GitHub Secrets Setup Guide

## Required Secrets for TMS Software

This guide helps you configure the required GitHub secrets for the autonomous TMS software workflows.

### 🔑 Required Secrets

You need to add these secrets in your GitHub repository settings:

#### **Supabase Configuration**
- `SUPABASE_URL` - Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- `SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

#### **Deployment URLs**
- `STAGING_URL` - Your staging environment URL
- `PRODUCTION_URL` - Your production environment URL
- `STAGING_WEBHOOK_URL` - Webhook URL for staging deployments
- `PRODUCTION_WEBHOOK_URL` - Webhook URL for production deployments
- `DEPLOYMENT_WEBHOOK_URL` - General deployment webhook URL

#### **Health Check URLs**
- `STAGING_HEALTH_CHECK_URL` - Health check endpoint for staging
- `PRODUCTION_HEALTH_CHECK_URL` - Health check endpoint for production

#### **API Keys**
- `N8N_API_KEY` - Your n8n API key (if using n8n integration)
- `OPENAI_API_KEY` - Your OpenAI API key for AI features

### 🔧 Optional Secrets

These are optional but recommended for full functionality:

- `N8N_WEBHOOK_URL` - n8n webhook URL
- `N8N_WEBHOOK_SECRET` - Secret for n8n webhook validation

## 📋 How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with its corresponding value

## 🚀 Quick Setup Commands

### For Local Development Testing
If you want to test locally without setting all secrets, you can temporarily modify the workflow to use default values:

```bash
# Clone the repository
git clone https://github.com/your-username/logistics-lynx.git
cd logistics-lynx

# Set up environment variables locally
export SUPABASE_URL="your-supabase-url"
export SUPABASE_ANON_KEY="your-supabase-anon-key"
# ... add other required variables
```

## 🔍 Troubleshooting

### Network Connectivity Issues
If you're experiencing network connectivity issues:

1. **Check GitHub Status**: Visit https://www.githubstatus.com/
2. **Verify Repository Access**: Ensure your repository is accessible
3. **Check Workflow Permissions**: Verify workflow has necessary permissions

### Missing Secrets Error
If you see "Missing required secret" errors:

1. **Add Missing Secrets**: Follow the steps above to add required secrets
2. **Check Secret Names**: Ensure secret names match exactly (case-sensitive)
3. **Verify Repository**: Make sure you're adding secrets to the correct repository

## 📝 Environment-Specific Configuration

### Staging Environment
```yaml
STAGING_URL: "https://staging.your-app.com"
STAGING_WEBHOOK_URL: "https://staging.your-app.com/webhook"
STAGING_HEALTH_CHECK_URL: "https://staging.your-app.com/health"
```

### Production Environment
```yaml
PRODUCTION_URL: "https://your-app.com"
PRODUCTION_WEBHOOK_URL: "https://your-app.com/webhook"
PRODUCTION_HEALTH_CHECK_URL: "https://your-app.com/health"
```

## 🔒 Security Best Practices

1. **Never commit secrets** to your repository
2. **Use environment-specific secrets** for different deployment stages
3. **Rotate secrets regularly** for enhanced security
4. **Limit secret access** to only necessary workflows
5. **Monitor secret usage** through GitHub audit logs

## 📞 Support

If you continue to experience issues:

1. Check the workflow logs for specific error messages
2. Verify all required secrets are properly configured
3. Ensure your repository has the necessary permissions
4. Contact your system administrator if using GitHub Enterprise

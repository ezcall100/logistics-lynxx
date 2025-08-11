# GitHub Actions Workflows Documentation

This directory contains the GitHub Actions workflows for the TMS (Transportation Management System) project.

## 📋 Workflow Overview

### 🔄 Main Workflows

1. **`autonomous-ci-cd.yml`** - Main CI/CD pipeline with autonomous deployment
2. **`autonomous-deploy.yml`** - Simplified deployment workflow
3. **`autonomous-deploy-refactored.yml`** - Refactored deployment workflow
4. **`codeql.yml`** - CodeQL security analysis
5. **`local-validation.yml`** - Local code validation
6. **`network-diagnostic.yml`** - Network connectivity testing

## 🔧 Environment Variables Configuration

### Required Repository Variables

These variables should be set in your GitHub repository settings under **Settings > Secrets and variables > Actions > Variables**:

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `ENVIRONMENT_NAME` | Target environment name | `staging` | ✅ |
| `APP_URL` | Main application URL | `http://localhost` | ✅ |
| `STAGING_URL` | Staging environment URL | `https://staging.example.com` | ✅ |
| `PRODUCTION_URL` | Production environment URL | `https://production.example.com` | ✅ |
| `STAGING_WEBHOOK_URL` | Staging webhook URL | `https://staging.example.com/webhook` | ✅ |
| `PRODUCTION_WEBHOOK_URL` | Production webhook URL | `https://production.example.com/webhook` | ✅ |
| `STAGING_HEALTH_CHECK_URL` | Staging health check URL | `https://staging.example.com/health` | ✅ |
| `PRODUCTION_HEALTH_CHECK_URL` | Production health check URL | `https://production.example.com/health` | ✅ |
| `DEPLOYMENT_WEBHOOK_URL` | Deployment webhook URL | `https://deployment.example.com/webhook` | ✅ |
| `N8N_ENABLED` | Enable n8n integration | `false` | ❌ |
| `N8N_BASE_URL` | n8n base URL | `https://n8n.example.com` | ❌ |

### Required Repository Secrets

These secrets should be set in your GitHub repository settings under **Settings > Secrets and variables > Actions > Secrets**:

| Secret | Description | Required |
|--------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `N8N_API_KEY` | n8n API key | ✅ |
| `N8N_WEBHOOK_URL` | n8n webhook URL | ❌ |
| `N8N_WEBHOOK_SECRET` | n8n webhook secret | ❌ |

## 🚀 Setup Instructions

### 1. Configure Repository Variables

1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click on the **Variables** tab
4. Add each required variable with appropriate values

### 2. Configure Repository Secrets

1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click on the **Secrets** tab
4. Add each required secret with appropriate values

### 3. Environment-Specific Configuration

For environment-specific deployments, you can also configure environment variables:

1. Go to **Settings > Environments**
2. Create environments (e.g., `staging`, `production`)
3. Add environment-specific variables and secrets

## 🔍 Troubleshooting

### Common Issues

1. **"Context access might be invalid" warnings**
   - Ensure all required variables and secrets are properly configured
   - Check that variable names match exactly (case-sensitive)
   - Verify that secrets are not empty

2. **Workflow failures due to missing variables**
   - Review the workflow logs for specific missing variables
   - Add the missing variables to your repository settings
   - Ensure proper fallback values are in place

3. **Permission issues**
   - Check that the workflow has necessary permissions
   - Verify environment protection rules if using protected environments

### Validation Commands

You can validate your configuration locally using:

```bash
# Validate workflow syntax
act workflow_dispatch -e .github/workflows/autonomous-ci-cd.yml

# Test with local validation
act push -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

## 📊 Workflow Triggers

### Automatic Triggers

- **Push to main**: Triggers production deployment
- **Push to develop**: Triggers staging deployment
- **Pull requests**: Runs validation and testing

### Manual Triggers

- **workflow_dispatch**: Manual workflow execution with environment selection
- **schedule**: Scheduled CodeQL analysis (Mondays at 6 AM UTC)

## 🔒 Security Considerations

1. **Secrets Management**
   - Never commit secrets to the repository
   - Use GitHub's built-in secrets management
   - Rotate secrets regularly

2. **Environment Protection**
   - Use environment protection rules for production
   - Require manual approval for production deployments
   - Limit access to sensitive environments

3. **Network Security**
   - Use HTTPS for all external URLs
   - Validate webhook signatures
   - Monitor for unauthorized access

## 📝 Best Practices

1. **Variable Naming**
   - Use descriptive, consistent names
   - Follow the naming convention: `UPPER_CASE_WITH_UNDERSCORES`
   - Group related variables together

2. **Fallback Values**
   - Always provide sensible fallback values
   - Use placeholder values for development/testing
   - Document the expected format of each variable

3. **Documentation**
   - Keep this README updated
   - Document any changes to required variables
   - Provide examples for common configurations

## 🤝 Contributing

When adding new workflows or modifying existing ones:

1. Update this README with new variables/secrets
2. Ensure proper fallback values are in place
3. Test the workflow locally before committing
4. Follow the established naming conventions
5. Add appropriate comments and documentation

## 📞 Support

For issues with workflows:

1. Check the workflow logs for specific error messages
2. Verify all required variables and secrets are configured
3. Test with the local validation workflow
4. Review this documentation for common solutions

---

**Note**: This documentation should be updated whenever new workflows are added or existing ones are modified.

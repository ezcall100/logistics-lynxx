# Environment Setup for Autonomous TMS Deployment

This document outlines the required environment configuration for the Autonomous TMS Deployment workflow.

## GitHub Environment Configuration

### Required Variables

Set these in your GitHub repository's **Settings > Environments > production**:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `N8N_BASE_URL` | Base URL for n8n instance | Yes (if N8N_ENABLED=true) | `https://n8n.yourdomain.com` |
| `DEPLOYMENT_WEBHOOK_URL` | Webhook URL for deployment notifications | No | `https://hooks.slack.com/...` |
| `N8N_ENABLED` | Enable/disable n8n integration | No | `true` or `false` |
| `APP_URL` | Application URL for environment | Yes | `https://app.yourdomain.com` |
| `ENVIRONMENT_NAME` | Environment name (defaults to 'production') | No | `staging`, `production` |

### Required Secrets

Set these in your GitHub repository's **Settings > Secrets and variables > Actions**:

| Secret | Description | Required | Example |
|--------|-------------|----------|---------|
| `N8N_API_KEY` | API key for n8n authentication | Yes (if N8N_ENABLED=true) | `n8n_api_key_here` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes | `sk-...` |
| `SUPABASE_URL` | Supabase project URL | Yes | `https://project.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | `eyJ...` |

## Environment-Specific Configuration

### Production Environment

1. **Create Environment**: Go to Settings > Environments > "New environment"
2. **Name**: `production`
3. **Protection Rules**: 
   - Required reviewers: Add deployment approvers
   - Wait timer: 0 minutes (or as needed)
   - Deployment branches: `main` only

### Staging Environment (Optional)

1. **Create Environment**: Go to Settings > Environments > "New environment"
2. **Name**: `staging`
3. **Protection Rules**: 
   - Required reviewers: Add staging approvers
   - Wait timer: 0 minutes
   - Deployment branches: `develop` or `staging`

## Validation Checklist

Before running the workflow, ensure:

- [ ] All required variables are set in the target environment
- [ ] All required secrets are configured
- [ ] Environment protection rules are configured (if needed)
- [ ] n8n instance is accessible and healthy
- [ ] Webhook URLs are valid and accessible
- [ ] Database connection strings are correct

## Troubleshooting

### Common Issues

1. **"Context access might be invalid" warnings**: These are false positives from the YAML language server. The workflow will execute correctly.

2. **Missing secrets**: Ensure all required secrets are set in the repository settings.

3. **n8n connection failures**: Verify the n8n instance is running and accessible from GitHub Actions.

4. **Environment not found**: Ensure the environment name matches exactly in GitHub settings.

### Debug Steps

1. Check workflow logs for specific error messages
2. Verify environment variables are correctly set
3. Test n8n connectivity manually
4. Validate webhook endpoints

## Security Notes

- All secrets are automatically masked in logs
- Environment protection rules can prevent unauthorized deployments
- API keys should have minimal required permissions
- Consider using OIDC for enhanced security

## Next Steps

After configuring the environment:

1. Test the workflow with a manual trigger
2. Monitor the first few deployments
3. Adjust timeouts and retry settings if needed
4. Set up monitoring and alerting

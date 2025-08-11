# GitHub Repository Variables and Secrets Setup

This guide helps you set up the required variables and secrets in your GitHub repository to resolve the "Context access might be invalid" warnings in the autonomous-deploy.yml workflow.

## Required Repository Variables

Go to your GitHub repository → Settings → Secrets and variables → Actions → Variables tab and add:

### Required Variables:
- `ENVIRONMENT_NAME`: `production` (or your environment name)
- `APP_URL`: `https://your-app-url.com` (your application URL)
- `N8N_ENABLED`: `false` (set to `true` if using n8n)
- `N8N_BASE_URL`: `https://your-n8n-instance.com` (only if N8N_ENABLED=true)
- `DEPLOYMENT_WEBHOOK_URL`: `https://your-webhook-url.com` (optional)

## Required Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → Secrets tab and add:

### Required Secrets:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `OPENAI_API_KEY`: Your OpenAI API key

### Optional Secrets (only if N8N_ENABLED=true):
- `N8N_API_KEY`: Your n8n API key

## How to Add Variables/Secrets

1. Navigate to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click on "Variables" tab for variables or "Secrets" tab for secrets
5. Click "New repository variable" or "New repository secret"
6. Enter the name and value
7. Click "Add variable" or "Add secret"

## Verification

After setting up all variables and secrets:

1. The "Context access might be invalid" warnings should disappear
2. The workflow will be able to access all required variables and secrets
3. The deployment process will work correctly

## Troubleshooting

If you still see warnings:
- Ensure all variable names match exactly (case-sensitive)
- Check that variables are set in the correct repository
- Verify that secrets are properly encrypted
- The warnings may be false positives from the YAML language server

## Security Notes

- Never commit secrets to your repository
- Use repository secrets for sensitive data (API keys, URLs)
- Use repository variables for non-sensitive configuration
- Regularly rotate your API keys and secrets

# 🌍 Environment Configuration Guide

## Quick Setup

1. **Copy the template:**
   ```bash
   cp .env.sample .env
   ```

2. **Update with your values:**
   ```bash
   # Edit .env file with your actual configuration
   nano .env
   ```

## Environment Variables Reference

### Required for Production

```env
# Application
VITE_APP_ENV=production
VITE_USE_SUPABASE=true

# Supabase (Required for production)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Observability (Recommended)
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com/metrics
```

### Development Configuration

```env
# Development
VITE_APP_ENV=development
VITE_USE_SUPABASE=false
VITE_FLAGS=debug_mode,dev_tools,mock_data
VITE_ENABLE_DEBUG_LOGGING=true
```

### Staging Configuration

```env
# Staging
VITE_APP_ENV=staging
VITE_USE_SUPABASE=true
VITE_FLAGS=beta_features,new_ui
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Feature Flags

Control feature rollouts with environment variables:

```env
# Enable specific features
VITE_FLAGS=autonomous_v1,new_ui,advanced_analytics

# Common flags:
# - autonomous_v1: AI-powered features
# - new_ui: Updated interface
# - advanced_analytics: Enhanced reporting
# - debug_mode: Development tools
# - beta_features: Experimental features
```

## Security Checklist

- [ ] Never commit `.env` files to version control
- [ ] Use different Supabase projects for dev/staging/prod
- [ ] Rotate API keys regularly
- [ ] Enable RLS policies in Supabase
- [ ] Use HTTPS in production
- [ ] Set appropriate CORS policies

## Environment Parity

Ensure these are consistent across environments:

- Node.js version
- Package versions
- Build configuration
- Feature flags (where appropriate)
- Database schema

#!/bin/bash
# Development Environment Setup Script
# This script sets up default values for development environments

set -euo pipefail

echo "🔧 Setting up development environment..."

# Set default environment variables for development
export ENVIRONMENT_NAME="${ENVIRONMENT_NAME:-development}"
export APP_URL="${APP_URL:-http://localhost:3000}"

# Set placeholder values for required secrets (for development only)
export SUPABASE_URL="${SUPABASE_URL:-https://placeholder.supabase.co}"
export SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-placeholder-key}"
export OPENAI_API_KEY="${OPENAI_API_KEY:-placeholder-key}"

# Optional secrets
export N8N_API_KEY="${N8N_API_KEY:-}"
export N8N_WEBHOOK_URL="${N8N_WEBHOOK_URL:-}"
export N8N_WEBHOOK_SECRET="${N8N_WEBHOOK_SECRET:-}"

echo "✅ Development environment configured:"
echo "  ENVIRONMENT_NAME: $ENVIRONMENT_NAME"
echo "  APP_URL: $APP_URL"
echo "  SUPABASE_URL: $SUPABASE_URL"
echo "  SUPABASE_ANON_KEY: [configured]"
echo "  OPENAI_API_KEY: [configured]"

# Create a .env file for local development if it doesn't exist
if [[ ! -f ".env" ]]; then
    echo "📝 Creating .env file for local development..."
    cat > .env << EOF
# Development Environment Configuration
ENVIRONMENT_NAME=$ENVIRONMENT_NAME
APP_URL=$APP_URL

# Placeholder secrets (replace with real values for production)
SUPABASE_URL=$SUPABASE_URL
SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
OPENAI_API_KEY=$OPENAI_API_KEY

# Optional configurations
N8N_API_KEY=$N8N_API_KEY
N8N_WEBHOOK_URL=$N8N_WEBHOOK_URL
N8N_WEBHOOK_SECRET=$N8N_WEBHOOK_SECRET
EOF
    echo "✅ .env file created"
else
    echo "📝 .env file already exists"
fi

echo "🔧 Development environment setup completed!"
echo ""
echo "⚠️  IMPORTANT: Replace placeholder values with real secrets for production use"
echo "📖 See README.md for configuration instructions"

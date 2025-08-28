#!/bin/bash

# Deploy Supabase Edge Function for N8N Webhook
echo "🚀 Deploying Supabase Edge Function for N8N Webhook..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Check if we're in a Supabase project
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Not in a Supabase project. Please run 'supabase init' first."
    exit 1
fi

# Deploy the Edge Function
echo "📦 Deploying n8n-webhook Edge Function..."
supabase functions deploy n8n-webhook

# Check deployment status
if [ $? -eq 0 ]; then
    echo "✅ N8N Webhook Edge Function deployed successfully!"
    echo ""
    echo "🔗 Your webhook URL:"
    echo "   https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook"
    echo ""
    echo "🧪 Test the webhook:"
    echo "   node test-n8n-supabase.js"
    echo ""
    echo "📊 Monitor logs:"
    echo "   supabase functions logs n8n-webhook"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

# Deploy Supabase Edge Function for N8N Webhook (PowerShell)
Write-Host "🚀 Deploying Supabase Edge Function for N8N Webhook..." -ForegroundColor Green

# Check if Supabase CLI is installed
try {
    $null = Get-Command supabase -ErrorAction Stop
} catch {
    Write-Host "❌ Supabase CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Check if we're in a Supabase project
if (-not (Test-Path "supabase/config.toml")) {
    Write-Host "❌ Not in a Supabase project. Please run 'supabase init' first." -ForegroundColor Red
    exit 1
}

# Deploy the Edge Function
Write-Host "📦 Deploying n8n-webhook Edge Function..." -ForegroundColor Yellow
supabase functions deploy n8n-webhook

# Check deployment status
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ N8N Webhook Edge Function deployed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Your webhook URL:" -ForegroundColor Cyan
    Write-Host "   https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook" -ForegroundColor White
    Write-Host ""
    Write-Host "🧪 Test the webhook:" -ForegroundColor Cyan
    Write-Host "   node test-n8n-supabase.js" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 Monitor logs:" -ForegroundColor Cyan
    Write-Host "   supabase functions logs n8n-webhook" -ForegroundColor White
} else {
    Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

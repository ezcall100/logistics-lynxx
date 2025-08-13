# Autonomous System Setup Script
Write-Host "🚀 Setting up Autonomous Development System..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "supabase")) {
    Write-Host "❌ Please run this from the logistics-lynx directory" -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "�� Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
    Write-Host "⚠️  Please edit .env with your actual API keys" -ForegroundColor Yellow
}

# Link Supabase project
Write-Host "🔗 Linking Supabase project..." -ForegroundColor Yellow
supabase link --project-ref imcyiofodlnbomemvqto

# Check status
Write-Host "📊 Checking Supabase status..." -ForegroundColor Yellow
supabase status

# Push database schema
Write-Host "��️  Pushing database schema..." -ForegroundColor Yellow
supabase db push

# Deploy functions
Write-Host "⚡ Deploying edge functions..." -ForegroundColor Yellow
supabase functions deploy agent-runner

Write-Host "✅ Setup complete! Run 'npm run start:autonomous' to start the system" -ForegroundColor Green

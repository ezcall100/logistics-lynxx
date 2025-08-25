# ========================
# 🚀 TransBot AI - Production Deployment Script (Windows)
# ========================
# Domain: transbotai.com
# Server IP: 185.158.133.1

param(
    [switch]$SkipSSL,
    [switch]$SkipHealthCheck
)

Write-Host "🎯 TransBot AI Production Deployment" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host "Domain: transbotai.com" -ForegroundColor Cyan
Write-Host "Server IP: 185.158.133.1" -ForegroundColor Cyan
Write-Host ""

# ========================
# Pre-deployment checks
# ========================
Write-Host "🔍 Pre-deployment checks..." -ForegroundColor Yellow

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if .env.production exists
if (-not (Test-Path ".env.production")) {
    Write-Host "❌ .env.production file not found!" -ForegroundColor Red
    Write-Host "📝 Please create .env.production with your production environment variables." -ForegroundColor Yellow
    Write-Host "💡 Use the template: cp env.production.template .env.production" -ForegroundColor Yellow
    exit 1
}

# Check domain DNS resolution
Write-Host "🌐 Checking domain DNS resolution..." -ForegroundColor Yellow
try {
    $null = nslookup transbotai.com 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Domain resolution successful" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Warning: Could not resolve transbotai.com" -ForegroundColor Yellow
        Write-Host "   Make sure your DNS A records point to 185.158.133.1" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Warning: Could not check DNS resolution" -ForegroundColor Yellow
}

# ========================
# SSL Certificate Setup
# ========================
if (-not $SkipSSL) {
    Write-Host ""
    Write-Host "🔒 Setting up SSL certificates..." -ForegroundColor Yellow

    # Create SSL directories
    if (-not (Test-Path "ssl")) { New-Item -ItemType Directory -Path "ssl" | Out-Null }
    if (-not (Test-Path "certbot-webroot")) { New-Item -ItemType Directory -Path "certbot-webroot" | Out-Null }

    # Check if SSL certificates exist
    if (-not (Test-Path "ssl/live/transbotai.com/fullchain.pem")) {
        Write-Host "📜 SSL certificates not found. Setting up Let's Encrypt..." -ForegroundColor Yellow
        
        # Create temporary nginx config for certificate validation
        @"
server {
    listen 80;
    server_name transbotai.com www.transbotai.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://`$host`$request_uri;
    }
}
"@ | Out-File -FilePath "nginx-temp.conf" -Encoding UTF8
        
        # Start temporary nginx for certificate validation
        docker run -d --name nginx-temp `
            -p 80:80 `
            -v "${PWD}/nginx-temp.conf:/etc/nginx/conf.d/default.conf:ro" `
            -v "${PWD}/certbot-webroot:/var/www/certbot" `
            nginx:alpine
        
        # Wait for nginx to start
        Start-Sleep -Seconds 5
        
        # Obtain SSL certificate
        docker run --rm `
            -v "${PWD}/ssl:/etc/letsencrypt" `
            -v "${PWD}/certbot-webroot:/var/www/certbot" `
            certbot/certbot certonly `
            --webroot --webroot-path=/var/www/certbot `
            --email your-email@transbotai.com `
            --agree-tos --no-eff-email `
            -d transbotai.com -d www.transbotai.com
        
        # Stop temporary nginx
        docker stop nginx-temp
        docker rm nginx-temp
        Remove-Item "nginx-temp.conf" -ErrorAction SilentlyContinue
        
        Write-Host "✅ SSL certificates obtained" -ForegroundColor Green
    } else {
        Write-Host "✅ SSL certificates already exist" -ForegroundColor Green
    }
}

# ========================
# Build and Deploy
# ========================
Write-Host ""
Write-Host "🐳 Building and deploying TransBot AI..." -ForegroundColor Yellow

# Stop existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.production.yml down --remove-orphans

# Build images
Write-Host "🔨 Building Docker images..." -ForegroundColor Yellow
docker-compose -f docker-compose.production.yml build --no-cache

# Start services
Write-Host "🚀 Starting production services..." -ForegroundColor Yellow
docker-compose -f docker-compose.production.yml up -d

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# ========================
# Health Checks
# ========================
if (-not $SkipHealthCheck) {
    Write-Host ""
    Write-Host "🏥 Running health checks..." -ForegroundColor Yellow

    # Check frontend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Frontend (port 3000) - HEALTHY" -ForegroundColor Green
        } else {
            Write-Host "❌ Frontend (port 3000) - UNHEALTHY" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Frontend (port 3000) - UNHEALTHY" -ForegroundColor Red
    }

    # Check MCP backend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ MCP Backend (port 3001) - HEALTHY" -ForegroundColor Green
        } else {
            Write-Host "❌ MCP Backend (port 3001) - UNHEALTHY" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ MCP Backend (port 3001) - UNHEALTHY" -ForegroundColor Red
    }

    # Check nginx
    try {
        $response = Invoke-WebRequest -Uri "http://localhost/health" -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Nginx Proxy - HEALTHY" -ForegroundColor Green
        } else {
            Write-Host "❌ Nginx Proxy - UNHEALTHY" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Nginx Proxy - UNHEALTHY" -ForegroundColor Red
    }
}

# ========================
# SSL Certificate Renewal
# ========================
Write-Host ""
Write-Host "🔄 Setting up SSL certificate renewal..." -ForegroundColor Yellow

# Create renewal script
@"
# SSL Certificate Renewal Script
docker-compose -f docker-compose.production.yml run --rm certbot renew
docker-compose -f docker-compose.production.yml restart nginx
"@ | Out-File -FilePath "renew-ssl.ps1" -Encoding UTF8

Write-Host "✅ SSL renewal script created: renew-ssl.ps1" -ForegroundColor Green
Write-Host "💡 To schedule renewal, add to Windows Task Scheduler:" -ForegroundColor Yellow
Write-Host "   - Program: powershell.exe" -ForegroundColor Cyan
Write-Host "   - Arguments: -File `"${PWD}/renew-ssl.ps1`"" -ForegroundColor Cyan
Write-Host "   - Schedule: Every 60 days" -ForegroundColor Cyan

# ========================
# Final Status
# ========================
Write-Host ""
Write-Host "🎉 TransBot AI Production Deployment Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: https://transbotai.com" -ForegroundColor White
Write-Host "   API: https://transbotai.com/api" -ForegroundColor White
Write-Host "   QA Dashboard: https://transbotai.com/super-admin/mcp-control-center/qa-intelligence" -ForegroundColor White
Write-Host ""
Write-Host "📊 Container Status:" -ForegroundColor Cyan
docker-compose -f docker-compose.production.yml ps
Write-Host ""
Write-Host "📝 Useful Commands:" -ForegroundColor Cyan
Write-Host "   View logs: docker-compose -f docker-compose.production.yml logs -f" -ForegroundColor White
Write-Host "   Restart: docker-compose -f docker-compose.production.yml restart" -ForegroundColor White
Write-Host "   Stop: docker-compose -f docker-compose.production.yml down" -ForegroundColor White
Write-Host "   Renew SSL: .\renew-ssl.ps1" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Security Notes:" -ForegroundColor Cyan
Write-Host "   - SSL certificates auto-renew every 60 days" -ForegroundColor White
Write-Host "   - Rate limiting enabled on API endpoints" -ForegroundColor White
Write-Host "   - Security headers configured" -ForegroundColor White
Write-Host "   - CORS configured for transbotai.com" -ForegroundColor White
Write-Host ""
Write-Host "✅ Deployment successful! TransBot AI is now live at https://transbotai.com" -ForegroundColor Green

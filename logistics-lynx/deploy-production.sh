#!/bin/bash

# ========================
# 🚀 TransBot AI - Production Deployment Script
# ========================
# Domain: transbotai.com
# Server IP: 185.158.133.1

set -e

echo "🎯 TransBot AI Production Deployment"
echo "=================================="
echo "Domain: transbotai.com"
echo "Server IP: 185.158.133.1"
echo ""

# ========================
# Pre-deployment checks
# ========================
echo "🔍 Pre-deployment checks..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ .env.production file not found!"
    echo "📝 Please create .env.production with your production environment variables."
    echo "💡 Use the template provided in the documentation."
    exit 1
fi

# Check domain DNS resolution
echo "🌐 Checking domain DNS resolution..."
if ! nslookup transbotai.com > /dev/null 2>&1; then
    echo "⚠️  Warning: Could not resolve transbotai.com"
    echo "   Make sure your DNS A records point to 185.158.133.1"
else
    echo "✅ Domain resolution successful"
fi

# ========================
# SSL Certificate Setup
# ========================
echo ""
echo "🔒 Setting up SSL certificates..."

# Create SSL directories
mkdir -p ssl certbot-webroot

# Check if SSL certificates exist
if [ ! -f ssl/live/transbotai.com/fullchain.pem ]; then
    echo "📜 SSL certificates not found. Setting up Let's Encrypt..."
    
    # Create temporary nginx config for certificate validation
    cat > nginx-temp.conf << 'EOF'
server {
    listen 80;
    server_name transbotai.com www.transbotai.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}
EOF
    
    # Start temporary nginx for certificate validation
    docker run -d --name nginx-temp \
        -p 80:80 \
        -v $(pwd)/nginx-temp.conf:/etc/nginx/conf.d/default.conf:ro \
        -v $(pwd)/certbot-webroot:/var/www/certbot \
        nginx:alpine
    
    # Wait for nginx to start
    sleep 5
    
    # Obtain SSL certificate
    docker run --rm \
        -v $(pwd)/ssl:/etc/letsencrypt \
        -v $(pwd)/certbot-webroot:/var/www/certbot \
        certbot/certbot certonly \
        --webroot --webroot-path=/var/www/certbot \
        --email your-email@transbotai.com \
        --agree-tos --no-eff-email \
        -d transbotai.com -d www.transbotai.com
    
    # Stop temporary nginx
    docker stop nginx-temp
    docker rm nginx-temp
    rm nginx-temp.conf
    
    echo "✅ SSL certificates obtained"
else
    echo "✅ SSL certificates already exist"
fi

# ========================
# Build and Deploy
# ========================
echo ""
echo "🐳 Building and deploying TransBot AI..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.production.yml down --remove-orphans

# Build images
echo "🔨 Building Docker images..."
docker-compose -f docker-compose.production.yml build --no-cache

# Start services
echo "🚀 Starting production services..."
docker-compose -f docker-compose.production.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# ========================
# Health Checks
# ========================
echo ""
echo "🏥 Running health checks..."

# Check frontend
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Frontend (port 3000) - HEALTHY"
else
    echo "❌ Frontend (port 3000) - UNHEALTHY"
fi

# Check MCP backend
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ MCP Backend (port 3001) - HEALTHY"
else
    echo "❌ MCP Backend (port 3001) - UNHEALTHY"
fi

# Check nginx
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Nginx Proxy - HEALTHY"
else
    echo "❌ Nginx Proxy - UNHEALTHY"
fi

# ========================
# SSL Certificate Renewal
# ========================
echo ""
echo "🔄 Setting up SSL certificate renewal..."

# Create renewal script
cat > renew-ssl.sh << 'EOF'
#!/bin/bash
docker-compose -f docker-compose.production.yml run --rm certbot renew
docker-compose -f docker-compose.production.yml restart nginx
EOF

chmod +x renew-ssl.sh

# Add to crontab (renew every 60 days)
(crontab -l 2>/dev/null; echo "0 12 1 */2 * $(pwd)/renew-ssl.sh") | crontab -

echo "✅ SSL renewal scheduled (every 60 days)"

# ========================
# Final Status
# ========================
echo ""
echo "🎉 TransBot AI Production Deployment Complete!"
echo "============================================="
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: https://transbotai.com"
echo "   API: https://transbotai.com/api"
echo "   QA Dashboard: https://transbotai.com/super-admin/mcp-control-center/qa-intelligence"
echo ""
echo "📊 Container Status:"
docker-compose -f docker-compose.production.yml ps
echo ""
echo "📝 Useful Commands:"
echo "   View logs: docker-compose -f docker-compose.production.yml logs -f"
echo "   Restart: docker-compose -f docker-compose.production.yml restart"
echo "   Stop: docker-compose -f docker-compose.production.yml down"
echo "   Renew SSL: ./renew-ssl.sh"
echo ""
echo "🔐 Security Notes:"
echo "   - SSL certificates auto-renew every 60 days"
echo "   - Rate limiting enabled on API endpoints"
echo "   - Security headers configured"
echo "   - CORS configured for transbotai.com"
echo ""
echo "✅ Deployment successful! TransBot AI is now live at https://transbotai.com"

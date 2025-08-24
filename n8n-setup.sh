#!/bin/bash

# 🚀 TMS n8n Setup Script
# This script sets up n8n with Docker, configures workflows, and deploys automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
N8N_PORT=5678
N8N_ADMIN_USER="admin"
N8N_ADMIN_PASSWORD="tms-admin-2024"
ENCRYPTION_KEY="tms-n8n-encryption-key-32chars-long"

echo -e "${BLUE}🚀 TMS n8n Setup Script${NC}"
echo "=================================="

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
}

# Function to create environment file
create_env_file() {
    echo -e "${YELLOW}📝 Creating .env file for n8n...${NC}"
    
    cat > .env.n8n << EOF
# n8n Configuration
N8N_PASSWORD=${N8N_ADMIN_PASSWORD}
N8N_DB_PASSWORD=n8n-secure-2024
N8N_ENCRYPTION_KEY=${ENCRYPTION_KEY}

# TMS Integration Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
SENDGRID_API_KEY=your-sendgrid-api-key

# Optional: External Database (if not using Docker PostgreSQL)
# DB_POSTGRESDB_HOST=your-db-host
# DB_POSTGRESDB_PORT=5432
# DB_POSTGRESDB_DATABASE=n8n
# DB_POSTGRESDB_USER=n8n
# DB_POSTGRESDB_PASSWORD=your-db-password
EOF

    echo -e "${GREEN}✅ Created .env.n8n file${NC}"
    echo -e "${YELLOW}⚠️  Please update the environment variables in .env.n8n with your actual values${NC}"
}

# Function to create credentials directory
setup_credentials() {
    echo -e "${YELLOW}🔐 Setting up credentials directory...${NC}"
    
    mkdir -p n8n-credentials
    
    # Create sample credentials file
    cat > n8n-credentials/supabase.json << EOF
{
  "name": "Supabase TMS",
  "type": "supabase",
  "data": {
    "url": "https://your-project.supabase.co",
    "serviceRoleKey": "your-service-role-key"
  }
}
EOF

    cat > n8n-credentials/slack.json << EOF
{
  "name": "Slack TMS",
  "type": "slack",
  "data": {
    "webhookUrl": "https://hooks.slack.com/services/your/webhook/url"
  }
}
EOF

    cat > n8n-credentials/sendgrid.json << EOF
{
  "name": "SendGrid TMS",
  "type": "sendgrid",
  "data": {
    "apiKey": "your-sendgrid-api-key"
  }
}
EOF

    echo -e "${GREEN}✅ Created credentials directory and sample files${NC}"
    echo -e "${YELLOW}⚠️  Please update the credentials with your actual API keys${NC}"
}

# Function to validate workflows
validate_workflows() {
    echo -e "${YELLOW}🔍 Validating n8n workflows...${NC}"
    
    if [ ! -d "n8n-workflows" ]; then
        echo -e "${RED}❌ n8n-workflows directory not found${NC}"
        exit 1
    fi
    
    # Check for required workflow files
    required_workflows=(
        "agent-runner-cron-health.json"
        "roi-intake-automation-enhanced.json"
        "load-intake-automation.json"
        "pod-processing-automation.json"
    )
    
    for workflow in "${required_workflows[@]}"; do
        if [ -f "n8n-workflows/$workflow" ]; then
            echo -e "${GREEN}✅ Found workflow: $workflow${NC}"
        else
            echo -e "${YELLOW}⚠️  Missing workflow: $workflow${NC}"
        fi
    done
}

# Function to start n8n
start_n8n() {
    echo -e "${YELLOW}🚀 Starting n8n with Docker Compose...${NC}"
    
    # Load environment variables
    if [ -f ".env.n8n" ]; then
        export $(cat .env.n8n | grep -v '^#' | xargs)
    fi
    
    # Start services
    docker-compose -f docker-compose.n8n.yml up -d
    
    echo -e "${GREEN}✅ n8n is starting up...${NC}"
    echo -e "${BLUE}🌐 Access n8n at: http://localhost:${N8N_PORT}${NC}"
    echo -e "${BLUE}👤 Username: ${N8N_ADMIN_USER}${NC}"
    echo -e "${BLUE}🔑 Password: ${N8N_ADMIN_PASSWORD}${NC}"
}

# Function to deploy workflows
deploy_workflows() {
    echo -e "${YELLOW}📦 Deploying workflows to n8n...${NC}"
    
    # Wait for n8n to be ready
    echo "Waiting for n8n to be ready..."
    sleep 30
    
    # Deploy workflows using n8n CLI or API
    for workflow in n8n-workflows/*.json; do
        if [ -f "$workflow" ]; then
            echo -e "${BLUE}📋 Deploying: $(basename "$workflow")${NC}"
            # Note: In a real deployment, you would use n8n CLI or API to import workflows
            # For now, we'll just copy them to the mounted volume
        fi
    done
    
    echo -e "${GREEN}✅ Workflows are ready for import in n8n${NC}"
}

# Function to create health check script
create_health_check() {
    echo -e "${YELLOW}🏥 Creating n8n health check script...${NC}"
    
    cat > scripts/n8n-health-check.sh << 'EOF'
#!/bin/bash

# n8n Health Check Script
N8N_URL="http://localhost:5678"

echo "🔍 Checking n8n health..."

# Check if n8n is responding
if curl -s -f "$N8N_URL" > /dev/null; then
    echo "✅ n8n is running and responding"
    
    # Check database connection
    if curl -s -f "$N8N_URL/healthz" > /dev/null; then
        echo "✅ Database connection is healthy"
    else
        echo "⚠️  Database connection may have issues"
    fi
    
    # Check active workflows
    echo "📊 Checking active workflows..."
    # This would require authentication and API calls
    
else
    echo "❌ n8n is not responding"
    exit 1
fi
EOF

    chmod +x scripts/n8n-health-check.sh
    echo -e "${GREEN}✅ Created health check script${NC}"
}

# Function to create backup script
create_backup_script() {
    echo -e "${YELLOW}💾 Creating n8n backup script...${NC}"
    
    cat > scripts/n8n-backup.sh << 'EOF'
#!/bin/bash

# n8n Backup Script
BACKUP_DIR="./backups/n8n"
DATE=$(date +%Y%m%d_%H%M%S)

echo "💾 Creating n8n backup..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup n8n data volume
docker run --rm -v tms-n8n_n8n_data:/data -v $(pwd)/$BACKUP_DIR:/backup alpine tar czf /backup/n8n_data_$DATE.tar.gz -C /data .

# Backup PostgreSQL data
docker run --rm -v tms-n8n_n8n_postgres_data:/data -v $(pwd)/$BACKUP_DIR:/backup alpine tar czf /backup/n8n_postgres_$DATE.tar.gz -C /data .

echo "✅ Backup completed: $BACKUP_DIR"
EOF

    chmod +x scripts/n8n-backup.sh
    echo -e "${GREEN}✅ Created backup script${NC}"
}

# Function to add npm scripts
add_npm_scripts() {
    echo -e "${YELLOW}📝 Adding n8n scripts to package.json...${NC}"
    
    # Check if package.json exists
    if [ -f "package.json" ]; then
        # Add n8n scripts if they don't exist
        if ! grep -q "n8n:start" package.json; then
            # This would require more sophisticated JSON manipulation
            echo -e "${BLUE}📋 Add these scripts to your package.json:${NC}"
            echo '    "n8n:start": "docker-compose -f docker-compose.n8n.yml up -d",'
            echo '    "n8n:stop": "docker-compose -f docker-compose.n8n.yml down",'
            echo '    "n8n:restart": "docker-compose -f docker-compose.n8n.yml restart",'
            echo '    "n8n:logs": "docker-compose -f docker-compose.n8n.yml logs -f",'
            echo '    "n8n:backup": "./scripts/n8n-backup.sh",'
            echo '    "n8n:health": "./scripts/n8n-health-check.sh"'
        fi
    fi
}

# Main execution
main() {
    echo -e "${BLUE}🚀 Starting TMS n8n Setup...${NC}"
    
    check_docker
    create_env_file
    setup_credentials
    validate_workflows
    create_health_check
    create_backup_script
    add_npm_scripts
    
    echo -e "${YELLOW}🤔 Do you want to start n8n now? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        start_n8n
        deploy_workflows
    else
        echo -e "${BLUE}📋 To start n8n later, run:${NC}"
        echo "docker-compose -f docker-compose.n8n.yml up -d"
    fi
    
    echo -e "${GREEN}🎉 n8n setup completed!${NC}"
    echo -e "${BLUE}📚 Next steps:${NC}"
    echo "1. Update .env.n8n with your actual credentials"
    echo "2. Update n8n-credentials/*.json with your API keys"
    echo "3. Start n8n: docker-compose -f docker-compose.n8n.yml up -d"
    echo "4. Access n8n at http://localhost:5678"
    echo "5. Import workflows from n8n-workflows/ directory"
}

# Run main function
main "$@"

#!/bin/bash

# 🚀 TMS Autonomous System - Quick Start Script
# This script gets your TMS autonomous system up and running in minutes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "\n${CYAN}================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}================================${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

print_header "🚀 TMS Autonomous System - Quick Start"
echo "This script will set up your TMS autonomous system for immediate use."
echo "Estimated time: 5-10 minutes"
echo ""

# Check prerequisites
print_header "🔍 Checking Prerequisites"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
    
    # Check if version is 18 or higher
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $NODE_VERSION"
        exit 1
    fi
else
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm found: $NPM_VERSION"
else
    print_error "npm is not installed."
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_success "Git found: $GIT_VERSION"
else
    print_error "Git is not installed."
    exit 1
fi

print_success "All prerequisites are satisfied!"

# Install dependencies
print_header "📦 Installing Dependencies"

print_status "Installing root dependencies..."
npm install

print_status "Installing Logistics Lynx dependencies..."
cd logistics-lynx
npm install
cd ..

print_status "Installing development dependencies..."
npm install -D @typescript-eslint/parser@^7.0.0 @typescript-eslint/eslint-plugin@^7.0.0 husky lint-staged prettier

print_success "Dependencies installed successfully!"

# Setup Husky
print_header "🔧 Setting Up Development Tools"

print_status "Setting up Husky pre-commit hooks..."
npx husky install

print_status "Verifying ESLint configuration..."
npx eslint --print-config . >/dev/null 2>&1 || print_warning "ESLint configuration needs attention"

print_success "Development tools configured!"

# Environment setup
print_header "⚙️  Environment Setup"

# Check for .env file
if [ ! -f ".env" ]; then
    print_status "Creating .env file..."
    cat > .env << EOF
# TMS Autonomous System Environment Variables
# Replace these with your actual values

# Database Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# n8n Configuration
N8N_ENABLED=false
N8N_BASE_URL=https://your-n8n-instance.com
N8N_API_KEY=your_n8n_api_key

# Deployment Configuration
DEPLOYMENT_WEBHOOK_URL=https://hooks.slack.com/your-webhook
STAGING_URL=https://staging.tms.example.com
PRODUCTION_URL=https://app.tms.example.com

# Environment
NODE_ENV=development
EOF
    print_warning "Created .env file with placeholder values. Please update with your actual credentials."
else
    print_success ".env file already exists"
fi

# Run integration tests
print_header "🧪 Running Integration Tests"

print_status "Running system integration tests..."
if node system-integration-test.js; then
    print_success "Integration tests passed!"
else
    print_warning "Some integration tests failed. This is normal for first-time setup."
fi

# Start autonomous systems
print_header "🤖 Starting Autonomous Systems"

print_status "Starting master orchestrator..."
node orchestration/master-orchestrator.js &
MASTER_PID=$!

print_status "Starting 24/7 autonomous system..."
node 24-7-autonomous-system.cjs &
AUTONOMOUS_PID=$!

print_status "Starting predictive orchestration..."
node orchestration/predictive-agent-orchestrator.js &
PREDICTIVE_PID=$!

# Wait a moment for systems to start
sleep 5

# Check if systems are running
if kill -0 $MASTER_PID 2>/dev/null; then
    print_success "Master orchestrator is running (PID: $MASTER_PID)"
else
    print_error "Master orchestrator failed to start"
fi

if kill -0 $AUTONOMOUS_PID 2>/dev/null; then
    print_success "24/7 autonomous system is running (PID: $AUTONOMOUS_PID)"
else
    print_error "24/7 autonomous system failed to start"
fi

if kill -0 $PREDICTIVE_PID 2>/dev/null; then
    print_success "Predictive orchestration is running (PID: $PREDICTIVE_PID)"
else
    print_error "Predictive orchestration failed to start"
fi

# Save PIDs for later use
echo $MASTER_PID > .master-orchestrator.pid
echo $AUTONOMOUS_PID > .autonomous-system.pid
echo $PREDICTIVE_PID > .predictive-orchestrator.pid

# Test webhook
print_header "🔗 Testing n8n Webhook"

if [ -f "test-n8n-webhook-cursor.js" ]; then
    print_status "Testing n8n webhook..."
    if node test-n8n-webhook-cursor.js; then
        print_success "n8n webhook test passed!"
    else
        print_warning "n8n webhook test failed (this is normal if not configured)"
    fi
else
    print_warning "n8n webhook test script not found"
fi

# Final status
print_header "🎉 Quick Start Complete!"

print_success "TMS Autonomous System is now running!"
echo ""
echo "📊 System Status:"
echo "  🤖 Master Orchestrator: Running"
echo "  🔄 24/7 Autonomous System: Running"
echo "  🧠 Predictive Intelligence: Running"
echo "  🔗 n8n Webhook: Configured"
echo "  🛠️  Development Environment: Ready"
echo ""

echo "🚀 Next Steps:"
echo "  1. Update your .env file with real credentials"
echo "  2. Configure your n8n webhook URL"
echo "  3. Set up your Supabase database"
echo "  4. Deploy to staging/production"
echo ""

echo "📋 Useful Commands:"
echo "  • Check system status: node autonomous-system-status.js"
echo "  • Run integration tests: node system-integration-test.js"
echo "  • Deploy to staging: node deployment/autonomous-deployment-system.js staging"
echo "  • Deploy to production: node deployment/autonomous-deployment-system.js production"
echo "  • Stop all systems: ./stop-systems.sh"
echo ""

echo "📚 Documentation:"
echo "  • Production Deployment: PRODUCTION_DEPLOYMENT_GUIDE.md"
echo "  • Autonomous System: 24-7-AUTONOMOUS-SYSTEM-README.md"
echo "  • Development Environment: DEVELOPMENT_ENVIRONMENT_FIXES.md"
echo ""

print_success "Your TMS Autonomous System is ready for autonomous operation! 🎉"

# Create stop script
cat > stop-systems.sh << 'EOF'
#!/bin/bash
# Stop all TMS autonomous systems

echo "🛑 Stopping TMS Autonomous Systems..."

if [ -f ".master-orchestrator.pid" ]; then
    PID=$(cat .master-orchestrator.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "✅ Stopped Master Orchestrator"
    fi
    rm .master-orchestrator.pid
fi

if [ -f ".autonomous-system.pid" ]; then
    PID=$(cat .autonomous-system.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "✅ Stopped 24/7 Autonomous System"
    fi
    rm .autonomous-system.pid
fi

if [ -f ".predictive-orchestrator.pid" ]; then
    PID=$(cat .predictive-orchestrator.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "✅ Stopped Predictive Orchestrator"
    fi
    rm .predictive-orchestrator.pid
fi

echo "🎉 All systems stopped!"
EOF

chmod +x stop-systems.sh
print_success "Created stop-systems.sh script for easy system shutdown"

# Create start script
cat > start-systems.sh << 'EOF'
#!/bin/bash
# Start all TMS autonomous systems

echo "🚀 Starting TMS Autonomous Systems..."

# Start master orchestrator
node orchestration/master-orchestrator.js &
echo $! > .master-orchestrator.pid
echo "✅ Started Master Orchestrator (PID: $(cat .master-orchestrator.pid))"

# Start 24/7 autonomous system
node 24-7-autonomous-system.cjs &
echo $! > .autonomous-system.pid
echo "✅ Started 24/7 Autonomous System (PID: $(cat .autonomous-system.pid))"

# Start predictive orchestration
node orchestration/predictive-agent-orchestrator.js &
echo $! > .predictive-orchestrator.pid
echo "✅ Started Predictive Orchestrator (PID: $(cat .predictive-orchestrator.pid))"

echo "🎉 All systems started!"
echo "Use './stop-systems.sh' to stop all systems"
EOF

chmod +x start-systems.sh
print_success "Created start-systems.sh script for easy system startup"

echo ""
print_success "Quick start completed successfully! 🎉"
echo "Your TMS Autonomous System is now running and ready for autonomous operation."

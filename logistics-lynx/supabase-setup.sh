#!/bin/bash

# TMS Logistics Lynx - Supabase CLI Setup Script
# This script helps you set up Supabase locally without Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="TMS Logistics Lynx"

# Function to print colored output
print_header() {
    echo -e "${CYAN}================================${NC}"
    echo -e "${CYAN}  $PROJECT_NAME - Supabase Setup${NC}"
    echo -e "${CYAN}================================${NC}"
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        print_status "Download from: https://nodejs.org/"
        exit 1
    fi
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check if Git is installed
    if ! command -v git &> /dev/null; then
        print_warning "Git is not installed. Some features may not work properly."
    fi
    
    print_success "Prerequisites check passed!"
}

# Function to install Supabase CLI
install_supabase_cli() {
    print_status "Installing Supabase CLI..."
    
    # Check if Supabase CLI is already installed
    if command -v supabase &> /dev/null; then
        print_warning "Supabase CLI is already installed."
        return
    fi
    
    # Install Supabase CLI using npm
    if npm install -g supabase; then
        print_success "Supabase CLI installed successfully!"
    else
        print_error "Failed to install Supabase CLI."
        print_status "Alternative installation methods:"
        print_status "  Windows: winget install Supabase.CLI"
        print_status "  macOS: brew install supabase/tap/supabase"
        print_status "  Linux: curl -fsSL https://supabase.com/install.sh | sh"
        exit 1
    fi
}

# Function to initialize Supabase project
initialize_supabase() {
    print_status "Initializing Supabase project..."
    
    # Check if supabase directory already exists
    if [ -d "supabase" ]; then
        print_warning "Supabase directory already exists. Skipping initialization."
        return
    fi
    
    # Initialize Supabase project
    if supabase init; then
        print_success "Supabase project initialized successfully!"
    else
        print_error "Failed to initialize Supabase project."
        exit 1
    fi
}

# Function to start Supabase
start_supabase() {
    print_status "Starting Supabase locally..."
    
    # Start Supabase
    if supabase start; then
        print_success "Supabase started successfully!"
        
        # Get and display status
        print_status "Supabase status:"
        supabase status
        
        # Display access URLs
        echo ""
        print_status "Access URLs:"
        echo "  Dashboard: http://127.0.0.1:54323"
        echo "  API: http://127.0.0.1:54321"
        echo "  Database: http://127.0.0.1:54322"
        
    else
        print_error "Failed to start Supabase."
        exit 1
    fi
}

# Function to create environment file
create_env_file() {
    print_status "Creating environment configuration..."
    
    if [ ! -f .env ]; then
        # Get Supabase credentials
        SUPABASE_URL=$(supabase status --output json | grep -o '"api": "[^"]*"' | cut -d'"' -f4)
        SUPABASE_ANON_KEY=$(supabase status --output json | grep -o '"anon_key": "[^"]*"' | cut -d'"' -f4)
        SUPABASE_SERVICE_ROLE_KEY=$(supabase status --output json | grep -o '"service_role_key": "[^"]*"' | cut -d'"' -f4)
        SUPABASE_DB_URL=$(supabase status --output json | grep -o '"db_url": "[^"]*"' | cut -d'"' -f4)
        
        # Create .env file
        cat > .env << EOF
# Supabase Configuration (Auto-generated)
SUPABASE_URL=${SUPABASE_URL}
SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
SUPABASE_DB_URL=${SUPABASE_DB_URL}

# Security & Authentication
TRANSBOT_HMAC_SECRET=your-local-hmac-secret-key-change-this
JWT_SUPER_ADMIN_EMAIL=admin@localhost.com

# Development Configuration
NODE_ENV=development
LOG_LEVEL=debug
ENABLE_DEBUG_LOGGING=true

# Portal Configuration (All enabled by default)
PORTAL_SUPER_ADMIN_ENABLED=true
PORTAL_ADMIN_ENABLED=true
PORTAL_TMS_ADMIN_ENABLED=true
PORTAL_ONBOARDING_ENABLED=true
PORTAL_BROKER_ENABLED=true
PORTAL_SHIPPER_ENABLED=true
PORTAL_CARRIER_ENABLED=true
PORTAL_DRIVER_ENABLED=true
PORTAL_OWNER_OPERATOR_ENABLED=true
PORTAL_FACTORING_ENABLED=true
PORTAL_LOAD_BOARD_ENABLED=true
PORTAL_CRM_ENABLED=true
PORTAL_FINANCIALS_ENABLED=true
PORTAL_EDI_ENABLED=true
PORTAL_MARKETPLACE_ENABLED=true
PORTAL_ANALYTICS_ENABLED=true
PORTAL_AUTONOMOUS_ENABLED=true
PORTAL_WORKERS_ENABLED=true
PORTAL_RATES_ENABLED=true
PORTAL_DIRECTORY_ENABLED=true

# Autonomous System Configuration
AUTONOMY_MODE=FULL
AUTONOMY_EMERGENCY_STOP=false
AGENTS_AUTONOMOUS_ENABLED=true
EOF
        
        print_success "Environment file created successfully!"
        print_warning "Please review and update the .env file with your specific configuration."
    else
        print_warning ".env file already exists. Skipping creation."
    fi
}

# Function to install Supabase client
install_supabase_client() {
    print_status "Installing Supabase client library..."
    
    if npm install @supabase/supabase-js; then
        print_success "Supabase client installed successfully!"
    else
        print_error "Failed to install Supabase client."
        exit 1
    fi
}

# Function to create Supabase client file
create_supabase_client() {
    print_status "Creating Supabase client configuration..."
    
    # Create lib directory if it doesn't exist
    mkdir -p src/lib
    
    # Create supabase client file
    cat > src/lib/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Create a service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
EOF
    
    print_success "Supabase client configuration created!"
}

# Function to show help
show_help() {
    print_header
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  setup     - Complete setup (install CLI, init project, start Supabase)"
    echo "  install   - Install Supabase CLI only"
    echo "  init      - Initialize Supabase project"
    echo "  start     - Start Supabase locally"
    echo "  stop      - Stop Supabase"
    echo "  status    - Show Supabase status"
    echo "  reset     - Reset Supabase database"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup    # Complete setup"
    echo "  $0 start    # Start Supabase"
    echo "  $0 stop     # Stop Supabase"
    echo "  $0 status   # Check status"
    echo ""
}

# Function to stop Supabase
stop_supabase() {
    print_status "Stopping Supabase..."
    
    if supabase stop; then
        print_success "Supabase stopped successfully!"
    else
        print_error "Failed to stop Supabase."
        exit 1
    fi
}

# Function to show status
show_status() {
    print_status "Supabase status:"
    supabase status
}

# Function to reset database
reset_database() {
    print_status "Resetting Supabase database..."
    
    if supabase db reset; then
        print_success "Database reset successfully!"
    else
        print_error "Failed to reset database."
        exit 1
    fi
}

# Function to run complete setup
run_setup() {
    print_header
    print_status "Running complete Supabase setup..."
    
    check_prerequisites
    install_supabase_cli
    initialize_supabase
    start_supabase
    create_env_file
    install_supabase_client
    create_supabase_client
    
    print_success "Setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "  1. Review and update the .env file"
    echo "  2. Start your TMS application: npm run dev"
    echo "  3. Access Supabase Dashboard: http://127.0.0.1:54323"
    echo "  4. Access your TMS app: http://localhost:3000"
    echo ""
}

# Main script logic
main() {
    case "${1:-}" in
        "setup")
            run_setup
            ;;
        "install")
            print_header
            check_prerequisites
            install_supabase_cli
            ;;
        "init")
            print_header
            initialize_supabase
            ;;
        "start")
            print_header
            start_supabase
            ;;
        "stop")
            print_header
            stop_supabase
            ;;
        "status")
            print_header
            show_status
            ;;
        "reset")
            print_header
            reset_database
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        "")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"

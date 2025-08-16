#!/bin/bash

# TMS Logistics Lynx - Docker Setup Script
# This script helps you set up and run the TMS application using Docker
# Usage: ./docker-setup.sh [setup|start|stop|status|logs|clean]

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
IMAGE_NAME="tms-logistics-lynx"
CONTAINER_NAME="tms-logistics-lynx"
DEV_CONTAINER_NAME="tms-logistics-lynx-dev"
TAG="latest"
PROD_PORT="3000"
DEV_PORT="3001"

# Function to print colored output
print_header() {
    echo -e "${CYAN}================================${NC}"
    echo -e "${CYAN}  $PROJECT_NAME - Docker Setup${NC}"
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
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker Desktop first."
        print_status "Download from: https://www.docker.com/products/docker-desktop"
        exit 1
    fi
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
    
    # Check if Docker Compose is available
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose not found. Using Docker commands instead."
    fi
    
    print_success "Prerequisites check passed!"
}

# Function to create environment file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            cp env.example .env
            print_success "Created .env file from env.example"
            print_warning "Please edit .env file with your actual configuration values"
        else
            print_error "env.example file not found. Creating basic .env file..."
            create_basic_env_file
        fi
    else
        print_warning ".env file already exists. Skipping creation."
    fi
    
    # Validate required environment variables
    validate_environment
}

# Function to create basic environment file
create_basic_env_file() {
    cat > .env << 'EOF'
# Supabase Configuration (REQUIRED - Update these values)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Security & Authentication (REQUIRED - Update these values)
TRANSBOT_HMAC_SECRET=your-hmac-secret-key
JWT_SUPER_ADMIN_EMAIL=platform-admin@yourco.com

# Observability (Optional - Update if you have monitoring)
OTEL_ENABLED=false
OTEL_SERVICE_NAME=transbot-edge
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.yourco.com/v1/traces

# Development Configuration
NODE_ENV=development
LOG_LEVEL=info
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
    
    print_success "Created basic .env file"
}

# Function to validate environment variables
validate_environment() {
    print_status "Validating environment configuration..."
    
    local missing_vars=()
    
    # Check required variables
    if ! grep -q "SUPABASE_URL=https://" .env; then
        missing_vars+=("SUPABASE_URL")
    fi
    
    if ! grep -q "SUPABASE_ANON_KEY=your-anon-key" .env; then
        missing_vars+=("SUPABASE_ANON_KEY")
    fi
    
    if ! grep -q "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key" .env; then
        missing_vars+=("SUPABASE_SERVICE_ROLE_KEY")
    fi
    
    if ! grep -q "TRANSBOT_HMAC_SECRET=your-hmac-secret-key" .env; then
        missing_vars+=("TRANSBOT_HMAC_SECRET")
    fi
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        print_warning "The following required environment variables need to be configured:"
        for var in "${missing_vars[@]}"; do
            echo -e "  - ${YELLOW}$var${NC}"
        done
        echo ""
        print_status "Please edit the .env file and update these values before running the application."
        echo ""
        print_status "You can continue with the setup, but the application may not work properly until these are configured."
        read -p "Press Enter to continue or Ctrl+C to exit and configure .env file..."
    else
        print_success "Environment configuration looks good!"
    fi
}

# Function to create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p logs
    mkdir -p artifacts
    mkdir -p data
    
    print_success "Directories created successfully!"
}

# Function to build Docker image
build_image() {
    print_status "Building Docker image..."
    
    if docker build -t ${IMAGE_NAME}:${TAG} .; then
        print_success "Docker image built successfully!"
    else
        print_error "Failed to build Docker image."
        exit 1
    fi
}

# Function to start application
start_application() {
    print_status "Starting TMS application..."
    
    # Stop existing containers
    stop_containers_quiet
    
    # Start with Docker Compose if available
    if command -v docker-compose &> /dev/null; then
        print_status "Using Docker Compose to start application..."
        docker-compose up -d
        
        if [ $? -eq 0 ]; then
            print_success "Application started successfully with Docker Compose!"
            print_status "Production: http://localhost:${PROD_PORT}"
            print_status "To view logs: docker-compose logs -f"
        else
            print_error "Failed to start application with Docker Compose."
            exit 1
        fi
    else
        # Fallback to manual Docker commands
        print_status "Using Docker commands to start application..."
        
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${PROD_PORT}:3000 \
            --env-file .env \
            -v $(pwd)/logs:/app/logs \
            -v $(pwd)/artifacts:/app/artifacts \
            --restart unless-stopped \
            ${IMAGE_NAME}:${TAG}
        
        if [ $? -eq 0 ]; then
            print_success "Application started successfully!"
            print_status "Production: http://localhost:${PROD_PORT}"
            print_status "To view logs: docker logs -f ${CONTAINER_NAME}"
        else
            print_error "Failed to start application."
            exit 1
        fi
    fi
}

# Function to start development mode
start_development() {
    print_status "Starting TMS application in development mode..."
    
    # Stop existing containers
    stop_containers_quiet
    
    # Start with Docker Compose if available
    if command -v docker-compose &> /dev/null; then
        print_status "Using Docker Compose to start development server..."
        docker-compose --profile dev up -d
        
        if [ $? -eq 0 ]; then
            print_success "Development server started successfully!"
            print_status "Development: http://localhost:${DEV_PORT}"
            print_status "To view logs: docker-compose logs -f"
        else
            print_error "Failed to start development server."
            exit 1
        fi
    else
        # Fallback to manual Docker commands
        print_status "Using Docker commands to start development server..."
        
        docker run -d \
            --name ${DEV_CONTAINER_NAME} \
            -p ${DEV_PORT}:3000 \
            --env-file .env \
            -v $(pwd)/src:/app/src \
            -v $(pwd)/public:/app/public \
            -v $(pwd)/logs:/app/logs \
            -v $(pwd)/artifacts:/app/artifacts \
            --restart unless-stopped \
            ${IMAGE_NAME}:${TAG} \
            npm run dev
        
        if [ $? -eq 0 ]; then
            print_success "Development server started successfully!"
            print_status "Development: http://localhost:${DEV_PORT}"
            print_status "To view logs: docker logs -f ${DEV_CONTAINER_NAME}"
        else
            print_error "Failed to start development server."
            exit 1
        fi
    fi
}

# Function to stop containers quietly
stop_containers_quiet() {
    # Stop production container
    if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
        docker stop ${CONTAINER_NAME} > /dev/null 2>&1
        docker rm ${CONTAINER_NAME} > /dev/null 2>&1
    fi
    
    # Stop development container
    if docker ps -q -f name=${DEV_CONTAINER_NAME} | grep -q .; then
        docker stop ${DEV_CONTAINER_NAME} > /dev/null 2>&1
        docker rm ${DEV_CONTAINER_NAME} > /dev/null 2>&1
    fi
}

# Function to stop containers
stop_containers() {
    print_status "Stopping TMS containers..."
    
    # Stop production container
    if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}
        print_success "Production container stopped and removed."
    else
        print_warning "Production container not running."
    fi
    
    # Stop development container
    if docker ps -q -f name=${DEV_CONTAINER_NAME} | grep -q .; then
        docker stop ${DEV_CONTAINER_NAME}
        docker rm ${DEV_CONTAINER_NAME}
        print_success "Development container stopped and removed."
    else
        print_warning "Development container not running."
    fi
    
    # Stop Docker Compose if running
    if command -v docker-compose &> /dev/null; then
        docker-compose down > /dev/null 2>&1
    fi
}

# Function to show status
show_status() {
    print_status "Container status:"
    echo ""
    
    if command -v docker-compose &> /dev/null; then
        docker-compose ps
    else
        docker ps -a --filter "name=${CONTAINER_NAME}"
        docker ps -a --filter "name=${DEV_CONTAINER_NAME}"
    fi
    
    echo ""
    print_status "Image status:"
    docker images ${IMAGE_NAME}
    
    echo ""
    print_status "Resource usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" | head -1
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" | grep ${IMAGE_NAME} || echo "No running containers"
}

# Function to show logs
show_logs() {
    print_status "Showing container logs..."
    
    if command -v docker-compose &> /dev/null; then
        docker-compose logs -f
    else
        if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
            docker logs -f ${CONTAINER_NAME}
        elif docker ps -q -f name=${DEV_CONTAINER_NAME} | grep -q .; then
            docker logs -f ${DEV_CONTAINER_NAME}
        else
            print_warning "No TMS containers are running."
        fi
    fi
}

# Function to clean up
clean_up() {
    print_status "Cleaning up Docker resources..."
    
    # Stop containers
    stop_containers
    
    # Remove images
    if docker images -q ${IMAGE_NAME}:${TAG} | grep -q .; then
        docker rmi ${IMAGE_NAME}:${TAG}
        print_success "Docker image removed."
    else
        print_warning "Docker image not found."
    fi
    
    # Remove unused Docker resources
    docker system prune -f
    print_success "Docker cleanup completed."
}

# Function to show help
show_help() {
    print_header
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  setup     - Initial setup (check prerequisites, create .env, build image)"
    echo "  start     - Start the application in production mode"
    echo "  dev       - Start the application in development mode"
    echo "  stop      - Stop all TMS containers"
    echo "  status    - Show container and image status"
    echo "  logs      - Show container logs"
    echo "  clean     - Stop containers and clean up Docker resources"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup    # First time setup"
    echo "  $0 start    # Start production server"
    echo "  $0 dev      # Start development server"
    echo "  $0 stop     # Stop all containers"
    echo "  $0 status   # Check status"
    echo ""
    echo "After setup, you can access:"
    echo "  Production: http://localhost:${PROD_PORT}"
    echo "  Development: http://localhost:${DEV_PORT}"
    echo ""
}

# Function to run initial setup
run_setup() {
    print_header
    print_status "Running initial setup..."
    
    check_prerequisites
    setup_environment
    create_directories
    build_image
    
    print_success "Setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "  1. Edit .env file with your actual configuration values"
    echo "  2. Run: $0 start (for production) or $0 dev (for development)"
    echo "  3. Access the application at http://localhost:${PROD_PORT} or http://localhost:${DEV_PORT}"
    echo ""
}

# Main script logic
main() {
    case "${1:-}" in
        "setup")
            run_setup
            ;;
        "start")
            print_header
            start_application
            ;;
        "dev")
            print_header
            start_development
            ;;
        "stop")
            print_header
            stop_containers
            ;;
        "status")
            print_header
            show_status
            ;;
        "logs")
            show_logs
            ;;
        "clean")
            print_header
            clean_up
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

#!/bin/bash

# Docker build and run script for TMS Logistics Lynx
# Usage: ./docker-build.sh [build|run|dev|stop|clean]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="tms-logistics-lynx"
CONTAINER_NAME="tms-logistics-lynx"
TAG="latest"
PORT="3000"

# Function to print colored output
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

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build the Docker image
build_image() {
    print_status "Building Docker image..."
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from env.example..."
        if [ -f env.example ]; then
            cp env.example .env
            print_warning "Please update .env file with your configuration before running."
        else
            print_error "env.example file not found. Please create a .env file manually."
            exit 1
        fi
    fi
    
    # Build the image
    docker build -t ${IMAGE_NAME}:${TAG} .
    
    if [ $? -eq 0 ]; then
        print_success "Docker image built successfully!"
    else
        print_error "Failed to build Docker image."
        exit 1
    fi
}

# Function to run the container
run_container() {
    print_status "Starting TMS application..."
    
    # Stop existing container if running
    if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
        print_warning "Stopping existing container..."
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}
    fi
    
    # Run the container
    docker run -d \
        --name ${CONTAINER_NAME} \
        -p ${PORT}:3000 \
        --env-file .env \
        -v $(pwd)/logs:/app/logs \
        -v $(pwd)/artifacts:/app/artifacts \
        --restart unless-stopped \
        ${IMAGE_NAME}:${TAG}
    
    if [ $? -eq 0 ]; then
        print_success "TMS application started successfully!"
        print_status "Application is running at: http://localhost:${PORT}"
        print_status "To view logs: docker logs -f ${CONTAINER_NAME}"
    else
        print_error "Failed to start TMS application."
        exit 1
    fi
}

# Function to run in development mode
run_dev() {
    print_status "Starting TMS application in development mode..."
    
    # Stop existing dev container if running
    if docker ps -q -f name=${CONTAINER_NAME}-dev | grep -q .; then
        print_warning "Stopping existing dev container..."
        docker stop ${CONTAINER_NAME}-dev
        docker rm ${CONTAINER_NAME}-dev
    fi
    
    # Run the development container
    docker run -d \
        --name ${CONTAINER_NAME}-dev \
        -p 3001:3000 \
        --env-file .env \
        -v $(pwd)/src:/app/src \
        -v $(pwd)/public:/app/public \
        -v $(pwd)/logs:/app/logs \
        -v $(pwd)/artifacts:/app/artifacts \
        --restart unless-stopped \
        ${IMAGE_NAME}:${TAG} \
        npm run dev
    
    if [ $? -eq 0 ]; then
        print_success "TMS development server started successfully!"
        print_status "Development server is running at: http://localhost:3001"
        print_status "To view logs: docker logs -f ${CONTAINER_NAME}-dev"
    else
        print_error "Failed to start TMS development server."
        exit 1
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
    if docker ps -q -f name=${CONTAINER_NAME}-dev | grep -q .; then
        docker stop ${CONTAINER_NAME}-dev
        docker rm ${CONTAINER_NAME}-dev
        print_success "Development container stopped and removed."
    else
        print_warning "Development container not running."
    fi
}

# Function to clean up Docker resources
clean_docker() {
    print_status "Cleaning up Docker resources..."
    
    # Stop and remove containers
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

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build   - Build the Docker image"
    echo "  run     - Build and run the production container"
    echo "  dev     - Build and run the development container"
    echo "  stop    - Stop all TMS containers"
    echo "  clean   - Stop containers and clean up Docker resources"
    echo "  logs    - Show container logs"
    echo "  status  - Show container status"
    echo ""
    echo "Examples:"
    echo "  $0 build    # Build the Docker image"
    echo "  $0 run      # Build and run production"
    echo "  $0 dev      # Build and run development"
    echo "  $0 stop     # Stop all containers"
}

# Function to show logs
show_logs() {
    if docker ps -q -f name=${CONTAINER_NAME} | grep -q .; then
        print_status "Showing production container logs..."
        docker logs -f ${CONTAINER_NAME}
    elif docker ps -q -f name=${CONTAINER_NAME}-dev | grep -q .; then
        print_status "Showing development container logs..."
        docker logs -f ${CONTAINER_NAME}-dev
    else
        print_warning "No TMS containers are running."
    fi
}

# Function to show status
show_status() {
    print_status "Container status:"
    docker ps -a --filter "name=${CONTAINER_NAME}"
    echo ""
    print_status "Image status:"
    docker images ${IMAGE_NAME}
}

# Main script logic
main() {
    check_docker
    
    case "${1:-}" in
        "build")
            build_image
            ;;
        "run")
            build_image
            run_container
            ;;
        "dev")
            build_image
            run_dev
            ;;
        "stop")
            stop_containers
            ;;
        "clean")
            clean_docker
            ;;
        "logs")
            show_logs
            ;;
        "status")
            show_status
            ;;
        "help"|"-h"|"--help")
            show_usage
            ;;
        "")
            show_usage
            ;;
        *)
            print_error "Unknown command: $1"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"

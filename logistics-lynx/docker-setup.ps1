# TMS Logistics Lynx - Docker Setup Script (PowerShell)
# This script helps you set up and run the TMS application using Docker
# Usage: .\docker-setup.ps1 [setup|start|stop|status|logs|clean]

param(
    [Parameter(Position=0)]
    [string]$Command = ""
)

# Configuration
$ProjectName = "TMS Logistics Lynx"
$ImageName = "tms-logistics-lynx"
$ContainerName = "tms-logistics-lynx"
$DevContainerName = "tms-logistics-lynx-dev"
$Tag = "latest"
$ProdPort = "3000"
$DevPort = "3001"

# Function to print colored output
function Write-Header {
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "  $ProjectName - Docker Setup" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
}

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Function to check prerequisites
function Test-Prerequisites {
    Write-Status "Checking prerequisites..."
    
    # Check if Docker is installed
    try {
        $null = Get-Command docker -ErrorAction Stop
    }
    catch {
        Write-Error "Docker is not installed. Please install Docker Desktop first."
        Write-Status "Download from: https://www.docker.com/products/docker-desktop"
        exit 1
    }
    
    # Check if Docker is running
    try {
        docker info | Out-Null
    }
    catch {
        Write-Error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    }
    
    # Check if Docker Compose is available
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
    }
    catch {
        Write-Warning "Docker Compose not found. Using Docker commands instead."
    }
    
    Write-Success "Prerequisites check passed!"
}

# Function to create environment file
function Set-Environment {
    Write-Status "Setting up environment configuration..."
    
    if (-not (Test-Path ".env")) {
        if (Test-Path "env.example") {
            Copy-Item "env.example" ".env"
            Write-Success "Created .env file from env.example"
            Write-Warning "Please edit .env file with your actual configuration values"
        }
        else {
            Write-Error "env.example file not found. Creating basic .env file..."
            New-BasicEnvFile
        }
    }
    else {
        Write-Warning ".env file already exists. Skipping creation."
    }
    
    # Validate required environment variables
    Test-Environment
}

# Function to create basic environment file
function New-BasicEnvFile {
    $envContent = @"
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
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Success "Created basic .env file"
}

# Function to validate environment variables
function Test-Environment {
    Write-Status "Validating environment configuration..."
    
    $missingVars = @()
    
    # Check required variables
    $envContent = Get-Content ".env" -Raw
    if ($envContent -notmatch "SUPABASE_URL=https://") {
        $missingVars += "SUPABASE_URL"
    }
    
    if ($envContent -notmatch "SUPABASE_ANON_KEY=your-anon-key") {
        $missingVars += "SUPABASE_ANON_KEY"
    }
    
    if ($envContent -notmatch "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key") {
        $missingVars += "SUPABASE_SERVICE_ROLE_KEY"
    }
    
    if ($envContent -notmatch "TRANSBOT_HMAC_SECRET=your-hmac-secret-key") {
        $missingVars += "TRANSBOT_HMAC_SECRET"
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Warning "The following required environment variables need to be configured:"
        foreach ($var in $missingVars) {
            Write-Host "  - $var" -ForegroundColor Yellow
        }
        Write-Host ""
        Write-Status "Please edit the .env file and update these values before running the application."
        Write-Host ""
        Write-Status "You can continue with the setup, but the application may not work properly until these are configured."
        Read-Host "Press Enter to continue or Ctrl+C to exit and configure .env file"
    }
    else {
        Write-Success "Environment configuration looks good!"
    }
}

# Function to create necessary directories
function New-Directories {
    Write-Status "Creating necessary directories..."
    
    New-Item -ItemType Directory -Force -Path "logs" | Out-Null
    New-Item -ItemType Directory -Force -Path "artifacts" | Out-Null
    New-Item -ItemType Directory -Force -Path "data" | Out-Null
    
    Write-Success "Directories created successfully!"
}

# Function to build Docker image
function New-DockerImage {
    Write-Status "Building Docker image..."
    
    docker build -t "${ImageName}:${Tag}" .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker image built successfully!"
    }
    else {
        Write-Error "Failed to build Docker image."
        exit 1
    }
}

# Function to start application
function Start-Application {
    Write-Status "Starting TMS application..."
    
    # Stop existing containers
    Stop-ContainersQuiet
    
    # Start with Docker Compose if available
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
        Write-Status "Using Docker Compose to start application..."
        docker-compose up -d
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Application started successfully with Docker Compose!"
            Write-Status "Production: http://localhost:${ProdPort}"
            Write-Status "To view logs: docker-compose logs -f"
        }
        else {
            Write-Error "Failed to start application with Docker Compose."
            exit 1
        }
    }
    catch {
        # Fallback to manual Docker commands
        Write-Status "Using Docker commands to start application..."
        
        docker run -d `
            --name $ContainerName `
            -p "${ProdPort}:3000" `
            --env-file .env `
            -v "${PWD}\logs:/app/logs" `
            -v "${PWD}\artifacts:/app/artifacts" `
            --restart unless-stopped `
            "${ImageName}:${Tag}"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Application started successfully!"
            Write-Status "Production: http://localhost:${ProdPort}"
            Write-Status "To view logs: docker logs -f ${ContainerName}"
        }
        else {
            Write-Error "Failed to start application."
            exit 1
        }
    }
}

# Function to start development mode
function Start-Development {
    Write-Status "Starting TMS application in development mode..."
    
    # Stop existing containers
    Stop-ContainersQuiet
    
    # Start with Docker Compose if available
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
        Write-Status "Using Docker Compose to start development server..."
        docker-compose --profile dev up -d
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Development server started successfully!"
            Write-Status "Development: http://localhost:${DevPort}"
            Write-Status "To view logs: docker-compose logs -f"
        }
        else {
            Write-Error "Failed to start development server."
            exit 1
        }
    }
    catch {
        # Fallback to manual Docker commands
        Write-Status "Using Docker commands to start development server..."
        
        docker run -d `
            --name $DevContainerName `
            -p "${DevPort}:3000" `
            --env-file .env `
            -v "${PWD}\src:/app/src" `
            -v "${PWD}\public:/app/public" `
            -v "${PWD}\logs:/app/logs" `
            -v "${PWD}\artifacts:/app/artifacts" `
            --restart unless-stopped `
            "${ImageName}:${Tag}" `
            npm run dev
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Development server started successfully!"
            Write-Status "Development: http://localhost:${DevPort}"
            Write-Status "To view logs: docker logs -f ${DevContainerName}"
        }
        else {
            Write-Error "Failed to start development server."
            exit 1
        }
    }
}

# Function to stop containers quietly
function Stop-ContainersQuiet {
    # Stop production container
    $existingContainer = docker ps -q -f "name=${ContainerName}"
    if ($existingContainer) {
        docker stop $ContainerName | Out-Null
        docker rm $ContainerName | Out-Null
    }
    
    # Stop development container
    $existingDevContainer = docker ps -q -f "name=${DevContainerName}"
    if ($existingDevContainer) {
        docker stop $DevContainerName | Out-Null
        docker rm $DevContainerName | Out-Null
    }
}

# Function to stop containers
function Stop-Containers {
    Write-Status "Stopping TMS containers..."
    
    # Stop production container
    $prodContainer = docker ps -q -f "name=${ContainerName}"
    if ($prodContainer) {
        docker stop $ContainerName
        docker rm $ContainerName
        Write-Success "Production container stopped and removed."
    }
    else {
        Write-Warning "Production container not running."
    }
    
    # Stop development container
    $devContainer = docker ps -q -f "name=${DevContainerName}"
    if ($devContainer) {
        docker stop $DevContainerName
        docker rm $DevContainerName
        Write-Success "Development container stopped and removed."
    }
    else {
        Write-Warning "Development container not running."
    }
    
    # Stop Docker Compose if running
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
        docker-compose down | Out-Null
    }
    catch {
        # Docker Compose not available
    }
}

# Function to show status
function Show-Status {
    Write-Status "Container status:"
    Write-Host ""
    
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
        docker-compose ps
    }
    catch {
        docker ps -a --filter "name=${ContainerName}"
        docker ps -a --filter "name=${DevContainerName}"
    }
    
    Write-Host ""
    Write-Status "Image status:"
    docker images $ImageName
    
    Write-Host ""
    Write-Status "Resource usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" | Select-Object -First 1
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" | Where-Object { $_ -match $ImageName } | ForEach-Object { $_ } | Select-Object -First 1
}

# Function to show logs
function Show-Logs {
    Write-Status "Showing container logs..."
    
    try {
        $null = Get-Command docker-compose -ErrorAction Stop
        docker-compose logs -f
    }
    catch {
        $prodContainer = docker ps -q -f "name=${ContainerName}"
        if ($prodContainer) {
            docker logs -f $ContainerName
        }
        elseif (docker ps -q -f "name=${DevContainerName}") {
            docker logs -f $DevContainerName
        }
        else {
            Write-Warning "No TMS containers are running."
        }
    }
}

# Function to clean up
function Remove-DockerResources {
    Write-Status "Cleaning up Docker resources..."
    
    # Stop containers
    Stop-Containers
    
    # Remove images
    $image = docker images -q "${ImageName}:${Tag}"
    if ($image) {
        docker rmi "${ImageName}:${Tag}"
        Write-Success "Docker image removed."
    }
    else {
        Write-Warning "Docker image not found."
    }
    
    # Remove unused Docker resources
    docker system prune -f
    Write-Success "Docker cleanup completed."
}

# Function to show help
function Show-Help {
    Write-Header
    Write-Host ""
    Write-Host "Usage: .\docker-setup.ps1 [COMMAND]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Cyan
    Write-Host "  setup     - Initial setup (check prerequisites, create .env, build image)"
    Write-Host "  start     - Start the application in production mode"
    Write-Host "  dev       - Start the application in development mode"
    Write-Host "  stop      - Stop all TMS containers"
    Write-Host "  status    - Show container and image status"
    Write-Host "  logs      - Show container logs"
    Write-Host "  clean     - Stop containers and clean up Docker resources"
    Write-Host "  help      - Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\docker-setup.ps1 setup    # First time setup"
    Write-Host "  .\docker-setup.ps1 start    # Start production server"
    Write-Host "  .\docker-setup.ps1 dev      # Start development server"
    Write-Host "  .\docker-setup.ps1 stop     # Stop all containers"
    Write-Host "  .\docker-setup.ps1 status   # Check status"
    Write-Host ""
    Write-Host "After setup, you can access:" -ForegroundColor Cyan
    Write-Host "  Production: http://localhost:${ProdPort}"
    Write-Host "  Development: http://localhost:${DevPort}"
    Write-Host ""
}

# Function to run initial setup
function Initialize-Setup {
    Write-Header
    Write-Status "Running initial setup..."
    
    Test-Prerequisites
    Set-Environment
    New-Directories
    New-DockerImage
    
    Write-Success "Setup completed successfully!"
    Write-Host ""
    Write-Status "Next steps:"
    Write-Host "  1. Edit .env file with your actual configuration values"
    Write-Host "  2. Run: .\docker-setup.ps1 start (for production) or .\docker-setup.ps1 dev (for development)"
    Write-Host "  3. Access the application at http://localhost:${ProdPort} or http://localhost:${DevPort}"
    Write-Host ""
}

# Main script logic
function Main {
    switch ($Command.ToLower()) {
        "setup" {
            Initialize-Setup
        }
        "start" {
            Write-Header
            Start-Application
        }
        "dev" {
            Write-Header
            Start-Development
        }
        "stop" {
            Write-Header
            Stop-Containers
        }
        "status" {
            Write-Header
            Show-Status
        }
        "logs" {
            Show-Logs
        }
        "clean" {
            Write-Header
            Remove-DockerResources
        }
        "help" {
            Show-Help
        }
        "" {
            Show-Help
        }
        default {
            Write-Error "Unknown command: $Command"
            Show-Help
            exit 1
        }
    }
}

# Run main function
Main

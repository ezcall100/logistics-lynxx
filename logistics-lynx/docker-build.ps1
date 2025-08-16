# Docker build and run script for TMS Logistics Lynx (PowerShell)
# Usage: .\docker-build.ps1 [build|run|dev|stop|clean]

param(
    [Parameter(Position=0)]
    [string]$Command = ""
)

# Configuration
$ImageName = "tms-logistics-lynx"
$ContainerName = "tms-logistics-lynx"
$Tag = "latest"
$Port = "3000"

# Function to print colored output
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

# Function to check if Docker is running
function Test-Docker {
    try {
        docker info | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to build the Docker image
function Build-Image {
    Write-Status "Building Docker image..."
    
    # Check if .env file exists
    if (-not (Test-Path ".env")) {
        Write-Warning ".env file not found. Creating from env.example..."
        if (Test-Path "env.example") {
            Copy-Item "env.example" ".env"
            Write-Warning "Please update .env file with your configuration before running."
        }
        else {
            Write-Error "env.example file not found. Please create a .env file manually."
            exit 1
        }
    }
    
    # Build the image
    docker build -t "${ImageName}:${Tag}" .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker image built successfully!"
    }
    else {
        Write-Error "Failed to build Docker image."
        exit 1
    }
}

# Function to run the container
function Start-Container {
    Write-Status "Starting TMS application..."
    
    # Stop existing container if running
    $existingContainer = docker ps -q -f "name=${ContainerName}"
    if ($existingContainer) {
        Write-Warning "Stopping existing container..."
        docker stop $ContainerName
        docker rm $ContainerName
    }
    
    # Run the container
    docker run -d `
        --name $ContainerName `
        -p "${Port}:3000" `
        --env-file .env `
        -v "${PWD}\logs:/app/logs" `
        -v "${PWD}\artifacts:/app/artifacts" `
        --restart unless-stopped `
        "${ImageName}:${Tag}"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "TMS application started successfully!"
        Write-Status "Application is running at: http://localhost:${Port}"
        Write-Status "To view logs: docker logs -f ${ContainerName}"
    }
    else {
        Write-Error "Failed to start TMS application."
        exit 1
    }
}

# Function to run in development mode
function Start-DevContainer {
    Write-Status "Starting TMS application in development mode..."
    
    # Stop existing dev container if running
    $existingDevContainer = docker ps -q -f "name=${ContainerName}-dev"
    if ($existingDevContainer) {
        Write-Warning "Stopping existing dev container..."
        docker stop "${ContainerName}-dev"
        docker rm "${ContainerName}-dev"
    }
    
    # Run the development container
    docker run -d `
        --name "${ContainerName}-dev" `
        -p "3001:3000" `
        --env-file .env `
        -v "${PWD}\src:/app/src" `
        -v "${PWD}\public:/app/public" `
        -v "${PWD}\logs:/app/logs" `
        -v "${PWD}\artifacts:/app/artifacts" `
        --restart unless-stopped `
        "${ImageName}:${Tag}" `
        npm run dev
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "TMS development server started successfully!"
        Write-Status "Development server is running at: http://localhost:3001"
        Write-Status "To view logs: docker logs -f ${ContainerName}-dev"
    }
    else {
        Write-Error "Failed to start TMS development server."
        exit 1
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
    $devContainer = docker ps -q -f "name=${ContainerName}-dev"
    if ($devContainer) {
        docker stop "${ContainerName}-dev"
        docker rm "${ContainerName}-dev"
        Write-Success "Development container stopped and removed."
    }
    else {
        Write-Warning "Development container not running."
    }
}

# Function to clean up Docker resources
function Clean-Docker {
    Write-Status "Cleaning up Docker resources..."
    
    # Stop and remove containers
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

# Function to show usage
function Show-Usage {
    Write-Host "Usage: .\docker-build.ps1 [COMMAND]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Cyan
    Write-Host "  build   - Build the Docker image"
    Write-Host "  run     - Build and run the production container"
    Write-Host "  dev     - Build and run the development container"
    Write-Host "  stop    - Stop all TMS containers"
    Write-Host "  clean   - Stop containers and clean up Docker resources"
    Write-Host "  logs    - Show container logs"
    Write-Host "  status  - Show container status"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\docker-build.ps1 build    # Build the Docker image"
    Write-Host "  .\docker-build.ps1 run      # Build and run production"
    Write-Host "  .\docker-build.ps1 dev      # Build and run development"
    Write-Host "  .\docker-build.ps1 stop     # Stop all containers"
}

# Function to show logs
function Show-Logs {
    $prodContainer = docker ps -q -f "name=${ContainerName}"
    if ($prodContainer) {
        Write-Status "Showing production container logs..."
        docker logs -f $ContainerName
    }
    elseif (docker ps -q -f "name=${ContainerName}-dev") {
        Write-Status "Showing development container logs..."
        docker logs -f "${ContainerName}-dev"
    }
    else {
        Write-Warning "No TMS containers are running."
    }
}

# Function to show status
function Show-Status {
    Write-Status "Container status:"
    docker ps -a --filter "name=${ContainerName}"
    Write-Host ""
    Write-Status "Image status:"
    docker images $ImageName
}

# Main script logic
function Main {
    if (-not (Test-Docker)) {
        Write-Error "Docker is not running. Please start Docker and try again."
        exit 1
    }
    
    switch ($Command.ToLower()) {
        "build" {
            Build-Image
        }
        "run" {
            Build-Image
            Start-Container
        }
        "dev" {
            Build-Image
            Start-DevContainer
        }
        "stop" {
            Stop-Containers
        }
        "clean" {
            Clean-Docker
        }
        "logs" {
            Show-Logs
        }
        "status" {
            Show-Status
        }
        "help" {
            Show-Usage
        }
        "" {
            Show-Usage
        }
        default {
            Write-Error "Unknown command: $Command"
            Show-Usage
            exit 1
        }
    }
}

# Run main function
Main

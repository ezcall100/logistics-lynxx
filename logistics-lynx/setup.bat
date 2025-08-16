@echo off
REM TMS Logistics Lynx - Simple Docker Setup for Windows
REM Usage: setup.bat [setup|start|dev|stop|status|logs]

setlocal enabledelayedexpansion

REM Configuration
set PROJECT_NAME=TMS Logistics Lynx
set IMAGE_NAME=tms-logistics-lynx
set CONTAINER_NAME=tms-logistics-lynx
set DEV_CONTAINER_NAME=tms-logistics-lynx-dev
set TAG=latest
set PROD_PORT=3000
set DEV_PORT=3001

REM Colors (Windows 10+)
set "BLUE=[94m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "CYAN=[96m"
set "NC=[0m"

echo %CYAN%================================%NC%
echo %CYAN%  %PROJECT_NAME% - Docker Setup%NC%
echo %CYAN%================================%NC%
echo.

if "%1"=="" goto :help
if "%1"=="help" goto :help
if "%1"=="-h" goto :help
if "%1"=="--help" goto :help

if "%1"=="setup" goto :setup
if "%1"=="start" goto :start
if "%1"=="dev" goto :dev
if "%1"=="stop" goto :stop
if "%1"=="status" goto :status
if "%1"=="logs" goto :logs
if "%1"=="clean" goto :clean

echo %RED%[ERROR] Unknown command: %1%NC%
goto :help

:setup
echo %BLUE%[INFO] Running initial setup...%NC%
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR] Docker is not installed. Please install Docker Desktop first.%NC%
    echo %BLUE%[INFO] Download from: https://www.docker.com/products/docker-desktop%NC%
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR] Docker is not running. Please start Docker Desktop and try again.%NC%
    pause
    exit /b 1
)

echo %GREEN%[SUCCESS] Prerequisites check passed!%NC%

REM Create .env file if it doesn't exist
if not exist ".env" (
    if exist "env.example" (
        copy "env.example" ".env" >nul
        echo %GREEN%[SUCCESS] Created .env file from env.example%NC%
        echo %YELLOW%[WARNING] Please edit .env file with your actual configuration values%NC%
    ) else (
        echo %RED%[ERROR] env.example file not found. Please create a .env file manually.%NC%
        pause
        exit /b 1
    )
) else (
    echo %YELLOW%[WARNING] .env file already exists. Skipping creation.%NC%
)

REM Create directories
if not exist "logs" mkdir logs
if not exist "artifacts" mkdir artifacts
if not exist "data" mkdir data
echo %GREEN%[SUCCESS] Directories created successfully!%NC%

REM Build Docker image
echo %BLUE%[INFO] Building Docker image...%NC%
docker build -t %IMAGE_NAME%:%TAG% .
if errorlevel 1 (
    echo %RED%[ERROR] Failed to build Docker image.%NC%
    pause
    exit /b 1
)
echo %GREEN%[SUCCESS] Docker image built successfully!%NC%

echo.
echo %GREEN%[SUCCESS] Setup completed successfully!%NC%
echo.
echo %BLUE%[INFO] Next steps:%NC%
echo   1. Edit .env file with your actual configuration values
echo   2. Run: setup.bat start (for production) or setup.bat dev (for development)
echo   3. Access the application at http://localhost:%PROD_PORT% or http://localhost:%DEV_PORT%
echo.
goto :end

:start
echo %BLUE%[INFO] Starting TMS application in production mode...%NC%

REM Stop existing containers
docker stop %CONTAINER_NAME% >nul 2>&1
docker rm %CONTAINER_NAME% >nul 2>&1

REM Start production container
docker run -d --name %CONTAINER_NAME% -p %PROD_PORT%:3000 --env-file .env -v "%CD%\logs:/app/logs" -v "%CD%\artifacts:/app/artifacts" --restart unless-stopped %IMAGE_NAME%:%TAG%
if errorlevel 1 (
    echo %RED%[ERROR] Failed to start application.%NC%
    pause
    exit /b 1
)

echo %GREEN%[SUCCESS] Application started successfully!%NC%
echo %BLUE%[INFO] Production: http://localhost:%PROD_PORT%%NC%
echo %BLUE%[INFO] To view logs: docker logs -f %CONTAINER_NAME%%NC%
goto :end

:dev
echo %BLUE%[INFO] Starting TMS application in development mode...%NC%

REM Stop existing containers
docker stop %DEV_CONTAINER_NAME% >nul 2>&1
docker rm %DEV_CONTAINER_NAME% >nul 2>&1

REM Start development container
docker run -d --name %DEV_CONTAINER_NAME% -p %DEV_PORT%:3000 --env-file .env -v "%CD%\src:/app/src" -v "%CD%\public:/app/public" -v "%CD%\logs:/app/logs" -v "%CD%\artifacts:/app/artifacts" --restart unless-stopped %IMAGE_NAME%:%TAG% npm run dev
if errorlevel 1 (
    echo %RED%[ERROR] Failed to start development server.%NC%
    pause
    exit /b 1
)

echo %GREEN%[SUCCESS] Development server started successfully!%NC%
echo %BLUE%[INFO] Development: http://localhost:%DEV_PORT%%NC%
echo %BLUE%[INFO] To view logs: docker logs -f %DEV_CONTAINER_NAME%%NC%
goto :end

:stop
echo %BLUE%[INFO] Stopping TMS containers...%NC%

REM Stop production container
docker ps -q -f name=%CONTAINER_NAME% >nul 2>&1
if not errorlevel 1 (
    docker stop %CONTAINER_NAME%
    docker rm %CONTAINER_NAME%
    echo %GREEN%[SUCCESS] Production container stopped and removed.%NC%
) else (
    echo %YELLOW%[WARNING] Production container not running.%NC%
)

REM Stop development container
docker ps -q -f name=%DEV_CONTAINER_NAME% >nul 2>&1
if not errorlevel 1 (
    docker stop %DEV_CONTAINER_NAME%
    docker rm %DEV_CONTAINER_NAME%
    echo %GREEN%[SUCCESS] Development container stopped and removed.%NC%
) else (
    echo %YELLOW%[WARNING] Development container not running.%NC%
)

goto :end

:status
echo %BLUE%[INFO] Container status:%NC%
echo.
docker ps -a --filter "name=%CONTAINER_NAME%"
docker ps -a --filter "name=%DEV_CONTAINER_NAME%"
echo.
echo %BLUE%[INFO] Image status:%NC%
docker images %IMAGE_NAME%
goto :end

:logs
echo %BLUE%[INFO] Showing container logs...%NC%
docker ps -q -f name=%CONTAINER_NAME% >nul 2>&1
if not errorlevel 1 (
    docker logs -f %CONTAINER_NAME%
) else (
    docker ps -q -f name=%DEV_CONTAINER_NAME% >nul 2>&1
    if not errorlevel 1 (
        docker logs -f %DEV_CONTAINER_NAME%
    ) else (
        echo %YELLOW%[WARNING] No TMS containers are running.%NC%
    )
)
goto :end

:clean
echo %BLUE%[INFO] Cleaning up Docker resources...%NC%

REM Stop containers
call :stop

REM Remove images
docker images -q %IMAGE_NAME%:%TAG% >nul 2>&1
if not errorlevel 1 (
    docker rmi %IMAGE_NAME%:%TAG%
    echo %GREEN%[SUCCESS] Docker image removed.%NC%
) else (
    echo %YELLOW%[WARNING] Docker image not found.%NC%
)

REM Remove unused Docker resources
docker system prune -f
echo %GREEN%[SUCCESS] Docker cleanup completed.%NC%
goto :end

:help
echo Usage: setup.bat [COMMAND]
echo.
echo Commands:
echo   setup     - Initial setup (check prerequisites, create .env, build image)
echo   start     - Start the application in production mode
echo   dev       - Start the application in development mode
echo   stop      - Stop all TMS containers
echo   status    - Show container and image status
echo   logs      - Show container logs
echo   clean     - Stop containers and clean up Docker resources
echo   help      - Show this help message
echo.
echo Examples:
echo   setup.bat setup    # First time setup
echo   setup.bat start    # Start production server
echo   setup.bat dev      # Start development server
echo   setup.bat stop     # Stop all containers
echo   setup.bat status   # Check status
echo.
echo After setup, you can access:
echo   Production: http://localhost:%PROD_PORT%
echo   Development: http://localhost:%DEV_PORT%
echo.
goto :end

:end
pause

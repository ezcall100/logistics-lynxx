@echo off
echo Installing Autonomous N8N Monitor as Windows Service...

REM Check if nssm is available
where nssm >nul 2>nul
if %errorlevel% neq 0 (
    echo NSSM (Non-Sucking Service Manager) is required to install the service.
    echo Please download it from: https://nssm.cc/download
    echo Extract nssm.exe to this directory and run this script again.
    pause
    exit /b 1
)

REM Set paths
set SERVICE_NAME=AutonomousN8NMonitor
set NODE_PATH=node
set SCRIPT_PATH=%~dp0autonomous-n8n-monitor.cjs
set WORKING_DIR=%~dp0

echo Service Name: %SERVICE_NAME%
echo Node Path: %NODE_PATH%
echo Script Path: %SCRIPT_PATH%
echo Working Directory: %WORKING_DIR%

REM Install the service
echo Installing service...
nssm install %SERVICE_NAME% %NODE_PATH% %SCRIPT_PATH%
if %errorlevel% neq 0 (
    echo Failed to install service
    pause
    exit /b 1
)

REM Set working directory
nssm set %SERVICE_NAME% AppDirectory %WORKING_DIR%

REM Set description
nssm set %SERVICE_NAME% Description "Autonomous N8N Monitor - 24/7 Continuous Operation"

REM Set startup type to automatic
nssm set %SERVICE_NAME% Start SERVICE_AUTO_START

REM Set environment variables
nssm set %SERVICE_NAME% AppEnvironmentExtra NODE_ENV=production
nssm set %SERVICE_NAME% AppEnvironmentExtra MONITOR_INTERVAL=30000
nssm set %SERVICE_NAME% AppEnvironmentExtra HEALTH_CHECK_INTERVAL=300000

REM Set restart parameters
nssm set %SERVICE_NAME% AppRestartDelay 10000
nssm set %SERVICE_NAME% AppStopMethodSkip 0
nssm set %SERVICE_NAME% AppStopMethodConsole 1500
nssm set %SERVICE_NAME% AppStopMethodWindow 1500
nssm set %SERVICE_NAME% AppStopMethodThreads 1500

echo Service installed successfully!
echo.
echo To start the service: net start %SERVICE_NAME%
echo To stop the service: net stop %SERVICE_NAME%
echo To remove the service: nssm remove %SERVICE_NAME% confirm
echo.
echo The service will start automatically when Windows boots.
echo.
pause

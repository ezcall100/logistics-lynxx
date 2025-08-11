@echo off
echo ========================================
echo 🤖 24/7 AUTONOMOUS TMS SYSTEM INSTALLER
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ This script must be run as Administrator
    echo Please right-click and "Run as Administrator"
    pause
    exit /b 1
)

echo ✅ Running as Administrator
echo.

REM Set paths
set "SERVICE_NAME=AutonomousTMS24-7"
set "SERVICE_DISPLAY_NAME=24/7 Autonomous TMS System"
set "SERVICE_DESCRIPTION=Autonomous TMS system running 24/7 without human intervention"
set "NODE_PATH=node"
set "SCRIPT_PATH=%~dp024-7-autonomous-system.cjs"
set "WORKING_DIR=%~dp0"

echo 📁 Working Directory: %WORKING_DIR%
echo 🔧 Script Path: %SCRIPT_PATH%
echo 🤖 Service Name: %SERVICE_NAME%
echo.

REM Check if Node.js is installed
%NODE_PATH% --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
%NODE_PATH% --version
echo.

REM Check if script exists
if not exist "%SCRIPT_PATH%" (
    echo ❌ Autonomous system script not found: %SCRIPT_PATH%
    echo Please ensure 24-7-autonomous-system.cjs exists in the same directory
    pause
    exit /b 1
)

echo ✅ Autonomous system script found
echo.

REM Check if service already exists
sc query "%SERVICE_NAME%" >nul 2>&1
if %errorLevel% equ 0 (
    echo ⚠️  Service already exists. Stopping and removing...
    net stop "%SERVICE_NAME%" >nul 2>&1
    sc delete "%SERVICE_NAME%" >nul 2>&1
    timeout /t 2 >nul
)

echo 🚀 Installing 24/7 Autonomous TMS Service...
echo.

REM Create the service
sc create "%SERVICE_NAME%" binPath= "\"%NODE_PATH%\" \"%SCRIPT_PATH%\"" DisplayName= "%SERVICE_DISPLAY_NAME%" start= auto

if %errorLevel% neq 0 (
    echo ❌ Failed to create service
    pause
    exit /b 1
)

echo ✅ Service created successfully
echo.

REM Set service description
sc description "%SERVICE_NAME%" "%SERVICE_DESCRIPTION%"

REM Configure service to restart on failure
sc failure "%SERVICE_NAME%" reset= 86400 actions= restart/60000/restart/60000/restart/60000

REM Set service to run with Local System account
sc config "%SERVICE_NAME%" obj= "LocalSystem"

REM Set working directory
sc config "%SERVICE_NAME%" AppDirectory= "%WORKING_DIR%"

echo ✅ Service configured successfully
echo.

REM Start the service
echo 🚀 Starting 24/7 Autonomous TMS Service...
net start "%SERVICE_NAME%"

if %errorLevel% neq 0 (
    echo ❌ Failed to start service
    echo.
    echo 🔍 Checking service status...
    sc query "%SERVICE_NAME%"
    pause
    exit /b 1
)

echo ✅ Service started successfully
echo.

REM Show service status
echo 📊 Service Status:
sc query "%SERVICE_NAME%"
echo.

echo ========================================
echo 🎉 24/7 AUTONOMOUS TMS SYSTEM INSTALLED
echo ========================================
echo.
echo ✅ Service Name: %SERVICE_NAME%
echo ✅ Display Name: %SERVICE_DISPLAY_NAME%
echo ✅ Status: RUNNING
echo ✅ Auto-start: ENABLED
echo ✅ Auto-restart: ENABLED
echo.
echo 📋 Service Management Commands:
echo    Start:   net start "%SERVICE_NAME%"
echo    Stop:    net stop "%SERVICE_NAME%"
echo    Status:  sc query "%SERVICE_NAME%"
echo    Remove:  sc delete "%SERVICE_NAME%"
echo.
echo 🔗 N8N Webhook: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook
echo 🤖 Agents: 250 autonomous agents running 24/7
echo ⏰ Monitoring: Continuous health checks every 2 minutes
echo.
echo 🚀 The system will now run 24/7 without human intervention!
echo.

pause

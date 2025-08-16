# TMS Logistics Lynx - Supabase CLI Setup Script (PowerShell)
# This script helps you set up Supabase locally without Docker

param(
    [Parameter(Position=0)]
    [string]$Command = ""
)

# Configuration
$ProjectName = "TMS Logistics Lynx"

# Function to print colored output
function Write-Header {
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "  $ProjectName - Supabase Setup" -ForegroundColor Cyan
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
    
    # Check if Node.js is installed
    try {
        $null = Get-Command node -ErrorAction Stop
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js first."
        Write-Status "Download from: https://nodejs.org/"
        exit 1
    }
    
    # Check if npm is installed
    try {
        $null = Get-Command npm -ErrorAction Stop
    }
    catch {
        Write-Error "npm is not installed. Please install npm first."
        exit 1
    }
    
    # Check if Git is installed
    try {
        $null = Get-Command git -ErrorAction Stop
    }
    catch {
        Write-Warning "Git is not installed. Some features may not work properly."
    }
    
    Write-Success "Prerequisites check passed!"
}

# Function to install Supabase CLI
function Install-SupabaseCLI {
    Write-Status "Installing Supabase CLI..."
    
    # Check if Supabase CLI is already installed
    try {
        $null = Get-Command supabase -ErrorAction Stop
        Write-Warning "Supabase CLI is already installed."
        return
    }
    catch {
        # CLI not found, proceed with installation
    }
    
    # Try to install using npm
    try {
        npm install -g supabase
        Write-Success "Supabase CLI installed successfully!"
    }
    catch {
        Write-Error "Failed to install Supabase CLI using npm."
        Write-Status "Alternative installation methods:"
        Write-Status "  Windows: winget install Supabase.CLI"
        Write-Status "  Or download from: https://supabase.com/docs/reference/cli/install"
        exit 1
    }
}

# Function to initialize Supabase project
function Initialize-Supabase {
    Write-Status "Initializing Supabase project..."
    
    # Check if supabase directory already exists
    if (Test-Path "supabase") {
        Write-Warning "Supabase directory already exists. Skipping initialization."
        return
    }
    
    # Initialize Supabase project
    try {
        supabase init
        Write-Success "Supabase project initialized successfully!"
    }
    catch {
        Write-Error "Failed to initialize Supabase project."
        exit 1
    }
}

# Function to start Supabase
function Start-Supabase {
    Write-Status "Starting Supabase locally..."
    
    # Start Supabase
    try {
        supabase start
        Write-Success "Supabase started successfully!"
        
        # Get and display status
        Write-Status "Supabase status:"
        supabase status
        
        # Display access URLs
        Write-Host ""
        Write-Status "Access URLs:"
        Write-Host "  Dashboard: http://127.0.0.1:54323"
        Write-Host "  API: http://127.0.0.1:54321"
        Write-Host "  Database: http://127.0.0.1:54322"
        
    }
    catch {
        Write-Error "Failed to start Supabase."
        exit 1
    }
}

# Function to create environment file
function New-EnvFile {
    Write-Status "Creating environment configuration..."
    
    if (-not (Test-Path ".env")) {
        # Get Supabase credentials
        $statusOutput = supabase status --output json
        $statusJson = $statusOutput | ConvertFrom-Json
        
        $supabaseUrl = $statusJson.api
        $supabaseAnonKey = $statusJson.anon_key
        $supabaseServiceRoleKey = $statusJson.service_role_key
        $supabaseDbUrl = $statusJson.db_url
        
        # Create .env file content
        $envContent = @"
# Supabase Configuration (Auto-generated)
SUPABASE_URL=$supabaseUrl
SUPABASE_ANON_KEY=$supabaseAnonKey
SUPABASE_SERVICE_ROLE_KEY=$supabaseServiceRoleKey
SUPABASE_DB_URL=$supabaseDbUrl

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
"@
        
        $envContent | Out-File -FilePath ".env" -Encoding UTF8
        Write-Success "Environment file created successfully!"
        Write-Warning "Please review and update the .env file with your specific configuration."
    }
    else {
        Write-Warning ".env file already exists. Skipping creation."
    }
}

# Function to install Supabase client
function Install-SupabaseClient {
    Write-Status "Installing Supabase client library..."
    
    try {
        npm install @supabase/supabase-js
        Write-Success "Supabase client installed successfully!"
    }
    catch {
        Write-Error "Failed to install Supabase client."
        exit 1
    }
}

# Function to create Supabase client file
function New-SupabaseClient {
    Write-Status "Creating Supabase client configuration..."
    
    # Create lib directory if it doesn't exist
    if (-not (Test-Path "src/lib")) {
        New-Item -ItemType Directory -Path "src/lib" -Force | Out-Null
    }
    
    # Create supabase client file content
    $clientContent = @'
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
'@
    
    $clientContent | Out-File -FilePath "src/lib/supabase.ts" -Encoding UTF8
    Write-Success "Supabase client configuration created!"
}

# Function to show help
function Show-Help {
    Write-Header
    Write-Host ""
    Write-Host "Usage: .\supabase-setup.ps1 [COMMAND]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Cyan
    Write-Host "  setup     - Complete setup (install CLI, init project, start Supabase)"
    Write-Host "  install   - Install Supabase CLI only"
    Write-Host "  init      - Initialize Supabase project"
    Write-Host "  start     - Start Supabase locally"
    Write-Host "  stop      - Stop Supabase"
    Write-Host "  status    - Show Supabase status"
    Write-Host "  reset     - Reset Supabase database"
    Write-Host "  help      - Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\supabase-setup.ps1 setup    # Complete setup"
    Write-Host "  .\supabase-setup.ps1 start    # Start Supabase"
    Write-Host "  .\supabase-setup.ps1 stop     # Stop Supabase"
    Write-Host "  .\supabase-setup.ps1 status   # Check status"
    Write-Host ""
}

# Function to stop Supabase
function Stop-Supabase {
    Write-Status "Stopping Supabase..."
    
    try {
        supabase stop
        Write-Success "Supabase stopped successfully!"
    }
    catch {
        Write-Error "Failed to stop Supabase."
        exit 1
    }
}

# Function to show status
function Show-Status {
    Write-Status "Supabase status:"
    supabase status
}

# Function to reset database
function Reset-Database {
    Write-Status "Resetting Supabase database..."
    
    try {
        supabase db reset
        Write-Success "Database reset successfully!"
    }
    catch {
        Write-Error "Failed to reset database."
        exit 1
    }
}

# Function to run complete setup
function Run-Setup {
    Write-Header
    Write-Status "Running complete Supabase setup..."
    
    Test-Prerequisites
    Install-SupabaseCLI
    Initialize-Supabase
    Start-Supabase
    New-EnvFile
    Install-SupabaseClient
    New-SupabaseClient
    
    Write-Success "Setup completed successfully!"
    Write-Host ""
    Write-Status "Next steps:"
    Write-Host "  1. Review and update the .env file"
    Write-Host "  2. Start your TMS application: npm run dev"
    Write-Host "  3. Access Supabase Dashboard: http://127.0.0.1:54323"
    Write-Host "  4. Access your TMS app: http://localhost:3000"
    Write-Host ""
}

# Main script logic
function Main {
    switch ($Command.ToLower()) {
        "setup" {
            Run-Setup
        }
        "install" {
            Write-Header
            Test-Prerequisites
            Install-SupabaseCLI
        }
        "init" {
            Write-Header
            Initialize-Supabase
        }
        "start" {
            Write-Header
            Start-Supabase
        }
        "stop" {
            Write-Header
            Stop-Supabase
        }
        "status" {
            Write-Header
            Show-Status
        }
        "reset" {
            Write-Header
            Reset-Database
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

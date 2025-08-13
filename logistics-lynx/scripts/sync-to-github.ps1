# 🚀 Auto-Sync Script for logistics-lynx Repository (PowerShell)
# Automatically syncs local changes to GitHub repository

param(
    [string]$Branch = "feature/001-public-website-scaffold",
    [string]$CommitMessage = ""
)

# Configuration
$RepoName = "logistics-lynxx"
$GitHubUser = "ezcall100"
$RemoteUrl = "https://github.com/$GitHubUser/$RepoName.git"

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Logging function
function Write-Log {
    param([string]$Message, [string]$Color = "White")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$Timestamp] $Message" -ForegroundColor $Color
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

# Get the git root directory first
try {
    $GitRoot = git rev-parse --show-toplevel 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Git repository not found. Please ensure you're in a git repository."
        exit 1
    }
    Write-Log "Git root directory: $GitRoot" $Blue
} catch {
    Write-Error "Git repository not found. Please ensure you're in a git repository."
    exit 1
}

# Check if we're in the right directory (logistics-lynx subdirectory)
if (-not (Test-Path "package.json") -or -not (Test-Path "src")) {
    Write-Error "This script must be run from the logistics-lynx project root directory"
    exit 1
}

Write-Log "Starting auto-sync to GitHub repository..." $Blue

# Check if remote is configured
try {
    $CurrentRemote = git remote get-url origin 2>$null
    if (-not $CurrentRemote) {
        Write-Log "Adding remote origin..." $Blue
        git remote add origin $RemoteUrl
    }
} catch {
    Write-Log "Adding remote origin..." $Blue
    git remote add origin $RemoteUrl
}

# Check current remote URL
$CurrentRemote = git remote get-url origin
if ($CurrentRemote -ne $RemoteUrl) {
    Write-Warning "Remote URL mismatch. Current: $CurrentRemote"
    Write-Log "Updating remote URL..." $Blue
    git remote set-url origin $RemoteUrl
}

# Fetch latest changes from remote
Write-Log "Fetching latest changes from remote..." $Blue
git fetch origin

# Check if there are any local changes
$Status = git status --porcelain
if ([string]::IsNullOrEmpty($Status)) {
    Write-Log "No local changes to commit" $Blue
} else {
    # Stage all changes
    Write-Log "Staging all changes..." $Blue
    git add .
    
    # Create commit with timestamp
    if ([string]::IsNullOrEmpty($CommitMessage)) {
        $CommitMessage = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Portal integration updates"
    }
    Write-Log "Creating commit: $CommitMessage" $Blue
    git commit -m $CommitMessage
    
    # Push to remote
    Write-Log "Pushing to remote repository..." $Blue
    $PushResult = git push origin $Branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Successfully synced to GitHub repository"
    } else {
        Write-Error "Failed to push to remote repository: $PushResult"
        exit 1
    }
}

# Check if we're behind remote
$LocalCommit = git rev-parse HEAD
$RemoteCommit = git rev-parse "origin/$Branch"

if ($LocalCommit -ne $RemoteCommit) {
    Write-Warning "Local repository is behind remote. Consider pulling latest changes."
    Write-Log "Run 'git pull origin $Branch' to update local repository" $Blue
}

Write-Log "Auto-sync completed successfully!" $Blue
Write-Success "Repository is now in sync with GitHub"

#!/bin/bash

# 🚀 Auto-Sync Script for logistics-lynx Repository
# Automatically syncs local changes to GitHub repository

set -e  # Exit on any error

# Configuration
REPO_NAME="logistics-lynxx"
GITHUB_USER="ezcall100"
BRANCH="feature/001-public-website-scaffold"
REMOTE_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    error "This script must be run from the logistics-lynx project root directory"
    exit 1
fi

log "Starting auto-sync to GitHub repository..."

# Get the git root directory
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ $? -ne 0 ]; then
    error "Git repository not found. Please ensure you're in a git repository."
    exit 1
fi

log "Git root directory: $GIT_ROOT"

# Check if remote is configured
if ! git remote get-url origin > /dev/null 2>&1; then
    log "Adding remote origin..."
    git remote add origin "$REMOTE_URL"
fi

# Check current remote URL
CURRENT_REMOTE=$(git remote get-url origin)
if [ "$CURRENT_REMOTE" != "$REMOTE_URL" ]; then
    warning "Remote URL mismatch. Current: $CURRENT_REMOTE"
    log "Updating remote URL..."
    git remote set-url origin "$REMOTE_URL"
fi

# Fetch latest changes from remote
log "Fetching latest changes from remote..."
git fetch origin

# Check if there are any local changes
if git diff-index --quiet HEAD --; then
    log "No local changes to commit"
else
    # Stage all changes
    log "Staging all changes..."
    git add .
    
    # Create commit with timestamp
    COMMIT_MSG="Auto-sync: $(date +'%Y-%m-%d %H:%M:%S') - Portal integration updates"
    log "Creating commit: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG"
    
    # Push to remote
    log "Pushing to remote repository..."
    if git push origin "$BRANCH"; then
        success "Successfully synced to GitHub repository"
    else
        error "Failed to push to remote repository"
        exit 1
    fi
fi

# Check if we're behind remote
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/$BRANCH)

if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
    warning "Local repository is behind remote. Consider pulling latest changes."
    log "Run 'git pull origin $BRANCH' to update local repository"
fi

log "Auto-sync completed successfully!"
success "Repository is now in sync with GitHub"

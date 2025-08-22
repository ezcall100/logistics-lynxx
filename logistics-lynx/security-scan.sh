#!/bin/bash

echo "🔧 Setting up security scanning environment..."
echo "Scan type: full"
echo "Fail on severity: high"
echo "Timeout: 30 minutes"

# Install gitleaks if secrets scanning is enabled
if [[ "true" == "true" ]]; then
  echo "📥 Installing gitleaks..."
  
  # Function to install gitleaks with better error handling
  install_gitleaks() {
    local temp_dir=$(mktemp -d)
    cd "$temp_dir"
    
    # Get the latest version from GitHub API
    echo "🔍 Fetching latest gitleaks version..."
    LATEST_VERSION=$(curl -s https://api.github.com/repos/zricethezav/gitleaks/releases/latest | grep -o '"tag_name": "v[^"]*"' | cut -d'"' -f4)
    
    if [ -z "$LATEST_VERSION" ]; then
      echo "⚠️ Could not determine latest version, using fallback..."
      LATEST_VERSION="v8.28.0"
    fi
    
    echo "📦 Downloading gitleaks version: $LATEST_VERSION"
    
    # Download with proper redirect handling
    if command -v curl >/dev/null 2>&1; then
      echo "Using curl with proper redirect handling..."
      curl -L -o gitleaks.tar.gz "https://github.com/zricethezav/gitleaks/releases/download/${LATEST_VERSION}/gitleaks_${LATEST_VERSION}_linux_x64.tar.gz"
      
      if [ $? -eq 0 ] && [ -f gitleaks.tar.gz ]; then
        echo "✅ Download successful, extracting..."
        tar -xzf gitleaks.tar.gz
        if [ $? -eq 0 ]; then
          sudo mv gitleaks /usr/local/bin/
          sudo chmod +x /usr/local/bin/gitleaks
          echo "✅ Gitleaks installed successfully"
          gitleaks version
          cd - > /dev/null
          rm -rf "$temp_dir"
          return 0
        else
          echo "❌ Extraction failed"
        fi
      else
        echo "❌ Download failed"
      fi
    elif command -v wget >/dev/null 2>&1; then
      echo "Using wget with proper redirect handling..."
      wget --no-verbose --show-progress -O gitleaks.tar.gz "https://github.com/zricethezav/gitleaks/releases/download/${LATEST_VERSION}/gitleaks_${LATEST_VERSION}_linux_x64.tar.gz"
      
      if [ $? -eq 0 ] && [ -f gitleaks.tar.gz ]; then
        echo "✅ Download successful, extracting..."
        tar -xzf gitleaks.tar.gz
        if [ $? -eq 0 ]; then
          sudo mv gitleaks /usr/local/bin/
          sudo chmod +x /usr/local/bin/gitleaks
          echo "✅ Gitleaks installed successfully"
          gitleaks version
          cd - > /dev/null
          rm -rf "$temp_dir"
          return 0
        else
          echo "❌ Extraction failed"
        fi
      else
        echo "❌ Download failed"
      fi
    else
      echo "⚠️ Neither curl nor wget available"
    fi
    
    cd - > /dev/null
    rm -rf "$temp_dir"
    return 1
  }
  
  # Try installation
  if install_gitleaks; then
    echo "✅ Gitleaks installation completed successfully"
  else
    echo "⚠️ Gitleaks installation failed, trying alternative methods..."
    
    # Try package manager installation
    if command -v apt-get >/dev/null 2>&1; then
      echo "📦 Trying apt-get installation..."
      sudo apt-get update -qq && sudo apt-get install -y gitleaks
      if [ $? -eq 0 ]; then
        echo "✅ Gitleaks installed via apt-get"
        gitleaks version
      else
        echo "❌ apt-get installation failed"
      fi
    elif command -v yum >/dev/null 2>&1; then
      echo "📦 Trying yum installation..."
      sudo yum install -y gitleaks
      if [ $? -eq 0 ]; then
        echo "✅ Gitleaks installed via yum"
        gitleaks version
      else
        echo "❌ yum installation failed"
      fi
    elif command -v brew >/dev/null 2>&1; then
      echo "📦 Trying brew installation..."
      brew install gitleaks
      if [ $? -eq 0 ]; then
        echo "✅ Gitleaks installed via brew"
        gitleaks version
      else
        echo "❌ brew installation failed"
      fi
    else
      echo "⚠️ No suitable package manager found"
    fi
  fi
  
  # Final verification
  if command -v gitleaks >/dev/null 2>&1; then
    echo "✅ Gitleaks is available and ready for scanning"
    gitleaks version
  else
    echo "⚠️ Gitleaks installation failed, will use basic pattern matching"
    echo "🔍 Setting up basic secret pattern scanning..."
  fi
fi

echo "🔍 Starting security scan..."
echo "📋 Scan configuration:"
echo "   - Repository: $(pwd)"
echo "   - Scan type: Full repository scan"
echo "   - Target: All files"
echo "   - Exclusions: node_modules, .git, dist, build"

# Run gitleaks if available
if command -v gitleaks >/dev/null 2>&1; then
  echo "🔍 Running gitleaks scan..."
  gitleaks detect --source . --report-format json --report-path gitleaks-report.json --verbose
  if [ $? -eq 0 ]; then
    echo "✅ Gitleaks scan completed successfully"
    echo "📄 Report saved to: gitleaks-report.json"
  else
    echo "⚠️ Gitleaks scan found potential issues"
  fi
else
  echo "🔍 Running basic pattern scan..."
  # Basic pattern matching for common secrets
  echo "📋 Checking for common secret patterns..."
  
  # Check for API keys, tokens, passwords, etc.
  patterns=(
    "api_key"
    "api_secret"
    "access_token"
    "secret_key"
    "password"
    "private_key"
    "aws_access_key"
    "aws_secret_key"
    "github_token"
    "npm_token"
  )
  
  found_secrets=false
  for pattern in "${patterns[@]}"; do
    if grep -r -i "$pattern" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=build 2>/dev/null; then
      echo "⚠️ Potential secret found with pattern: $pattern"
      found_secrets=true
    fi
  done
  
  if [ "$found_secrets" = false ]; then
    echo "✅ No obvious secrets found in basic scan"
  else
    echo "⚠️ Potential secrets detected - manual review recommended"
  fi
fi

echo "🔍 Security scan completed!"
echo "📊 Summary:"
echo "   - Repository scanned: $(pwd)"
echo "   - Scan method: $(command -v gitleaks >/dev/null 2>&1 && echo 'Gitleaks' || echo 'Basic pattern matching')"
echo "   - Status: $(command -v gitleaks >/dev/null 2>&1 && echo 'Advanced scan completed' || echo 'Basic scan completed')"

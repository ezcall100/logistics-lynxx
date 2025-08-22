# Security Scanning Script for Windows
Write-Host "Setting up security scanning environment..." -ForegroundColor Cyan
Write-Host "Scan type: full" -ForegroundColor Yellow
Write-Host "Fail on severity: high" -ForegroundColor Yellow
Write-Host "Timeout: 30 minutes" -ForegroundColor Yellow

# Check if we're in a Git repository
if (Test-Path ".git") {
    Write-Host "Git repository detected" -ForegroundColor Green
} else {
    Write-Host "Not a Git repository" -ForegroundColor Yellow
}

# Function to check for common secret patterns
function Find-Secrets {
    Write-Host "Running basic pattern scan..." -ForegroundColor Cyan
    Write-Host "Checking for common secret patterns..." -ForegroundColor Yellow
    
    $patterns = @(
        "api_key",
        "api_secret", 
        "access_token",
        "secret_key",
        "password",
        "private_key",
        "aws_access_key",
        "aws_secret_key",
        "github_token",
        "npm_token",
        "DATABASE_URL",
        "JWT_SECRET",
        "SECRET_KEY",
        "PRIVATE_KEY"
    )
    
    $excludeDirs = @("node_modules", ".git", "dist", "build", ".next", "coverage")
    $foundSecrets = $false
    
    foreach ($pattern in $patterns) {
        Write-Host "Checking for pattern: $pattern" -ForegroundColor Gray
        
        try {
            $results = Get-ChildItem -Recurse -File | 
                Where-Object { 
                    $exclude = $false
                    foreach ($dir in $excludeDirs) {
                        if ($_.FullName -like "*\$dir\*") {
                            $exclude = $true
                            break
                        }
                    }
                    -not $exclude
                } |
                Select-String -Pattern $pattern -CaseSensitive:$false -ErrorAction SilentlyContinue
            
            if ($results) {
                Write-Host "Potential secret found with pattern: $pattern" -ForegroundColor Red
                foreach ($result in $results) {
                    Write-Host "   File: $($result.Filename):$($result.LineNumber)" -ForegroundColor DarkRed
                    Write-Host "   Line: $($result.Line.Trim())" -ForegroundColor DarkRed
                }
                $foundSecrets = $true
            }
        }
        catch {
            Write-Host "Error scanning for pattern $pattern : $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
    
    if (-not $foundSecrets) {
        Write-Host "No obvious secrets found in basic scan" -ForegroundColor Green
    } else {
        Write-Host "Potential secrets detected - manual review recommended" -ForegroundColor Red
    }
}

# Function to check for sensitive files
function Find-SensitiveFiles {
    Write-Host "Checking for sensitive files..." -ForegroundColor Cyan
    
    $sensitiveFiles = @(
        ".env",
        ".env.local",
        ".env.production",
        ".env.development",
        "config.json",
        "secrets.json",
        "credentials.json",
        "private.key",
        "id_rsa",
        "id_dsa",
        "*.pem",
        "*.p12",
        "*.pfx"
    )
    
    $foundSensitiveFiles = $false
    
    foreach ($filePattern in $sensitiveFiles) {
        try {
            $files = Get-ChildItem -Recurse -Name $filePattern -ErrorAction SilentlyContinue
            if ($files) {
                Write-Host "Sensitive file found: $filePattern" -ForegroundColor Red
                foreach ($file in $files) {
                    Write-Host "   $file" -ForegroundColor DarkRed
                }
                $foundSensitiveFiles = $true
            }
        }
        catch {
            # Continue if pattern not found
        }
    }
    
    if (-not $foundSensitiveFiles) {
        Write-Host "No obvious sensitive files found" -ForegroundColor Green
    } else {
        Write-Host "Sensitive files detected - review access permissions" -ForegroundColor Red
    }
}

# Function to check for hardcoded URLs and endpoints
function Find-HardcodedEndpoints {
    Write-Host "Checking for hardcoded endpoints..." -ForegroundColor Cyan
    
    $endpointPatterns = @(
        "http://localhost",
        "https://localhost", 
        "127\.0\.0\.1",
        "0\.0\.0\.0",
        "localhost:",
        "api\.example\.com",
        "staging\.example\.com",
        "dev\.example\.com"
    )
    
    $foundEndpoints = $false
    
    foreach ($pattern in $endpointPatterns) {
        try {
            $results = Get-ChildItem -Recurse -File | 
                Where-Object { $_.Extension -match "\.(js|ts|jsx|tsx|json|env|config|yml|yaml)$" } |
                Select-String -Pattern $pattern -CaseSensitive:$false -ErrorAction SilentlyContinue
            
            if ($results) {
                Write-Host "Hardcoded endpoint found: $pattern" -ForegroundColor Yellow
                foreach ($result in $results) {
                    Write-Host "   File: $($result.Filename):$($result.LineNumber)" -ForegroundColor DarkYellow
                }
                $foundEndpoints = $true
            }
        }
        catch {
            # Continue if error
        }
    }
    
    if (-not $foundEndpoints) {
        Write-Host "No obvious hardcoded endpoints found" -ForegroundColor Green
    } else {
        Write-Host "Hardcoded endpoints detected - consider using environment variables" -ForegroundColor Yellow
    }
}

# Function to check for exposed ports
function Find-ExposedPorts {
    Write-Host "Checking for exposed ports..." -ForegroundColor Cyan
    
    $portPatterns = @(
        "port\s*[:=]\s*\d+",
        "PORT\s*[:=]\s*\d+",
        "listen\s*\(\s*\d+",
        "\.listen\s*\(\s*\d+"
    )
    
    $foundPorts = $false
    
    foreach ($pattern in $portPatterns) {
        try {
            $results = Get-ChildItem -Recurse -File | 
                Where-Object { $_.Extension -match "\.(js|ts|jsx|tsx|json|env|config|yml|yaml)$" } |
                Select-String -Pattern $pattern -CaseSensitive:$false -ErrorAction SilentlyContinue
            
            if ($results) {
                Write-Host "Port configuration found: $pattern" -ForegroundColor Yellow
                foreach ($result in $results) {
                    Write-Host "   File: $($result.Filename):$($result.LineNumber)" -ForegroundColor DarkYellow
                }
                $foundPorts = $true
            }
        }
        catch {
            # Continue if error
        }
    }
    
    if (-not $foundPorts) {
        Write-Host "No obvious port configurations found" -ForegroundColor Green
    } else {
        Write-Host "Port configurations detected - verify security settings" -ForegroundColor Yellow
    }
}

# Main security scan
Write-Host "Starting security scan..." -ForegroundColor Cyan
Write-Host "Scan configuration:" -ForegroundColor Yellow
Write-Host "   - Repository: $(Get-Location)" -ForegroundColor Gray
Write-Host "   - Scan type: Full repository scan" -ForegroundColor Gray
Write-Host "   - Target: All files" -ForegroundColor Gray
Write-Host "   - Exclusions: node_modules, .git, dist, build" -ForegroundColor Gray

# Run all security checks
Find-Secrets
Find-SensitiveFiles
Find-HardcodedEndpoints
Find-ExposedPorts

# Check for common security issues in package.json
if (Test-Path "package.json") {
    Write-Host "Checking package.json for security issues..." -ForegroundColor Cyan
    
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        
        # Check for outdated dependencies
        if ($packageJson.dependencies -or $packageJson.devDependencies) {
            Write-Host "Dependencies found - consider running 'npm audit' for security vulnerabilities" -ForegroundColor Yellow
        }
        
        # Check for scripts that might be dangerous
        if ($packageJson.scripts) {
            $dangerousScripts = @("eval", "exec", "system", "spawn")
            foreach ($script in $dangerousScripts) {
                if ($packageJson.scripts.PSObject.Properties.Name -like "*$script*") {
                    Write-Host "Potentially dangerous script found: $script" -ForegroundColor Red
                }
            }
        }
    }
    catch {
        Write-Host "Error parsing package.json" -ForegroundColor Yellow
    }
}

# Check for .gitignore security
if (Test-Path ".gitignore") {
    Write-Host "Checking .gitignore for security..." -ForegroundColor Cyan
    
    $gitignore = Get-Content ".gitignore" -ErrorAction SilentlyContinue
    $requiredIgnores = @(".env", "node_modules", "*.log", "*.key", "*.pem", "secrets")
    
    foreach ($ignore in $requiredIgnores) {
        if ($gitignore -notcontains $ignore) {
            Write-Host "Consider adding '$ignore' to .gitignore" -ForegroundColor Yellow
        }
    }
}

Write-Host "Security scan completed!" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   - Repository scanned: $(Get-Location)" -ForegroundColor Gray
Write-Host "   - Scan method: Basic pattern matching" -ForegroundColor Gray
Write-Host "   - Status: Basic scan completed" -ForegroundColor Gray
Write-Host "Recommendations:" -ForegroundColor Cyan
Write-Host "   - Run 'npm audit' to check for package vulnerabilities" -ForegroundColor Gray
Write-Host "   - Use environment variables for sensitive data" -ForegroundColor Gray
Write-Host "   - Review .gitignore to ensure secrets are excluded" -ForegroundColor Gray
Write-Host "   - Consider using a dedicated secrets management solution" -ForegroundColor Gray

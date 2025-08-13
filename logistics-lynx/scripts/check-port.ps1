# Check if port 8080 is in use (Windows PowerShell version)
Write-Host "🔍 Checking if port 8080 is available..." -ForegroundColor Cyan

try {
    $connection = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
    if ($connection) {
        Write-Host "❌ Port 8080 is already in use by:" -ForegroundColor Red
        $connection | Format-Table -AutoSize
        Write-Host ""
        Write-Host "💡 To free up the port, you can:" -ForegroundColor Yellow
        Write-Host "   - Kill the process using: Stop-Process -Id <PID> -Force"
        Write-Host "   - Or use a different port by setting PORT environment variable"
        exit 1
    } else {
        Write-Host "✅ Port 8080 is available" -ForegroundColor Green
        exit 0
    }
} catch {
    Write-Host "✅ Port 8080 is available" -ForegroundColor Green
    exit 0
}

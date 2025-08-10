# PowerShell script to test the clean n8n webhook
# This workflow doesn't make external API calls

$webhookUrl = "https://pixx100.app.n8n.cloud/webhook/cursor-webhook-clean"

# Test payload for file.save event
$testPayload = @{
    event = "file.save"
    file = @{
        path = "/test/file.js"
        name = "file.js"
        content = "console.log('test');"
    }
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    user = "test@example.com"
} | ConvertTo-Json -Depth 3

# Headers
$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "Testing clean webhook at: $webhookUrl"
Write-Host "Payload: $testPayload"
Write-Host ""

try {
    # Send POST request
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $testPayload -Headers $headers
    
    Write-Host "✅ Clean webhook test successful!"
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)"
} catch {
    Write-Host "❌ Clean webhook test failed!"
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
    }
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

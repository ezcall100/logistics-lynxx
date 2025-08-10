# Test script for the correct webhook URL
$webhookUrl = "https://pixx100.app.n8n.cloud/webhook/webhook-test/cursor-webhook"

# Test payload
$payload = @{
    event = "file.save"
    file = @{
        path = "/test/file.js"
        name = "file.js"
        content = "console.log('Hello World');"
    }
    timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    user = "test@example.com"
} | ConvertTo-Json -Depth 3

Write-Host "Testing webhook: $webhookUrl"
Write-Host "Payload: $payload"
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload -Headers @{"Content-Type"="application/json"}
    Write-Host "✅ SUCCESS! Webhook is working!"
    Write-Host "Response: $($response | ConvertTo-Json -Depth 3)"
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
    }
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

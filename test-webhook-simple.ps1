# Simple webhook test script
$webhookUrl = "https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook"

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

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $payload -Headers @{"Content-Type"="application/json"}
    Write-Host "✅ Success! Response: $($response | ConvertTo-Json)"
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)"
}

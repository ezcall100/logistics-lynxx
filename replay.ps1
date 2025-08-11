# 🚀 Webhook Replay Script - Production Ops Tool (PowerShell)
# Usage: .\replay.ps1 [payload.json]
# 
# Replays any saved payload back to n8n webhook with fresh HMAC signature
# Perfect for debugging n8n workflows with real deployment data

param(
  [Parameter(Mandatory=$true)] [string]$WebhookUrl,
  [Parameter(Mandatory=$true)] [string]$Secret,
  [string]$PayloadPath = "payload.json"
)

if (!(Test-Path $PayloadPath)) {
  Write-Error "Payload not found: $PayloadPath"
  exit 2
}

# Compute base64(HMAC-SHA256(payload))
$payloadBytes = [System.IO.File]::ReadAllBytes($PayloadPath)
$secretBytes  = [Text.Encoding]::UTF8.GetBytes($Secret)
$hmac = [System.Security.Cryptography.HMACSHA256]::new($secretBytes)
$hash = $hmac.ComputeHash($payloadBytes)
$sig  = [Convert]::ToBase64String($hash)

$idem = "local-" + ([guid]::NewGuid().ToString())

$headers = @{
  "Content-Type"      = "application/json"
  "X-Idempotency-Key" = $idem
  "X-Signature-256"   = "sha256=$sig"
}

# Simple retry loop
$max = 5
for ($i=1; $i -le $max; $i++) {
  try {
    $resp = Invoke-RestMethod -Uri $WebhookUrl -Method Post -Headers $headers -InFile $PayloadPath -TimeoutSec 20
    Write-Output "OK: $($resp | ConvertTo-Json -Compress)"
    exit 0
  } catch {
    if ($i -eq $max) { throw }
    Start-Sleep -Seconds ([math]::Min(5 * $i, 20))
  }
}

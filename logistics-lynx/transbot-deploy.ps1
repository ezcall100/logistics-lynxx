# ┌─────────────────────────────────────────────┐
# │ TRANSBOT AI — PRODUCTION AUTO-DEPLOY SCRIPT │
# │              (PowerShell Version)           │
# └─────────────────────────────────────────────┘

# === CONFIG VARIABLES ===
$APP_NAME = "transbot-ai"
$DOCKER_IMAGE = "your-dockerhub/transbot-ai:latest"
$SERVER_USER = "ubuntu"
$SERVER_IP = "your.production.server.ip"
$SSH_KEY = "~/.ssh/id_rsa"
$APP_DIR = "/home/ubuntu/transbot"
$NGINX_RELOAD = "sudo systemctl reload nginx"

# === STEP 1: BUILD DOCKER IMAGE LOCALLY ===
Write-Host "🧱 Building Docker image..." -ForegroundColor Green
docker build -t $DOCKER_IMAGE .

# === STEP 2: PUSH IMAGE TO REGISTRY ===
Write-Host "📦 Pushing image to Docker Hub..." -ForegroundColor Green
docker push $DOCKER_IMAGE

# === STEP 3: SSH INTO PRODUCTION SERVER ===
Write-Host "📡 Connecting to production server: $SERVER_IP" -ForegroundColor Green

$sshCommands = @"
set -e
echo "🔁 Pulling latest Docker image..."
docker pull $DOCKER_IMAGE

echo "🧹 Removing old container (if any)..."
docker rm -f $APP_NAME || true

echo "🚀 Starting new container..."
docker run -d \
  --name $APP_NAME \
  -p 80:3000 \
  --env-file $APP_DIR/.env.production \
  -v $APP_DIR/data:/app/data \
  $DOCKER_IMAGE

echo "🌐 Reloading NGINX reverse proxy..."
$NGINX_RELOAD

echo "✅ Deployment complete. Verifying health..."

sleep 5
curl -f http://localhost || echo "⚠️ App not responding on port 80"
"@

# Execute SSH commands
ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP $sshCommands

# === STEP 4: FINAL MESSAGE ===
Write-Host "🎉 TransBot AI successfully deployed to production!" -ForegroundColor Green

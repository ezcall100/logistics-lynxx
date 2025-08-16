# Docker Setup for TMS Logistics Lynx

This document provides comprehensive instructions for containerizing and running the TMS Logistics Lynx application using Docker.

## 📋 Prerequisites

- **Docker Desktop** installed and running
- **Node.js 20.14.0** (for local development)
- **Git** for version control

## 🏗️ Project Structure

The Docker setup includes:

```
logistics-lynx/
├── Dockerfile              # Multi-stage Docker build
├── .dockerignore           # Files to exclude from build
├── docker-compose.yml      # Docker Compose configuration
├── docker-build.sh         # Linux/macOS build script
├── docker-build.ps1        # Windows PowerShell build script
└── DOCKER_README.md        # This file
```

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Navigate to the project directory:**
   ```bash
   cd logistics-lynx
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Build and run with Docker Compose:**
   ```bash
   # Production mode
   docker-compose up -d
   
   # Development mode
   docker-compose --profile dev up -d
   ```

4. **Access the application:**
   - Production: http://localhost:3000
   - Development: http://localhost:3001

### Option 2: Using Build Scripts

#### Windows (PowerShell)
```powershell
# Build the image
.\docker-build.ps1 build

# Run in production mode
.\docker-build.ps1 run

# Run in development mode
.\docker-build.ps1 dev

# Stop containers
.\docker-build.ps1 stop

# Clean up
.\docker-build.ps1 clean
```

#### Linux/macOS (Bash)
```bash
# Make script executable (first time only)
chmod +x docker-build.sh

# Build the image
./docker-build.sh build

# Run in production mode
./docker-build.sh run

# Run in development mode
./docker-build.sh dev

# Stop containers
./docker-build.sh stop

# Clean up
./docker-build.sh clean
```

### Option 3: Manual Docker Commands

```bash
# Build the image
docker build -t tms-logistics-lynx:latest .

# Run in production mode
docker run -d \
  --name tms-logistics-lynx \
  -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/artifacts:/app/artifacts \
  --restart unless-stopped \
  tms-logistics-lynx:latest

# Run in development mode
docker run -d \
  --name tms-logistics-lynx-dev \
  -p 3001:3000 \
  --env-file .env \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/artifacts:/app/artifacts \
  --restart unless-stopped \
  tms-logistics-lynx:latest \
  npm run dev
```

## 🔧 Configuration

### Environment Variables

The application requires several environment variables. Copy the example file and configure it:

```bash
cp env.example .env
```

Key configuration sections:

#### Supabase Configuration
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

#### Security & Authentication
```env
TRANSBOT_HMAC_SECRET=your-hmac-secret-key
JWT_SUPER_ADMIN_EMAIL=platform-admin@yourco.com
```

#### Observability
```env
OTEL_ENABLED=true
OTEL_SERVICE_NAME=transbot-edge
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.yourco.com/v1/traces
```

### Volume Mounts

The Docker setup includes several volume mounts for data persistence:

- **Logs**: `./logs:/app/logs` - Application logs
- **Artifacts**: `./artifacts:/app/artifacts` - Autonomous system outputs
- **Source Code**: `./src:/app/src` - For development mode hot reloading

## 🐳 Dockerfile Details

### Multi-Stage Build

The Dockerfile uses a multi-stage build approach:

1. **Builder Stage**: Compiles TypeScript and builds the React application
2. **Production Stage**: Creates a minimal production image

### Security Features

- Non-root user (`nextjs:nodejs`)
- Minimal Alpine Linux base image
- Production-only dependencies
- Health checks for monitoring

### Build Process

```dockerfile
# Stage 1: Build
FROM node:20.14.0-alpine AS builder
# Install dependencies and build application

# Stage 2: Production
FROM node:20.14.0-alpine AS production
# Copy built assets and run application
```

## 📊 Monitoring & Health Checks

### Health Check Configuration

The container includes built-in health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/monitoring/health-check.js || exit 1
```

### Logging

View container logs:

```bash
# Production container
docker logs -f tms-logistics-lynx

# Development container
docker logs -f tms-logistics-lynx-dev

# Using build scripts
./docker-build.sh logs
.\docker-build.ps1 logs
```

### Status Monitoring

Check container status:

```bash
# Using build scripts
./docker-build.sh status
.\docker-build.ps1 status

# Manual Docker commands
docker ps -a --filter "name=tms-logistics-lynx"
docker stats tms-logistics-lynx
```

## 🔄 Development Workflow

### Development Mode

Development mode provides hot reloading and live code updates:

```bash
# Start development container
docker-compose --profile dev up -d
# or
./docker-build.sh dev
```

Features:
- Hot reloading for React components
- Live TypeScript compilation
- Volume-mounted source code
- Development server on port 3001

### Production Mode

Production mode serves the built application:

```bash
# Start production container
docker-compose up -d
# or
./docker-build.sh run
```

Features:
- Optimized build output
- Static file serving
- Production server on port 3000

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
# or
netstat -tulpn | grep :3000

# Stop conflicting containers
docker stop $(docker ps -q)
```

#### 2. Environment Variables Not Loading
```bash
# Verify .env file exists
ls -la .env

# Check environment variables in container
docker exec tms-logistics-lynx env | grep SUPABASE
```

#### 3. Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t tms-logistics-lynx:latest .
```

#### 4. Permission Issues (Linux/macOS)
```bash
# Fix file permissions
chmod +x docker-build.sh
chmod 644 .env
```

### Debug Commands

```bash
# Enter running container
docker exec -it tms-logistics-lynx sh

# Check container resources
docker stats tms-logistics-lynx

# Inspect container configuration
docker inspect tms-logistics-lynx

# View build history
docker history tms-logistics-lynx:latest
```

## 🚀 Deployment

### Production Deployment

1. **Build production image:**
   ```bash
   docker build -t tms-logistics-lynx:production .
   ```

2. **Tag for registry:**
   ```bash
   docker tag tms-logistics-lynx:production your-registry/tms-logistics-lynx:latest
   ```

3. **Push to registry:**
   ```bash
   docker push your-registry/tms-logistics-lynx:latest
   ```

4. **Deploy to production:**
   ```bash
   docker run -d \
     --name tms-logistics-lynx-prod \
     -p 80:3000 \
     --env-file .env.production \
     --restart unless-stopped \
     your-registry/tms-logistics-lynx:latest
   ```

### Docker Compose Production

```yaml
version: '3.8'
services:
  tms-app:
    image: your-registry/tms-logistics-lynx:latest
    ports:
      - "80:3000"
    env_file:
      - .env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "dist/monitoring/health-check.js"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Multi-stage Docker Builds](https://docs.docker.com/develop/dev-best-practices/multistage-build/)

## 🤝 Support

For issues related to Docker setup:

1. Check the troubleshooting section above
2. Review container logs: `docker logs tms-logistics-lynx`
3. Verify environment configuration
4. Check Docker system resources: `docker system df`

For application-specific issues, refer to the main project documentation.

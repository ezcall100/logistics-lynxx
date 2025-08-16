# 🐳 Docker Setup Guide for TMS Logistics Lynx

This guide will help you set up and run the TMS Logistics Lynx application using Docker. We've created automated setup scripts to make the process as simple as possible.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Docker Desktop** installed and running
  - Download from: https://www.docker.com/products/docker-desktop
  - Make sure Docker is running (you should see the Docker icon in your system tray)
- **Git** for version control (optional, for cloning the repository)

## 🚀 Quick Start

### Step 1: Navigate to the Project Directory

```bash
cd logistics-lynx
```

### Step 2: Run the Setup Script

#### For Windows Users (PowerShell):
```powershell
# Run the setup script
.\docker-setup.ps1 setup
```

#### For Linux/macOS Users (Bash):
```bash
# Make the script executable (first time only)
chmod +x docker-setup.sh

# Run the setup script
./docker-setup.sh setup
```

The setup script will:
- ✅ Check if Docker is installed and running
- ✅ Create a `.env` file from `env.example`
- ✅ Create necessary directories (`logs`, `artifacts`, `data`)
- ✅ Build the Docker image
- ✅ Validate your environment configuration

### Step 3: Configure Environment Variables

After the setup completes, you'll need to edit the `.env` file with your actual configuration values:

```bash
# Open the .env file in your preferred editor
notepad .env  # Windows
nano .env     # Linux/macOS
```

**Required Configuration:**

```env
# Supabase Configuration (REQUIRED)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Security & Authentication (REQUIRED)
TRANSBOT_HMAC_SECRET=your-hmac-secret-key
JWT_SUPER_ADMIN_EMAIL=platform-admin@yourco.com
```

### Step 4: Start the Application

#### Production Mode:
```powershell
# Windows
.\docker-setup.ps1 start

# Linux/macOS
./docker-setup.sh start
```

#### Development Mode (with hot reloading):
```powershell
# Windows
.\docker-setup.ps1 dev

# Linux/macOS
./docker-setup.sh dev
```

### Step 5: Access the Application

- **Production**: http://localhost:3000
- **Development**: http://localhost:3001

## 📖 Available Commands

### Setup Scripts

Both `docker-setup.sh` (Linux/macOS) and `docker-setup.ps1` (Windows) support the following commands:

| Command | Description |
|---------|-------------|
| `setup` | Initial setup (check prerequisites, create .env, build image) |
| `start` | Start the application in production mode |
| `dev` | Start the application in development mode |
| `stop` | Stop all TMS containers |
| `status` | Show container and image status |
| `logs` | Show container logs |
| `clean` | Stop containers and clean up Docker resources |
| `help` | Show help message |

### Examples

```bash
# First time setup
./docker-setup.sh setup

# Start production server
./docker-setup.sh start

# Start development server
./docker-setup.sh dev

# Check status
./docker-setup.sh status

# View logs
./docker-setup.sh logs

# Stop all containers
./docker-setup.sh stop

# Clean up everything
./docker-setup.sh clean
```

## 🔧 Manual Docker Commands

If you prefer to use Docker commands directly:

### Build the Image
```bash
docker build -t tms-logistics-lynx:latest .
```

### Run in Production Mode
```bash
docker run -d \
  --name tms-logistics-lynx \
  -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/artifacts:/app/artifacts \
  --restart unless-stopped \
  tms-logistics-lynx:latest
```

### Run in Development Mode
```bash
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

## 🐳 Docker Compose (Alternative)

If you have Docker Compose installed, you can also use:

### Start Production
```bash
docker-compose up -d
```

### Start Development
```bash
docker-compose --profile dev up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

## 📊 Monitoring & Management

### Check Container Status
```bash
# Using setup script
./docker-setup.sh status

# Manual Docker commands
docker ps -a --filter "name=tms-logistics-lynx"
docker stats tms-logistics-lynx
```

### View Logs
```bash
# Using setup script
./docker-setup.sh logs

# Manual Docker commands
docker logs -f tms-logistics-lynx
docker logs -f tms-logistics-lynx-dev
```

### Health Checks
The container includes built-in health checks that run every 30 seconds:
```bash
# Check health status
docker inspect tms-logistics-lynx --format='{{.State.Health.Status}}'
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Docker Not Running
```
[ERROR] Docker is not running. Please start Docker Desktop and try again.
```
**Solution**: Start Docker Desktop and wait for it to fully load.

#### 2. Port Already in Use
```
Error response from daemon: driver failed programming external connectivity on endpoint
```
**Solution**: 
```bash
# Check what's using the port
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/macOS

# Stop conflicting containers
docker stop $(docker ps -q)
```

#### 3. Environment Variables Not Loading
**Solution**: 
```bash
# Verify .env file exists
ls -la .env

# Check environment variables in container
docker exec tms-logistics-lynx env | grep SUPABASE
```

#### 4. Build Failures
**Solution**:
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t tms-logistics-lynx:latest .
```

#### 5. Permission Issues (Linux/macOS)
**Solution**:
```bash
# Fix file permissions
chmod +x docker-setup.sh
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

## 🔄 Development vs Production

### Development Mode Features
- ✅ Hot reloading for React components
- ✅ Live TypeScript compilation
- ✅ Volume-mounted source code
- ✅ Development server on port 3001
- ✅ Debug logging enabled

### Production Mode Features
- ✅ Optimized build output
- ✅ Static file serving
- ✅ Production server on port 3000
- ✅ Health checks and monitoring
- ✅ Security optimizations

## 📁 Project Structure

```
logistics-lynx/
├── Dockerfile              # Multi-stage Docker build
├── .dockerignore           # Files to exclude from build
├── docker-compose.yml      # Docker Compose configuration
├── docker-setup.sh         # Linux/macOS setup script
├── docker-setup.ps1        # Windows PowerShell setup script
├── docker-build.sh         # Linux/macOS build script
├── docker-build.ps1        # Windows PowerShell build script
├── env.example             # Environment variables template
├── .env                    # Your environment configuration (created by setup)
├── logs/                   # Application logs (created by setup)
├── artifacts/              # Autonomous system outputs (created by setup)
└── data/                   # Application data (created by setup)
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

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Multi-stage Docker Builds](https://docs.docker.com/develop/dev-best-practices/multistage-build/)

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review container logs: `./docker-setup.sh logs`
3. Verify environment configuration
4. Check Docker system resources: `docker system df`

For application-specific issues, refer to the main project documentation.

---

**Happy coding! 🚀**

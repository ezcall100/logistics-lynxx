# 🚀 Development Startup Guide

## Quick Start
```bash
# Install dependencies
npm install

# Start development server with autonomous agents
npm run dev:autonomous

# Or start full development environment
npm run dev:full
```

## Portal Access URLs
- http://localhost:8084/
- http://localhost:8084/login
- http://localhost:8084/register
- http://localhost:8084/broker
- http://localhost:8084/carrier
- http://localhost:8084/driver
- http://localhost:8084/shipper
- http://localhost:8084/admin
- http://localhost:8084/super-admin
- http://localhost:8084/analytics
- http://localhost:8084/autonomous
- http://localhost:8084/dashboard

## Development Commands
- `npm run dev` - Start development server on port 8084
- `npm run dev:autonomous` - Start dev server + autonomous agents
- `npm run dev:full` - Start dev server + autonomous agents + Supabase
- `npm run portal:fix` - Regenerate portal components and start dev server

## Troubleshooting
1. If portals show blank pages, run: `npm run portal:fix`
2. If autonomous agents aren't working, run: `npm run start:autonomous`
3. If database issues, run: `npm run supabase:start`

## Real-time Development Features
- ✅ Hot reload enabled
- ✅ Autonomous agents running
- ✅ All portals accessible
- ✅ Authentication working
- ✅ Real-time updates

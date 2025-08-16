# 🚀 Supabase Integration Options (Without Docker)

There are several ways to integrate Supabase with your TMS application without using Docker. Here are the main options:

## 🌐 Option 1: Supabase Cloud (Recommended for Production)

### Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Sign up/Login** with your GitHub, GitLab, or Google account
3. **Create New Project**:
   - Click "New Project"
   - Choose your organization
   - Enter project name (e.g., "tms-logistics-lynx")
   - Enter database password
   - Choose region closest to your users
   - Click "Create new project"

### Step 2: Get Project Credentials

After project creation, go to **Settings > API** to get your credentials:

```env
# Supabase Cloud Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Step 3: Update Environment Variables

Update your `.env` file with the cloud credentials:

```env
# Supabase Cloud Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Security & Authentication
TRANSBOT_HMAC_SECRET=your-production-hmac-secret-key
JWT_SUPER_ADMIN_EMAIL=admin@yourcompany.com

# Production Configuration
NODE_ENV=production
LOG_LEVEL=info
ENABLE_DEBUG_LOGGING=false
```

## 🛠️ Option 2: Supabase CLI (Local Development)

### Step 1: Install Supabase CLI

#### Windows:
```powershell
# Using winget
winget install Supabase.CLI

# Using Chocolatey
choco install supabase

# Using npm
npm install -g supabase
```

#### macOS:
```bash
# Using Homebrew
brew install supabase/tap/supabase

# Using npm
npm install -g supabase
```

#### Linux:
```bash
# Using npm
npm install -g supabase

# Or download binary
curl -fsSL https://supabase.com/install.sh | sh
```

### Step 2: Initialize and Start Local Supabase

```bash
# Navigate to your project
cd logistics-lynx

# Initialize Supabase project
supabase init

# Start local Supabase
supabase start

# Get local credentials
supabase status
```

### Step 3: Configure Environment

The CLI will output local credentials. Update your `.env`:

```env
# Local Supabase Configuration
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Development Configuration
NODE_ENV=development
LOG_LEVEL=debug
ENABLE_DEBUG_LOGGING=true
```

## 🗄️ Option 3: Direct PostgreSQL Connection

### Step 1: Install PostgreSQL Locally

#### Windows:
```powershell
# Download from https://www.postgresql.org/download/windows/
# Or using Chocolatey
choco install postgresql
```

#### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 2: Set Up Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE tms_logistics;
CREATE USER tms_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tms_logistics TO tms_user;
\q
```

### Step 3: Install Supabase Components

```bash
# Install GoTrue (Auth)
go install github.com/supabase/gotrue/cmd/gotrue@latest

# Install PostgREST (REST API)
# Download from https://github.com/PostgREST/postgrest/releases

# Install Realtime
# Download from https://github.com/supabase/realtime/releases

# Install Storage API
# Download from https://github.com/supabase/storage-api/releases
```

### Step 4: Configure Environment

```env
# Direct PostgreSQL Configuration
SUPABASE_URL=http://localhost:3000
SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
SUPABASE_DB_URL=postgresql://tms_user:your_password@localhost:5432/tms_logistics

# Local Services
AUTH_URL=http://localhost:9999
REST_URL=http://localhost:3000
REALTIME_URL=http://localhost:4000
STORAGE_URL=http://localhost:5000
```

## ☁️ Option 4: Managed PostgreSQL + Custom Services

### Step 1: Use Managed PostgreSQL

Choose a managed PostgreSQL service:

- **Neon** (PostgreSQL-compatible): https://neon.tech
- **PlanetScale** (MySQL-compatible): https://planetscale.com
- **Railway**: https://railway.app
- **Heroku Postgres**: https://heroku.com/postgres

### Step 2: Deploy Supabase Services

Deploy individual Supabase services to cloud platforms:

#### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy services
railway init
railway up
```

#### Heroku
```bash
# Install Heroku CLI
# Deploy each service as separate apps
heroku create tms-auth
heroku create tms-rest
heroku create tms-realtime
heroku create tms-storage
```

### Step 3: Configure Environment

```env
# Managed PostgreSQL + Custom Services
SUPABASE_URL=https://your-rest-api.railway.app
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DB_URL=postgresql://user:pass@host:port/database

# Custom Service URLs
AUTH_URL=https://your-auth-service.railway.app
REST_URL=https://your-rest-api.railway.app
REALTIME_URL=https://your-realtime-service.railway.app
STORAGE_URL=https://your-storage-service.railway.app
```

## 🔧 Option 5: Hybrid Approach (Cloud + Local)

### Step 1: Use Supabase Cloud for Production

```env
# Production Environment
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Step 2: Use Local Supabase for Development

```env
# Development Environment
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=your-local-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
SUPABASE_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### Step 3: Environment-Specific Configuration

Create separate environment files:

```bash
# .env.production
SUPABASE_URL=https://your-project-ref.supabase.co
# ... production settings

# .env.development
SUPABASE_URL=http://127.0.0.1:54321
# ... development settings

# .env.local
SUPABASE_URL=http://127.0.0.1:54321
# ... local settings
```

## 📊 Comparison of Options

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **Supabase Cloud** | ✅ Fully managed<br>✅ No setup required<br>✅ Automatic backups<br>✅ Built-in dashboard | ❌ Monthly cost<br>❌ Vendor lock-in<br>❌ Limited customization | Production apps<br>Quick prototypes |
| **Supabase CLI** | ✅ Free local development<br>✅ Full control<br>✅ Offline development | ❌ Manual setup<br>❌ Resource intensive<br>❌ Complex configuration | Local development<br>Testing |
| **Direct PostgreSQL** | ✅ Complete control<br>✅ No vendor lock-in<br>✅ Customizable | ❌ Complex setup<br>❌ Manual maintenance<br>❌ No built-in features | Advanced users<br>Custom requirements |
| **Managed PostgreSQL** | ✅ Reliable infrastructure<br>✅ Automatic scaling<br>✅ Professional support | ❌ Additional cost<br>❌ More complex setup<br>❌ Service dependencies | Production apps<br>High availability |
| **Hybrid** | ✅ Best of both worlds<br>✅ Cost effective<br>✅ Flexible | ❌ More complex management<br>❌ Environment differences | Teams with mixed needs |

## 🚀 Quick Start Recommendations

### For Beginners (Start Here)
1. **Use Supabase Cloud** for both development and production
2. Create a free project at https://supabase.com
3. Use the provided credentials in your `.env` file

### For Developers
1. **Use Supabase CLI** for local development
2. **Use Supabase Cloud** for production
3. Set up environment-specific configurations

### For Advanced Users
1. **Use Direct PostgreSQL** for complete control
2. Deploy custom services to your preferred cloud
3. Set up CI/CD for automated deployments

## 🔧 Integration Steps

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Client

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 3: Use in Your Application

```typescript
// Example: User authentication
import { supabase } from '@/lib/supabase'

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Query data
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'user@example.com')
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Connection Errors
```bash
# Check if Supabase is running
supabase status

# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY
```

#### 2. Authentication Issues
```bash
# Reset local Supabase
supabase stop
supabase start --reset

# Check auth logs
supabase logs auth
```

#### 3. Database Connection Issues
```bash
# Test database connection
psql $SUPABASE_DB_URL

# Check PostgreSQL logs
supabase logs db
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Railway Documentation](https://docs.railway.app/)
- [Heroku Documentation](https://devcenter.heroku.com/)

## 🤝 Support

For help with specific options:

1. **Supabase Cloud**: [Supabase Support](https://supabase.com/support)
2. **Supabase CLI**: [GitHub Issues](https://github.com/supabase/cli/issues)
3. **PostgreSQL**: [PostgreSQL Community](https://www.postgresql.org/community/)
4. **Railway**: [Railway Discord](https://discord.gg/railway)

---

**Choose the option that best fits your needs and get started with Supabase! 🚀**

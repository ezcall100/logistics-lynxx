# 🚀 Supabase Docker Setup Guide for TMS Logistics Lynx

This guide will help you set up Supabase locally using Docker and integrate it with your TMS Logistics Lynx application.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Docker Desktop** installed and running
- **Git** for version control
- **Node.js** (for local development)
- **Cursor** IDE (or your preferred editor)

## 🐳 Option 1: Local Supabase with Docker (Recommended)

### Step 1: Install Supabase CLI

#### For Windows (PowerShell):
```powershell
# Install Supabase CLI using winget
winget install Supabase.CLI

# Or using Chocolatey
choco install supabase

# Or using Scoop
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### For macOS:
```bash
# Using Homebrew
brew install supabase/tap/supabase

# Or using npm
npm install -g supabase
```

#### For Linux:
```bash
# Using npm
npm install -g supabase

# Or download binary
curl -fsSL https://supabase.com/install.sh | sh
```

### Step 2: Initialize Supabase Project

```bash
# Navigate to your project directory
cd logistics-lynx

# Initialize Supabase
supabase init

# Start Supabase locally
supabase start
```

### Step 3: Configure Environment Variables

After starting Supabase, you'll get local credentials. Update your `.env` file:

```env
# Local Supabase Configuration
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
SUPABASE_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Security & Authentication
TRANSBOT_HMAC_SECRET=your-local-hmac-secret-key
JWT_SUPER_ADMIN_EMAIL=admin@localhost.com

# Development Configuration
NODE_ENV=development
LOG_LEVEL=debug
ENABLE_DEBUG_LOGGING=true
```

### Step 4: Access Supabase Dashboard

- **Local Dashboard**: http://127.0.0.1:54323
- **API Documentation**: http://127.0.0.1:54321/docs
- **Database**: http://127.0.0.1:54322

## 🐳 Option 2: Docker Compose Setup (Alternative)

### Step 1: Create Supabase Docker Compose File

Create a new file `supabase-docker-compose.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: supabase/postgres:15.1.0.117
    container_name: supabase-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./supabase/seed.sql:/docker-entrypoint-initdb.d/seed.sql
    networks:
      - supabase-network

  # Supabase Auth
  auth:
    image: supabase/gotrue:v2.132.3
    container_name: supabase-auth
    ports:
      - "9999:9999"
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
      GOTRUE_SITE_URL: http://localhost:3000
      GOTRUE_URI_ALLOW_LIST: http://localhost:3000,http://localhost:3001
      GOTRUE_DISABLE_SIGNUP: false
      GOTRUE_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_EXTERNAL_EMAIL_ENABLED: true
      GOTRUE_MAILER_AUTOCONFIRM: true
      GOTRUE_SMTP_HOST: mail
      GOTRUE_SMTP_PORT: 2500
      GOTRUE_SMTP_USER: fake_mail_user
      GOTRUE_SMTP_PASS: fake_mail_password
      GOTRUE_SMTP_ADMIN_EMAIL: admin@example.com
      GOTRUE_SMTP_SENDER_NAME: fake_sender
    depends_on:
      - postgres
    networks:
      - supabase-network

  # Supabase REST API
  rest:
    image: postgrest/postgrest:v11.2.0
    container_name: supabase-rest
    ports:
      - "3001:3000"
    environment:
      PGRST_DB_URI: postgres://postgres:postgres@postgres:5432/postgres
      PGRST_DB_SCHEMAS: public,storage,graphql_public
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      PGRST_DEFAULT_RLS: 1
      PGRST_DB_USE_LEGACY_GUCS: false
    depends_on:
      - postgres
    networks:
      - supabase-network

  # Supabase Realtime
  realtime:
    image: supabase/realtime:v2.25.47
    container_name: supabase-realtime
    ports:
      - "4000:4000"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: postgres
      DB_USER: postgres
      DB_PASSWORD: postgres
      PORT: 4000
      JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      REPLICATION_MODE: RLS
      REPLICATION_POLL_INTERVAL: 100
      SECURE_CHANNELS: true
      DB_SSL: false
    depends_on:
      - postgres
    networks:
      - supabase-network

  # Supabase Storage
  storage:
    image: supabase/storage-api:v0.40.4
    container_name: supabase-storage
    ports:
      - "5000:5000"
    environment:
      ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
      PROJECT_REF: local
      POSTGREST_URL: http://rest:3000
      PGRST_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/postgres
      PGOPTIONS: "-c search_path=storage"
      FILE_SIZE_LIMIT: 52428800
      STORAGE_BACKEND: file
      FILE_STORAGE_BACKEND_PATH: /var/lib/storage
      TENANT_ID: stub
      REGION: stub
      GLOBAL_S3_BUCKET: stub
    volumes:
      - storage_data:/var/lib/storage
    depends_on:
      - postgres
      - rest
    networks:
      - supabase-network

  # Supabase Dashboard
  dashboard:
    image: supabase/dashboard:20240118-0c7c5d1
    container_name: supabase-dashboard
    ports:
      - "3002:3000"
    environment:
      STUDIO_PG_META_URL: http://meta:8080
      POSTGRES_PASSWORD: postgres
      DEFAULT_ORGANIZATION_NAME: Default Organization
      DEFAULT_PROJECT_NAME: Default Project
      SUPABASE_URL: http://kong:8000
      SUPABASE_PUBLIC_URL: http://localhost:8000
      SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      SUPABASE_SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
    depends_on:
      - kong
    networks:
      - supabase-network

  # Kong API Gateway
  kong:
    image: kong:2.8.1
    container_name: supabase-kong
    ports:
      - "8000:8000"
      - "8443:8443"
    environment:
      KONG_DATABASE: off
      KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
      KONG_DNS_ORDER: LAST,A,CNAME
      KONG_PLUGINS: request-transformer,cors,key-auth,acl,basic-auth,http-log
    volumes:
      - ./supabase/kong.yml:/var/lib/kong/kong.yml
    depends_on:
      - auth
      - rest
      - realtime
      - storage
    networks:
      - supabase-network

  # pg_meta (Database introspection)
  meta:
    image: supabase/postgres-meta:v0.68.0
    container_name: supabase-meta
    ports:
      - "8080:8080"
    environment:
      PG_META_PORT: 8080
      PG_META_DB_HOST: postgres
      PG_META_DB_PORT: 5432
      PG_META_DB_NAME: postgres
      PG_META_DB_USER: postgres
      PG_META_DB_PASSWORD: postgres
    depends_on:
      - postgres
    networks:
      - supabase-network

volumes:
  postgres_data:
  storage_data:

networks:
  supabase-network:
    driver: bridge
```

### Step 2: Create Kong Configuration

Create `supabase/kong.yml`:

```yaml
_format_version: "2.1"
_transform: true

consumers:
  - username: anon
    keyauth_credentials:
      - key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
  - username: service_role
    keyauth_credentials:
      - key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

acls:
  - consumer: anon
    group: anon
  - consumer: service_role
    group: service_role

services:
  - name: auth-v1
    url: http://auth:9999/verify
    routes:
      - name: auth-v1-route
        strip_path: true
        paths:
          - /auth/v1/verify
    plugins:
      - name: cors
  - name: auth-v2
    url: http://auth:9999/
    routes:
      - name: auth-v2-route
        strip_path: true
        paths:
          - /auth/v2/
    plugins:
      - name: cors
  - name: rest-v1
    url: http://rest:3000/
    routes:
      - name: rest-v1-route
        strip_path: true
        paths:
          - /rest/v1/
    plugins:
      - name: cors
      - name: key-auth
        config:
          hide_credentials: false
          key_names:
            - apikey
      - name: acl
        config:
          hide_groups_header: true
          allow:
            - anon
            - service_role
  - name: realtime-v1
    url: http://realtime:4000/socket/
    routes:
      - name: realtime-v1-route
        strip_path: true
        paths:
          - /realtime/v1/
    plugins:
      - name: cors
      - name: key-auth
        config:
          hide_credentials: false
          key_names:
            - apikey
      - name: acl
        config:
          hide_groups_header: true
          allow:
            - anon
            - service_role
  - name: storage-v1
    url: http://storage:5000/
    routes:
      - name: storage-v1-route
        strip_path: true
        paths:
          - /storage/v1/
    plugins:
      - name: cors
      - name: key-auth
        config:
          hide_credentials: false
          key_names:
            - apikey
      - name: acl
        config:
          hide_groups_header: true
          allow:
            - anon
            - service_role
```

### Step 3: Start Supabase Services

```bash
# Start all Supabase services
docker-compose -f supabase-docker-compose.yml up -d

# Check status
docker-compose -f supabase-docker-compose.yml ps

# View logs
docker-compose -f supabase-docker-compose.yml logs -f
```

## 🔧 Integration with TMS Application

### Step 1: Update TMS Docker Compose

Update your `docker-compose.yml` to include Supabase:

```yaml
version: '3.8'

services:
  # Supabase Services
  postgres:
    image: supabase/postgres:15.1.0.117
    container_name: tms-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./supabase/seed.sql:/docker-entrypoint-initdb.d/seed.sql
    networks:
      - tms-network

  auth:
    image: supabase/gotrue:v2.132.3
    container_name: tms-auth
    ports:
      - "9999:9999"
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
      GOTRUE_SITE_URL: http://localhost:3000
      GOTRUE_URI_ALLOW_LIST: http://localhost:3000,http://localhost:3001
      GOTRUE_DISABLE_SIGNUP: false
      GOTRUE_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_EXTERNAL_EMAIL_ENABLED: true
      GOTRUE_MAILER_AUTOCONFIRM: true
    depends_on:
      - postgres
    networks:
      - tms-network

  rest:
    image: postgrest/postgrest:v11.2.0
    container_name: tms-rest
    ports:
      - "3001:3000"
    environment:
      PGRST_DB_URI: postgres://postgres:postgres@postgres:5432/postgres
      PGRST_DB_SCHEMAS: public,storage,graphql_public
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      PGRST_DEFAULT_RLS: 1
    depends_on:
      - postgres
    networks:
      - tms-network

  # TMS Application
  tms-app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: tms-logistics-lynx
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - SUPABASE_URL=http://rest:3000
      - SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      - SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
      - SUPABASE_DB_URL=postgresql://postgres:postgres@postgres:5432/postgres
    env_file:
      - .env
    volumes:
      - ./.env:/app/.env:ro
      - ./logs:/app/logs
      - ./artifacts:/app/artifacts
    restart: unless-stopped
    depends_on:
      - postgres
      - auth
      - rest
    networks:
      - tms-network

  # Development service
  tms-dev:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    container_name: tms-logistics-lynx-dev
    ports:
      - "3002:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - SUPABASE_URL=http://rest:3000
      - SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      - SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
      - SUPABASE_DB_URL=postgresql://postgres:postgres@postgres:5432/postgres
    env_file:
      - .env
    volumes:
      - ./src:/app/src
      - ./public:/app/public
      - ./.env:/app/.env:ro
      - ./logs:/app/logs
      - ./artifacts:/app/artifacts
    command: ["npm", "run", "dev"]
    profiles:
      - dev
    depends_on:
      - postgres
      - auth
      - rest
    networks:
      - tms-network

networks:
  tms-network:
    driver: bridge

volumes:
  postgres_data:
```

### Step 2: Create Database Schema

Create `supabase/seed.sql`:

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role user_role DEFAULT 'user',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    shipping_address TEXT,
    billing_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO users (email, password_hash, role, first_name, last_name, company) VALUES
('admin@tms.com', crypt('admin123', gen_salt('bf')), 'admin', 'Admin', 'User', 'TMS Logistics'),
('user@tms.com', crypt('user123', gen_salt('bf')), 'user', 'John', 'Doe', 'Sample Company');

INSERT INTO products (name, description, price, sku, stock_quantity) VALUES
('Logistics Software License', 'Full TMS software license', 999.99, 'TMS-LICENSE-001', 100),
('Support Package', '24/7 support package', 199.99, 'SUPPORT-001', 50);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Users can view order items for their orders" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );
```

## 🚀 Quick Start Commands

### Using Supabase CLI (Recommended)

```bash
# Initialize and start Supabase
supabase init
supabase start

# Get local credentials
supabase status

# Stop Supabase
supabase stop

# Reset database
supabase db reset
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# Start with development profile
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 📊 Access Points

After setup, you can access:

- **TMS Application**: http://localhost:3000
- **TMS Development**: http://localhost:3002
- **Supabase Dashboard**: http://127.0.0.1:54323 (CLI) or http://localhost:3002 (Docker)
- **API Documentation**: http://127.0.0.1:54321/docs
- **Database**: http://127.0.0.1:54322

## 🔧 Environment Configuration

Update your `.env` file with the correct Supabase URLs:

```env
# Local Supabase Configuration
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
SUPABASE_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# For Docker Compose setup
# SUPABASE_URL=http://rest:3000
# SUPABASE_DB_URL=postgresql://postgres:postgres@postgres:5432/postgres
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Check what's using the ports
netstat -ano | findstr :5432  # Windows
lsof -i :5432                 # Linux/macOS

# Stop conflicting services
docker stop $(docker ps -q)
```

#### 2. Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check PostgreSQL logs
docker logs supabase-postgres

# Connect to database
docker exec -it supabase-postgres psql -U postgres -d postgres
```

#### 3. Supabase CLI Issues
```bash
# Update Supabase CLI
npm update -g supabase

# Reset Supabase
supabase stop
supabase start --reset
```

#### 4. Docker Memory Issues
```bash
# Increase Docker memory limit in Docker Desktop
# Settings > Resources > Memory: 4GB or more

# Clean up Docker
docker system prune -a
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Documentation](https://supabase.com/docs/reference/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Docker logs: `docker-compose logs -f`
3. Check Supabase status: `supabase status`
4. Verify environment configuration
5. Check Docker system resources: `docker system df`

---

**Happy coding with Supabase and Docker! 🚀**

#!/bin/bash

# User Bootstrap Script
# Creates initial users and assigns roles for autonomous system

set -e

echo "🚀 Bootstrapping users and roles for autonomous system..."

# Check required environment variables
if [ -z "$SUPABASE_DB_URL" ]; then
    echo "❌ SUPABASE_DB_URL environment variable is required"
    exit 1
fi

if [ -z "$JWT_SUPER_ADMIN_EMAIL" ]; then
    echo "❌ JWT_SUPER_ADMIN_EMAIL environment variable is required"
    exit 1
fi

# Function to create user and assign role
create_user_with_role() {
    local email=$1
    local role_key=$2
    local company_id=$3
    local full_name=$4
    
    echo "👤 Creating user: $email with role: $role_key"
    
    # Insert user profile (assumes user already exists in Supabase Auth)
    psql "$SUPABASE_DB_URL" -c "
        INSERT INTO public.profiles (user_id, email, company_id, full_name)
        SELECT id, '$email', '$company_id', '$full_name'
        FROM auth.users
        WHERE email = '$email'
        ON CONFLICT (user_id) DO UPDATE SET
            email = EXCLUDED.email,
            company_id = EXCLUDED.company_id,
            full_name = EXCLUDED.full_name;
    "
    
    # Assign role
    psql "$SUPABASE_DB_URL" -c "
        INSERT INTO public.user_roles (user_id, role_key, company_id, granted_by)
        SELECT u.id, '$role_key', '$company_id', NULL
        FROM auth.users u
        WHERE u.email = '$email'
        ON CONFLICT (user_id, role_key, company_id) DO NOTHING;
    "
    
    echo "✅ User $email created with role $role_key"
}

# Create break-glass super admin
echo "🔐 Creating break-glass super admin..."
create_user_with_role "$JWT_SUPER_ADMIN_EMAIL" "super_admin" "" "Platform Super Admin"

# Create environment admin for CI/CD & ops
if [ -n "$ENV_ADMIN_EMAIL" ]; then
    echo "🔧 Creating environment admin..."
    create_user_with_role "$ENV_ADMIN_EMAIL" "env_admin" "" "Environment Admin"
fi

# Create service accounts (no interactive login)
echo "🤖 Creating service accounts..."

# Agents service account
create_user_with_role "agents@yourco.com" "super_admin" "" "Autonomous Agents"

# CI/CD service account
create_user_with_role "ci@yourco.com" "env_admin" "" "CI/CD Pipeline"

# n8n service account
create_user_with_role "n8n@yourco.com" "env_admin" "" "n8n Automation"

# Create sample tenant users (if company ID provided)
if [ -n "$SAMPLE_COMPANY_ID" ]; then
    echo "🏢 Creating sample tenant users..."
    
    # Tenant owner
    if [ -n "$TENANT_OWNER_EMAIL" ]; then
        create_user_with_role "$TENANT_OWNER_EMAIL" "tenant_owner" "$SAMPLE_COMPANY_ID" "Sample Tenant Owner"
    fi
    
    # Tenant admin
    if [ -n "$TENANT_ADMIN_EMAIL" ]; then
        create_user_with_role "$TENANT_ADMIN_EMAIL" "tenant_admin" "$SAMPLE_COMPANY_ID" "Sample Tenant Admin"
    fi
    
    # Broker user
    if [ -n "$BROKER_USER_EMAIL" ]; then
        create_user_with_role "$BROKER_USER_EMAIL" "broker_user" "$SAMPLE_COMPANY_ID" "Sample Broker User"
    fi
    
    # Carrier user
    if [ -n "$CARRIER_USER_EMAIL" ]; then
        create_user_with_role "$CARRIER_USER_EMAIL" "carrier_user" "$SAMPLE_COMPANY_ID" "Sample Carrier User"
    fi
    
    # Shipper user
    if [ -n "$SHIPPER_USER_EMAIL" ]; then
        create_user_with_role "$SHIPPER_USER_EMAIL" "shipper_user" "$SAMPLE_COMPANY_ID" "Sample Shipper User"
    fi
fi

# Verify user creation
echo "🔍 Verifying user creation..."
psql "$SUPABASE_DB_URL" -c "
    SELECT 
        p.email,
        p.full_name,
        array_agg(ur.role_key) as roles,
        p.company_id
    FROM public.profiles p
    LEFT JOIN public.user_roles ur ON p.user_id = ur.user_id
    GROUP BY p.user_id, p.email, p.full_name, p.company_id
    ORDER BY p.email;
"

echo "✅ User bootstrap completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Verify users in Supabase Auth dashboard"
echo "2. Test portal access with different roles"
echo "3. Enable autonomous mode: npm run start:autonomous"
echo "4. Monitor system health: npm run verify:deployment"

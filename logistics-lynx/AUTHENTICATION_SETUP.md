# 🔐 Supabase Authentication Setup Guide

## Overview
This guide will help you set up Supabase authentication for the TransBot TMS Super Admin Portal with role-based access control (RBAC).

## 🚀 Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Environment Configuration
Copy `env.example` to `.env.local` and update with your Supabase credentials:

```bash
cp env.example .env.local
```

Update `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Database Schema Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Create profiles table for user roles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('super_admin', 'admin', 'analyst', 'viewer')) DEFAULT 'viewer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert demo users (optional)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'superadmin@demo.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'admin@demo.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'analyst@demo.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW());

INSERT INTO profiles (id, email, role, name)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'superadmin@demo.com', 'super_admin', 'Super Administrator'),
  ('22222222-2222-2222-2222-222222222222', 'admin@demo.com', 'admin', 'System Administrator'),
  ('33333333-3333-3333-3333-333333333333', 'analyst@demo.com', 'analyst', 'Data Analyst');
```

### 4. Authentication Flow

The authentication system includes:

- **Login Page**: Professional login interface at `/auth/login`
- **Protected Routes**: Role-based access control for all Super Admin pages
- **User Context**: Global authentication state management
- **Sign Out**: Secure logout functionality

### 5. Role-Based Access Control

| Role | Access Level | Description |
|------|-------------|-------------|
| `super_admin` | Full Access | Complete system control |
| `admin` | Admin Access | User management, system settings |
| `analyst` | Read Access | Analytics, reports, monitoring |
| `viewer` | Limited Access | Basic dashboard access |

### 6. Demo Credentials

For testing, use these credentials:

```
Super Admin: superadmin@demo.com / password123
Admin: admin@demo.com / password123  
Analyst: analyst@demo.com / password123
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_DEV_MODE` | Development mode flag | No |

### Authentication Components

- `AuthProvider`: Global authentication context
- `ProtectedRoute`: Route protection with role checking
- `LoginPage`: Professional login interface
- `useAuth`: Hook for authentication state

## 🛡️ Security Features

- **JWT Tokens**: Secure authentication with Supabase JWT
- **Role-Based Access**: Granular permissions per route
- **Session Management**: Automatic session handling
- **Secure Logout**: Proper session cleanup
- **Error Handling**: Comprehensive error states

## 🚀 Usage

### Accessing the Portal

1. Visit `http://localhost:8084`
2. Click "Access Super Admin Portal"
3. Sign in with demo credentials
4. Navigate through protected routes

### Adding New Users

1. Create user in Supabase Auth
2. Update role in profiles table
3. User can immediately access appropriate routes

### Customizing Roles

Edit the `User` interface in `src/lib/supabase.ts`:

```typescript
export interface User {
  id: string
  email: string
  role: 'super_admin' | 'admin' | 'analyst' | 'viewer' | 'custom_role'
  name?: string
  avatar_url?: string
  created_at: string
  last_sign_in_at?: string
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Authentication Error**: Check Supabase URL and anon key
2. **Role Access Denied**: Verify user role in profiles table
3. **Session Issues**: Clear browser storage and re-login
4. **CORS Errors**: Ensure Supabase project settings allow your domain

### Debug Mode

Enable debug logging in `.env.local`:

```env
VITE_DEV_MODE=true
```

## 📚 Next Steps

After authentication setup:

1. **Connect APIs**: Replace mocked data with real Supabase queries
2. **Add Real Data**: Implement live data fetching
3. **Enhance Security**: Add MFA, IP restrictions
4. **Deploy**: Configure production environment variables

## 🆘 Support

For authentication issues:

1. Check Supabase project logs
2. Verify environment variables
3. Test with demo credentials
4. Review browser console for errors

---

**Status**: ✅ Authentication System Ready  
**Next Phase**: 🔌 API Integration

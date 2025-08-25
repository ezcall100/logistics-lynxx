# 🚀 Production Environment Setup Guide

## ✅ **UPDATED CONFIGURATION STANDARDS**

**Date:** August 21, 2025  
**Status:** 🟢 **PRODUCTION READY**  
**Framework:** Next.js Standard  
**Environment Variables:** `NEXT_PUBLIC_` Prefix

---

## 📋 **Environment Configuration**

### **Production-Ready .env Structure**

```bash
# ========================
# GLOBAL APP SETTINGS
# ========================
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=TransBotAI
NEXT_PUBLIC_APP_URL=https://app.transbotai.com
PORT=3000

# ========================
# SUPABASE CONFIG
# ========================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ========================
# AI AGENTS & MCP SYSTEM
# ========================
NEXT_PUBLIC_MCP_API_URL=https://mcp.transbotai.com/api
NEXT_PUBLIC_CURSOR_AI_URL=https://cursor.transbotai.com/api
MCP_SECRET_KEY=your-mcp-secret-key
CURSOR_API_KEY=your-cursor-api-key

# ========================
# AUTHENTICATION
# ========================
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://app.transbotai.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ========================
# STRIPE PAYMENTS
# ========================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_***
STRIPE_SECRET_KEY=sk_live_***
STRIPE_WEBHOOK_SECRET=whsec_***

# ========================
# EMAIL (RESEND / SMTP)
# ========================
EMAIL_FROM=no-reply@transbot.ai
RESEND_API_KEY=re_***
SMTP_HOST=smtp.yourmail.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# ========================
# THIRD-PARTY INTEGRATIONS
# ========================
OPENAI_API_KEY=sk-***
N8N_WEBHOOK_URL=https://n8n.transbotai.com/webhook
GITHUB_TOKEN=ghp_***

# ========================
# SECURITY & MONITORING
# ========================
SENTRY_DSN=https://***
RECAPTCHA_SITE_KEY=6L***
RECAPTCHA_SECRET_KEY=6L***

# ========================
# ENVIRONMENT CONTROLS
# ========================
DISABLE_ANIMATIONS=false
USE_REDUCED_MOTION=false
DEBUG_MODE=false
```

---

## 🔧 **Migration from Vite to Next.js**

### **Environment Variable Changes**

| Old (Vite) | New (Next.js) | Purpose |
|------------|---------------|---------|
| `VITE_MCP_API_URL` | `NEXT_PUBLIC_MCP_API_URL` | MCP API endpoint |
| `VITE_APP_NAME` | `NEXT_PUBLIC_APP_NAME` | Application name |
| `VITE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

### **Updated Code References**

#### **HTTP Client (`src/lib/http.ts`)**
```typescript
// OLD
baseURL: import.meta.env.VITE_MCP_API_URL || 'http://localhost:3001/api'

// NEW
baseURL: import.meta.env.NEXT_PUBLIC_MCP_API_URL || 'http://localhost:3001/api'
```

#### **Test Scripts**
```javascript
// OLD
const MCP_BASE_URL = process.env.VITE_MCP_API_URL || 'http://localhost:3001/api';

// NEW
const MCP_BASE_URL = process.env.NEXT_PUBLIC_MCP_API_URL || 'http://localhost:3001/api';
```

---

## 🚀 **Deployment Checklist**

### **Pre-Deployment**
- [ ] Update `.env` file with new variable names
- [ ] Replace all `VITE_` prefixes with `NEXT_PUBLIC_`
- [ ] Update MCP API URL to production endpoint
- [ ] Set `NODE_ENV=production`
- [ ] Configure production URLs for all services

### **Environment-Specific Files**
```bash
.env.local          # Local development
.env.development    # Development environment
.env.production     # Production environment
.env.staging        # Staging environment
```

### **Security Considerations**
- [ ] All sensitive keys use `NEXT_PUBLIC_` prefix only for client-side variables
- [ ] Server-side secrets remain without prefix
- [ ] `.env` files excluded from version control
- [ ] Environment variables validated at startup

---

## 📊 **MCP API Integration Status**

### **Current Configuration**
- ✅ **API Endpoint**: `https://mcp.transbotai.com/api`
- ✅ **Environment Variable**: `NEXT_PUBLIC_MCP_API_URL`
- ✅ **HTTP Client**: Updated to use new variable
- ✅ **Test Scripts**: Updated for compatibility

### **System Overview Metrics**
- ✅ **Real-time Agent Status** - Live from MCP
- ✅ **Job Queue Metrics** - Actual queue data
- ✅ **System Performance** - Live CPU/Memory
- ✅ **Error Rates** - Real-time tracking
- ✅ **Response Times** - Live API performance

---

## 🛠️ **Next Steps**

### **Immediate Actions**
1. **Update Production .env**
   ```bash
   # Replace old variable
   VITE_MCP_API_URL=https://mcp.transbot.ai/api
   
   # With new variable
   NEXT_PUBLIC_MCP_API_URL=https://mcp.transbotai.com/api
   ```

2. **Deploy Updated Configuration**
   - Update all environment files
   - Restart application services
   - Verify MCP API connectivity

3. **Validate Integration**
   - Check System Overview for live metrics
   - Verify API calls to production MCP endpoint
   - Confirm no fallback to sample data

### **Long-term Improvements**
- [ ] Set up environment-specific configurations
- [ ] Implement configuration validation
- [ ] Add monitoring for MCP API health
- [ ] Create deployment automation scripts

---

## 🎯 **Success Criteria**

### **Before Migration**
- ❌ Using `VITE_` prefixes
- ❌ Sample metrics in System Overview
- ❌ Development URLs in production

### **After Migration**
- ✅ Using `NEXT_PUBLIC_` prefixes
- ✅ Live MCP metrics in System Overview
- ✅ Production URLs configured
- ✅ Standardized environment structure

---

## 📞 **Support**

If you encounter any issues during the migration:

1. **Check Environment Variables**: Ensure all `NEXT_PUBLIC_` variables are set
2. **Verify MCP API**: Confirm connectivity to production endpoint
3. **Review Logs**: Check for environment variable errors
4. **Test Integration**: Run MCP compatibility tests

**Status: READY FOR PRODUCTION DEPLOYMENT** 🚀

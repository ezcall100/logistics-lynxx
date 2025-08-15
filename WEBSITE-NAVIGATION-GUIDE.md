# 🌐 Trans Bot AI - Website Navigation Guide

## 🏠 **Public Pages** (No Login Required)

### **Main Pages**
- **Home**: `http://localhost:5174/` - Main landing page
- **About**: `http://localhost:5174/about` - Company information
- **Services**: `http://localhost:5174/services` - Our services
- **Products**: `http://localhost:5174/products` - Product offerings
- **Pricing**: `http://localhost:5174/pricing` - Pricing plans
- **Contact**: `http://localhost:5174/contact` - Contact information

### **Marketing Pages**
- **Blog**: `http://localhost:5174/blog` - Company blog
- **Careers**: `http://localhost:5174/careers` - Job opportunities
- **News**: `http://localhost:5174/news` - Latest news
- **Events**: `http://localhost:5174/events` - Upcoming events
- **Resources**: `http://localhost:5174/resources` - Resource library
- **Downloads**: `http://localhost:5174/downloads` - Downloadable content

### **Social Proof**
- **Case Studies**: `http://localhost:5174/case-studies` - Success stories
- **Testimonials**: `http://localhost:5174/testimonials` - Customer reviews

### **Support & Documentation**
- **Support**: `http://localhost:5174/support` - Support center
- **Documentation**: `http://localhost:5174/documentation` - User guides
- **API Reference**: `http://localhost:5174/api-reference` - API documentation
- **Integrations**: `http://localhost:5174/integrations` - Third-party integrations
- **Partners**: `http://localhost:5174/partners` - Partner information

### **Legal & Compliance**
- **Security**: `http://localhost:5174/security` - Security information
- **Compliance**: `http://localhost:5174/compliance` - Compliance details
- **Privacy**: `http://localhost:5174/privacy` - Privacy policy
- **Terms**: `http://localhost:5174/terms` - Terms of service

### **Authentication**
- **Login**: `http://localhost:5174/login` - User login
- **Register**: `http://localhost:5174/register` - User registration
- **Forgot Password**: `http://localhost:5174/forgot-password` - Password recovery

### **System Status**
- **Status**: `http://localhost:5174/status` - System status page

---

## 🔐 **Protected Pages** (Login Required)

### **Portal Selection**
- **Portal Selection**: `http://localhost:8084/portal-selection` - Choose your portal

### **Main Dashboard**
- **Dashboard**: `http://localhost:8084/dashboard` - Main dashboard

### **User Management**
- **Profile**: `http://localhost:8084/profile` - User profile
- **Settings**: `http://localhost:8084/settings` - User settings
- **Billing**: `http://localhost:8084/billing` - Billing information

### **Business Intelligence**
- **Analytics Dashboard**: `http://localhost:8084/analytics-dashboard` - Analytics overview
- **Reports**: `http://localhost:8084/reports` - Business reports
- **Performance**: `http://localhost:8084/performance` - Performance metrics

### **TMS Core Features**
- **Fleet Management**: `http://localhost:8084/fleet-management` - Fleet operations
- **Route Optimization**: `http://localhost:8084/route-optimization` - Route planning
- **Load Management**: `http://localhost:8084/load-management` - Load operations
- **Driver Management**: `http://localhost:8084/driver-management` - Driver operations

### **System Monitoring**
- **Live Monitoring**: `http://localhost:8084/live-monitoring` - Real-time monitoring
- **System Health**: `http://localhost:8084/system-health` - System status

### **Development & Innovation**
- **Scalability**: `http://localhost:8084/scalability` - Scalability features
- **Innovation**: `http://localhost:8084/innovation` - Innovation initiatives
- **Research**: `http://localhost:8084/research` - Research projects
- **Development**: `http://localhost:8084/development` - Development updates
- **Roadmap**: `http://localhost:8084/roadmap` - Product roadmap
- **Updates**: `http://localhost:8084/updates` - System updates
- **Release Notes**: `http://localhost:8084/release-notes` - Release information
- **Migration**: `http://localhost:8084/migration` - Migration guides

### **Training & Community**
- **Training**: `http://localhost:8084/training` - Training materials
- **Certification**: `http://localhost:8084/certification` - Certification programs
- **Community**: `http://localhost:8084/community` - User community
- **Forum**: `http://localhost:8084/forum` - Discussion forum
- **Help Center**: `http://localhost:8084/help-center` - Help documentation

---

## 🏢 **Portal Pages** (Role-Based Access)

### **20 Canonical Portals** (Registry-based)
These are dynamically generated based on the portal registry:

1. **Super Admin**: `http://localhost:8084/super-admin`
2. **Admin**: `http://localhost:8084/admin`
3. **TMS Admin**: `http://localhost:8084/tms-admin`
4. **Onboarding**: `http://localhost:8084/onboarding`
5. **Broker**: `http://localhost:8084/broker`
6. **Shipper**: `http://localhost:8084/shipper`
7. **Carrier**: `http://localhost:8084/carrier`
8. **Driver**: `http://localhost:8084/driver`
9. **Owner Operator**: `http://localhost:8084/owner-operator`
10. **Factoring**: `http://localhost:8084/factoring`
11. **Load Board**: `http://localhost:8084/load-board`
12. **CRM**: `http://localhost:8084/crm`
13. **Financials**: `http://localhost:8084/financials`
14. **EDI**: `http://localhost:8084/edi`
15. **Marketplace**: `http://localhost:8084/marketplace`
16. **Analytics**: `http://localhost:8084/analytics`
17. **Autonomous AI**: `http://localhost:8084/autonomous`
18. **Workers**: `http://localhost:8084/workers`
19. **Rates**: `http://localhost:8084/rates`
20. **Directory**: `http://localhost:8084/directory`

### **Legacy Portal Pages** (Backward Compatibility)
- **Shipper Portal**: `http://localhost:8084/shipper-portal`
- **Carrier Portal**: `http://localhost:8084/carrier-portal`
- **Broker Portal**: `http://localhost:8084/broker-portal`
- **Admin Portal**: `http://localhost:8084/admin-portal`
- **Autonomous Dashboard**: `http://localhost:8084/autonomous-dashboard`

---

## 🚨 **Deprecated Routes** (Return 410 Status)

These routes return a 410 Gone status and redirect to canonical paths:
- `/carrier-admin` → `/carrier`
- `/broker-admin` → `/broker`
- `/shipper-admin` → `/shipper`
- `/carrier-dispatch` → `/load-board`

---

## 🔧 **Quick Access Commands**

### **Start Development Server**
```bash
npm run dev
```

### **Check Portal Configuration**
```bash
npm run check:portals
```

### **Run Smoke Tests**
```bash
npm run smoke:test
```

### **Build Portals**
```bash
npm run build:portals
```

---

## 🎯 **Getting Started**

1. **Start the server**: `npm run dev`
2. **Visit the home page**: `http://localhost:8084/`
3. **Explore public pages**: Try `/about`, `/pricing`, `/contact`
4. **Login**: Go to `/login` to access protected pages
5. **Select portal**: Visit `/portal-selection` after login
6. **Access your portal**: Navigate to your role-specific portal

---

## 📝 **Notes**

- **Protected pages** require authentication
- **Portal pages** require specific roles and feature flags
- **Deprecated routes** return 410 status and redirect
- **All pages** are responsive and work on mobile devices
- **Navigation** is handled by React Router
- **Authentication** is managed by the AuthContext

**Happy exploring!** 🚀

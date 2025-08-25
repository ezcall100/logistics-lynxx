# 🧪 MCP Compatibility Test Instructions

## 📋 **Overview**

This document provides step-by-step instructions for validating that the MCP backend implements all required endpoints and response formats expected by the Super Admin portal frontend.

## 🎯 **Test Objectives**

- ✅ Verify all 41 MCP endpoints are reachable
- ✅ Validate response formats match TypeScript interfaces
- ✅ Test authentication and error handling
- ✅ Confirm real-time features work correctly
- ✅ Generate compliance report for deployment

## 🚀 **Prerequisites**

### **1. MCP Backend Running**
```bash
# Ensure MCP server is running at:
http://localhost:3001/api

# Or set custom URL via environment:
export MCP_BASE_URL=http://your-mcp-server.com/api
```

### **2. Test Script Available**
```bash
# Verify test script exists:
ls test-mcp-compatibility.js

# Should show: test-mcp-compatibility.js
```

### **3. Node.js Environment**
```bash
# Verify Node.js is available:
node --version
# Should be v16+ or v18+

# Verify npm is available:
npm --version
```

## 📝 **Step-by-Step Test Execution**

### **Step 1: Basic Connectivity Test**
```bash
# Test basic connectivity to MCP server
curl -X GET http://localhost:3001/api/mcp/system/health

# Expected response:
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 12345,
    "version": "1.0.0",
    "timestamp": "2024-01-01T00:00:00Z"
  },
  "message": "System is healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### **Step 2: Run Full Compatibility Test**
```bash
# Execute the compatibility test script
node test-mcp-compatibility.js

# Expected output format:
🚀 Starting MCP API Compatibility Tests...
📍 Testing against: http://localhost:3001/api

🔍 Testing Health Check...
✅ Health Check: PASSED (200)
🔍 Testing Metrics Overview...
✅ Metrics Overview: PASSED (200)
...
```

### **Step 3: Analyze Test Results**
```bash
# The script will output a detailed report:
📊 Test Results Summary:
==================================================
✅ Passed: 41
❌ Failed: 0
📈 Total: 41
🎯 Success Rate: 100.0%
```

## 📊 **Expected Test Results**

### **✅ All Tests Should Pass**
| Test Category | Endpoints | Expected Status |
|---------------|-----------|-----------------|
| **Health & Metrics** | 3 | ✅ PASSED |
| **User Management** | 6 | ✅ PASSED |
| **Settings** | 3 | ✅ PASSED |
| **Agent Management** | 4 | ✅ PASSED |
| **Workflow Management** | 5 | ✅ PASSED |
| **Logs & Telemetry** | 3 | ✅ PASSED |
| **Task Management** | 5 | ✅ PASSED |
| **AI Assistant** | 4 | ✅ PASSED |
| **Document Processing** | 4 | ✅ PASSED |
| **System Operations** | 5 | ✅ PASSED |
| **Total** | **41** | **✅ ALL PASSED** |

### **🔍 Response Format Validation**
Each endpoint should return responses matching these patterns:

#### **Success Response Format**
```json
{
  "success": true,
  "data": {
    // Endpoint-specific data
  },
  "message": "Optional success message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### **Error Response Format**
```json
{
  "success": false,
  "error": "ERROR_TYPE",
  "message": "Human-readable error message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🧪 **Detailed Test Scenarios**

### **1. Health Check Test**
```bash
# Test: GET /mcp/system/health
# Expected: 200 OK
# Validates: Basic server connectivity
```

### **2. Metrics Overview Test**
```bash
# Test: GET /mcp/metrics/overview
# Expected: 200 OK
# Validates: System metrics data structure
```

### **3. User Management Tests**
```bash
# Test: GET /mcp/users
# Expected: 200 OK
# Validates: User list retrieval

# Test: POST /mcp/users
# Expected: 201 Created
# Validates: User creation with validation

# Test: PATCH /mcp/users/{id}
# Expected: 200 OK
# Validates: User update functionality

# Test: DELETE /mcp/users/{id}
# Expected: 200 OK
# Validates: User deletion
```

### **4. Settings Management Tests**
```bash
# Test: GET /mcp/settings
# Expected: 200 OK
# Validates: Settings retrieval

# Test: PATCH /mcp/settings
# Expected: 200 OK
# Validates: Settings update with validation
```

### **5. Agent Management Tests**
```bash
# Test: GET /mcp/agents
# Expected: 200 OK
# Validates: Agent list with status

# Test: PATCH /mcp/agents/{id}
# Expected: 200 OK
# Validates: Agent scaling

# Test: POST /mcp/agents/{id}/restart
# Expected: 200 OK
# Validates: Agent restart functionality
```

### **6. Workflow Management Tests**
```bash
# Test: GET /mcp/workflows
# Expected: 200 OK
# Validates: Workflow list

# Test: POST /mcp/workflows
# Expected: 201 Created
# Validates: Workflow creation

# Test: POST /mcp/workflows/{id}/activate
# Expected: 200 OK
# Validates: Workflow activation
```

### **7. Task Management Tests**
```bash
# Test: GET /mcp/tasks
# Expected: 200 OK
# Validates: Task list

# Test: POST /mcp/tasks
# Expected: 201 Created
# Validates: Task creation

# Test: GET /mcp/tasks/{id}
# Expected: 200 OK
# Validates: Task status retrieval
```

### **8. AI Assistant Tests**
```bash
# Test: POST /mcp/assistant/invoke
# Expected: 200 OK
# Validates: AI assistant functionality

# Test: GET /mcp/assistant/conversations
# Expected: 200 OK
# Validates: Conversation history
```

### **9. Document Processing Tests**
```bash
# Test: POST /mcp/docs/upload
# Expected: 201 Created
# Validates: Document upload

# Test: GET /mcp/docs/{id}
# Expected: 200 OK
# Validates: Document retrieval
```

### **10. System Operations Tests**
```bash
# Test: POST /mcp/system/restart
# Expected: 200 OK
# Validates: System restart

# Test: POST /mcp/system/drain
# Expected: 200 OK
# Validates: Queue draining

# Test: POST /mcp/system/reindex
# Expected: 200 OK
# Validates: Data reindexing
```

## 🔍 **Troubleshooting Common Issues**

### **Issue 1: Connection Refused**
```bash
❌ Error: connect ECONNREFUSED 127.0.0.1:3001

# Solution:
# 1. Verify MCP server is running
# 2. Check port configuration
# 3. Verify firewall settings
```

### **Issue 2: 404 Not Found**
```bash
❌ Error: 404 Not Found

# Solution:
# 1. Verify endpoint paths match exactly
# 2. Check API base URL configuration
# 3. Ensure routes are properly registered
```

### **Issue 3: 401 Unauthorized**
```bash
❌ Error: 401 Unauthorized

# Solution:
# 1. Verify authentication is configured
# 2. Check CSRF token handling
# 3. Ensure session management is working
```

### **Issue 4: 500 Internal Server Error**
```bash
❌ Error: 500 Internal Server Error

# Solution:
# 1. Check server logs for detailed error
# 2. Verify database connectivity
# 3. Check environment configuration
```

### **Issue 5: Response Format Mismatch**
```bash
❌ Error: Invalid response format

# Solution:
# 1. Verify response matches TypeScript interfaces
# 2. Check JSON structure
# 3. Ensure all required fields are present
```

## 📈 **Performance Benchmarks**

### **Expected Response Times**
| Endpoint Category | Expected Time | Acceptable Range |
|-------------------|---------------|------------------|
| **Health Check** | < 100ms | 50-200ms |
| **Metrics** | < 500ms | 200-1000ms |
| **User Management** | < 300ms | 150-600ms |
| **Settings** | < 200ms | 100-400ms |
| **Agent Management** | < 400ms | 200-800ms |
| **Workflow Management** | < 600ms | 300-1200ms |
| **Task Management** | < 500ms | 250-1000ms |
| **AI Assistant** | < 2000ms | 1000-5000ms |
| **Document Processing** | < 1000ms | 500-2000ms |
| **System Operations** | < 1000ms | 500-2000ms |

## 🎯 **Success Criteria**

### **✅ Test Pass Criteria**
- [ ] All 41 endpoints return 200/201 status codes
- [ ] Response formats match TypeScript interfaces
- [ ] Error handling works correctly (401, 403, 500)
- [ ] Authentication flows function properly
- [ ] Performance meets benchmark requirements
- [ ] Real-time features (SSE/WebSocket) work

### **✅ Deployment Readiness**
- [ ] 100% test pass rate
- [ ] All response times within acceptable ranges
- [ ] Error scenarios handled gracefully
- [ ] Authentication and authorization working
- [ ] Real-time features functional

## 📞 **Next Steps After Testing**

### **If All Tests Pass** ✅
1. **Deploy to production**
2. **Configure monitoring**
3. **Set up alerting**
4. **Document API usage**

### **If Tests Fail** ❌
1. **Review failed test details**
2. **Fix backend implementation**
3. **Re-run tests**
4. **Verify fixes**

## 🔄 **Continuous Testing**

### **Automated Testing Setup**
```bash
# Add to CI/CD pipeline
npm run test:compatibility

# Or run manually
node test-mcp-compatibility.js --ci
```

### **Regular Validation**
- Run tests after each deployment
- Monitor performance metrics
- Track error rates
- Validate new features

---

**🎯 Ready to Test: All 41 endpoints defined and ready for validation**

Run `node test-mcp-compatibility.js` to validate your MCP backend implementation against the Super Admin portal requirements.

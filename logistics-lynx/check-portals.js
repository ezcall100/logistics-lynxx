#!/usr/bin/env node

import http from 'http';

const PORTAL_URLS = [
  "http://localhost:8084/",
  "http://localhost:8084/login",
  "http://localhost:8084/register",
  "http://localhost:8084/broker",
  "http://localhost:8084/carrier",
  "http://localhost:8084/driver",
  "http://localhost:8084/shipper",
  "http://localhost:8084/admin",
  "http://localhost:8084/super-admin",
  "http://localhost:8084/analytics",
  "http://localhost:8084/autonomous",
  "http://localhost:8084/dashboard"
];

async function checkPortal(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve({ url, status: res.statusCode, working: res.statusCode === 200 });
    });
    
    req.on('error', () => {
      resolve({ url, status: 'ERROR', working: false });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', working: false });
    });
  });
}

async function checkAllPortals() {
  console.log('🔍 Checking portal accessibility...');
  
  for (const url of PORTAL_URLS) {
    const result = await checkPortal(url);
    const status = result.working ? '✅' : '❌';
    console.log(`${status} ${url} - ${result.status}`);
  }
}

checkAllPortals();

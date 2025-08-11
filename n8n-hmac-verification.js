// n8n HMAC Signature Verification - Production Ready
// Use with Function node (works on most n8n versions)

// Inputs: item 0 contains { headers, body }
const crypto = require('crypto');

// 1) Get signature header (base64), strip optional "sha256="
const sigHeader =
  $json.headers?.['x-signature-256'] ??
  $json.headers?.['X-Signature-256'];
if (!sigHeader) {
  throw new Error('Missing X-Signature-256 header');
}
const received = sigHeader.startsWith('sha256=') ? sigHeader.slice(7) : sigHeader;

// 2) Secret (prefer env var from n8n)
const secret = $env.N8N_WEBHOOK_SECRET || '';
if (!secret) {
  throw new Error('Missing N8N_WEBHOOK_SECRET');
}

// 3) Compute expected signature over the exact JSON payload
const payload = $json.body ?? $json; // adjust if your Webhook outputs under body
const expected = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('base64');

// 4) Constant-time compare
const a = Buffer.from(received, 'base64');
const b = Buffer.from(expected, 'base64');
if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
  throw new Error('Invalid signature');
}

// Pass through on success
return items;

// Alternative Code node version (ESM style):
/*
import crypto from 'crypto';

const sigHeader = $input.first().json.headers?.['x-signature-256'] ?? $input.first().json.headers?.['X-Signature-256'];
if (!sigHeader) throw new Error('Missing X-Signature-256 header');
const received = sigHeader.startsWith('sha256=') ? sigHeader.slice(7) : sigHeader;

const secret = $env.N8N_WEBHOOK_SECRET || '';
if (!secret) throw new Error('Missing N8N_WEBHOOK_SECRET');

const payload = $input.first().json.body ?? $input.first().json;
const expected = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('base64');

const a = Buffer.from(received, 'base64');
const b = Buffer.from(expected, 'base64');
if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
  throw new Error('Invalid signature');
}

return $input.all();
*/

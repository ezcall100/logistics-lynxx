#!/usr/bin/env node
/**
 * 🔐 DLQ Replay HMAC Signer Utility
 * 
 * Generates HMAC signatures for DLQ replay operations
 * Usage: npx ts-node scripts/sign-dlq-body.ts [options]
 */

import { createHmac } from 'crypto';

interface SignOptions {
  companyId: string;
  max?: number;
  idempotencyKey?: string;
  dryRun?: boolean;
  force?: boolean;
  dlqIds?: string[];
  errorType?: string;
  secret: string;
  verbose?: boolean;
}

function generateSignature(payload: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

function signDlqBody(options: SignOptions): void {
  const {
    companyId,
    max = 25,
    idempotencyKey,
    dryRun = false,
    force = false,
    dlqIds,
    errorType,
    secret,
    verbose = false
  } = options;

  // Build payload
  const payload: Record<string, unknown> = {
    company_id: companyId,
    max
  };

  if (idempotencyKey) {
    payload.idempotency_key = idempotencyKey;
  }

  if (dryRun) {
    payload.dry_run = true;
  }

  if (force) {
    payload.force = true;
  }

  if (dlqIds && dlqIds.length > 0) {
    payload.dlq_ids = dlqIds;
  }

  if (errorType) {
    payload.error_type = errorType;
  }

  const payloadString = JSON.stringify(payload);
  const signature = generateSignature(payloadString, secret);

  if (verbose) {
    console.log('🔐 DLQ Replay HMAC Signature Generator');
    console.log('=====================================');
    console.log(`Company ID: ${companyId}`);
    console.log(`Max Items: ${max}`);
    console.log(`Dry Run: ${dryRun}`);
    console.log(`Force: ${force}`);
    if (idempotencyKey) console.log(`Idempotency Key: ${idempotencyKey}`);
    if (dlqIds) console.log(`DLQ IDs: ${dlqIds.join(', ')}`);
    if (errorType) console.log(`Error Type: ${errorType}`);
    console.log('');
    console.log('📦 Payload:');
    console.log(payloadString);
    console.log('');
    console.log('🔑 Signature:');
    console.log(signature);
    console.log('');
    console.log('📋 cURL Command:');
  }

  // Generate cURL command
  const curlCommand = `curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \\
  -H "X-Transbot-Signature: ${signature}" \\
  -H "Content-Type: application/json" \\
  -d '${payloadString}'`;

  console.log(curlCommand);

  if (verbose) {
    console.log('');
    console.log('💡 Tips:');
    console.log('- Replace "your-project" with your actual Supabase project');
    console.log('- Set TRANSBOT_HMAC_SECRET environment variable for security');
    console.log('- Use --dry-run flag to test without executing');
    console.log('- Monitor audit logs for replay operations');
  }
}

// CLI argument parsing
function parseArgs(): SignOptions {
  const args = process.argv.slice(2);
  const options: Partial<SignOptions> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--company-id':
      case '-c':
        options.companyId = nextArg;
        i++;
        break;
      case '--max':
      case '-m':
        options.max = parseInt(nextArg);
        i++;
        break;
      case '--idempotency-key':
      case '-k':
        options.idempotencyKey = nextArg;
        i++;
        break;
      case '--dry-run':
      case '-d':
        options.dryRun = true;
        break;
      case '--force':
      case '-f':
        options.force = true;
        break;
      case '--dlq-ids':
        options.dlqIds = nextArg.split(',');
        i++;
        break;
      case '--error-type':
      case '-e':
        options.errorType = nextArg;
        i++;
        break;
      case '--secret':
      case '-s':
        options.secret = nextArg;
        i++;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
    }
  }

  // Validate required options
  if (!options.companyId) {
    console.error('❌ Error: --company-id is required');
    showHelp();
    process.exit(1);
  }

  if (!options.secret) {
    options.secret = process.env['TRANSBOT_HMAC_SECRET'];
    if (!options.secret) {
      console.error('❌ Error: --secret or TRANSBOT_HMAC_SECRET environment variable is required');
      showHelp();
      process.exit(1);
    }
  }

  return options as SignOptions;
}

function showHelp(): void {
  console.log(`
🔐 DLQ Replay HMAC Signer Utility

Usage: npx ts-node scripts/sign-dlq-body.ts [options]

Required Options:
  -c, --company-id <id>     Company ID for the replay operation
  -s, --secret <secret>     HMAC secret (or set TRANSBOT_HMAC_SECRET env var)

Optional Options:
  -m, --max <number>        Maximum items to replay (default: 25)
  -k, --idempotency-key <key>  Idempotency key for deduplication
  -d, --dry-run            Test mode - don't execute replay
  -f, --force              Force replay ignoring retry_after timestamps
  --dlq-ids <ids>          Comma-separated list of specific DLQ IDs
  -e, --error-type <type>  Filter by error type
  -v, --verbose            Show detailed output
  -h, --help               Show this help message

Examples:
  # Basic replay for a company
  npx ts-node scripts/sign-dlq-body.ts -c "00000000-0000-4000-8000-000000000001"

  # Dry run with custom max
  npx ts-node scripts/sign-dlq-body.ts -c "company-id" -m 10 -d -v

  # Replay specific DLQ items
  npx ts-node scripts/sign-dlq-body.ts -c "company-id" --dlq-ids "id1,id2,id3"

  # Force replay with idempotency key
  npx ts-node scripts/sign-dlq-body.ts -c "company-id" -f -k "INC-2025-01-13-001"

Environment Variables:
  TRANSBOT_HMAC_SECRET     HMAC secret for signature generation
`);
}

// Main execution
if (require.main === module) {
  try {
    const options = parseArgs();
    signDlqBody(options);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Error:', errorMessage);
    process.exit(1);
  }
}

export { signDlqBody, generateSignature };

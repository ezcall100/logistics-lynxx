// Test file to verify agent001 export works
import { agent001 } from './agents/agent001';

// Test the import
console.log('Agent001 imported successfully:', agent001);
console.log('Agent ID:', agent001.id);
console.log('Status:', agent001.status);

export { agent001 };
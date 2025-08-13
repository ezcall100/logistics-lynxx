import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common type replacements
const typeReplacements = {
  'any': 'unknown',
  'any[]': 'unknown[]',
  'Record<string, any>': 'Record<string, unknown>',
  'Promise<any>': 'Promise<unknown>',
  'Function': '() => void',
  'object': 'Record<string, unknown>'
};

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix common TypeScript issues
function fixTypeScriptFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix empty interfaces
    content = content.replace(/interface\s+\w+\s*\{\s*\}/g, '');
    
    // Fix @ts-ignore to @ts-expect-error
    content = content.replace(/@ts-ignore/g, '@ts-expect-error');
    
    // Fix some any types (be careful with this)
    for (const [oldType, newType] of Object.entries(typeReplacements)) {
      const regex = new RegExp(`\\b${oldType}\\b`, 'g');
      if (content.match(regex)) {
        content = content.replace(regex, newType);
        modified = true;
      }
    }
    
    // Fix prefer-const issues
    content = content.replace(/let\s+(\w+)\s*=\s*([^;]+);\s*\/\/\s*(\w+)\s+is\s+never\s+reassigned/g, 'const $1 = $2; // $3 is never reassigned');
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔧 Fixing TypeScript errors...');

const srcDir = path.join(__dirname, 'src');
const files = findTsFiles(srcDir);

console.log(`Found ${files.length} TypeScript files`);

for (const file of files) {
  fixTypeScriptFile(file);
}

console.log('✅ TypeScript fixes completed!');

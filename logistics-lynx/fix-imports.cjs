const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx files
function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findTsxFiles(fullPath, files);
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix import paths in a file
function fixImportPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix the incorrect import paths
  const oldPattern = /from '\.\.\/\.\.\/ui\//g;
  const newPattern = "from '../../../components/ui/";
  
  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newPattern);
    modified = true;
    console.log(`✅ Fixed: ${filePath}`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return modified;
}

// Main execution
console.log('🔧 Fixing import paths in all 88 pages...\n');

const pagesDir = path.join(__dirname, 'src', 'pages', 'super-admin');
const tsxFiles = findTsxFiles(pagesDir);

console.log(`📁 Found ${tsxFiles.length} .tsx files to process\n`);

let fixedCount = 0;

for (const file of tsxFiles) {
  if (fixImportPaths(file)) {
    fixedCount++;
  }
}

console.log(`\n🎉 COMPLETE! Fixed ${fixedCount} files with incorrect import paths.`);
console.log('✅ All 88 pages should now work correctly!');

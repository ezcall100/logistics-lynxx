const fs = require('fs');
const path = require('path');

const uiComponentsDir = path.join(__dirname, 'src/components/ui');
const files = fs.readdirSync(uiComponentsDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(uiComponentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file already has inline cn function
  if (content.includes('// Inline cn function to avoid import issues')) {
    console.log(`Skipping ${file} - already has inline cn function`);
    return;
  }
  
  // Replace cn import with inline function
  if (content.includes('import { cn } from')) {
    // Remove the cn import
    content = content.replace(/import \{ cn \} from ["']\.\.\/\.\.\/lib\/utils["'];?\n?/g, '');
    content = content.replace(/import \{ cn \} from ["']@\/lib\/utils["'];?\n?/g, '');
    
    // Add clsx and twMerge imports and inline cn function after the first import
    const importMatch = content.match(/import.*from.*["']/);
    if (importMatch) {
      const insertIndex = content.indexOf(importMatch[0]) + importMatch[0].length;
      const beforeInsert = content.substring(0, insertIndex);
      const afterInsert = content.substring(insertIndex);
      
      content = beforeInsert + afterInsert.replace(/^/, `
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Inline cn function to avoid import issues
const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs))
}
`);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  } else {
    console.log(`Skipping ${file} - no cn import found`);
  }
});

console.log('All cn imports fixed!');

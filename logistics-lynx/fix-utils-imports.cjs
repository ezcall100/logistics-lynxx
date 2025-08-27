const fs = require('fs');
const path = require('path');

const uiComponentsDir = path.join(__dirname, 'src/components/ui');
const files = fs.readdirSync(uiComponentsDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(uiComponentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the import statement
  content = content.replace(
    /import \{ cn \} from "\.\.\/\.\.\/lib\/utils"/g,
    'import { cn } from "../../lib/utils.js"'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed imports in ${file}`);
});

console.log('All utils imports fixed!');

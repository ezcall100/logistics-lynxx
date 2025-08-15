const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Autonomous Component Import Paths...');

const autonomousDir = path.join(__dirname, 'logistics-lynx', 'src', 'components', 'autonomous');

function fixImportPaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix UI component imports
    const uiImportRegex = /from ['"]\.\/ui\/([^'"]+)['"]/g;
    const uiMatches = content.match(uiImportRegex);
    
    if (uiMatches) {
      content = content.replace(uiImportRegex, (match, component) => {
        modified = true;
        return `from '../ui/${component}'`;
      });
    }

    // Fix other relative imports that should be absolute
    const relativeImportRegex = /from ['"]\.\/([^'"]+)['"]/g;
    const relativeMatches = content.match(relativeImportRegex);
    
    if (relativeMatches) {
      // Only fix if it's not a valid relative import within the autonomous directory
      const validRelativeImports = [
        'activation/',
        'task-coordinator/',
        'scaling/',
        'performance/',
        'AIAgentManager',
        'AutonomousTaskManager',
        'AutonomousKnowledgeBase',
        'RealtimeDashboard',
        'PerformanceOptimizationDashboard',
        'PredictiveScalingDashboard',
        'SelfHealingDashboard',
        'AutonomousUIDesignDashboard',
        'RealtimeUIDesignAgent',
        'PortalImprovementTracker',
        'AdvancedFeatureCenter',
        'FeatureDeploymentTracker',
        'FullAutonomyAuthorization',
        'AutonomousPerformanceDashboard'
      ];

      content = content.replace(relativeImportRegex, (match, importPath) => {
        // Check if this is a valid relative import
        const isValidRelative = validRelativeImports.some(valid => 
          importPath.startsWith(valid) || importPath === valid
        );
        
        if (!isValidRelative && !importPath.includes('ui/')) {
          modified = true;
          return `from '../${importPath}'`;
        }
        return match;
      });
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed imports in: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fixImportPaths(filePath);
      }
    });
  } catch (error) {
    console.log(`❌ Error scanning directory ${dir}:`, error.message);
  }
}

// Scan and fix all autonomous components
if (fs.existsSync(autonomousDir)) {
  scanDirectory(autonomousDir);
  console.log('✅ Import path fixes completed!');
} else {
  console.log('❌ Autonomous components directory not found');
}

console.log('\n🎯 Quick Fix Summary:');
console.log('• Fixed UI component imports (./ui/ → ../ui/)');
console.log('• Fixed invalid relative imports');
console.log('• Preserved valid relative imports within autonomous directory');
console.log('\n🚀 Your autonomous components should now work correctly!');

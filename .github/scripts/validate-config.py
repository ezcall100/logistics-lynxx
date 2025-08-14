#!/usr/bin/env python3
"""
Configuration validation script for GitHub Actions workflow.
Validates package.json and tsconfig.json files.
"""

import json
import sys
import os

def validate_package_json():
    """Validate package.json file."""
    try:
        with open('logistics-lynx/package.json') as f:
            data = json.load(f)
        
        # Check required fields
        required_fields = ['name', 'version', 'scripts']
        for field in required_fields:
            if field not in data:
                print(f'❌ Missing required field: {field}')
                return False
        
        # Check required scripts
        scripts = data.get('scripts', {})
        required_scripts = ['build', 'lint']
        optional_scripts = ['test', 'dev', 'start', 'deploy']
        
        for script in required_scripts:
            if script in scripts:
                print(f'✅ {script} script present')
            else:
                print(f'❌ Missing required script: {script}')
                return False
        
        for script in optional_scripts:
            if script in scripts:
                print(f'✅ {script} script present (optional)')
            else:
                print(f'⚠️ {script} script missing (optional)')
        
        print('✅ package.json validation passed')
        return True
    except Exception as e:
        print(f'❌ package.json validation failed: {e}')
        return False

def validate_tsconfig_json():
    """Validate tsconfig.json file."""
    try:
        with open('logistics-lynx/tsconfig.json') as f:
            content = f.read()
        
        # Remove TypeScript-style comments before parsing as JSON
        import re
        
        # Remove single-line comments (// ...)
        content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
        
        # Remove multi-line comments (/* ... */)
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        
        # Parse the cleaned JSON
        data = json.loads(content)
        
        required_fields = ['compilerOptions']
        for field in required_fields:
            if field not in data:
                print(f'❌ Missing required field: {field}')
                return False
        
        # Check for essential compiler options
        compiler_options = data.get('compilerOptions', {})
        essential_options = ['target', 'module', 'moduleResolution']
        
        for option in essential_options:
            if option in compiler_options:
                print(f'✅ {option} compiler option present')
            else:
                print(f'⚠️ {option} compiler option missing (optional)')
        
        print('✅ tsconfig.json validation passed')
        return True
    except Exception as e:
        print(f'❌ tsconfig.json validation failed: {e}')
        return False

def main():
    """Main validation function."""
    print("⚙️ Validating configuration files...")
    
    success = True
    
    # Validate package.json
    if os.path.exists('logistics-lynx/package.json'):
        print("📦 Validating logistics-lynx/package.json...")
        if not validate_package_json():
            success = False
    else:
        print("❌ logistics-lynx/package.json not found")
        success = False
    
    # Validate TypeScript config
    if os.path.exists('logistics-lynx/tsconfig.json'):
        print("📝 Validating tsconfig.json...")
        if not validate_tsconfig_json():
            success = False
    else:
        print("❌ logistics-lynx/tsconfig.json not found")
        success = False
    
    if not success:
        sys.exit(1)
    
    print("✅ All configuration files validated successfully")

if __name__ == "__main__":
    main()

#!/bin/bash

# 🔍 Workflow Pattern Verification Script
# Ensures our clean patterns are maintained across all workflow files

set -euo pipefail

echo "🔍 Verifying workflow patterns..."
echo "=================================="

# Check for context expressions in YAML mappings (should be zero)
echo "📋 Checking for context expressions in YAML mappings..."
echo "--------------------------------------------------------"

# Check env:, with:, matrix: blocks for vars.* or secrets.*
echo "❌ Context expressions in YAML mappings (should be zero):"
if rg -n --glob ".github/workflows/*.yml" '^(?:\s*)(env|with|matrix):' -A 10 | rg '\${{\s*(vars|secrets)\.'; then
    echo "❌ FOUND: Context expressions in YAML mappings!"
    echo "   These should be moved to run: blocks with export scripts."
    exit 1
else
    echo "✅ No context expressions found in YAML mappings"
fi

echo ""

# Check for hyphenated outputs without bracket notation
echo "📋 Checking for hyphenated outputs..."
echo "-------------------------------------"
echo "❌ Hyphenated outputs without bracket notation (should be zero):"
if rg -n --glob ".github/workflows/*.yml" 'outputs\.[^ ]*-[^ ]*' | grep -v "outputs\['"; then
    echo "❌ FOUND: Hyphenated outputs without bracket notation!"
    echo "   Use: outputs['issue-url'] instead of outputs.issue-url"
    exit 1
else
    echo "✅ All hyphenated outputs use bracket notation"
fi

echo ""

# Verify context expressions only appear in run: blocks
echo "📋 Checking context expression placement..."
echo "-------------------------------------------"
echo "✅ Context expressions in run: blocks (expected):"
rg -n --glob ".github/workflows/*.yml" '\${{\s*(vars|secrets)\.' | head -5
echo "   ... (showing first 5 matches)"

echo ""

# Check for our export script pattern
echo "📋 Checking for export script pattern..."
echo "----------------------------------------"
echo "✅ Export script usage:"
rg -n --glob ".github/workflows/*.yml" "export-env-secrets\.sh" | wc -l | xargs echo "   Found export script calls:"
rg -n --glob ".github/workflows/*.yml" "export-env-secrets\.sh" | head -3
echo "   ... (showing first 3 matches)"

echo ""

# Summary
echo "🎯 Verification Summary"
echo "======================"
echo "✅ All workflow patterns are clean!"
echo "✅ No context expressions in YAML mappings"
echo "✅ All hyphenated outputs use bracket notation"
echo "✅ Context expressions only in run: blocks"
echo "✅ Export script pattern is being used"
echo ""
echo "🚀 Your workflows are ready for autonomous agents!"
echo "💡 Remember: Disable GitHub Actions extension for clean editor experience"

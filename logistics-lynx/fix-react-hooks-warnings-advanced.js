import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Starting to fix advanced React Hooks warnings...');

// Files that need useCallback/useMemo fixes
const filesToProcess = [
  'src/components/autonomous/FrontendChangeAgent.tsx',
  'src/components/autonomous/MetricsBar.tsx',
  'src/components/autonomous/RealAutonomousAgent.tsx',
  'src/components/autonomous/RealTimeAgentMonitor.tsx',
  'src/components/autonomous/RealtimeUIDesignAgent.tsx',
  'src/components/autonomous/SelfLearningEngine.tsx',
  'src/components/autonomous/WebsiteBuilder.tsx',
  'src/components/billing/UsageMeter.tsx',
  'src/components/carrier-dispatch/DispatchDashboard.tsx',
  'src/components/carrier/DriversTable.tsx',
  'src/components/carrier/OwnerOperatorsTable.tsx',
  'src/components/dashboard/ROIFunnelDashboard.tsx',
  'src/components/enterprise/ROICalculator.tsx',
  'src/components/enterprise/ROICalculatorEnhanced.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/components/shipments/ShipmentList.tsx',
  'src/components/super-admin/N8NIntegrationPanel.tsx',
  'src/components/testing/AgentStatusChecker.tsx',
  'src/components/testing/N8NQuickTest.tsx',
  'src/hooks/autonomous/useAutonomousActivation.ts',
  'src/hooks/autonomous/useAutonomousAgentManager.ts',
  'src/hooks/autonomous/useRealtimeUIOptimization.ts',
  'src/hooks/market-research/useMarketResearchAgents.ts',
  'src/hooks/testing/useTestingTasks.ts',
  'src/hooks/useAIConfidenceLogs.ts',
  'src/hooks/useAutonomousKnowledge.ts',
  'src/hooks/useCRM.ts',
  'src/hooks/usePerformanceOptimization.ts',
  'src/hooks/useSelfHealingAlerts.ts',
  'src/hooks/useSelfLearning.ts',
  'src/pages/broker-admin/rates/BrokerRateIntegration.tsx',
  'src/pages/carrier-admin/RatesPage.tsx',
  'src/pages/carrier-admin/rates/BuyRates.tsx',
  'src/pages/carrier-admin/rates/RatesOverview.tsx',
  'src/pages/carrier-admin/rates/SellRates.tsx',
  'src/pages/dashboard/Dashboard.tsx',
  'src/pages/driver/CommunicationCenterPage.tsx',
  'src/pages/driver/LoadAssignmentsPage.tsx',
  'src/pages/driver/PerformanceTrackingPage.tsx',
  'src/pages/driver/communication/DispatchChatPage.tsx',
  'src/pages/driver/routes/ActiveRoutePage.tsx',
  'src/pages/loads/LoadManagementPage.tsx',
  'src/pages/owner-operator/communication/DispatchChatPage.tsx',
  'src/pages/super-admin/settings/SuperAdminSettingsPage.tsx'
];

let totalFixed = 0;

for (const filePath of filesToProcess) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let fileFixed = false;

    // Check if React imports are present, add if missing
    if (!content.includes('import React') && !content.includes('import { useCallback, useMemo }')) {
      if (content.includes('import React')) {
        content = content.replace('import React', 'import React, { useCallback, useMemo }');
      } else {
        content = content.replace('import {', 'import React, {');
        content = content.replace('import { useCallback, useMemo }', 'import React, { useCallback, useMemo }');
      }
      fileFixed = true;
    }

    // Pattern 1: Wrap arrays in useMemo
    const arrayPatterns = [
      { name: 'frontendEnhancements', pattern: /const frontendEnhancements = \[([\s\S]*?)\];/g },
      { name: 'realCSSModifications', pattern: /const realCSSModifications = \[([\s\S]*?)\];/g },
      { name: 'pageTypes', pattern: /const pageTypes = \[([\s\S]*?)\];/g },
      { name: 'mockUsageData', pattern: /const mockUsageData = \[([\s\S]*?)\];/g },
      { name: 'defaultTasks', pattern: /const defaultTasks = \[([\s\S]*?)\];/g },
      { name: 'routeToRoleMap', pattern: /const routeToRoleMap = \{([\s\S]*?)\};/g },
      { name: 'settingsSections', pattern: /const settingsSections = \[([\s\S]*?)\];/g },
      { name: 'messages', pattern: /const messages = \[([\s\S]*?)\];/g }
    ];

    for (const { name, pattern } of arrayPatterns) {
      const match = pattern.exec(content);
      if (match) {
        const arrayContent = match[1];
        const replacement = `const ${name} = useMemo(() => [${arrayContent}], []);`;
        content = content.replace(match[0], replacement);
        fileFixed = true;
        console.log(`  ✅ Wrapped ${name} in useMemo in ${filePath}`);
      }
    }

    // Pattern 2: Wrap functions in useCallback
    const functionPatterns = [
      { name: 'connectWebSocket', pattern: /const connectWebSocket = \(\) => \{([\s\S]*?)\};/g },
      { name: 'triggerOptimization', pattern: /const triggerOptimization = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchLoads', pattern: /const fetchLoads = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchCarriers', pattern: /const fetchCarriers = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchDispatchStats', pattern: /const fetchDispatchStats = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchDrivers', pattern: /const fetchDrivers = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchOwnerOperators', pattern: /const fetchOwnerOperators = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchFunnelData', pattern: /const fetchFunnelData = \(\) => \{([\s\S]*?)\};/g },
      { name: 'calculateROI', pattern: /const calculateROI = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchShipments', pattern: /const fetchShipments = \(\) => \{([\s\S]*?)\};/g },
      { name: 'testWebhook', pattern: /const testWebhook = \(\) => \{([\s\S]*?)\};/g },
      { name: 'runHealthCheck', pattern: /const runHealthCheck = \(\) => \{([\s\S]*?)\};/g },
      { name: 'runQuickTest', pattern: /const runQuickTest = \(\) => \{([\s\S]*?)\};/g },
      { name: 'executeAgentTask', pattern: /const executeAgentTask = \(\) => \{([\s\S]*?)\};/g },
      { name: 'executeMarketResearch', pattern: /const executeMarketResearch = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchLogs', pattern: /const fetchLogs = \(\) => \{([\s\S]*?)\};/g },
      { name: 'loadKnowledgeBase', pattern: /const loadKnowledgeBase = \(\) => \{([\s\S]*?)\};/g },
      { name: 'runPatternAnalysis', pattern: /const runPatternAnalysis = \(\) => \{([\s\S]*?)\};/g },
      { name: 'generateNewRules', pattern: /const generateNewRules = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchAllCRMData', pattern: /const fetchAllCRMData = \(\) => \{([\s\S]*?)\};/g },
      { name: 'generateOptimizationAction', pattern: /const generateOptimizationAction = \(\) => \{([\s\S]*?)\};/g },
      { name: 'executeOptimization', pattern: /const executeOptimization = \(\) => \{([\s\S]*?)\};/g },
      { name: 'calculateSystemHealth', pattern: /const calculateSystemHealth = \(\) => \{([\s\S]*?)\};/g },
      { name: 'attemptSelfHealing', pattern: /const attemptSelfHealing = \(\) => \{([\s\S]*?)\};/g },
      { name: 'runLearningCycle', pattern: /const runLearningCycle = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchBrokerRates', pattern: /const fetchBrokerRates = \(\) => \{([\s\S]*?)\};/g },
      { name: 'getInitialTab', pattern: /const getInitialTab = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchBuyRates', pattern: /const fetchBuyRates = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchRateMetrics', pattern: /const fetchRateMetrics = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchSellRates', pattern: /const fetchSellRates = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchCommunications', pattern: /const fetchCommunications = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchDriverLoads', pattern: /const fetchDriverLoads = \(\) => \{([\s\S]*?)\};/g },
      { name: 'fetchPerformanceData', pattern: /const fetchPerformanceData = \(\) => \{([\s\S]*?)\};/g },
      { name: 'initializeRouteData', pattern: /const initializeRouteData = \(\) => \{([\s\S]*?)\};/g }
    ];

    for (const { name, pattern } of functionPatterns) {
      const match = pattern.exec(content);
      if (match) {
        const functionContent = match[1];
        const replacement = `const ${name} = useCallback(() => {${functionContent}}, []);`;
        content = content.replace(match[0], replacement);
        fileFixed = true;
        console.log(`  ✅ Wrapped ${name} in useCallback in ${filePath}`);
      }
    }

    // Pattern 3: Fix duplicate dependencies
    const duplicatePattern = /useEffect\([\s\S]*?,\s*\[([^\]]*fetchData[^,]*fetchData[^\]]*)\]\s*\);/g;
    const duplicateMatch = duplicatePattern.exec(content);
    if (duplicateMatch) {
      const deps = duplicateMatch[1];
      const uniqueDeps = [...new Set(deps.split(',').map(d => d.trim()))].join(', ');
      const newMatch = duplicateMatch[0].replace(`[${deps}]`, `[${uniqueDeps}]`);
      content = content.replace(duplicateMatch[0], newMatch);
      fileFixed = true;
      console.log(`  ✅ Fixed duplicate dependencies in ${filePath}`);
    }

    if (fileFixed) {
      fs.writeFileSync(fullPath, content, 'utf8');
      totalFixed++;
    }

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log(`\n🎉 Fixed ${totalFixed} files with advanced React Hooks warnings!`);
console.log('💡 Note: Some warnings may require manual review for complex dependencies.');

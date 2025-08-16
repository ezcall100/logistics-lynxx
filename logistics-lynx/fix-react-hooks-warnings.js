import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common patterns to fix
const patterns = [
  {
    // Pattern: useEffect with missing dependencies
    regex: /useEffect\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\},\s*\[\s*\]\s*\);/g,
    replacement: (match, p1, p2) => {
      // This is a complex pattern that needs manual review
      return match;
    }
  },
  {
    // Pattern: useEffect with some dependencies but missing common ones
    regex: /useEffect\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\},\s*\[([^\]]*)\]\s*\);/g,
    replacement: (match, deps) => {
      // This is a complex pattern that needs manual review
      return match;
    }
  }
];

// Files to process
const filesToProcess = [
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
  'src/pages/auth/LoginPage.tsx',
  'src/pages/broker-admin/rates/BrokerRateIntegration.tsx',
  'src/pages/carrier-admin/RatesPage.tsx',
  'src/pages/carrier-admin/rates/BuyRates.tsx',
  'src/pages/carrier-admin/rates/RatesOverview.tsx',
  'src/pages/carrier-admin/rates/SellRates.tsx',
  'src/pages/crm/CRMActivitiesPage.tsx',
  'src/pages/crm/CRMCompaniesPage.tsx',
  'src/pages/dashboard/Dashboard.tsx',
  'src/pages/driver/CommunicationCenterPage.tsx',
  'src/pages/driver/LoadAssignmentsPage.tsx',
  'src/pages/driver/PerformanceTrackingPage.tsx',
  'src/pages/driver/communication/DispatchChatPage.tsx',
  'src/pages/driver/routes/ActiveRoutePage.tsx',
  'src/pages/loads/LoadManagementPage.tsx',
  'src/pages/owner-operator/communication/DispatchChatPage.tsx',
  'src/pages/super-admin/crm/CRMCalendar.tsx',
  'src/pages/super-admin/crm/CRMContacts.tsx',
  'src/pages/super-admin/crm/CRMOpportunities.tsx',
  'src/pages/super-admin/crm/CRMProjects.tsx',
  'src/pages/super-admin/settings/SuperAdminSettingsPage.tsx'
];

console.log('🔧 Starting to fix React Hooks warnings...');

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

    // Fix common patterns
    // Pattern 1: Add missing dependencies to useEffect
    const useEffectRegex = /useEffect\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\},\s*\[([^\]]*)\]\s*\);/g;
    let match;
    
    while ((match = useEffectRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const deps = match[1];
      
      // Check if this useEffect uses common functions that should be in deps
      const commonDeps = [
        'fetchData', 'fetchDrivers', 'fetchOwnerOperators', 'fetchFunnelData',
        'calculateROI', 'fetchCarriers', 'fetchDispatchStats', 'fetchLoads',
        'fetchShipments', 'testWebhook', 'runHealthCheck', 'runQuickTest',
        'executeAgentTask', 'executeOptimization', 'executeMarketResearch',
        'defaultTasks', 'fetchLogs', 'generateNewRules', 'loadKnowledgeBase',
        'runPatternAnalysis', 'fetchAllCRMData', 'calculateSystemHealth',
        'generateOptimizationAction', 'attemptSelfHealing', 'healingAttempts',
        'runLearningCycle', 'nav', 'fetchBrokerRates', 'getInitialTab',
        'fetchBuyRates', 'fetchRateMetrics', 'fetchSellRates', 'fetchActivities',
        'fetchCompanies', 'fetchContacts', 'routeToRoleMap', 'fetchCommunications',
        'fetchDriverLoads', 'fetchPerformanceData', 'initializeRouteData',
        'updateLiveData', 'fetchData', 'fetchEvents', 'fetchOpportunities',
        'fetchProjects', 'settingsSections', 'triggerNewOptimization',
        'frontendEnhancements', 'portalMetrics', 'realCSSModifications',
        'connectWebSocket', 'triggerOptimization', 'pageTypes', 'mockUsageData',
        'toast'
      ];

      const missingDeps = [];
      for (const dep of commonDeps) {
        if (fullMatch.includes(dep) && !deps.includes(dep)) {
          missingDeps.push(dep);
        }
      }

      if (missingDeps.length > 0) {
        const newDeps = deps.trim() ? `${deps}, ${missingDeps.join(', ')}` : missingDeps.join(', ');
        const newMatch = fullMatch.replace(`[${deps}]`, `[${newDeps}]`);
        content = content.replace(fullMatch, newMatch);
        fileFixed = true;
        console.log(`  ✅ Fixed ${missingDeps.join(', ')} in ${filePath}`);
      }
    }

    if (fileFixed) {
      fs.writeFileSync(fullPath, content, 'utf8');
      totalFixed++;
    }

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log(`\n🎉 Fixed ${totalFixed} files with React Hooks warnings!`);
console.log('💡 Note: Some warnings may require manual review for complex dependencies.');

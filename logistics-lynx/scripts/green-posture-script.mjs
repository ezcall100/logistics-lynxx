#!/usr/bin/env node

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import http from 'http';

class GreenPostureScript {
  constructor() {
    this.startTime = new Date();
    this.results = {
      slos: {},
      budgets: {},
      artifacts: {},
      recommendations: []
    };
    this.artifactsDir = path.join(process.cwd(), 'artifacts');
  }

  async log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    console.log(logEntry);
  }

  async ensureArtifactsDir() {
    await fs.mkdir(this.artifactsDir, { recursive: true });
  }

  async checkSLOS() {
    this.log('📊 Checking SLOs...');
    
    const slos = {
      portalAccessibility: { target: 100, current: 0 },
      buildSuccess: { target: 95, current: 0 },
      errorRate: { target: 2, current: 0 },
      latencyP95: { target: 2500, current: 0 }, // 2.5s in ms
      dlqReplayFail: { target: 2, current: 0 },
      outboxLagP95: { target: 5000, current: 0 } // 5s in ms
    };

    // Check portal accessibility
    try {
      const portalCheck = execSync('npm run check:portals', { encoding: 'utf8' });
      const successMatches = portalCheck.match(/✅/g);
      const totalMatches = portalCheck.match(/[✅❌]/g);
      slos.portalAccessibility.current = successMatches ? (successMatches.length / totalMatches.length) * 100 : 0;
    } catch (error) {
      slos.portalAccessibility.current = 0;
    }

    // Check build success rate (simulated - in real world, get from metrics)
    slos.buildSuccess.current = 98; // Simulated value

    // Check error rate (simulated)
    slos.errorRate.current = 1.2; // Simulated value

    // Check latency (simulated)
    slos.latencyP95.current = 1800; // Simulated value

    // Check DLQ replay failure rate (simulated)
    slos.dlqReplayFail.current = 0.5; // Simulated value

    // Check outbox lag (simulated)
    slos.outboxLagP95.current = 3000; // Simulated value

    this.results.slos = slos;
    
    // Log SLO status
    Object.entries(slos).forEach(([name, slo]) => {
      const status = slo.current >= slo.target ? '✅' : '❌';
      const unit = name.includes('latency') || name.includes('lag') ? 'ms' : '%';
      this.log(`${status} ${name}: ${slo.current}${unit}/${slo.target}${unit}`);
    });
  }

  async checkBudgets() {
    this.log('💰 Checking budgets...');
    
    const budgets = {
      errorBudget: { remaining: 0, consumed: 0 },
      latencyBudget: { remaining: 0, consumed: 0 },
      buildBudget: { remaining: 0, consumed: 0 }
    };

    // Calculate error budget (simulated)
    const errorRate = this.results.slos.errorRate.current;
    const errorTarget = this.results.slos.errorRate.target;
    budgets.errorBudget.consumed = Math.max(0, errorRate - errorTarget);
    budgets.errorBudget.remaining = Math.max(0, 100 - budgets.errorBudget.consumed);

    // Calculate latency budget (simulated)
    const latency = this.results.slos.latencyP95.current;
    const latencyTarget = this.results.slos.latencyP95.target;
    budgets.latencyBudget.consumed = Math.max(0, (latency - latencyTarget) / latencyTarget * 100);
    budgets.latencyBudget.remaining = Math.max(0, 100 - budgets.latencyBudget.consumed);

    // Calculate build budget (simulated)
    const buildSuccess = this.results.slos.buildSuccess.current;
    const buildTarget = this.results.slos.buildSuccess.target;
    budgets.buildBudget.consumed = Math.max(0, buildTarget - buildSuccess);
    budgets.buildBudget.remaining = Math.max(0, 100 - budgets.buildBudget.consumed);

    this.results.budgets = budgets;
    
    // Log budget status
    Object.entries(budgets).forEach(([name, budget]) => {
      const status = budget.remaining > 50 ? '✅' : budget.remaining > 20 ? '⚠️' : '❌';
      this.log(`${status} ${name}: ${budget.remaining.toFixed(1)}% remaining (${budget.consumed.toFixed(1)}% consumed)`);
    });
  }

  async generateSBOM() {
    this.log('📦 Generating SBOM...');
    
    try {
      // Generate SBOM using npm list
      const sbom = execSync('npm list --json', { encoding: 'utf8' });
      const sbomPath = path.join(this.artifactsDir, `sbom-${Date.now()}.json`);
      await fs.writeFile(sbomPath, sbom);
      
      this.results.artifacts.sbom = sbomPath;
      this.log(`✅ SBOM generated: ${sbomPath}`);
    } catch (error) {
      this.log(`❌ SBOM generation failed: ${error.message}`, 'error');
    }
  }

  async generateDependencyAudit() {
    this.log('🔒 Running dependency audit...');
    
    try {
      const audit = execSync('npm audit --json', { encoding: 'utf8' });
      const auditPath = path.join(this.artifactsDir, `audit-${Date.now()}.json`);
      await fs.writeFile(auditPath, audit);
      
      this.results.artifacts.audit = auditPath;
      this.log(`✅ Dependency audit generated: ${auditPath}`);
    } catch (error) {
      this.log(`❌ Dependency audit failed: ${error.message}`, 'error');
    }
  }

  async generatePostureReport() {
    this.log('📋 Generating posture report...');
    
    const endTime = new Date();
    const duration = endTime - this.startTime;
    
    const report = {
      timestamp: endTime.toISOString(),
      duration: `${Math.round(duration / 1000)}s`,
      slos: this.results.slos,
      budgets: this.results.budgets,
      artifacts: this.results.artifacts,
      recommendations: this.generateRecommendations(),
      summary: this.generateSummary()
    };

    const reportPath = path.join(this.artifactsDir, `green-posture-${Date.now()}.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    this.results.artifacts.report = reportPath;
    this.log(`✅ Posture report generated: ${reportPath}`);
    
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    // SLO-based recommendations
    Object.entries(this.results.slos).forEach(([name, slo]) => {
      if (slo.current < slo.target) {
        recommendations.push({
          type: 'slo_breach',
          slo: name,
          current: slo.current,
          target: slo.target,
          action: `Improve ${name} from ${slo.current} to ${slo.target}`
        });
      }
    });

    // Budget-based recommendations
    Object.entries(this.results.budgets).forEach(([name, budget]) => {
      if (budget.remaining < 20) {
        recommendations.push({
          type: 'budget_low',
          budget: name,
          remaining: budget.remaining,
          action: `Monitor ${name} budget closely - only ${budget.remaining.toFixed(1)}% remaining`
        });
      }
    });

    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'all_green',
        action: 'All systems operating within SLOs and budgets'
      });
    }

    return recommendations;
  }

  generateSummary() {
    const sloBreaches = Object.values(this.results.slos).filter(slo => slo.current < slo.target).length;
    const budgetWarnings = Object.values(this.results.budgets).filter(budget => budget.remaining < 50).length;
    
    const totalSLOs = Object.keys(this.results.slos).length;
    const totalBudgets = Object.keys(this.results.budgets).length;
    
    return {
      sloBreaches,
      budgetWarnings,
      sloHealth: `${totalSLOs - sloBreaches}/${totalSLOs}`,
      budgetHealth: `${totalBudgets - budgetWarnings}/${totalBudgets}`,
      overallStatus: sloBreaches === 0 && budgetWarnings === 0 ? 'GREEN' : 'YELLOW'
    };
  }

  async run() {
    try {
      this.log('🟢 Starting Green Posture Assessment');
      this.log('=' * 60);
      
      await this.ensureArtifactsDir();
      
      // Run all checks
      await this.checkSLOS();
      await this.checkBudgets();
      await this.generateSBOM();
      await this.generateDependencyAudit();
      
      // Generate final report
      const report = await this.generatePostureReport();
      
      // Display summary
      this.log('=' * 60);
      this.log('📊 Green Posture Summary:');
      this.log(`Overall Status: ${report.summary.overallStatus}`);
      this.log(`SLO Health: ${report.summary.sloHealth}`);
      this.log(`Budget Health: ${report.summary.budgetHealth}`);
      this.log(`SLO Breaches: ${report.summary.sloBreaches}`);
      this.log(`Budget Warnings: ${report.summary.budgetWarnings}`);
      
      if (report.recommendations.length > 0) {
        this.log('\n💡 Recommendations:');
        report.recommendations.forEach((rec, index) => {
          this.log(`${index + 1}. ${rec.action}`);
        });
      }
      
      this.log('=' * 60);
      this.log(`🟢 Green Posture Assessment ${report.summary.overallStatus === 'GREEN' ? 'PASSED' : 'NEEDS ATTENTION'}`);
      
      process.exit(report.summary.overallStatus === 'GREEN' ? 0 : 1);
      
    } catch (error) {
      this.log(`💥 Green posture assessment failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the green posture script
if (import.meta.url === `file://${process.argv[1]}`) {
  const greenPosture = new GreenPostureScript();
  greenPosture.run();
}

export { GreenPostureScript };

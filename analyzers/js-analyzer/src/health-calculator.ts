import { AnalysisResult } from './types.js';

export class HealthCalculator {
  calculate(result: Partial<AnalysisResult>): number {
    let score = 100;

    // Deduct for outdated dependencies
    const outdatedDeps = result.dependencies?.filter(d => d.isOutdated) || [];
    score -= Math.min(outdatedDeps.length * 2, 20);

    // Deduct for security issues
    const securityIssues = result.securityIssues || [];
    const criticalIssues = securityIssues.filter(i => i.severity === 'critical').length;
    const highIssues = securityIssues.filter(i => i.severity === 'high').length;
    const mediumIssues = securityIssues.filter(i => i.severity === 'medium').length;
    
    score -= criticalIssues * 15;
    score -= highIssues * 10;
    score -= mediumIssues * 5;

    // Deduct for dead files
    const deadFiles = result.deadFiles || [];
    score -= Math.min(deadFiles.length * 1, 15);

    // Deduct for missing tests
    if (result.projectInfo && !result.projectInfo.hasTests) {
      score -= 10;
    }

    // Deduct for high complexity
    if (result.metrics && result.metrics.avgComplexity > 10) {
      score -= Math.min((result.metrics.avgComplexity - 10) * 2, 15);
    }

    // Bonus for TypeScript
    if (result.projectInfo?.hasTypeScript) {
      score += 5;
    }

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  getStatus(score: number): 'dead' | 'dying' | 'stable' | 'healthy' {
    if (score >= 80) return 'healthy';
    if (score >= 60) return 'stable';
    if (score >= 40) return 'dying';
    return 'dead';
  }
}

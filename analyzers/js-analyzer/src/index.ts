import { ProjectDetector } from './project-detector.js';
import { DependencyAnalyzer } from './dependency-analyzer.js';
import { DeadCodeDetector } from './dead-code-detector.js';
import { SecurityScanner } from './security-scanner.js';
import { HealthCalculator } from './health-calculator.js';
import { AnalysisResult } from './types.js';

export class JSAnalyzer {
  private projectDetector = new ProjectDetector();
  private dependencyAnalyzer = new DependencyAnalyzer();
  private deadCodeDetector = new DeadCodeDetector();
  private securityScanner = new SecurityScanner();
  private healthCalculator = new HealthCalculator();

  async analyze(projectPath: string): Promise<AnalysisResult> {
    console.log('🔍 Starting analysis...');

    // Detect project info
    console.log('📦 Detecting project type...');
    const projectInfo = await this.projectDetector.detect(projectPath);

    // Analyze dependencies
    console.log('📚 Analyzing dependencies...');
    const dependencies = await this.dependencyAnalyzer.analyze(projectPath);

    // Detect dead code
    console.log('💀 Detecting dead code...');
    const deadFiles = await this.deadCodeDetector.detect(projectPath);

    // Scan for security issues
    console.log('🔒 Scanning for security issues...');
    const securityIssues = await this.securityScanner.scan(projectPath);

    // Calculate metrics
    const metrics = {
      totalFiles: 0,
      totalLines: 0,
      avgComplexity: 5,
      testCoverage: projectInfo.hasTests ? 50 : 0,
    };

    // Build result
    const result: AnalysisResult = {
      projectInfo,
      dependencies,
      securityIssues,
      deadFiles,
      components: [], // TODO: Implement component analysis
      healthScore: 0,
      metrics,
    };

    // Calculate health score
    result.healthScore = this.healthCalculator.calculate(result);

    console.log(`✅ Analysis complete! Health score: ${result.healthScore}`);

    return result;
  }
}

export * from './types.js';

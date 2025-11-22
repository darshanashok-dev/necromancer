import { JSAnalyzer } from '@necrostack/js-analyzer';
import { ReportGenerator } from './report-generator.js';
import { DiagramBuilder } from './diagram-builder.js';
import { AutopsyReport } from './types.js';

export class CodeCoronerAgent {
  private analyzer = new JSAnalyzer();
  private reportGenerator = new ReportGenerator();
  private diagramBuilder = new DiagramBuilder();

  async performAutopsy(projectPath: string, repositoryInfo: any): Promise<AutopsyReport> {
    console.log('🧟 Code Coroner Agent starting autopsy...');

    // Run analysis
    const analysisResult = await this.analyzer.analyze(projectPath);

    // Generate report
    const report = this.reportGenerator.generate(analysisResult, repositoryInfo);

    // Generate architecture diagram
    report.architecture.diagram = this.diagramBuilder.generateMermaid(analysisResult);

    console.log('✅ Autopsy complete!');
    console.log(`   Health Score: ${report.health.score}/100 (${report.health.status})`);
    console.log(`   Dead Files: ${report.findings.deadFiles.length}`);
    console.log(`   Security Issues: ${report.findings.securityIssues.length}`);
    console.log(`   Outdated Deps: ${report.findings.deprecatedDeps.length}`);

    return report;
  }
}

export * from './types.js';

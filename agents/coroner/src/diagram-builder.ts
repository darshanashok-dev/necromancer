import { AnalysisResult } from '@necrostack/js-analyzer';

export class DiagramBuilder {
  generateMermaid(result: AnalysisResult): string {
    const components = result.components.slice(0, 20); // Limit to 20 components

    if (components.length === 0) {
      return this.generateSimpleDiagram(result);
    }

    let diagram = 'graph TD\n';

    // Add nodes
    components.forEach((comp, idx) => {
      const nodeId = `C${idx}`;
      const label = comp.name.replace(/[^a-zA-Z0-9]/g, '_');
      diagram += `  ${nodeId}[${label}]\n`;
    });

    // Add edges
    components.forEach((comp, idx) => {
      const nodeId = `C${idx}`;
      comp.dependencies.forEach(dep => {
        const depIdx = components.findIndex(c => c.name === dep);
        if (depIdx !== -1) {
          diagram += `  ${nodeId} --> C${depIdx}\n`;
        }
      });
    });

    return diagram;
  }

  private generateSimpleDiagram(result: AnalysisResult): string {
    let diagram = 'graph TD\n';
    
    if (result.projectInfo.framework) {
      diagram += `  A[${result.projectInfo.framework} App]\n`;
      
      if (result.projectInfo.framework.includes('Next') || result.projectInfo.framework.includes('React')) {
        diagram += '  A --> B[Components]\n';
        diagram += '  A --> C[Pages]\n';
        diagram += '  A --> D[API Routes]\n';
      } else if (result.projectInfo.framework.includes('Express') || result.projectInfo.framework.includes('Fastify')) {
        diagram += '  A --> B[Routes]\n';
        diagram += '  A --> C[Controllers]\n';
        diagram += '  A --> D[Services]\n';
      }
    } else {
      diagram += `  A[${result.projectInfo.language} Project]\n`;
      diagram += '  A --> B[Source Files]\n';
    }

    return diagram;
  }
}

export interface AutopsyReport {
  id: string;
  timestamp: string;
  repository: {
    url: string;
    name: string;
    language: string;
    framework?: string;
  };
  health: {
    score: number;
    status: 'dead' | 'dying' | 'stable' | 'healthy';
  };
  findings: {
    deadFiles: string[];
    deprecatedDeps: Array<{
      name: string;
      current: string;
      latest: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
    }>;
    securityIssues: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      location: string;
      cve?: string;
    }>;
    codeSmells: string[];
    missingTests: boolean;
    testCoverage: number;
  };
  architecture: {
    type: string;
    layers: string[];
    components: Array<{
      name: string;
      type: string;
      path: string;
      dependencies: string[];
    }>;
    diagram: string;
  };
  recommendations: string[];
}

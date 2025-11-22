export interface ProjectInfo {
  language: string;
  framework?: string;
  packageManager?: 'npm' | 'yarn' | 'pnpm';
  hasTypeScript: boolean;
  hasTests: boolean;
}

export interface DependencyInfo {
  name: string;
  current: string;
  latest?: string;
  wanted?: string;
  type: 'dependencies' | 'devDependencies';
  isOutdated: boolean;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityIssue {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  cve?: string;
}

export interface DeadFile {
  path: string;
  reason: string;
  size: number;
}

export interface ComponentInfo {
  name: string;
  type: 'component' | 'service' | 'model' | 'utility';
  path: string;
  dependencies: string[];
  exports: string[];
  complexity: number;
}

export interface AnalysisResult {
  projectInfo: ProjectInfo;
  dependencies: DependencyInfo[];
  securityIssues: SecurityIssue[];
  deadFiles: DeadFile[];
  components: ComponentInfo[];
  healthScore: number;
  metrics: {
    totalFiles: number;
    totalLines: number;
    avgComplexity: number;
    testCoverage?: number;
  };
}

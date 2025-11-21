# 📊 NECROSTACK Data Models & API Specifications

Complete data model definitions and API contracts for the NECROSTACK system.

---

## 🗄️ Database Models

### Repository
```typescript
interface Repository {
  id: string;                    // UUID
  url: string;                   // GitHub URL or 'uploaded'
  name: string;                  // Repository name
  owner: string;                 // Repository owner
  language: string;              // Primary language
  framework: string;             // Detected framework
  size: number;                  // Size in bytes
  uploadedAt: Date;
  status: RepositoryStatus;
  metadata?: Record<string, any>;
}

enum RepositoryStatus {
  UPLOADED = 'uploaded',
  ANALYZING = 'analyzing',
  ANALYZED = 'analyzed',
  REVIVING = 'reviving',
  REVIVED = 'revived',
  EXTRACTING = 'extracting',
  EXTRACTED = 'extracted',
  REANIMATING = 'reanimating',
  COMPLETE = 'complete',
  FAILED = 'failed'
}
```

### Autopsy
```typescript
interface Autopsy {
  id: string;
  repositoryId: string;
  report: AutopsyReport;
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
}
```

### Revival
```typescript
interface Revival {
  id: string;
  autopsyId: string;
  report: RevivalReport;
  pullRequestUrl?: string;
  pullRequestNumber?: number;
  branch: string;
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
}
```

### Soul
```typescript
interface Soul {
  id: string;
  autopsyId: string;
  spec: SoulSpec;
  version: number;              // For versioning souls
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
}
```

### Resurrection
```typescript
interface Resurrection {
  id: string;
  soulId: string;
  targetStack: TargetStack;
  config: ReanimationConfig;
  artifactUrl: string;
  githubRepoUrl?: string;
  size: number;                 // Artifact size in bytes
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  error?: string;
  metrics: GenerationMetrics;
}
```

---

## 📋 Complete Type Definitions

### AutopsyReport
```typescript
interface AutopsyReport {
  id: string;
  timestamp: string;
  
  repository: {
    url: string;
    name: string;
    owner: string;
    language: string;
    framework: string;
    size: number;
    fileCount: number;
    lineCount: number;
  };
  
  health: {
    score: number;              // 0-100
    status: 'dead' | 'dying' | 'stable' | 'healthy';
    grade: 'F' | 'D' | 'C' | 'B' | 'A';
  };
  
  findings: {
    deadFiles: DeadFile[];
    deprecatedDeps: DeprecatedDependency[];
    securityIssues: SecurityIssue[];
    codeSmells: CodeSmell[];
    missingTests: boolean;
    testCoverage: number;
    lintErrors: number;
    lintWarnings: number;
  };
  
  architecture: {
    type: 'monolith' | 'microservices' | 'serverless' | 'unknown';
    layers: string[];
    components: Component[];
    diagram: string;            // Mermaid syntax
    dependencyGraph: DependencyGraph;
  };
  
  metrics: {
    maintainabilityIndex: number;
    cyclomaticComplexity: number;
    cognitiveComplexity: number;
    technicalDebt: {
      hours: number;
      issues: number;
    };
  };
  
  recommendations: string[];
}

interface DeadFile {
  path: string;
  reason: 'unused' | 'unreachable' | 'duplicate';
  confidence: number;           // 0-1
  size: number;
}

interface DeprecatedDependency {
  name: string;
  current: string;
  latest: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  breaking: boolean;
  releaseDate?: string;
}

interface SecurityIssue {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  cve?: string;
  fix?: string;
  references?: string[];
}

interface CodeSmell {
  type: string;
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestion?: string;
}

interface Component {
  name: string;
  type: 'component' | 'service' | 'model' | 'utility' | 'config';
  path: string;
  dependencies: string[];
  exports: string[];
  complexity: number;
  linesOfCode: number;
}

interface DependencyGraph {
  nodes: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  edges: Array<{
    from: string;
    to: string;
    type?: string;
  }>;
}
```

### RevivalReport
```typescript
interface RevivalReport {
  id: string;
  autopsyId: string;
  timestamp: string;
  status: 'success' | 'partial' | 'failed';
  
  changes: {
    dependenciesUpdated: DependencyUpdate[];
    filesModified: string[];
    filesDeleted: string[];
    filesCreated: string[];
    bugsFixed: BugFix[];
    deprecationsFixed: DeprecationFix[];
    refactorings: Refactoring[];
    testsAdded: number;
    coverageImprovement: string;
  };
  
  buildStatus: {
    status: 'passing' | 'failing' | 'unknown';
    errors: string[];
    warnings: string[];
  };
  
  pullRequest?: {
    url: string;
    number: number;
    branch: string;
    commits: string[];
    title: string;
    body: string;
  };
  
  warnings: string[];
  errors: string[];
  
  metrics: {
    healthScoreImprovement: number;
    filesChanged: number;
    linesAdded: number;
    linesRemoved: number;
    timeElapsed: number;
  };
}

interface DependencyUpdate {
  name: string;
  from: string;
  to: string;
  breaking: boolean;
  changelogUrl?: string;
}

interface BugFix {
  type: string;
  location: string;
  description: string;
  fix: string;
}

interface DeprecationFix {
  api: string;
  oldUsage: string;
  newUsage: string;
  locations: string[];
}

interface Refactoring {
  type: string;
  location: string;
  before: string;
  after: string;
  reason: string;
}
```

### SoulSpec
```typescript
interface SoulSpec {
  id: string;
  autopsyId: string;
  timestamp: string;
  version: number;
  
  essence: {
    appType: 'web' | 'api' | 'cli' | 'mobile' | 'desktop';
    domain: string;
    description: string;
    primaryLanguage: string;
    originalFramework: string;
  };
  
  routes: Route[];
  models: Model[];
  businessLogic: BusinessLogic[];
  stateManagement: StateManagement;
  uiComponents: UIComponent[];
  integrations: Integration[];
  authentication: Authentication;
  dataFlows: DataFlow[];
  configuration: Configuration;
}

interface Route {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: string;
  middleware: string[];
  description: string;
  input: {
    params?: Record<string, ParamSpec>;
    query?: Record<string, ParamSpec>;
    body?: Record<string, ParamSpec>;
    headers?: Record<string, ParamSpec>;
  };
  output: {
    success: {
      status: number;
      schema: any;
    };
    error: {
      status: number;
      schema: any;
    };
  };
  authentication: boolean;
  authorization?: string[];
}

interface ParamSpec {
  type: string;
  required: boolean;
  description: string;
  validation?: any;
  default?: any;
}

interface Model {
  name: string;
  description: string;
  fields: Field[];
  relations: Relation[];
  indexes: Index[];
  hooks?: Hooks;
}

interface Field {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
  subtype?: string;
  required: boolean;
  unique: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: any[];
  };
}

interface Relation {
  type: 'hasMany' | 'belongsTo' | 'hasOne' | 'manyToMany';
  model: string;
  foreignKey?: string;
  through?: string;
}

interface Index {
  fields: string[];
  unique: boolean;
  name?: string;
}

interface Hooks {
  beforeCreate?: string[];
  afterCreate?: string[];
  beforeUpdate?: string[];
  afterUpdate?: string[];
  beforeDelete?: string[];
  afterDelete?: string[];
}

interface BusinessLogic {
  name: string;
  description: string;
  category: 'validation' | 'transformation' | 'calculation' | 'workflow';
  inputs: Parameter[];
  outputs: Parameter[];
  steps: Step[];
  dependencies: string[];
  sideEffects: string[];
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

interface Step {
  order: number;
  action: string;
  description: string;
}

interface StateManagement {
  type: 'redux' | 'context' | 'zustand' | 'mobx' | 'recoil' | 'none';
  stores: Store[];
}

interface Store {
  name: string;
  description: string;
  state: Record<string, StateField>;
  actions: Action[];
  selectors?: Selector[];
}

interface StateField {
  type: string;
  default: any;
}

interface Action {
  name: string;
  description: string;
  params: any[];
  async: boolean;
}

interface Selector {
  name: string;
  description: string;
  derivedFrom: string[];
}

interface UIComponent {
  name: string;
  type: 'page' | 'layout' | 'component' | 'widget';
  description: string;
  props: Record<string, PropSpec>;
  state?: Record<string, string>;
  children: string[];
  usesComponents: string[];
  dataFetching?: DataFetching;
  events: Event[];
}

interface PropSpec {
  type: string;
  required: boolean;
  default?: any;
  description?: string;
}

interface DataFetching {
  sources: string[];
  triggers: string[];
}

interface Event {
  name: string;
  handler: string;
  description: string;
}

interface Integration {
  type: 'database' | 'api' | 'auth' | 'payment' | 'email' | 'storage' | 'analytics';
  service: string;
  description: string;
  config: Record<string, any>;
  operations: Operation[];
}

interface Operation {
  name: string;
  description: string;
  usedBy: string[];
}

interface Authentication {
  type: 'jwt' | 'session' | 'oauth' | 'api-key' | 'none';
  provider: 'custom' | 'auth0' | 'firebase' | 'cognito' | 'passport';
  flows: AuthFlow[];
  userModel: string;
  permissions?: Permissions;
}

interface AuthFlow {
  name: 'login' | 'register' | 'logout' | 'reset-password' | 'verify-email';
  steps: string[];
  endpoints: string[];
}

interface Permissions {
  type: 'role' | 'permission' | 'attribute';
  roles?: string[];
  permissions?: string[];
}

interface DataFlow {
  name: string;
  description: string;
  trigger: 'user-action' | 'cron' | 'webhook' | 'event';
  steps: FlowStep[];
  dataTransformations: Transformation[];
}

interface FlowStep {
  order: number;
  action: string;
  component: string;
  description: string;
}

interface Transformation {
  from: string;
  to: string;
  transformation: string;
}

interface Configuration {
  environment: Record<string, EnvVar>;
  features: Record<string, boolean>;
}

interface EnvVar {
  required: boolean;
  description: string;
  default?: string;
}
```

### TargetStack & ReanimationConfig
```typescript
interface TargetStack {
  frontend: 'nextjs' | 'react-vite' | 'vue' | 'svelte' | 'angular' | 'none';
  backend: 'fastify' | 'express' | 'nestjs' | 'django' | 'go-gin' | 'none';
  database: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite' | 'none';
  language: 'typescript' | 'javascript' | 'python' | 'go';
}

interface ReanimationConfig {
  typescript: boolean;
  testing: 'jest' | 'vitest' | 'pytest' | 'go-test';
  styling: 'tailwind' | 'styled-components' | 'css-modules' | 'sass';
  orm: 'prisma' | 'typeorm' | 'sequelize' | 'mongoose' | 'sqlalchemy';
  auth: 'jwt' | 'session' | 'oauth' | 'none';
  docker: boolean;
  ci: boolean;
}

interface GenerationMetrics {
  files: number;
  components: number;
  routes: number;
  models: number;
  tests: number;
  linesOfCode: number;
  timeElapsed: number;
}
```

---

## 🔌 API Endpoints

### POST /api/analyze
**Description**: Start code autopsy

**Request**:
```typescript
// Option 1: GitHub URL
{
  type: 'github',
  url: string
}

// Option 2: File upload
Content-Type: multipart/form-data
file: <zip file>
```

**Response**:
```typescript
{
  id: string,
  status: 'analyzing',
  repositoryId: string,
  estimatedTime: number  // seconds
}
```

---

### GET /api/analyze/:id
**Description**: Get autopsy report

**Response**:
```typescript
{
  status: 'pending' | 'processing' | 'complete' | 'failed',
  progress?: number,  // 0-100
  report?: AutopsyReport,
  error?: string
}
```

---

### POST /api/revive/:autopsyId
**Description**: Start revival process

**Request**:
```typescript
{
  mode: 'aggressive' | 'conservative',
  config: {
    updateDependencies: boolean,
    fixDeprecations: boolean,
    refactorCode: boolean,
    generateTests: boolean,
    createPR: boolean
  },
  github?: {
    token: string,
    owner: string,
    repo: string
  }
}
```

**Response**:
```typescript
{
  id: string,
  status: 'reviving',
  estimatedTime: number
}
```

---

### GET /api/revive/:id
**Description**: Get revival report

**Response**:
```typescript
{
  status: 'pending' | 'processing' | 'complete' | 'failed',
  progress?: number,
  report?: RevivalReport,
  error?: string
}
```

---

### POST /api/extract/:autopsyId
**Description**: Extract soul

**Request**:
```typescript
{
  hints?: {
    entryPoints?: string[],
    apiPrefix?: string,
    modelPaths?: string[]
  }
}
```

**Response**:
```typescript
{
  id: string,
  status: 'extracting',
  estimatedTime: number
}
```

---

### GET /api/extract/:id
**Description**: Get soul spec

**Response**:
```typescript
{
  status: 'pending' | 'processing' | 'complete' | 'failed',
  progress?: number,
  spec?: SoulSpec,
  error?: string
}
```

---

### POST /api/reanimate/:soulId
**Description**: Start reanimation

**Request**:
```typescript
{
  targetStack: TargetStack,
  config: ReanimationConfig,
  output: {
    createGithubRepo: boolean,
    githubOwner?: string,
    repoName?: string
  }
}
```

**Response**:
```typescript
{
  id: string,
  status: 'reanimating',
  estimatedTime: number
}
```

---

### GET /api/reanimate/:id
**Description**: Get reanimation status

**Response**:
```typescript
{
  status: 'pending' | 'processing' | 'complete' | 'failed',
  progress?: number,
  phase?: string,
  package?: ReanimationPackage,
  error?: string
}
```

---

### GET /api/artifacts/:id/download
**Description**: Download generated project

**Response**: Binary (ZIP file)

**Headers**:
```
Content-Type: application/zip
Content-Disposition: attachment; filename="reanimated-project.zip"
```

---

### GET /api/status/:repositoryId
**Description**: Get overall status

**Response**:
```typescript
{
  repository: Repository,
  autopsy?: { id: string, status: string },
  revival?: { id: string, status: string },
  soul?: { id: string, status: string },
  resurrection?: { id: string, status: string }
}
```

---

## 🔄 WebSocket Events

### Connection
```typescript
ws://api.necrostack.com/ws/:repositoryId
```

### Events

**autopsy:progress**
```typescript
{
  type: 'autopsy:progress',
  progress: number,
  phase: string,
  message: string
}
```

**autopsy:complete**
```typescript
{
  type: 'autopsy:complete',
  report: AutopsyReport
}
```

**revival:progress**
```typescript
{
  type: 'revival:progress',
  progress: number,
  phase: string,
  changes: string[]
}
```

**extraction:progress**
```typescript
{
  type: 'extraction:progress',
  progress: number,
  phase: string,
  extracted: {
    routes: number,
    models: number,
    components: number
  }
}
```

**reanimation:progress**
```typescript
{
  type: 'reanimation:progress',
  progress: number,
  phase: string,
  generated: {
    files: number,
    linesOfCode: number
  }
}
```

---

## 🗃️ Storage Structure

### S3 Bucket Layout
```
necrostack-artifacts/
├── repositories/
│   └── {repo-id}/
│       └── source.zip
├── reports/
│   ├── {autopsy-id}.json
│   └── {autopsy-id}.pdf
├── souls/
│   └── {soul-id}.json
└── resurrections/
    └── {resurrection-id}/
        ├── project.zip
        └── metadata.json
```

---

This completes the data model and API specification for NECROSTACK.

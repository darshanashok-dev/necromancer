# 🔍 Code Coroner Agent

**Purpose**: Analyze uploaded repositories and generate comprehensive autopsy reports.

---

## 📋 Overview

The Code Coroner Agent is the first step in the resurrection process. It performs deep analysis of the codebase to identify:
- Code health and quality metrics
- Dead/unused files
- Deprecated dependencies
- Security vulnerabilities
- Architecture patterns
- Code smells and anti-patterns

---

## 🔄 Workflow

```
Input: Repository (GitHub URL or ZIP)
  ↓
1. Clone/Extract Repository
  ↓
2. Detect Project Type
  ↓
3. Analyze Dependencies
  ↓
4. Scan Codebase (AST)
  ↓
5. Detect Dead Code
  ↓
6. Security Scan
  ↓
7. Map Architecture
  ↓
8. Calculate Metrics
  ↓
Output: Autopsy Report (JSON)
```

---

## 📥 Input Specification

```typescript
interface CoronerInput {
  repositoryPath: string;        // Local path to cloned/extracted repo
  repositoryUrl?: string;         // Original GitHub URL
  metadata?: {
    language?: string;            // Hint: 'javascript', 'python', etc.
    framework?: string;           // Hint: 'react', 'express', etc.
  };
}
```

---

## 📤 Output Specification

```typescript
interface AutopsyReport {
  id: string;                     // UUID
  timestamp: string;              // ISO-8601
  
  repository: {
    url: string;
    name: string;
    owner: string;
    language: string;             // Detected primary language
    framework: string;            // Detected framework
    size: number;                 // Bytes
    fileCount: number;
    lineCount: number;
  };
  
  health: {
    score: number;                // 0-100
    status: 'dead' | 'dying' | 'stable' | 'healthy';
    grade: 'F' | 'D' | 'C' | 'B' | 'A';
  };
  
  findings: {
    deadFiles: Array<{
      path: string;
      reason: string;             // 'unused', 'unreachable', 'duplicate'
      confidence: number;         // 0-1
    }>;
    
    deprecatedDeps: Array<{
      name: string;
      current: string;            // Current version
      latest: string;             // Latest version
      severity: 'low' | 'medium' | 'high' | 'critical';
      breaking: boolean;          // Breaking changes in update
    }>;
    
    securityIssues: Array<{
      type: string;               // 'vulnerability', 'exposure', 'injection'
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      location: string;           // File path or dependency name
      cve?: string;               // CVE identifier if applicable
      fix?: string;               // Suggested fix
    }>;
    
    codeSmells: Array<{
      type: string;               // 'long-method', 'god-class', etc.
      location: string;
      description: string;
      severity: 'low' | 'medium' | 'high';
    }>;
    
    missingTests: boolean;
    testCoverage: number;         // 0-100 percentage
    
    lintErrors: number;
    lintWarnings: number;
  };
  
  architecture: {
    type: 'monolith' | 'microservices' | 'serverless' | 'unknown';
    layers: string[];             // ['frontend', 'backend', 'database']
    
    components: Array<{
      name: string;
      type: 'component' | 'service' | 'model' | 'utility' | 'config';
      path: string;
      dependencies: string[];     // Other component names
      exports: string[];          // Exported functions/classes
      complexity: number;         // Cyclomatic complexity
    }>;
    
    diagram: string;              // Mermaid syntax
    dependencyGraph: {
      nodes: Array<{ id: string; label: string; }>;
      edges: Array<{ from: string; to: string; }>;
    };
  };
  
  metrics: {
    maintainabilityIndex: number; // 0-100
    cyclomaticComplexity: number;
    cognitiveComplexity: number;
    technicalDebt: {
      hours: number;
      issues: number;
    };
  };
  
  recommendations: string[];      // Human-readable suggestions
}
```

---

## 🛠️ Analysis Modules

### 1. Project Type Detector
**File**: `src/detector.ts`

Detects:
- Language (JavaScript, TypeScript, Python, Go, etc.)
- Framework (React, Vue, Express, Django, etc.)
- Build tool (Webpack, Vite, Rollup, etc.)
- Package manager (npm, yarn, pnpm, pip, etc.)

**Detection Strategy**:
- Check for config files (package.json, requirements.txt, go.mod)
- Scan for framework-specific patterns
- Analyze import statements

---

### 2. Dependency Analyzer
**File**: `src/dependency-checker.ts`

Functions:
- Parse dependency files
- Check for outdated packages
- Identify deprecated packages
- Detect version conflicts
- Calculate update complexity

**Tools**:
- `npm-check-updates`
- `npm audit`
- Custom version comparison

---

### 3. Dead Code Detector
**File**: `src/dead-code-detector.ts`

Detects:
- Unused files (no imports)
- Unreachable code
- Unused exports
- Duplicate code
- Commented-out code blocks

**Strategy**:
- Build import graph
- Identify entry points
- Traverse from entry points
- Mark unreachable nodes

---

### 4. Security Scanner
**File**: `src/security-scanner.ts`

Scans for:
- Known vulnerabilities (CVE database)
- Hardcoded secrets
- SQL injection patterns
- XSS vulnerabilities
- Insecure dependencies

**Tools**:
- `npm audit`
- `retire.js`
- Custom regex patterns
- Secret detection algorithms

---

### 5. Architecture Mapper
**File**: `src/architecture-mapper.ts`

Maps:
- Component hierarchy
- Dependency relationships
- Data flow
- API endpoints
- Database connections

**Output**:
- Mermaid diagram
- JSON graph structure
- Component list with metadata

---

### 6. Code Quality Analyzer
**File**: `src/quality-analyzer.ts`

Calculates:
- Cyclomatic complexity
- Cognitive complexity
- Maintainability index
- Code duplication
- Test coverage

**Tools**:
- ESLint
- Custom AST analysis
- Complexity calculators

---

## 🔧 Configuration

```typescript
interface CoronerConfig {
  analysis: {
    includeTests: boolean;        // Analyze test files
    maxFileSize: number;          // Skip files larger than this (bytes)
    excludePatterns: string[];    // Glob patterns to exclude
  };
  
  security: {
    checkSecrets: boolean;
    checkVulnerabilities: boolean;
    severityThreshold: 'low' | 'medium' | 'high' | 'critical';
  };
  
  performance: {
    maxConcurrency: number;       // Parallel analysis tasks
    timeout: number;              // Max analysis time (ms)
  };
}
```

---

## 📊 Health Score Calculation

```typescript
function calculateHealthScore(findings: Findings): number {
  let score = 100;
  
  // Deduct for deprecated dependencies
  score -= findings.deprecatedDeps.length * 2;
  
  // Deduct for security issues
  findings.securityIssues.forEach(issue => {
    if (issue.severity === 'critical') score -= 15;
    else if (issue.severity === 'high') score -= 10;
    else if (issue.severity === 'medium') score -= 5;
    else score -= 2;
  });
  
  // Deduct for dead code
  score -= findings.deadFiles.length * 1;
  
  // Deduct for missing tests
  if (findings.missingTests) score -= 20;
  else score -= (100 - findings.testCoverage) * 0.2;
  
  // Deduct for code smells
  score -= findings.codeSmells.length * 1;
  
  return Math.max(0, Math.min(100, score));
}
```

---

## 🚀 Usage Example

```typescript
import { CoronerAgent } from './src/index';

const coroner = new CoronerAgent({
  analysis: {
    includeTests: true,
    maxFileSize: 1024 * 1024, // 1MB
    excludePatterns: ['node_modules/**', 'dist/**']
  }
});

const report = await coroner.analyze({
  repositoryPath: '/tmp/repo-123',
  repositoryUrl: 'https://github.com/user/repo'
});

console.log(`Health Score: ${report.health.score}`);
console.log(`Status: ${report.health.status}`);
console.log(`Dead Files: ${report.findings.deadFiles.length}`);
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with sample repository
npm run test:sample

# Generate test report
npm run test:coverage
```

---

## 📦 Dependencies

```json
{
  "@babel/parser": "^7.23.0",
  "@babel/traverse": "^7.23.0",
  "jscodeshift": "^0.15.0",
  "eslint": "^8.50.0",
  "dependency-cruiser": "^14.0.0",
  "npm-check-updates": "^16.14.0",
  "retire": "^4.0.0",
  "glob": "^10.3.0",
  "mermaid": "^10.6.0"
}
```

---

## 🔮 Future Enhancements

- Multi-language support (Python, Java, Go)
- AI-powered code smell detection
- Performance profiling
- Accessibility audits
- License compliance checking
- Docker/container analysis

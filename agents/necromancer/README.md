# 🩹 Bug Necromancer Agent

**Purpose**: Revive the original application by fixing bugs, updating dependencies, and modernizing code.

---

## 📋 Overview

The Bug Necromancer Agent takes the autopsy report and attempts to heal the codebase by:
- Updating dependencies to latest compatible versions
- Fixing deprecated API usage
- Refactoring code smells
- Adding missing error handling
- Generating basic tests
- Creating auto-PRs with improvements

---

## 🔄 Workflow

```
Input: Repository + Autopsy Report
  ↓
1. Create Revival Branch
  ↓
2. Update Dependencies
  ↓
3. Fix Deprecated Code
  ↓
4. Refactor Code Smells
  ↓
5. Add Error Handling
  ↓
6. Generate Tests
  ↓
7. Run Linter & Formatter
  ↓
8. Verify Build
  ↓
9. Create Pull Request
  ↓
Output: Revival Report + PR
```

---

## 📥 Input Specification

```typescript
interface NecromancerInput {
  repositoryPath: string;
  autopsyReport: AutopsyReport;
  config: {
    mode: 'aggressive' | 'conservative';
    updateDependencies: boolean;
    fixDeprecations: boolean;
    refactorCode: boolean;
    generateTests: boolean;
    createPR: boolean;
  };
  github?: {
    token: string;
    owner: string;
    repo: string;
  };
}
```

---

## 📤 Output Specification

```typescript
interface RevivalReport {
  id: string;
  autopsyId: string;
  timestamp: string;
  status: 'success' | 'partial' | 'failed';
  
  changes: {
    dependenciesUpdated: Array<{
      name: string;
      from: string;
      to: string;
      breaking: boolean;
    }>;
    
    filesModified: string[];
    filesDeleted: string[];
    filesCreated: string[];
    
    bugsFixed: Array<{
      type: string;
      location: string;
      description: string;
      fix: string;
    }>;
    
    deprecationsFixed: Array<{
      api: string;
      oldUsage: string;
      newUsage: string;
      locations: string[];
    }>;
    
    refactorings: Array<{
      type: string;
      location: string;
      before: string;
      after: string;
    }>;
    
    testsAdded: number;
    coverageImprovement: string;  // "+15%"
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
    healthScoreImprovement: number;  // +25
    filesChanged: number;
    linesAdded: number;
    linesRemoved: number;
    timeElapsed: number;  // milliseconds
  };
}
```

---

## 🛠️ Revival Modules

### 1. Dependency Updater
**File**: `src/dependency-updater.ts`

**Functions**:
- Update package.json/requirements.txt
- Handle breaking changes
- Update lock files
- Verify compatibility

**Strategy**:
- Conservative: Only patch/minor updates
- Aggressive: All updates including major

**Tools**:
- `npm-check-updates`
- `yarn upgrade`
- Custom version resolver

---

### 2. Deprecation Fixer
**File**: `src/deprecation-fixer.ts`

**Fixes**:
- Deprecated React lifecycle methods
- Old API patterns
- Deprecated Node.js APIs
- Framework-specific deprecations

**Example Transformations**:
```javascript
// Before
componentWillMount() { }

// After
componentDidMount() { }
```

**Tools**:
- jscodeshift
- Custom AST transformations
- Framework-specific codemods

---

### 3. Bug Fixer
**File**: `src/bug-fixer.ts`

**Fixes**:
- Missing null checks
- Unhandled promise rejections
- Memory leaks (event listeners)
- Race conditions
- Type errors

**Example**:
```javascript
// Before
const data = response.data.user.name;

// After
const data = response?.data?.user?.name ?? 'Unknown';
```

---

### 4. Code Refactorer
**File**: `src/refactorer.ts`

**Refactorings**:
- Extract long methods
- Remove duplicate code
- Simplify complex conditionals
- Convert callbacks to async/await
- Modernize syntax (var → const/let)

**Example**:
```javascript
// Before
function getData(callback) {
  fetch(url).then(res => {
    res.json().then(data => {
      callback(null, data);
    }).catch(err => callback(err));
  });
}

// After
async function getData() {
  const res = await fetch(url);
  return await res.json();
}
```

---

### 5. Test Generator
**File**: `src/test-generator.ts`

**Generates**:
- Unit tests for pure functions
- Basic integration tests
- Snapshot tests for components
- Mock data and fixtures

**Example**:
```javascript
// For function: add(a, b)
describe('add', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  it('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });
});
```

**Tools**:
- Jest/Vitest
- React Testing Library
- Custom test templates

---

### 6. PR Generator
**File**: `src/pr-generator.ts`

**Creates**:
- Descriptive PR title
- Detailed changelog
- Before/after comparisons
- Migration guide
- Checklist for reviewers

**PR Template**:
```markdown
## 🧟 NECROSTACK Revival

### Summary
This PR revives the codebase by updating dependencies, fixing bugs, and modernizing code.

### Changes
- ✅ Updated 15 dependencies
- ✅ Fixed 8 deprecation warnings
- ✅ Refactored 5 code smells
- ✅ Added 23 tests (+15% coverage)

### Breaking Changes
None

### Migration Guide
No manual changes required.

### Health Score
Before: 45/100
After: 78/100
Improvement: +33 points

---
Generated by NECROSTACK Bug Necromancer Agent
```

---

## 🔧 Configuration

```typescript
interface NecromancerConfig {
  mode: 'aggressive' | 'conservative';
  
  dependencies: {
    update: boolean;
    allowMajor: boolean;
    allowBreaking: boolean;
    excludePackages: string[];
  };
  
  fixes: {
    deprecations: boolean;
    nullChecks: boolean;
    errorHandling: boolean;
    memoryLeaks: boolean;
  };
  
  refactoring: {
    enabled: boolean;
    maxComplexity: number;
    modernizeSyntax: boolean;
    convertCallbacks: boolean;
  };
  
  testing: {
    generate: boolean;
    framework: 'jest' | 'vitest' | 'mocha';
    coverageTarget: number;
  };
  
  pr: {
    create: boolean;
    autoMerge: boolean;
    assignReviewers: string[];
  };
}
```

---

## 🎯 Revival Strategies

### Conservative Mode
- Only patch and minor updates
- Minimal refactoring
- Safe transformations only
- No breaking changes

### Aggressive Mode
- All updates including major versions
- Extensive refactoring
- Modern syntax conversions
- May introduce breaking changes

---

## 🚀 Usage Example

```typescript
import { NecromancerAgent } from './src/index';

const necromancer = new NecromancerAgent({
  mode: 'conservative',
  dependencies: {
    update: true,
    allowMajor: false
  },
  fixes: {
    deprecations: true,
    nullChecks: true
  },
  testing: {
    generate: true,
    framework: 'jest'
  }
});

const report = await necromancer.revive({
  repositoryPath: '/tmp/repo-123',
  autopsyReport: autopsyData,
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: 'user',
    repo: 'repo'
  }
});

console.log(`Status: ${report.status}`);
console.log(`Files Modified: ${report.changes.filesModified.length}`);
console.log(`PR: ${report.pullRequest?.url}`);
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test with sample repo
npm run test:sample

# Dry run (no commits)
npm run test:dry-run
```

---

## 📦 Dependencies

```json
{
  "jscodeshift": "^0.15.0",
  "@babel/core": "^7.23.0",
  "npm-check-updates": "^16.14.0",
  "eslint": "^8.50.0",
  "prettier": "^3.0.0",
  "@octokit/rest": "^20.0.0",
  "simple-git": "^3.20.0",
  "jest": "^29.7.0"
}
```

---

## ⚠️ Safety Measures

1. **Always create a new branch** - Never modify main/master directly
2. **Verify build** - Ensure code compiles after changes
3. **Run tests** - Verify existing tests still pass
4. **Create PR** - Never auto-merge without review
5. **Backup original** - Keep original code accessible

---

## 🔮 Future Enhancements

- AI-powered bug detection
- Performance optimizations
- Accessibility improvements
- Security hardening
- Database migration generation
- API versioning support

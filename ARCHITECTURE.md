# NECROSTACK — Architecture Blueprint
## Dead Code Resurrection & Soul Transfer Engine

---

## 🎯 SYSTEM OVERVIEW

NECROSTACK is a multi-agent system that analyzes abandoned GitHub repositories, attempts to revive them, extracts their core logic ("soul"), and regenerates them into modern tech stacks. The system follows a resurrection/necromancy theme with a cinematic, glitchy UI aesthetic.

---

## 🏗️ TECH STACK

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TailwindCSS** (styling)
- **ShadCN UI** (component library)
- **Framer Motion** (animations, glitch effects)

### Backend
- **Node.js** (runtime)
- **Fastify** (HTTP framework)
- **Modular architecture** (routes, services, models)

### Analyzers
- **JavaScript Analyzer**: Babel + jscodeshift
- **Python Analyzer** (optional): LibCST
- **Static Analysis**: ESLint, dependency-check

### Database
- **SQLite** (development)
- **PostgreSQL** (production, free tier compatible)
- Store: autopsy reports, soul specs, resurrection history

### Storage
- **GitHub Repos** (input/output)
- **S3-compatible bucket** (artifacts, zips, reports)

### CI/CD
- **GitHub Actions**
- Auto-linting, testing, formatting
- Auto-PR generation for revived code

### License
- **MIT** (OSI-approved)

---

## 📁 FOLDER STRUCTURE

```
necrostack/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── upload/
│   │   │   └── page.tsx
│   │   ├── autopsy/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── revival/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── extraction/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── reanimation/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── analyze/
│   │       ├── revive/
│   │       ├── extract/
│   │       └── reanimate/
│   ├── components/
│   │   ├── ui/ (ShadCN components)
│   │   ├── RepoUploader.tsx
│   │   ├── AutopsyReport.tsx
│   │   ├── RevivalProgress.tsx
│   │   ├── SoulViewer.tsx
│   │   ├── StackSelector.tsx
│   │   ├── ReanimationPreview.tsx
│   │   └── GlitchEffect.tsx
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   ├── package.json
│   └── next.config.js
│
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── analyze.ts
│   │   │   ├── revive.ts
│   │   │   ├── extract.ts
│   │   │   ├── reanimate.ts
│   │   │   └── artifacts.ts
│   │   ├── services/
│   │   │   ├── github-service.ts
│   │   │   ├── storage-service.ts
│   │   │   ├── agent-orchestrator.ts
│   │   │   └── export-service.ts
│   │   ├── models/
│   │   │   ├── repository.ts
│   │   │   ├── autopsy.ts
│   │   │   ├── soul.ts
│   │   │   └── resurrection.ts
│   │   └── config/
│   │       ├── database.ts
│   │       └── storage.ts
│   ├── package.json
│   └── tsconfig.json
│
├── analyzers/
│   ├── js-analyzer/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── ast-parser.ts
│   │   │   ├── dependency-checker.ts
│   │   │   ├── dead-code-detector.ts
│   │   │   ├── security-scanner.ts
│   │   │   └── architecture-mapper.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── py-analyzer/
│       ├── src/
│       │   ├── __init__.py
│       │   ├── ast_parser.py
│       │   ├── dependency_checker.py
│       │   └── code_analyzer.py
│       ├── requirements.txt
│       └── setup.py
│
├── agents/
│   ├── coroner/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── analyzer.ts
│   │   │   ├── report-generator.ts
│   │   │   └── diagram-builder.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── necromancer/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── dependency-updater.ts
│   │   │   ├── bug-fixer.ts
│   │   │   ├── refactorer.ts
│   │   │   └── test-generator.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── extractor/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── route-mapper.ts
│   │   │   ├── model-extractor.ts
│   │   │   ├── logic-extractor.ts
│   │   │   └── soul-builder.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── reanimator/
│       ├── src/
│       │   ├── index.ts
│       │   ├── scaffold-generator.ts
│       │   ├── template-engine.ts
│       │   ├── code-writer.ts
│       │   └── test-scaffolder.ts
│       ├── templates/
│       │   ├── nextjs/
│       │   ├── fastify/
│       │   ├── django/
│       │   ├── go/
│       │   └── express/
│       ├── package.json
│       └── README.md
│
├── reports/
│   └── .gitkeep
│
├── output/
│   └── .gitkeep
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── lint.yml
│       └── test.yml
│
├── README.md
├── LICENSE
├── package.json
└── docker-compose.yml
```

---

## 🤖 AGENT SPECIFICATIONS

### 1. CODE CORONER AGENT

**Purpose**: Analyze uploaded repository and generate comprehensive Autopsy Report

**Input**:
- GitHub repository URL or uploaded zip
- Repository metadata (language, framework hints)

**Processing**:
1. Clone/extract repository
2. Detect project type (React, Vue, Express, Django, etc.)
3. Scan folder structure
4. Parse dependency files (package.json, requirements.txt, go.mod)
5. Run static analysis on codebase
6. Detect dead/unused files
7. Identify deprecated dependencies
8. Scan for security vulnerabilities
9. Map architecture (components, routes, models)
10. Generate dependency graph
11. Calculate code health metrics

**Output**: Autopsy Report JSON
```json
{
  "id": "uuid",
  "timestamp": "ISO-8601",
  "repository": {
    "url": "string",
    "name": "string",
    "language": "string",
    "framework": "string"
  },
  "health": {
    "score": 0-100,
    "status": "dead|dying|stable|healthy"
  },
  "findings": {
    "deadFiles": ["path/to/file"],
    "deprecatedDeps": [
      {
        "name": "string",
        "current": "version",
        "latest": "version",
        "severity": "low|medium|high|critical"
      }
    ],
    "securityIssues": [
      {
        "type": "string",
        "severity": "string",
        "description": "string",
        "location": "string"
      }
    ],
    "codeSmells": ["description"],
    "missingTests": true/false,
    "testCoverage": 0-100
  },
  "architecture": {
    "type": "monolith|microservices|serverless",
    "layers": ["frontend", "backend", "database"],
    "components": [
      {
        "name": "string",
        "type": "component|service|model",
        "path": "string",
        "dependencies": ["string"]
      }
    ],
    "diagram": "mermaid-syntax-string"
  },
  "recommendations": ["string"]
}
```

**Technologies**:
- Babel + @babel/parser (JS/TS AST)
- jscodeshift (code transformations)
- npm-check-updates (dependency analysis)
- eslint (linting)
- dependency-cruiser (dependency graphs)
- retire.js (security scanning)

---

### 2. BUG NECROMANCER AGENT

**Purpose**: Revive the original application by fixing issues and modernizing code

**Input**:
- Repository path
- Autopsy Report
- Revival configuration (aggressive/conservative)

**Processing**:
1. Create new branch: `necrostack/revival-{timestamp}`
2. Update dependencies to latest compatible versions
3. Fix deprecated API usage
4. Refactor code smells
5. Add missing error handling
6. Generate basic tests for untested code
7. Fix linting errors
8. Update configuration files
9. Generate migration guide
10. Create pull request with changes

**Output**: Revival Report JSON
```json
{
  "id": "uuid",
  "autopsyId": "uuid",
  "timestamp": "ISO-8601",
  "status": "success|partial|failed",
  "changes": {
    "dependenciesUpdated": [
      {
        "name": "string",
        "from": "version",
        "to": "version"
      }
    ],
    "filesModified": ["path"],
    "filesDeleted": ["path"],
    "filesCreated": ["path"],
    "bugsFixed": [
      {
        "type": "string",
        "location": "string",
        "description": "string"
      }
    ],
    "testsAdded": 0,
    "coverageImprovement": "+X%"
  },
  "pullRequest": {
    "url": "string",
    "branch": "string",
    "commits": ["sha"]
  },
  "buildStatus": "passing|failing",
  "warnings": ["string"]
}
```

**Technologies**:
- npm-check-updates / yarn upgrade
- jscodeshift (automated refactoring)
- eslint --fix
- prettier (formatting)
- jest (test generation)
- GitHub API (PR creation)

---

### 3. SOUL EXTRACTOR AGENT

**Purpose**: Extract the core logic and essence of the application into a structured specification

**Input**:
- Repository path
- Autopsy Report
- Project type detection

**Processing**:
1. Map all routes/endpoints
2. Extract data models and schemas
3. Identify business logic functions
4. Map state management patterns
5. Extract UI component hierarchy
6. Identify external integrations (APIs, databases)
7. Map authentication/authorization flows
8. Extract configuration patterns
9. Document data flows
10. Generate Soul JSON Spec

**Output**: Soul JSON Spec
```json
{
  "id": "uuid",
  "autopsyId": "uuid",
  "timestamp": "ISO-8601",
  "essence": {
    "appType": "web|api|cli|mobile",
    "domain": "ecommerce|blog|dashboard|etc",
    "description": "string"
  },
  "routes": [
    {
      "path": "/api/users",
      "method": "GET|POST|PUT|DELETE",
      "handler": "function-name",
      "middleware": ["auth", "validation"],
      "input": {
        "params": {},
        "query": {},
        "body": {}
      },
      "output": {
        "success": {},
        "error": {}
      }
    }
  ],
  "models": [
    {
      "name": "User",
      "fields": [
        {
          "name": "id",
          "type": "string|number|boolean|date",
          "required": true,
          "unique": true
        }
      ],
      "relations": [
        {
          "type": "hasMany|belongsTo|manyToMany",
          "model": "Post"
        }
      ]
    }
  ],
  "businessLogic": [
    {
      "name": "createUser",
      "description": "string",
      "inputs": ["email", "password"],
      "outputs": ["user"],
      "steps": ["validate", "hash", "save", "sendEmail"]
    }
  ],
  "stateManagement": {
    "type": "redux|context|zustand|none",
    "stores": [
      {
        "name": "userStore",
        "state": {},
        "actions": ["login", "logout"]
      }
    ]
  },
  "uiComponents": [
    {
      "name": "UserCard",
      "type": "presentational|container",
      "props": {},
      "children": ["Avatar", "UserInfo"]
    }
  ],
  "integrations": [
    {
      "type": "database|api|auth|payment",
      "service": "PostgreSQL|Stripe|Auth0",
      "config": {}
    }
  ],
  "authentication": {
    "type": "jwt|session|oauth",
    "provider": "custom|auth0|firebase",
    "flows": ["login", "register", "reset"]
  },
  "dataFlows": [
    {
      "trigger": "user-action|cron|webhook",
      "steps": ["fetch", "transform", "store", "notify"]
    }
  ]
}
```

**Technologies**:
- AST parsing (Babel, TypeScript Compiler API)
- Pattern matching (regex, AST queries)
- OpenAPI/Swagger detection
- GraphQL schema extraction
- Database schema introspection

---

### 4. SOUL TRANSFER / REANIMATION AGENT

**Purpose**: Rebuild the application into a modern tech stack using the Soul Spec

**Input**:
- Soul JSON Spec
- Target stack selection (Next.js, Fastify, Django, Go, etc.)
- Configuration options (TypeScript, testing framework, styling)

**Processing**:
1. Load appropriate project template
2. Generate folder structure
3. Create data models with ORM/ODM
4. Generate API routes/endpoints
5. Create frontend components
6. Implement business logic
7. Add authentication/authorization
8. Generate tests (unit, integration, e2e)
9. Create documentation
10. Generate Docker/deployment configs
11. Create migration scripts
12. Package as downloadable artifact

**Output**: Reanimation Package
```json
{
  "id": "uuid",
  "soulId": "uuid",
  "timestamp": "ISO-8601",
  "targetStack": {
    "frontend": "Next.js 15",
    "backend": "Fastify",
    "database": "PostgreSQL",
    "language": "TypeScript"
  },
  "generated": {
    "files": 0,
    "components": 0,
    "routes": 0,
    "models": 0,
    "tests": 0
  },
  "structure": {
    "folders": ["src", "tests", "docs"],
    "entrypoint": "src/index.ts"
  },
  "artifacts": {
    "zipUrl": "s3://bucket/reanimated-{id}.zip",
    "githubRepo": "url",
    "size": "bytes"
  },
  "documentation": {
    "readme": "string",
    "setup": "string",
    "api": "string"
  },
  "nextSteps": ["npm install", "npm run dev"]
}
```

**Technologies**:
- Template engines (Handlebars, EJS)
- Code generators (Plop, Yeoman patterns)
- AST builders (Babel, TypeScript)
- File system operations
- Archive creation (archiver, tar)

---

## 🎨 UI SCREENS & WORKFLOWS

### Screen 1: Upload / Repository Input
**Route**: `/upload`

**Components**:
- `RepoUploader` (drag-drop or GitHub URL input)
- `GlitchEffect` (background animation)

**Actions**:
- User pastes GitHub URL or uploads zip
- System validates input
- Redirects to `/autopsy/[id]`

---

### Screen 2: Autopsy Report
**Route**: `/autopsy/[id]`

**Components**:
- `AutopsyReport` (displays findings)
- `HealthScore` (animated gauge)
- `ArchitectureDiagram` (Mermaid visualization)
- `IssuesList` (dead files, deprecated deps, security)

**Actions**:
- View detailed report
- Download JSON report
- Proceed to Revival → `/revival/[id]`
- Skip to Extraction → `/extraction/[id]`

---

### Screen 3: Revival Progress
**Route**: `/revival/[id]`

**Components**:
- `RevivalProgress` (animated progress bar)
- `ChangeLog` (live updates of fixes)
- `BuildStatus` (passing/failing indicator)

**Actions**:
- Watch real-time revival process
- View generated PR
- Proceed to Extraction → `/extraction/[id]`

---

### Screen 4: Soul Extraction
**Route**: `/extraction/[id]`

**Components**:
- `SoulViewer` (JSON tree view)
- `RouteMap` (visual route diagram)
- `ModelGraph` (entity relationships)
- `LogicFlow` (business logic visualization)

**Actions**:
- Explore extracted soul
- Download Soul JSON
- Edit/refine soul manually
- Proceed to Reanimation → `/reanimation/[id]`

---

### Screen 5: Stack Selection & Reanimation
**Route**: `/reanimation/[id]`

**Components**:
- `StackSelector` (choose target stack)
- `ConfigOptions` (TypeScript, tests, styling)
- `ReanimationPreview` (file tree preview)
- `GenerationProgress` (animated)

**Actions**:
- Select target stack (Next.js, Fastify, Django, Go)
- Configure options
- Start reanimation
- Download generated project
- View GitHub repo (if auto-created)

---

### Screen 6: Export & Summary
**Route**: `/export/[id]`

**Components**:
- `ExportSummary` (all artifacts)
- `DownloadButtons` (autopsy, revival, soul, reanimated)
- `ComparisonView` (before/after)

**Actions**:
- Download all artifacts as zip
- View side-by-side comparison
- Start new resurrection

---

## 🔄 COMPLETE WORKFLOW

```
1. USER UPLOADS REPO
   ↓
2. CODE CORONER AGENT
   - Analyzes codebase
   - Generates Autopsy Report
   ↓
3. BUG NECROMANCER AGENT (optional)
   - Revives original code
   - Creates PR with fixes
   ↓
4. SOUL EXTRACTOR AGENT
   - Extracts core logic
   - Generates Soul JSON Spec
   ↓
5. USER SELECTS TARGET STACK
   ↓
6. SOUL TRANSFER AGENT
   - Generates new project
   - Scaffolds modern codebase
   ↓
7. EXPORT ARTIFACTS
   - Autopsy Report (JSON + PDF)
   - Revival PR (GitHub link)
   - Soul Spec (JSON)
   - Reanimated Project (ZIP + GitHub)
```

---

## 📊 DATA MODELS

### Repository
```typescript
interface Repository {
  id: string;
  url: string;
  name: string;
  owner: string;
  language: string;
  framework: string;
  uploadedAt: Date;
  status: 'analyzing' | 'analyzed' | 'reviving' | 'extracting' | 'reanimating' | 'complete';
}
```

### Autopsy
```typescript
interface Autopsy {
  id: string;
  repositoryId: string;
  report: AutopsyReport; // JSON from Coroner Agent
  createdAt: Date;
}
```

### Revival
```typescript
interface Revival {
  id: string;
  autopsyId: string;
  report: RevivalReport; // JSON from Necromancer Agent
  pullRequestUrl: string;
  createdAt: Date;
}
```

### Soul
```typescript
interface Soul {
  id: string;
  autopsyId: string;
  spec: SoulSpec; // JSON from Extractor Agent
  createdAt: Date;
}
```

### Resurrection
```typescript
interface Resurrection {
  id: string;
  soulId: string;
  targetStack: string;
  config: Record<string, any>;
  artifactUrl: string;
  githubRepoUrl?: string;
  createdAt: Date;
}
```

---

## 🔌 API ENDPOINTS

### POST /api/analyze
**Input**: `{ repoUrl: string } | FormData (zip)`
**Output**: `{ id: string, status: 'analyzing' }`
**Action**: Triggers Code Coroner Agent

### GET /api/analyze/:id
**Output**: `AutopsyReport`
**Action**: Retrieves autopsy report

### POST /api/revive/:id
**Input**: `{ mode: 'aggressive' | 'conservative' }`
**Output**: `{ revivalId: string, status: 'reviving' }`
**Action**: Triggers Bug Necromancer Agent

### GET /api/revive/:id
**Output**: `RevivalReport`
**Action**: Retrieves revival report

### POST /api/extract/:id
**Output**: `{ soulId: string, status: 'extracting' }`
**Action**: Triggers Soul Extractor Agent

### GET /api/extract/:id
**Output**: `SoulSpec`
**Action**: Retrieves soul specification

### POST /api/reanimate/:soulId
**Input**: `{ targetStack: string, config: object }`
**Output**: `{ resurrectionId: string, status: 'reanimating' }`
**Action**: Triggers Reanimation Agent

### GET /api/reanimate/:id
**Output**: `ReanimationPackage`
**Action**: Retrieves reanimation status and artifacts

### GET /api/artifacts/:id/download
**Output**: Binary (ZIP file)
**Action**: Downloads generated project

---

## 🎭 UI THEME & AESTHETICS

### Visual Style
- **Color Palette**: Dark mode with neon green/purple accents
- **Typography**: Monospace fonts (JetBrains Mono, Fira Code)
- **Effects**: CRT scanlines, glitch animations, VHS distortion
- **Animations**: Framer Motion for smooth transitions

### Component Patterns
- Glitchy loading states
- Pulsing "heartbeat" indicators for health scores
- Flickering text for warnings
- Smooth fade transitions between screens
- Particle effects for "soul extraction"
- Matrix-style code rain for background

### Accessibility
- High contrast mode support
- Keyboard navigation
- Screen reader friendly
- Reduced motion option

---

## 🧪 TESTING STRATEGY

### Unit Tests
- All agent functions
- API route handlers
- Utility functions
- Component logic

### Integration Tests
- Agent orchestration
- API endpoint flows
- Database operations

### E2E Tests
- Complete resurrection workflow
- File upload and download
- GitHub integration

### Test Frameworks
- **Frontend**: Vitest + React Testing Library
- **Backend**: Vitest + Supertest
- **E2E**: Playwright

---

## 🚀 DEPLOYMENT

### Development
```bash
docker-compose up
```

### Production
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Fly.io / AWS Lambda
- **Database**: Supabase / Neon / PlanetScale
- **Storage**: S3 / R2 / Backblaze B2

### Environment Variables
```
DATABASE_URL=
GITHUB_TOKEN=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
FRONTEND_URL=
BACKEND_URL=
```

---

## 📝 DOCUMENTATION REQUIREMENTS

### README.md
- Project overview
- Quick start guide
- Architecture diagram
- API documentation
- Contributing guidelines

### Agent READMEs
- Each agent has its own README
- Input/output specifications
- Usage examples
- Configuration options

### API Documentation
- OpenAPI/Swagger spec
- Interactive API explorer
- Code examples in multiple languages

---

## 🔐 SECURITY CONSIDERATIONS

- Sanitize all user inputs
- Validate GitHub URLs
- Sandbox code execution for analysis
- Rate limiting on API endpoints
- Secure artifact storage with signed URLs
- No execution of arbitrary code from uploaded repos
- Dependency scanning for generated projects
- CORS configuration
- Environment variable protection

---

## 📈 MONITORING & LOGGING

- Request/response logging
- Agent execution metrics
- Error tracking (Sentry)
- Performance monitoring
- User analytics (privacy-focused)

---

## 🎯 SUCCESS METRICS

- Time to complete full resurrection
- Accuracy of soul extraction
- Generated code quality
- User satisfaction
- Number of successful revivals

---

## 🔮 FUTURE ENHANCEMENTS

- Multi-language support (Java, Ruby, PHP)
- AI-powered code improvement suggestions
- Automated deployment of reanimated apps
- Community template marketplace
- Collaborative soul editing
- Version control for souls
- A/B testing different reanimation strategies

---

## 📜 LICENSE

MIT License - See LICENSE file

---

**END OF ARCHITECTURE BLUEPRINT**

# 📁 NECROSTACK Complete Folder Structure

This document shows the complete folder structure for the NECROSTACK project.

---

## 🌳 Full Directory Tree

```
necrostack/
│
├── 📄 README.md                      # Project overview and quick start
├── 📄 LICENSE                        # MIT License
├── 📄 PROJECT_SUMMARY.md             # Executive summary
├── 📄 ARCHITECTURE.md                # Complete system architecture
├── 📄 WORKFLOW.md                    # End-to-end workflow
├── 📄 DATA_MODELS.md                 # Data models and API specs
├── 📄 IMPLEMENTATION_PLAN.md         # Development roadmap
├── 📄 FOLDER_STRUCTURE.md            # This file
├── 📄 package.json                   # Root package (monorepo)
├── 📄 docker-compose.yml             # Docker configuration
├── 📄 .env.example                   # Environment variables template
├── 📄 .gitignore                     # Git ignore rules
│
├── 📁 .github/                       # GitHub configuration
│   └── 📁 workflows/                 # GitHub Actions
│       ├── ci.yml                    # Continuous integration
│       ├── lint.yml                  # Linting workflow
│       └── test.yml                  # Testing workflow
│
├── 📁 frontend/                      # Next.js 15 Application
│   ├── 📄 package.json
│   ├── 📄 next.config.js
│   ├── 📄 tsconfig.json
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   │
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   │
│   │   ├── 📁 upload/                # Upload screen
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 autopsy/               # Autopsy report
│   │   │   └── 📁 [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 revival/               # Revival progress
│   │   │   └── 📁 [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 extraction/            # Soul extraction
│   │   │   └── 📁 [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 reanimation/           # Reanimation
│   │   │   └── 📁 [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 export/                # Export & download
│   │   │   └── 📁 [id]/
│   │   │       └── page.tsx
│   │   │
│   │   └── 📁 api/                   # API routes (if needed)
│   │       ├── 📁 analyze/
│   │       ├── 📁 revive/
│   │       ├── 📁 extract/
│   │       ├── 📁 reanimate/
│   │       └── 📁 artifacts/
│   │
│   ├── 📁 components/                # React components
│   │   ├── 📁 ui/                    # ShadCN UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   │
│   │   ├── RepoUploader.tsx          # Repository upload
│   │   ├── AutopsyReport.tsx         # Autopsy display
│   │   ├── HealthScore.tsx           # Health gauge
│   │   ├── RevivalProgress.tsx       # Revival progress
│   │   ├── SoulViewer.tsx            # Soul JSON viewer
│   │   ├── StackSelector.tsx         # Stack selection
│   │   ├── ReanimationPreview.tsx    # Preview generated code
│   │   ├── GlitchEffect.tsx          # Glitch animation
│   │   ├── CRTEffect.tsx             # CRT scanlines
│   │   └── CodeRain.tsx              # Matrix-style background
│   │
│   ├── 📁 lib/                       # Utilities
│   │   ├── api-client.ts             # API client
│   │   ├── types.ts                  # TypeScript types
│   │   ├── utils.ts                  # Helper functions
│   │   └── websocket.ts              # WebSocket client
│   │
│   └── 📁 styles/                    # Additional styles
│       └── globals.css
│
├── 📁 backend/                       # Fastify API Server
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   │
│   ├── 📁 src/
│   │   ├── index.ts                  # Server entry point
│   │   ├── app.ts                    # Fastify app setup
│   │   │
│   │   ├── 📁 routes/                # API routes
│   │   │   ├── analyze.ts            # POST/GET /api/analyze
│   │   │   ├── revive.ts             # POST/GET /api/revive
│   │   │   ├── extract.ts            # POST/GET /api/extract
│   │   │   ├── reanimate.ts          # POST/GET /api/reanimate
│   │   │   ├── artifacts.ts          # GET /api/artifacts/:id/download
│   │   │   └── status.ts             # GET /api/status/:id
│   │   │
│   │   ├── 📁 services/              # Business logic
│   │   │   ├── github-service.ts     # GitHub API integration
│   │   │   ├── storage-service.ts    # S3 storage
│   │   │   ├── agent-orchestrator.ts # Agent coordination
│   │   │   ├── export-service.ts     # ZIP generation
│   │   │   └── websocket-service.ts  # WebSocket updates
│   │   │
│   │   ├── 📁 models/                # Data models
│   │   │   ├── repository.ts
│   │   │   ├── autopsy.ts
│   │   │   ├── revival.ts
│   │   │   ├── soul.ts
│   │   │   └── resurrection.ts
│   │   │
│   │   ├── 📁 config/                # Configuration
│   │   │   ├── database.ts           # Database config
│   │   │   ├── storage.ts            # S3 config
│   │   │   └── env.ts                # Environment variables
│   │   │
│   │   └── 📁 utils/                 # Utilities
│   │       ├── logger.ts
│   │       ├── errors.ts
│   │       └── validation.ts
│   │
│   └── 📁 prisma/                    # Prisma ORM
│       ├── schema.prisma             # Database schema
│       └── 📁 migrations/            # Database migrations
│
├── 📁 agents/                        # Four Autonomous Agents
│   │
│   ├── 📁 coroner/                   # Code Coroner Agent
│   │   ├── 📄 README.md              # Agent documentation
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   │
│   │   └── 📁 src/
│   │       ├── index.ts              # Agent entry point
│   │       ├── analyzer.ts           # Main analyzer
│   │       ├── detector.ts           # Project type detection
│   │       ├── dependency-checker.ts # Dependency analysis
│   │       ├── dead-code-detector.ts # Dead code detection
│   │       ├── security-scanner.ts   # Security scanning
│   │       ├── architecture-mapper.ts# Architecture mapping
│   │       ├── quality-analyzer.ts   # Code quality metrics
│   │       ├── report-generator.ts   # Report generation
│   │       └── diagram-builder.ts    # Mermaid diagrams
│   │
│   ├── 📁 necromancer/               # Bug Necromancer Agent
│   │   ├── 📄 README.md
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   │
│   │   └── 📁 src/
│   │       ├── index.ts
│   │       ├── dependency-updater.ts # Update dependencies
│   │       ├── deprecation-fixer.ts  # Fix deprecations
│   │       ├── bug-fixer.ts          # Fix common bugs
│   │       ├── refactorer.ts         # Code refactoring
│   │       ├── test-generator.ts     # Generate tests
│   │       ├── pr-generator.ts       # Create PRs
│   │       └── transforms/           # jscodeshift transforms
│   │           ├── react-lifecycle.ts
│   │           ├── async-await.ts
│   │           └── modernize-syntax.ts
│   │
│   ├── 📁 extractor/                 # Soul Extractor Agent
│   │   ├── 📄 README.md
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   │
│   │   └── 📁 src/
│   │       ├── index.ts
│   │       ├── route-mapper.ts       # Map API routes
│   │       ├── model-extractor.ts    # Extract data models
│   │       ├── logic-extractor.ts    # Extract business logic
│   │       ├── state-analyzer.ts     # Analyze state management
│   │       ├── component-analyzer.ts # Analyze UI components
│   │       ├── integration-detector.ts# Detect integrations
│   │       ├── auth-detector.ts      # Detect auth patterns
│   │       ├── flow-mapper.ts        # Map data flows
│   │       └── soul-builder.ts       # Build soul spec
│   │
│   └── 📁 reanimator/                # Reanimation Agent
│       ├── 📄 README.md
│       ├── 📄 package.json
│       ├── 📄 tsconfig.json
│       │
│       ├── 📁 src/
│       │   ├── index.ts
│       │   ├── scaffold-generator.ts # Generate structure
│       │   ├── model-generator.ts    # Generate models
│       │   ├── route-generator.ts    # Generate routes
│       │   ├── component-generator.ts# Generate components
│       │   ├── logic-generator.ts    # Generate business logic
│       │   ├── test-generator.ts     # Generate tests
│       │   ├── doc-generator.ts      # Generate docs
│       │   ├── template-engine.ts    # Template processing
│       │   ├── code-writer.ts        # Write code files
│       │   └── packager.ts           # Create ZIP
│       │
│       └── 📁 templates/             # Project templates
│           ├── 📁 nextjs/            # Next.js templates
│           │   ├── 📁 base/
│           │   ├── 📁 components/
│           │   ├── 📁 pages/
│           │   └── 📁 config/
│           │
│           ├── 📁 fastify/           # Fastify templates
│           │   ├── 📁 base/
│           │   ├── 📁 routes/
│           │   ├── 📁 services/
│           │   └── 📁 config/
│           │
│           ├── 📁 django/            # Django templates
│           │   ├── 📁 base/
│           │   ├── 📁 models/
│           │   ├── 📁 views/
│           │   └── 📁 config/
│           │
│           ├── 📁 go/                # Go templates
│           │   ├── 📁 base/
│           │   ├── 📁 handlers/
│           │   ├── 📁 models/
│           │   └── 📁 config/
│           │
│           └── 📁 express/           # Express templates
│               ├── 📁 base/
│               ├── 📁 routes/
│               ├── 📁 controllers/
│               └── 📁 config/
│
├── 📁 analyzers/                     # Code Analysis Tools
│   │
│   ├── 📁 js-analyzer/               # JavaScript/TypeScript
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   │
│   │   └── 📁 src/
│   │       ├── index.ts
│   │       ├── ast-parser.ts         # AST parsing
│   │       ├── dependency-checker.ts # Dependency analysis
│   │       ├── dead-code-detector.ts # Dead code detection
│   │       ├── security-scanner.ts   # Security scanning
│   │       └── architecture-mapper.ts# Architecture mapping
│   │
│   └── 📁 py-analyzer/               # Python (optional)
│       ├── 📄 requirements.txt
│       ├── 📄 setup.py
│       │
│       └── 📁 src/
│           ├── __init__.py
│           ├── ast_parser.py
│           ├── dependency_checker.py
│           └── code_analyzer.py
│
├── 📁 reports/                       # Generated autopsy reports
│   └── .gitkeep
│
├── 📁 output/                        # Generated projects
│   └── .gitkeep
│
└── 📁 docs/                          # Additional documentation
    ├── API.md                        # API reference
    ├── AGENTS.md                     # Agent specifications
    ├── CONTRIBUTING.md               # Contributing guide
    ├── FAQ.md                        # Frequently asked questions
    └── DEPLOYMENT.md                 # Deployment guide
```

---

## 📊 File Count Summary

### Documentation Files
- 📄 7 root-level markdown files
- 📄 4 agent README files
- 📄 5 additional docs (to be created)
- **Total: 16 documentation files**

### Source Code Directories
- 📁 Frontend: 1 main directory
- 📁 Backend: 1 main directory
- 📁 Agents: 4 agent directories
- 📁 Analyzers: 2 analyzer directories
- **Total: 8 main code directories**

### Configuration Files
- package.json (root + 7 modules)
- tsconfig.json (7 modules)
- Docker, CI/CD configs
- **Total: ~20 config files**

---

## 🎯 Key Directories Explained

### `/frontend`
Next.js 15 application with App Router. Contains all UI components, pages, and client-side logic.

### `/backend`
Fastify API server. Handles all HTTP requests, orchestrates agents, manages database, and serves artifacts.

### `/agents`
Four autonomous agents that perform the core resurrection workflow. Each agent is a separate module with its own logic.

### `/analyzers`
Low-level code analysis tools used by the agents. Separated for reusability and testing.

### `/templates`
Project templates for different tech stacks. Used by the Reanimation Agent to generate new projects.

### `/reports`
Temporary storage for generated autopsy reports before uploading to S3.

### `/output`
Temporary storage for generated projects before packaging and uploading to S3.

---

## 🔧 Configuration Files

### Root Level
- `package.json` - Monorepo configuration
- `docker-compose.yml` - Local development setup
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- `tsconfig.json` - TypeScript base config

### Frontend
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS configuration

### Backend
- `prisma/schema.prisma` - Database schema

### Each Agent/Analyzer
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config

---

## 📦 Module Dependencies

```
Root (monorepo)
├── frontend (depends on: backend API)
├── backend (depends on: agents, analyzers)
├── agents/
│   ├── coroner (depends on: analyzers)
│   ├── necromancer (depends on: analyzers)
│   ├── extractor (depends on: analyzers)
│   └── reanimator (depends on: templates)
└── analyzers/
    ├── js-analyzer (standalone)
    └── py-analyzer (standalone)
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/necrostack.git
   cd necrostack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

---

## 📝 Notes

- All TypeScript files use `.ts` or `.tsx` extensions
- All React components use `.tsx` extension
- Configuration files use `.js` or `.json` extensions
- Documentation uses `.md` (Markdown) extension
- Templates use appropriate extensions for target language

---

This structure provides a clear, organized foundation for the NECROSTACK project.

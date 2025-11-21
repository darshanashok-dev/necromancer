# 🔄 NECROSTACK Complete Workflow

This document describes the end-to-end workflow of the NECROSTACK system.

---

## 📊 Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER UPLOADS REPO                        │
│                    (GitHub URL or ZIP file)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🔍 CODE CORONER AGENT                         │
│                                                                   │
│  • Clone/extract repository                                      │
│  • Detect project type & framework                               │
│  • Analyze dependencies                                          │
│  • Scan for dead code                                            │
│  • Security vulnerability scan                                   │
│  • Map architecture                                              │
│  • Calculate health metrics                                      │
│                                                                   │
│  Output: AUTOPSY REPORT                                          │
│  - Health Score: 45/100 (Dying)                                  │
│  - 12 deprecated dependencies                                    │
│  - 5 security vulnerabilities                                    │
│  - 23 dead files                                                 │
│  - Architecture diagram                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER REVIEWS AUTOPSY                          │
│                                                                   │
│  Options:                                                        │
│  1. Skip to Soul Extraction →                                    │
│  2. Attempt Revival (Bug Necromancer) ↓                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   🩹 BUG NECROMANCER AGENT                       │
│                        (Optional Step)                           │
│                                                                   │
│  • Create revival branch                                         │
│  • Update 12 dependencies                                        │
│  • Fix deprecated API usage                                      │
│  • Refactor code smells                                          │
│  • Add error handling                                            │
│  • Generate 45 tests                                             │
│  • Run linter & formatter                                        │
│  • Create Pull Request                                           │
│                                                                   │
│  Output: REVIVAL REPORT + PR                                     │
│  - Health Score: 45 → 78 (+33)                                   │
│  - PR: github.com/user/repo/pull/123                             │
│  - Build Status: ✅ Passing                                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   👻 SOUL EXTRACTOR AGENT                        │
│                                                                   │
│  • Map 15 API routes                                             │
│  • Extract 8 data models                                         │
│  • Identify 23 business logic functions                          │
│  • Map state management (Redux)                                  │
│  • Extract 42 UI components                                      │
│  • Identify integrations (PostgreSQL, Stripe, SendGrid)          │
│  • Map authentication flow (JWT)                                 │
│  • Document data flows                                           │
│                                                                   │
│  Output: SOUL JSON SPEC                                          │
│  - App Type: Web Application                                     │
│  - Domain: E-commerce                                            │
│  - 15 routes, 8 models, 42 components                            │
│  - Complete business logic map                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   USER SELECTS TARGET STACK                      │
│                                                                   │
│  Frontend:  [Next.js 15] ▼                                       │
│  Backend:   [Fastify] ▼                                          │
│  Database:  [PostgreSQL] ▼                                       │
│  Language:  [TypeScript] ▼                                       │
│                                                                   │
│  Options:                                                        │
│  ☑ TypeScript                                                    │
│  ☑ TailwindCSS                                                   │
│  ☑ Prisma ORM                                                    │
│  ☑ JWT Auth                                                      │
│  ☑ Vitest                                                        │
│  ☑ Docker                                                        │
│  ☑ GitHub Actions                                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              ⚡ SOUL TRANSFER / REANIMATION AGENT                │
│                                                                   │
│  • Load Next.js + Fastify template                               │
│  • Generate project structure                                    │
│  • Create 8 Prisma models                                        │
│  • Generate 15 API routes with validation                        │
│  • Create 42 React components                                    │
│  • Implement 23 business logic functions                         │
│  • Add JWT authentication                                        │
│  • Generate 127 tests (unit + integration + e2e)                 │
│  • Create documentation                                          │
│  • Add Docker configs                                            │
│  • Setup GitHub Actions                                          │
│  • Package as ZIP                                                │
│  • (Optional) Create GitHub repo                                 │
│                                                                   │
│  Output: REANIMATED PROJECT                                      │
│  - 234 files generated                                           │
│  - 12,456 lines of code                                          │
│  - ✅ All tests passing                                          │
│  - ✅ Build successful                                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPORT & DOWNLOAD                           │
│                                                                   │
│  Available Artifacts:                                            │
│  📄 Autopsy Report (JSON + PDF)                                  │
│  🔗 Revival PR (if created)                                      │
│  👻 Soul Spec (JSON)                                             │
│  📦 Reanimated Project (ZIP)                                     │
│  🔗 GitHub Repo (if created)                                     │
│                                                                   │
│  Comparison:                                                     │
│  Before: 45/100 health, outdated stack                           │
│  After:  95/100 health, modern stack                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎬 Step-by-Step User Journey

### Step 1: Upload Repository
**Screen**: `/upload`

1. User visits NECROSTACK homepage
2. Sees glitchy, CRT-style interface
3. Options:
   - Paste GitHub URL
   - Upload ZIP file
4. Clicks "Begin Autopsy"
5. System validates input
6. Redirects to `/autopsy/[id]`

**Backend**:
- POST `/api/analyze`
- Clones/extracts repository
- Triggers Code Coroner Agent
- Returns analysis ID

---

### Step 2: View Autopsy Report
**Screen**: `/autopsy/[id]`

**Loading State**:
- Animated "Analyzing..." with glitch effects
- Progress indicators for each analysis phase
- Real-time updates via WebSocket/polling

**Report Display**:
- Health score gauge (animated)
- Status badge (Dead/Dying/Stable/Healthy)
- Findings sections:
  - Dead Files (expandable list)
  - Deprecated Dependencies (table)
  - Security Issues (severity badges)
  - Code Smells (categorized)
- Architecture diagram (Mermaid)
- Dependency graph (interactive)

**Actions**:
- Download JSON report
- Download PDF report
- "Attempt Revival" button → `/revival/[id]`
- "Skip to Extraction" button → `/extraction/[id]`

---

### Step 3: Revival (Optional)
**Screen**: `/revival/[id]`

**Configuration**:
- Mode: Conservative / Aggressive
- Options:
  - ☑ Update dependencies
  - ☑ Fix deprecations
  - ☑ Refactor code
  - ☑ Generate tests
  - ☑ Create PR

**Progress Display**:
- Real-time changelog
- Files being modified (live feed)
- Tests being generated
- Build status

**Completion**:
- Health score improvement (+33)
- PR link (if created)
- Summary of changes
- "Continue to Extraction" button

---

### Step 4: Soul Extraction
**Screen**: `/extraction/[id]`

**Loading State**:
- "Extracting soul..." animation
- Particle effects
- Progress phases

**Soul Viewer**:
- JSON tree view (collapsible)
- Tabs:
  - Routes (table with details)
  - Models (entity diagram)
  - Components (hierarchy tree)
  - Business Logic (flow diagrams)
  - Integrations (list with icons)

**Actions**:
- Download Soul JSON
- Edit soul manually (advanced)
- "Proceed to Reanimation" button

---

### Step 5: Stack Selection
**Screen**: `/reanimation/[id]`

**Stack Selector**:
- Frontend dropdown (Next.js, React, Vue, Svelte)
- Backend dropdown (Fastify, Express, NestJS, Django, Go)
- Database dropdown (PostgreSQL, MySQL, MongoDB, SQLite)
- Language (TypeScript, JavaScript, Python, Go)

**Configuration Options**:
- TypeScript: Yes/No
- Testing: Jest/Vitest/Pytest
- Styling: Tailwind/Styled-Components/CSS Modules
- ORM: Prisma/TypeORM/Sequelize
- Auth: JWT/Session/OAuth/None
- Docker: Yes/No
- CI/CD: Yes/No

**Preview**:
- File tree preview
- Estimated files/LOC
- Tech stack summary

**Actions**:
- "Start Reanimation" button

---

### Step 6: Reanimation Progress
**Screen**: `/reanimation/[id]` (progress view)

**Progress Display**:
- Overall progress bar
- Current phase indicator
- Files being generated (live feed)
- Code snippets (preview)

**Phases**:
1. ⚙️ Scaffolding project...
2. 📊 Generating models...
3. 🛣️ Creating routes...
4. 🎨 Building components...
5. 🧪 Writing tests...
6. 📝 Creating docs...
7. 📦 Packaging...

---

### Step 7: Export & Download
**Screen**: `/export/[id]`

**Summary**:
- Project name
- Target stack
- Generation stats
- Quality checks (all green)

**Artifacts**:
- Autopsy Report (JSON, PDF)
- Revival PR (link)
- Soul Spec (JSON)
- Reanimated Project (ZIP download)
- GitHub Repo (link, if created)

**Comparison View**:
- Side-by-side before/after
- Health score improvement
- Tech stack comparison
- Metrics comparison

**Actions**:
- Download all as ZIP
- View on GitHub
- Start new resurrection

---

## 🔄 Data Flow

```
User Input
    ↓
Repository Storage (temp)
    ↓
Code Coroner Agent
    ↓
Autopsy Report (DB + JSON)
    ↓
Bug Necromancer Agent (optional)
    ↓
Revival Report (DB + JSON) + GitHub PR
    ↓
Soul Extractor Agent
    ↓
Soul Spec (DB + JSON)
    ↓
Reanimation Agent
    ↓
Generated Project (ZIP + GitHub)
    ↓
S3 Storage
    ↓
User Download
```

---

## 🗄️ Database Schema

```sql
-- Repositories
CREATE TABLE repositories (
  id UUID PRIMARY KEY,
  url TEXT,
  name TEXT,
  owner TEXT,
  language TEXT,
  framework TEXT,
  uploaded_at TIMESTAMP,
  status TEXT
);

-- Autopsies
CREATE TABLE autopsies (
  id UUID PRIMARY KEY,
  repository_id UUID REFERENCES repositories(id),
  report JSONB,
  created_at TIMESTAMP
);

-- Revivals
CREATE TABLE revivals (
  id UUID PRIMARY KEY,
  autopsy_id UUID REFERENCES autopsies(id),
  report JSONB,
  pr_url TEXT,
  created_at TIMESTAMP
);

-- Souls
CREATE TABLE souls (
  id UUID PRIMARY KEY,
  autopsy_id UUID REFERENCES autopsies(id),
  spec JSONB,
  created_at TIMESTAMP
);

-- Resurrections
CREATE TABLE resurrections (
  id UUID PRIMARY KEY,
  soul_id UUID REFERENCES souls(id),
  target_stack JSONB,
  config JSONB,
  artifact_url TEXT,
  github_repo_url TEXT,
  created_at TIMESTAMP
);
```

---

## 🎨 UI States & Animations

### Loading States
- Glitch effect on text
- CRT scanlines
- Pulsing indicators
- Matrix-style code rain

### Success States
- Green glow effect
- Smooth fade-in
- Particle burst

### Error States
- Red glitch effect
- Shake animation
- Error message with retry

### Transitions
- Smooth page transitions (Framer Motion)
- Fade between sections
- Slide-in panels

---

## 🔐 Security Flow

1. **Input Validation**
   - Sanitize GitHub URLs
   - Validate ZIP files
   - Check file sizes

2. **Sandboxed Execution**
   - Run analysis in isolated environment
   - No arbitrary code execution
   - Resource limits

3. **Authentication** (if required)
   - JWT tokens
   - Rate limiting
   - API key validation

4. **Storage Security**
   - Signed URLs for downloads
   - Temporary file cleanup
   - Encrypted sensitive data

---

## 📊 Monitoring & Analytics

### Metrics Tracked
- Resurrection success rate
- Average processing time per agent
- Health score improvements
- Popular target stacks
- Error rates
- User satisfaction

### Logging
- All agent executions
- API requests/responses
- Errors and warnings
- Performance metrics

---

## 🚀 Deployment Flow

```
Development
    ↓
GitHub Push
    ↓
GitHub Actions
    ↓
Run Tests
    ↓
Build Frontend (Next.js)
    ↓
Build Backend (Fastify)
    ↓
Deploy Frontend → Vercel
    ↓
Deploy Backend → Railway/Fly.io
    ↓
Run Migrations
    ↓
Production
```

---

## 🔮 Future Workflow Enhancements

- Batch processing (multiple repos)
- Scheduled resurrections
- Webhook triggers
- Collaborative editing
- Version control for souls
- A/B testing different stacks
- AI-powered optimization suggestions

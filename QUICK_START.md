# ⚡ NECROSTACK Quick Start Guide

```
███╗   ██╗███████╗ ██████╗██████╗  ██████╗ ███████╗████████╗ █████╗  ██████╗██╗  ██╗
████╗  ██║██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
██╔██╗ ██║█████╗  ██║     ██████╔╝██║   ██║███████╗   ██║   ███████║██║     █████╔╝ 
██║╚██╗██║██╔══╝  ██║     ██╔══██╗██║   ██║╚════██║   ██║   ██╔══██║██║     ██╔═██╗ 
██║ ╚████║███████╗╚██████╗██║  ██║╚██████╔╝███████║   ██║   ██║  ██║╚██████╗██║  ██╗
╚═╝  ╚═══╝╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
                                                                                       
           🧟 Dead Code Resurrection & Soul Transfer Engine 🧟
```

---

## 🎯 What is NECROSTACK?

Bring abandoned repositories back to life in 4 steps:

```
1. 🔍 ANALYZE    → Get health report
2. 🩹 REVIVE     → Fix bugs & update deps (optional)
3. 👻 EXTRACT    → Get the "soul" (core logic)
4. ⚡ REANIMATE  → Generate modern app
```

---

## 🚀 5-Minute Setup

### Prerequisites
```bash
Node.js 18+
PostgreSQL 14+
Docker (optional)
```

### Installation
```bash
# Clone
git clone https://github.com/yourusername/necrostack.git
cd necrostack

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your settings

# Start
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## 📖 Documentation Quick Links

| Document | Purpose | Time |
|----------|---------|------|
| [INDEX.md](./INDEX.md) | Documentation map | 5 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Executive overview | 10 min |
| [README.md](./README.md) | Getting started | 10 min |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design | 40 min |
| [WORKFLOW.md](./WORKFLOW.md) | User journey | 20 min |
| [DATA_MODELS.md](./DATA_MODELS.md) | API & data specs | 30 min |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Dev roadmap | 30 min |
| [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) | Project structure | 15 min |

---

## 🎮 Usage Flow

### Step 1: Upload Repository
```
Visit: http://localhost:3000/upload
→ Paste GitHub URL or upload ZIP
→ Click "Begin Autopsy"
```

### Step 2: View Autopsy
```
Automatic redirect to: /autopsy/[id]
→ View health score
→ Review findings
→ See architecture diagram
```

### Step 3: Optional Revival
```
Click "Attempt Revival"
→ Choose mode (Conservative/Aggressive)
→ Watch progress
→ Get PR link
```

### Step 4: Extract Soul
```
Click "Extract Soul"
→ Wait for extraction
→ View soul spec (routes, models, logic)
→ Download JSON
```

### Step 5: Reanimate
```
Click "Reanimate"
→ Choose target stack
→ Configure options
→ Watch generation
→ Download ZIP
```

---

## 🤖 The Four Agents

### 1. Code Coroner 🔍
**What**: Analyzes code health  
**Input**: Repository  
**Output**: Autopsy Report  
**Time**: ~2-5 minutes

### 2. Bug Necromancer 🩹
**What**: Fixes bugs & updates deps  
**Input**: Repository + Autopsy  
**Output**: Revival Report + PR  
**Time**: ~5-10 minutes

### 3. Soul Extractor 👻
**What**: Extracts core logic  
**Input**: Repository + Autopsy  
**Output**: Soul JSON Spec  
**Time**: ~3-7 minutes

### 4. Reanimator ⚡
**What**: Generates new project  
**Input**: Soul Spec + Target Stack  
**Output**: Modern application  
**Time**: ~5-15 minutes

---

## 🏗️ Tech Stack

### Frontend
```
Next.js 15
React 19
TailwindCSS
ShadCN UI
Framer Motion
```

### Backend
```
Node.js
Fastify
PostgreSQL
Prisma
```

### Analyzers
```
Babel + jscodeshift
TypeScript Compiler API
ESLint
```

---

## 📊 Project Structure

```
necrostack/
├── frontend/          # Next.js app
├── backend/           # Fastify API
├── agents/            # 4 agents
│   ├── coroner/
│   ├── necromancer/
│   ├── extractor/
│   └── reanimator/
├── analyzers/         # Analysis tools
├── reports/           # Generated reports
└── output/            # Generated projects
```

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/analyze` | POST | Start autopsy |
| `/api/analyze/:id` | GET | Get report |
| `/api/revive/:id` | POST | Start revival |
| `/api/revive/:id` | GET | Get revival status |
| `/api/extract/:id` | POST | Extract soul |
| `/api/extract/:id` | GET | Get soul spec |
| `/api/reanimate/:soulId` | POST | Start reanimation |
| `/api/reanimate/:id` | GET | Get status |
| `/api/artifacts/:id/download` | GET | Download ZIP |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific tests
npm run test:frontend
npm run test:backend
npm run test:agents

# Run E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🐳 Docker

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up --build
```

---

## 🔧 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/necrostack

# GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Storage
S3_BUCKET=necrostack-artifacts
S3_ACCESS_KEY=xxxxxxxxxxxxx
S3_SECRET_KEY=xxxxxxxxxxxxx

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
```

---

## 📝 Common Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build            # Build all
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend

# Testing
npm test                 # Run all tests
npm run lint             # Lint all code
npm run format           # Format all code

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database
```

---

## 🎯 Development Workflow

### 1. Choose a Task
```
See IMPLEMENTATION_PLAN.md for phases
Pick a task from current phase
```

### 2. Create Branch
```bash
git checkout -b feature/your-feature
```

### 3. Develop
```bash
npm run dev
# Make changes
# Test locally
```

### 4. Test
```bash
npm test
npm run lint
```

### 5. Commit
```bash
git add .
git commit -m "feat: your feature"
```

### 6. Push & PR
```bash
git push origin feature/your-feature
# Create PR on GitHub
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
sudo service postgresql restart

# Check connection
psql -U necrostack -d necrostack
```

### Module Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean build
npm run clean
npm run build
```

---

## 📚 Learning Resources

### For Beginners
1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
2. Read [README.md](./README.md)
3. Try the demo
4. Read [WORKFLOW.md](./WORKFLOW.md)

### For Developers
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Read [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
3. Read relevant agent README
4. Start with Phase 1 tasks

### For Contributors
1. Read [INDEX.md](./INDEX.md)
2. Read CONTRIBUTING.md (to be created)
3. Join Discord/Slack
4. Pick an issue

---

## 🎨 UI Preview

### Theme
- Dark mode with neon accents
- CRT scanlines
- Glitch effects
- Matrix-style backgrounds

### Screens
1. Upload → Drag & drop or paste URL
2. Autopsy → Health score & findings
3. Revival → Progress & changelog
4. Extraction → Soul viewer
5. Reanimation → Stack selector & progress
6. Export → Download artifacts

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Railway)
```bash
railway up
```

### Database (Supabase)
```bash
# Use Supabase dashboard
# Or migrate with Prisma
npx prisma migrate deploy
```

---

## 📊 Success Metrics

### Technical
- ✅ Analysis < 5 min
- ✅ Generation < 10 min
- ✅ Test coverage > 80%
- ✅ API response < 200ms

### User
- ✅ Success rate > 80%
- ✅ Satisfaction > 4.5/5
- ✅ Health improvement > 30 points

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit PR

See CONTRIBUTING.md (to be created) for details.

---

## 📜 License

MIT License - See [LICENSE](./LICENSE)

---

## 💬 Community

- GitHub: [github.com/necrostack](https://github.com/necrostack)
- Discord: [discord.gg/necrostack](https://discord.gg/necrostack)
- Twitter: [@necrostack](https://twitter.com/necrostack)
- Email: hello@necrostack.dev

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                    NECROSTACK CHEAT SHEET               │
├─────────────────────────────────────────────────────────┤
│ Start Dev:        npm run dev                           │
│ Run Tests:        npm test                              │
│ Build:            npm run build                         │
│ Lint:             npm run lint                          │
│ Format:           npm run format                        │
├─────────────────────────────────────────────────────────┤
│ Frontend:         http://localhost:3000                 │
│ Backend:          http://localhost:4000                 │
│ Database:         postgresql://localhost:5432           │
├─────────────────────────────────────────────────────────┤
│ Docs:             INDEX.md                              │
│ Architecture:     ARCHITECTURE.md                       │
│ Workflow:         WORKFLOW.md                           │
│ API:              DATA_MODELS.md                        │
├─────────────────────────────────────────────────────────┤
│ Agents:           /agents/[agent-name]/README.md        │
│ Templates:        /agents/reanimator/templates/         │
│ Reports:          /reports/                             │
│ Output:           /output/                              │
└─────────────────────────────────────────────────────────┘
```

---

**Ready to resurrect some code? Let's go! 🧟‍♂️⚡**

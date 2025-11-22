# 🚀 Getting Started with NECROSTACK

## Phase 1 Foundation - COMPLETE ✅

Phase 1 of the NECROSTACK implementation is now complete! The foundation is set up and ready for development.

## What's Been Built

### Infrastructure ✅
- Monorepo structure with npm workspaces
- Docker Compose with PostgreSQL and MinIO
- TypeScript configuration across all packages
- ESLint and Prettier for code quality
- Husky and lint-staged for Git hooks
- GitHub Actions CI/CD pipeline

### Backend ✅
- Fastify server with modular routing
- Prisma ORM with complete database schema
- Environment configuration with Zod validation
- S3-compatible storage service (MinIO)
- GitHub service stub
- All API route stubs:
  - `/api/analyze` - Code analysis
  - `/api/revive` - Bug fixing
  - `/api/extract` - Soul extraction
  - `/api/reanimate` - Project generation
  - `/api/artifacts` - File downloads

### Frontend ✅
- Next.js 15 with App Router
- React 19
- TailwindCSS with dark theme
- ShadCN UI components (Button, Card)
- Framer Motion for animations
- CRT scanlines and neon glow effects
- API client for backend communication
- Home page and upload page

### Database Schema ✅
```prisma
- Repository (stores uploaded repos)
- Autopsy (analysis reports)
- Revival (bug fix reports)
- Soul (extracted specs)
- Resurrection (generated projects)
```

## Quick Start

### 1. Automated Setup (Recommended)

```bash
npm run setup
```

This will:
- Install all dependencies
- Create environment files
- Start Docker services
- Initialize the database

### 2. Manual Setup

```bash
# Install dependencies
npm install

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start Docker services
docker-compose up -d

# Setup database
cd backend
npm run db:generate
npm run db:push
cd ..
```

### 3. Start Development

```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MinIO Console: http://localhost:9001

## Project Structure

```
necrostack/
├── .github/workflows/     # CI/CD pipelines
├── .husky/               # Git hooks
├── backend/              # Fastify API
│   ├── prisma/          # Database schema
│   └── src/
│       ├── config/      # Configuration
│       ├── routes/      # API endpoints
│       └── services/    # Business logic
├── frontend/             # Next.js app
│   ├── app/             # Pages (App Router)
│   ├── components/      # React components
│   └── lib/             # Utilities
├── agents/               # 4 autonomous agents (stubs)
├── analyzers/            # Code analysis tools (stubs)
├── scripts/              # Setup scripts
├── docker-compose.yml    # Infrastructure
└── package.json          # Root workspace
```

## Available Commands

```bash
# Development
npm run dev              # Start both frontend & backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build            # Build all packages

# Testing
npm test                 # Run all tests
npm run lint             # Lint all code
npm run format           # Format all code

# Database (from backend/)
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
```

## Verify Installation

### 1. Check Backend Health
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Check Frontend
Open http://localhost:3000 in your browser

### 3. Check Database
```bash
cd backend
npm run db:studio
```

Opens Prisma Studio at http://localhost:5555

### 4. Check Storage
Open http://localhost:9001 and login:
- Access Key: `necrostack`
- Secret Key: `necrostack123`

## Next Steps - Phase 2: Code Coroner Agent

Now that the foundation is complete, the next phase is to implement the Code Coroner Agent:

### Tasks:
1. **JavaScript Analyzer**
   - AST parsing with Babel
   - Dependency analysis
   - Dead code detection

2. **Code Health Metrics**
   - Calculate health score
   - Identify code smells
   - Measure complexity

3. **Security Scanning**
   - Dependency vulnerabilities
   - Security issues detection

4. **Architecture Mapping**
   - Component detection
   - Dependency graph
   - Mermaid diagram generation

5. **Report Generation**
   - Autopsy report JSON
   - PDF export
   - Visualization

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed Phase 2 tasks.

## Documentation

- [README.md](./README.md) - Project overview
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [WORKFLOW.md](./WORKFLOW.md) - User journey
- [DATA_MODELS.md](./DATA_MODELS.md) - API specs
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Development roadmap

## Troubleshooting

### Port Conflicts
If ports are already in use, modify them in:
- `docker-compose.yml` (PostgreSQL: 5432, MinIO: 9000, 9001)
- `backend/.env` (PORT=3001)
- `frontend/.env` (NEXT_PUBLIC_API_URL)

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### Clean Start
```bash
# Stop all services
docker-compose down -v

# Remove node_modules
rm -rf node_modules frontend/node_modules backend/node_modules

# Reinstall
npm install

# Restart
docker-compose up -d
npm run dev
```

## Development Workflow

1. **Pick a task** from IMPLEMENTATION_PLAN.md
2. **Create a branch**: `git checkout -b feature/task-name`
3. **Develop**: Make changes and test locally
4. **Test**: Run `npm test` and `npm run lint`
5. **Commit**: Use conventional commits (feat:, fix:, docs:, etc.)
6. **Push**: `git push origin feature/task-name`
7. **PR**: Create pull request on GitHub

## Tech Stack Summary

### Frontend
- Next.js 15 (App Router)
- React 19
- TailwindCSS
- ShadCN UI
- Framer Motion

### Backend
- Node.js 18+
- Fastify
- Prisma ORM
- PostgreSQL

### Infrastructure
- Docker & Docker Compose
- GitHub Actions
- MinIO (S3-compatible storage)

### Development Tools
- TypeScript
- ESLint
- Prettier
- Husky
- Vitest

## Contributing

We welcome contributions! To get started:

1. Read the documentation
2. Set up your development environment
3. Pick an issue or task
4. Submit a pull request

## Support

- 📖 Documentation: See docs above
- 🐛 Issues: GitHub Issues
- 💬 Community: Discord (coming soon)
- 📧 Email: hello@necrostack.dev

---

**Phase 1 Complete! Ready to build the Code Coroner Agent? 🧟‍♂️⚡**

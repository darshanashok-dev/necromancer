# 🧟 NECROSTACK

**Dead Code Resurrection & Soul Transfer Engine**

> Bring abandoned repositories back to life, extract their essence, and reincarnate them into modern tech stacks.

---

## 🎯 What is NECROSTACK?

NECROSTACK is an automated system that:

1. **Analyzes** old/abandoned GitHub repositories (Code Autopsy)
2. **Revives** the original code by fixing bugs and updating dependencies
3. **Extracts** the core logic and architecture (Soul Extraction)
4. **Regenerates** the entire application in a modern tech stack (Reanimation)

All wrapped in a spooky, cinematic UI with glitch effects and CRT vibes.

---

## ✨ Features

- 🔍 **Code Autopsy**: Deep analysis of code health, architecture, and issues
- 🩹 **Bug Necromancy**: Automated dependency updates, bug fixes, and refactoring
- 👻 **Soul Extraction**: Extract routes, models, business logic into structured specs
- ⚡ **Reanimation**: Generate brand new projects in Next.js, Fastify, Django, Go, etc.
- 📦 **Export Everything**: Download autopsy reports, soul specs, and reanimated code
- 🎨 **Cinematic UI**: Glitchy, CRT-inspired interface with smooth animations

---

## 🏗️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TailwindCSS
- ShadCN UI
- Framer Motion

### Backend
- Node.js
- Fastify
- SQLite/PostgreSQL

### Analyzers
- Babel + jscodeshift (JS/TS)
- LibCST (Python, optional)

### Storage
- GitHub Repos
- S3-compatible storage

---

## 📁 Project Structure

```
necrostack/
├── frontend/          # Next.js 15 app
├── backend/           # Fastify API server
├── agents/            # 4 autonomous agents
│   ├── coroner/       # Code analysis
│   ├── necromancer/   # Bug fixing & revival
│   ├── extractor/     # Soul extraction
│   └── reanimator/    # Project regeneration
├── analyzers/         # Code analysis tools
│   ├── js-analyzer/   # JavaScript/TypeScript
│   └── py-analyzer/   # Python (optional)
├── reports/           # Generated autopsy reports
└── output/            # Reanimated projects
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker (optional)
- GitHub token (for repo access)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/necrostack.git
cd necrostack

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev
```

### Using Docker

```bash
docker-compose up
```

---

## 🎮 Usage

1. **Upload a Repository**
   - Paste a GitHub URL or upload a zip file
   - System begins Code Autopsy

2. **Review Autopsy Report**
   - View code health score
   - Examine dead files, deprecated dependencies
   - See architecture diagram

3. **Revive (Optional)**
   - Let the Bug Necromancer fix issues
   - Get an auto-generated PR with improvements

4. **Extract Soul**
   - System maps routes, models, and business logic
   - Generates structured Soul JSON Spec

5. **Choose Target Stack**
   - Select: Next.js, Fastify, Django, Go, etc.
   - Configure options (TypeScript, tests, styling)

6. **Reanimate**
   - System generates brand new project
   - Download as ZIP or push to GitHub

7. **Export**
   - Download all artifacts
   - Compare before/after

---

## 🤖 The Four Agents

### 1. Code Coroner Agent
Performs deep analysis and generates autopsy reports with:
- Code health metrics
- Dead file detection
- Dependency analysis
- Security scanning
- Architecture mapping

### 2. Bug Necromancer Agent
Revives the original codebase by:
- Updating dependencies
- Fixing deprecated code
- Refactoring code smells
- Adding test coverage
- Creating auto-PRs

### 3. Soul Extractor Agent
Extracts the essence of the application:
- Route mapping
- Data model extraction
- Business logic identification
- State management patterns
- Integration points

### 4. Soul Transfer/Reanimation Agent
Regenerates the app in a new stack:
- Project scaffolding
- Code generation
- Test creation
- Documentation
- Deployment configs

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analyze` | POST | Start code autopsy |
| `/api/analyze/:id` | GET | Get autopsy report |
| `/api/revive/:id` | POST | Start revival process |
| `/api/revive/:id` | GET | Get revival report |
| `/api/extract/:id` | POST | Extract soul |
| `/api/extract/:id` | GET | Get soul spec |
| `/api/reanimate/:soulId` | POST | Start reanimation |
| `/api/reanimate/:id` | GET | Get reanimation status |
| `/api/artifacts/:id/download` | GET | Download artifacts |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend

# Run E2E tests
npm run test:e2e
```

---

## 🔐 Security

- All user inputs are sanitized
- Code execution is sandboxed
- Rate limiting on API endpoints
- Secure artifact storage with signed URLs
- No arbitrary code execution from uploaded repos

---

## 📝 Documentation

- [Architecture Blueprint](./ARCHITECTURE.md) - Complete system design
- [API Documentation](./docs/API.md) - Detailed API reference
- [Agent Specifications](./docs/AGENTS.md) - How each agent works
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📜 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🎨 UI Preview

The NECROSTACK interface features:
- Dark mode with neon green/purple accents
- CRT scanline effects
- Glitch animations
- Matrix-style code rain
- Smooth Framer Motion transitions
- Monospace typography

---

## 🔮 Roadmap

- [ ] Multi-language support (Java, Ruby, PHP)
- [ ] AI-powered code suggestions
- [ ] Automated deployment
- [ ] Community template marketplace
- [ ] Collaborative soul editing
- [ ] Version control for souls

---

## 💀 Made with Dark Magic

Built by developers who believe no code should stay dead forever.

**Star this repo if you believe in resurrection!** ⭐

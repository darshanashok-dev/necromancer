# NECROSTACK Setup Guide

## Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd necrostack
npm install
```

### 2. Start Infrastructure

```bash
# Start PostgreSQL and MinIO
docker-compose up -d

# Wait for services to be healthy
docker-compose ps
```

### 3. Configure Environment

```bash
# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration
```

### 4. Setup Database

```bash
# Generate Prisma client
cd backend
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio
npm run db:studio
```

### 5. Start Development Servers

```bash
# From root directory
npm run dev

# Or start individually:
# Backend: npm run dev:backend
# Frontend: npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MinIO Console: http://localhost:9001
- Prisma Studio: http://localhost:5555

## Database Setup

The PostgreSQL database runs in Docker with the following credentials:
- Host: localhost:5432
- Database: necrostack
- User: necrostack
- Password: necrostack

## Storage Setup

MinIO (S3-compatible storage) runs in Docker:
- API: http://localhost:9000
- Console: http://localhost:9001
- Access Key: necrostack
- Secret Key: necrostack123

### Create Bucket

1. Open MinIO Console: http://localhost:9001
2. Login with credentials above
3. Create bucket: `necrostack-artifacts`
4. Set bucket policy to allow downloads

## GitHub Token (Optional)

For GitHub integration features:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate new token with `repo` scope
3. Add to `.env` files:
   ```
   GITHUB_TOKEN=your_token_here
   ```

## Verify Installation

```bash
# Check backend health
curl http://localhost:3001/health

# Check frontend
open http://localhost:3000
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### Port Conflicts

If ports 3000, 3001, 5432, 9000, or 9001 are in use:

1. Stop conflicting services
2. Or modify ports in `docker-compose.yml` and `.env` files

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

## Next Steps

- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Check [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for development roadmap
- Read agent documentation in `agents/*/README.md`

## Development Commands

```bash
# Install dependencies
npm install

# Run development servers
npm run dev

# Build all packages
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Database commands
cd backend
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Create migration
npm run db:studio    # Open Prisma Studio
```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup instructions.

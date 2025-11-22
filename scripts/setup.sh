#!/bin/bash

echo "🧟 NECROSTACK Setup Script"
echo "=========================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You'll need Docker to run PostgreSQL and MinIO."
    echo "   Continue anyway? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Docker detected"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Setup environment files
echo ""
echo "⚙️  Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env"
else
    echo "⚠️  .env already exists, skipping"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists, skipping"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env"
else
    echo "⚠️  frontend/.env already exists, skipping"
fi

# Start Docker services
if command -v docker &> /dev/null; then
    echo ""
    echo "🐳 Starting Docker services..."
    docker-compose up -d
    
    echo "⏳ Waiting for services to be ready..."
    sleep 5
    
    # Setup database
    echo ""
    echo "🗄️  Setting up database..."
    cd backend
    npm run db:generate
    npm run db:push
    cd ..
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 Start development with: npm run dev"
    echo ""
    echo "Access:"
    echo "  - Frontend: http://localhost:3000"
    echo "  - Backend: http://localhost:3001"
    echo "  - MinIO Console: http://localhost:9001"
else
    echo ""
    echo "⚠️  Docker not available. Please:"
    echo "   1. Install Docker"
    echo "   2. Run: docker-compose up -d"
    echo "   3. Run: cd backend && npm run db:generate && npm run db:push"
    echo "   4. Run: npm run dev"
fi

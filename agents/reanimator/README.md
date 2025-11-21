# ⚡ Soul Transfer / Reanimation Agent

**Purpose**: Rebuild the application into a modern tech stack using the Soul Spec.

---

## 📋 Overview

The Reanimation Agent takes the extracted Soul Spec and generates a brand new, modern application. It's like transplanting a soul into a new body - the essence remains, but the implementation is completely fresh.

**Generates**:
- Complete project structure
- Data models with modern ORMs
- API routes with validation
- Frontend components
- Authentication system
- Tests (unit, integration, e2e)
- Documentation
- Deployment configs

---

## 🔄 Workflow

```
Input: Soul Spec + Target Stack
  ↓
1. Load Template
  ↓
2. Generate Project Structure
  ↓
3. Create Data Models
  ↓
4. Generate API Routes
  ↓
5. Create Frontend Components
  ↓
6. Implement Business Logic
  ↓
7. Add Authentication
  ↓
8. Generate Tests
  ↓
9. Create Documentation
  ↓
10. Package Artifacts
  ↓
Output: Reanimated Project
```

---

## 📥 Input Specification

```typescript
interface ReanimatorInput {
  soulSpec: SoulSpec;
  targetStack: {
    frontend: 'nextjs' | 'react-vite' | 'vue' | 'svelte' | 'angular';
    backend: 'fastify' | 'express' | 'nestjs' | 'django' | 'go-gin' | 'none';
    database: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite' | 'none';
    language: 'typescript' | 'javascript' | 'python' | 'go';
  };
  config: {
    typescript: boolean;
    testing: 'jest' | 'vitest' | 'pytest' | 'go-test';
    styling: 'tailwind' | 'styled-components' | 'css-modules' | 'sass';
    orm: 'prisma' | 'typeorm' | 'sequelize' | 'mongoose' | 'sqlalchemy';
    auth: 'jwt' | 'session' | 'oauth' | 'none';
    docker: boolean;
    ci: boolean;
  };
  output: {
    createGithubRepo: boolean;
    githubOwner?: string;
    repoName?: string;
  };
}
```

---

## 📤 Output Specification

```typescript
interface ReanimationPackage {
  id: string;
  soulId: string;
  timestamp: string;
  
  targetStack: {
    frontend: string;
    backend: string;
    database: string;
    language: string;
  };
  
  generated: {
    files: number;
    components: number;
    routes: number;
    models: number;
    tests: number;
    linesOfCode: number;
  };
  
  structure: {
    folders: string[];
    entrypoint: string;
    configFiles: string[];
  };
  
  artifacts: {
    zipUrl: string;
    size: number;
    githubRepo?: string;
  };
  
  documentation: {
    readme: string;
    setup: string;
    api: string;
    deployment: string;
  };
  
  nextSteps: string[];
  
  quality: {
    lintPassing: boolean;
    typeCheckPassing: boolean;
    testsPassing: boolean;
    buildSuccessful: boolean;
  };
}
```

---

## 🎨 Supported Stacks

### Frontend Options

#### Next.js 15 (Recommended)
- App Router
- React Server Components
- TypeScript
- TailwindCSS
- ShadCN UI

#### React + Vite
- Fast dev server
- TypeScript
- TailwindCSS
- React Router

#### Vue 3
- Composition API
- TypeScript
- Vite
- Vue Router

#### Svelte
- SvelteKit
- TypeScript
- TailwindCSS

---

### Backend Options

#### Fastify (Recommended)
- Fast and lightweight
- TypeScript
- Schema validation
- Plugin ecosystem

#### Express
- Popular and mature
- Middleware ecosystem
- TypeScript support

#### NestJS
- Enterprise-grade
- TypeScript-first
- Modular architecture
- Dependency injection

#### Django
- Python
- Batteries included
- ORM built-in
- Admin panel

#### Go + Gin
- High performance
- Compiled binary
- Minimal dependencies

---

### Database Options

#### PostgreSQL (Recommended)
- Relational
- ACID compliant
- JSON support
- Full-text search

#### MySQL
- Relational
- Wide adoption
- Good performance

#### MongoDB
- Document-based
- Flexible schema
- Horizontal scaling

#### SQLite
- Embedded
- Zero configuration
- Perfect for development

---

## 🛠️ Generation Modules

### 1. Scaffold Generator
**File**: `src/scaffold-generator.ts`

**Creates**:
- Folder structure
- Package.json / requirements.txt
- Config files (tsconfig, eslint, etc.)
- Environment templates
- Docker files
- CI/CD configs

---

### 2. Model Generator
**File**: `src/model-generator.ts`

**Generates**:
- Prisma schemas
- TypeORM entities
- Sequelize models
- Mongoose schemas
- Django models
- Go structs

**Example Output (Prisma)**:
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

---

### 3. Route Generator
**File**: `src/route-generator.ts`

**Generates**:
- API route handlers
- Request validation
- Response formatting
- Error handling
- Middleware integration

**Example Output (Fastify)**:
```typescript
// routes/users.ts
import { FastifyPluginAsync } from 'fastify';
import { getUserSchema, createUserSchema } from '../schemas/user';

const usersRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:id', {
    schema: getUserSchema,
    preHandler: [fastify.authenticate],
  }, async (request, reply) => {
    const { id } = request.params;
    const user = await fastify.prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    
    return user;
  });
  
  fastify.post('/', {
    schema: createUserSchema,
  }, async (request, reply) => {
    const user = await fastify.prisma.user.create({
      data: request.body,
    });
    
    return reply.code(201).send(user);
  });
};

export default usersRoute;
```

---

### 4. Component Generator
**File**: `src/component-generator.ts`

**Generates**:
- React/Vue/Svelte components
- Props/types
- State management
- Event handlers
- Styling

**Example Output (Next.js + React)**:
```typescript
// components/UserCard.tsx
import { User } from '@/types';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      
      <div className="mt-4 flex gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
```

---

### 5. Business Logic Generator
**File**: `src/logic-generator.ts`

**Generates**:
- Service layer functions
- Validation logic
- Transformation functions
- Utility functions

**Example Output**:
```typescript
// services/user-service.ts
import { prisma } from '../lib/prisma';
import { hashPassword, validateEmail } from '../utils';

export class UserService {
  async createUser(data: CreateUserInput) {
    // Validate email
    if (!validateEmail(data.email)) {
      throw new Error('Invalid email format');
    }
    
    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existing) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const hashedPassword = await hashPassword(data.password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      }
    });
    
    return user;
  }
}
```

---

### 6. Test Generator
**File**: `src/test-generator.ts`

**Generates**:
- Unit tests
- Integration tests
- E2E tests
- Test fixtures
- Mock data

**Example Output (Vitest)**:
```typescript
// tests/services/user-service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../../src/services/user-service';

describe('UserService', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService();
  });
  
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      };
      
      const user = await userService.createUser(userData);
      
      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
    });
    
    it('should throw error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123'
      };
      
      await expect(userService.createUser(userData))
        .rejects.toThrow('Invalid email format');
    });
  });
});
```

---

### 7. Documentation Generator
**File**: `src/doc-generator.ts`

**Generates**:
- README.md
- API documentation
- Setup guide
- Deployment guide
- Architecture diagrams

---

## 📦 Template System

Templates are stored in `templates/` directory:

```
templates/
├── nextjs/
│   ├── base/
│   ├── components/
│   ├── pages/
│   └── config/
├── fastify/
│   ├── base/
│   ├── routes/
│   ├── services/
│   └── config/
├── django/
│   ├── base/
│   ├── models/
│   ├── views/
│   └── config/
└── go/
    ├── base/
    ├── handlers/
    ├── models/
    └── config/
```

**Template Variables**:
- `{{projectName}}`
- `{{modelName}}`
- `{{fieldName}}`
- `{{fieldType}}`
- `{{routePath}}`
- etc.

---

## 🚀 Usage Example

```typescript
import { ReanimatorAgent } from './src/index';

const reanimator = new ReanimatorAgent();

const result = await reanimator.reanimate({
  soulSpec: extractedSoul,
  targetStack: {
    frontend: 'nextjs',
    backend: 'fastify',
    database: 'postgresql',
    language: 'typescript'
  },
  config: {
    typescript: true,
    testing: 'vitest',
    styling: 'tailwind',
    orm: 'prisma',
    auth: 'jwt',
    docker: true,
    ci: true
  },
  output: {
    createGithubRepo: true,
    githubOwner: 'myorg',
    repoName: 'reanimated-app'
  }
});

console.log(`Generated ${result.generated.files} files`);
console.log(`Download: ${result.artifacts.zipUrl}`);
console.log(`GitHub: ${result.artifacts.githubRepo}`);
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test generation with sample soul
npm run test:generate

# Validate generated code
npm run test:validate
```

---

## 📦 Dependencies

```json
{
  "handlebars": "^4.7.0",
  "ejs": "^3.1.0",
  "prettier": "^3.0.0",
  "eslint": "^8.50.0",
  "archiver": "^6.0.0",
  "@octokit/rest": "^20.0.0",
  "simple-git": "^3.20.0"
}
```

---

## 🎯 Generation Strategies

### Code Quality
- Follow framework best practices
- Use modern patterns
- Add proper error handling
- Include TypeScript types
- Add JSDoc comments

### Testing
- Generate tests for all business logic
- Add integration tests for APIs
- Include E2E tests for critical flows
- Achieve >80% coverage

### Documentation
- Clear README with setup instructions
- API documentation with examples
- Architecture diagrams
- Deployment guides

### Security
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Secure headers

---

## 🔮 Future Enhancements

- GraphQL API generation
- WebSocket support
- Microservices architecture
- Kubernetes configs
- Terraform/IaC generation
- Mobile app generation (React Native)
- Desktop app generation (Electron)
- AI-powered code optimization

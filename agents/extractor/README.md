# 👻 Soul Extractor Agent

**Purpose**: Extract the core logic and essence of the application into a structured specification.

---

## 📋 Overview

The Soul Extractor Agent analyzes the codebase and extracts its "soul" - the fundamental logic, architecture, and patterns that define what the application does, independent of how it's implemented.

**Extracts**:
- API routes and endpoints
- Data models and schemas
- Business logic functions
- State management patterns
- UI component hierarchy
- External integrations
- Authentication flows
- Data flows and transformations

---

## 🔄 Workflow

```
Input: Repository + Autopsy Report
  ↓
1. Detect Framework Patterns
  ↓
2. Map Routes/Endpoints
  ↓
3. Extract Data Models
  ↓
4. Identify Business Logic
  ↓
5. Map State Management
  ↓
6. Extract UI Components
  ↓
7. Identify Integrations
  ↓
8. Map Auth Flows
  ↓
9. Document Data Flows
  ↓
Output: Soul JSON Spec
```

---

## 📥 Input Specification

```typescript
interface ExtractorInput {
  repositoryPath: string;
  autopsyReport: AutopsyReport;
  hints?: {
    entryPoints?: string[];      // Main files to start analysis
    apiPrefix?: string;           // e.g., '/api'
    modelPaths?: string[];        // Paths to model definitions
  };
}
```

---

## 📤 Output Specification

```typescript
interface SoulSpec {
  id: string;
  autopsyId: string;
  timestamp: string;
  
  essence: {
    appType: 'web' | 'api' | 'cli' | 'mobile' | 'desktop';
    domain: string;               // 'ecommerce', 'blog', 'dashboard', etc.
    description: string;
    primaryLanguage: string;
    originalFramework: string;
  };
  
  routes: Array<{
    path: string;                 // '/api/users/:id'
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: string;              // Function name
    middleware: string[];         // ['auth', 'validation']
    description: string;
    
    input: {
      params?: Record<string, ParamSpec>;
      query?: Record<string, ParamSpec>;
      body?: Record<string, ParamSpec>;
      headers?: Record<string, ParamSpec>;
    };
    
    output: {
      success: {
        status: number;
        schema: any;
      };
      error: {
        status: number;
        schema: any;
      };
    };
    
    authentication: boolean;
    authorization?: string[];     // Required roles/permissions
  }>;
  
  models: Array<{
    name: string;                 // 'User', 'Post', 'Order'
    description: string;
    
    fields: Array<{
      name: string;
      type: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
      subtype?: string;           // For arrays/objects
      required: boolean;
      unique: boolean;
      default?: any;
      validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        enum?: any[];
      };
    }>;
    
    relations: Array<{
      type: 'hasMany' | 'belongsTo' | 'hasOne' | 'manyToMany';
      model: string;
      foreignKey?: string;
      through?: string;           // For many-to-many
    }>;
    
    indexes: Array<{
      fields: string[];
      unique: boolean;
    }>;
    
    hooks?: {
      beforeCreate?: string[];
      afterCreate?: string[];
      beforeUpdate?: string[];
      afterUpdate?: string[];
      beforeDelete?: string[];
      afterDelete?: string[];
    };
  }>;
  
  businessLogic: Array<{
    name: string;
    description: string;
    category: 'validation' | 'transformation' | 'calculation' | 'workflow';
    
    inputs: Array<{
      name: string;
      type: string;
      required: boolean;
    }>;
    
    outputs: Array<{
      name: string;
      type: string;
    }>;
    
    steps: Array<{
      order: number;
      action: string;
      description: string;
    }>;
    
    dependencies: string[];       // Other functions it calls
    sideEffects: string[];        // 'database', 'api', 'email', etc.
  }>;
  
  stateManagement: {
    type: 'redux' | 'context' | 'zustand' | 'mobx' | 'recoil' | 'none';
    
    stores: Array<{
      name: string;
      description: string;
      
      state: Record<string, {
        type: string;
        default: any;
      }>;
      
      actions: Array<{
        name: string;
        description: string;
        params: any[];
        async: boolean;
      }>;
      
      selectors?: Array<{
        name: string;
        description: string;
        derivedFrom: string[];
      }>;
    }>;
  };
  
  uiComponents: Array<{
    name: string;
    type: 'page' | 'layout' | 'component' | 'widget';
    description: string;
    
    props: Record<string, {
      type: string;
      required: boolean;
      default?: any;
    }>;
    
    state?: Record<string, string>;
    
    children: string[];           // Child component names
    usesComponents: string[];     // Other components it renders
    
    dataFetching?: {
      sources: string[];          // API endpoints or stores
      triggers: string[];         // 'mount', 'prop-change', 'user-action'
    };
    
    events: Array<{
      name: string;
      handler: string;
      description: string;
    }>;
  }>;
  
  integrations: Array<{
    type: 'database' | 'api' | 'auth' | 'payment' | 'email' | 'storage' | 'analytics';
    service: string;              // 'PostgreSQL', 'Stripe', 'SendGrid'
    description: string;
    
    config: Record<string, any>;
    
    operations: Array<{
      name: string;
      description: string;
      usedBy: string[];           // Functions/routes that use it
    }>;
  }>;
  
  authentication: {
    type: 'jwt' | 'session' | 'oauth' | 'api-key' | 'none';
    provider: 'custom' | 'auth0' | 'firebase' | 'cognito' | 'passport';
    
    flows: Array<{
      name: 'login' | 'register' | 'logout' | 'reset-password' | 'verify-email';
      steps: string[];
      endpoints: string[];
    }>;
    
    userModel: string;            // Reference to model name
    
    permissions?: {
      type: 'role' | 'permission' | 'attribute';
      roles?: string[];
      permissions?: string[];
    };
  };
  
  dataFlows: Array<{
    name: string;
    description: string;
    trigger: 'user-action' | 'cron' | 'webhook' | 'event';
    
    steps: Array<{
      order: number;
      action: string;
      component: string;          // Which component/function
      description: string;
    }>;
    
    dataTransformations: Array<{
      from: string;
      to: string;
      transformation: string;
    }>;
  }>;
  
  configuration: {
    environment: Record<string, {
      required: boolean;
      description: string;
      default?: string;
    }>;
    
    features: Record<string, boolean>;
  };
}

interface ParamSpec {
  type: string;
  required: boolean;
  description: string;
  validation?: any;
}
```

---

## 🛠️ Extraction Modules

### 1. Route Mapper
**File**: `src/route-mapper.ts`

**Detects**:
- Express routes
- Next.js API routes
- Fastify routes
- Django URLs
- Flask routes

**Strategy**:
- Parse route definitions
- Extract handlers
- Identify middleware
- Infer request/response schemas

---

### 2. Model Extractor
**File**: `src/model-extractor.ts`

**Detects**:
- Sequelize models
- Mongoose schemas
- Prisma schemas
- TypeORM entities
- Django models
- Plain TypeScript interfaces

**Strategy**:
- Parse model definitions
- Extract field types
- Identify relationships
- Find validation rules

---

### 3. Logic Extractor
**File**: `src/logic-extractor.ts`

**Identifies**:
- Pure business logic functions
- Service layer methods
- Utility functions
- Validation logic
- Transformation functions

**Strategy**:
- Analyze function signatures
- Track data flow
- Identify side effects
- Map dependencies

---

### 4. State Analyzer
**File**: `src/state-analyzer.ts`

**Detects**:
- Redux stores
- Context providers
- Zustand stores
- MobX stores
- Recoil atoms

**Strategy**:
- Find store definitions
- Extract actions/reducers
- Identify selectors
- Map state usage

---

### 5. Component Analyzer
**File**: `src/component-analyzer.ts`

**Analyzes**:
- React components
- Vue components
- Angular components
- Svelte components

**Extracts**:
- Props/inputs
- State/data
- Events/outputs
- Child components
- Lifecycle hooks

---

### 6. Integration Detector
**File**: `src/integration-detector.ts`

**Detects**:
- Database connections
- External API calls
- Third-party services
- Authentication providers
- Payment gateways

**Strategy**:
- Find import statements
- Analyze configuration
- Track API calls
- Identify SDKs

---

## 🚀 Usage Example

```typescript
import { ExtractorAgent } from './src/index';

const extractor = new ExtractorAgent();

const soul = await extractor.extract({
  repositoryPath: '/tmp/repo-123',
  autopsyReport: autopsyData,
  hints: {
    entryPoints: ['src/index.ts', 'src/app.ts'],
    apiPrefix: '/api'
  }
});

console.log(`App Type: ${soul.essence.appType}`);
console.log(`Routes: ${soul.routes.length}`);
console.log(`Models: ${soul.models.length}`);
console.log(`Components: ${soul.uiComponents.length}`);
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test with sample repos
npm run test:samples

# Validate soul spec
npm run validate
```

---

## 📦 Dependencies

```json
{
  "@babel/parser": "^7.23.0",
  "@babel/traverse": "^7.23.0",
  "typescript": "^5.2.0",
  "ts-morph": "^20.0.0",
  "acorn": "^8.10.0",
  "espree": "^9.6.0",
  "vue-template-compiler": "^2.7.0"
}
```

---

## 🎯 Extraction Patterns

### Express Route
```javascript
// Detected pattern
app.get('/api/users/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Extracted soul
{
  path: '/api/users/:id',
  method: 'GET',
  middleware: ['authMiddleware'],
  input: {
    params: { id: { type: 'string', required: true } }
  },
  output: {
    success: { status: 200, schema: 'User' }
  }
}
```

### Sequelize Model
```javascript
// Detected pattern
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true },
  name: DataTypes.STRING
});

User.hasMany(Post);

// Extracted soul
{
  name: 'User',
  fields: [
    { name: 'email', type: 'string', unique: true },
    { name: 'name', type: 'string' }
  ],
  relations: [
    { type: 'hasMany', model: 'Post' }
  ]
}
```

---

## 🔮 Future Enhancements

- GraphQL schema extraction
- WebSocket endpoint detection
- Cron job identification
- Event-driven architecture mapping
- Microservice communication patterns
- Database query optimization hints

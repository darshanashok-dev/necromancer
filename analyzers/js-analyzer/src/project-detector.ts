import fs from 'fs/promises';
import path from 'path';
import { ProjectInfo } from './types.js';

export class ProjectDetector {
  async detect(projectPath: string): Promise<ProjectInfo> {
    const files = await this.listFiles(projectPath);
    
    const hasTypeScript = files.some(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    const hasTests = files.some(f => 
      f.includes('.test.') || 
      f.includes('.spec.') || 
      f.includes('__tests__')
    );

    const framework = await this.detectFramework(projectPath, files);
    const language = hasTypeScript ? 'TypeScript' : 'JavaScript';
    const packageManager = await this.detectPackageManager(projectPath);

    return {
      language,
      framework,
      packageManager,
      hasTypeScript,
      hasTests,
    };
  }

  private async listFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    async function walk(currentPath: string) {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        // Skip node_modules and common ignore patterns
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
          continue;
        }
        
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else {
          files.push(fullPath);
        }
      }
    }
    
    await walk(dir);
    return files;
  }

  private async detectFramework(projectPath: string, files: string[]): Promise<string | undefined> {
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Check for frameworks
      if (deps['next']) return 'Next.js';
      if (deps['react']) return 'React';
      if (deps['vue']) return 'Vue';
      if (deps['@angular/core']) return 'Angular';
      if (deps['svelte']) return 'Svelte';
      if (deps['express']) return 'Express';
      if (deps['fastify']) return 'Fastify';
      if (deps['@nestjs/core']) return 'NestJS';
      if (deps['koa']) return 'Koa';

      return undefined;
    } catch {
      return undefined;
    }
  }

  private async detectPackageManager(projectPath: string): Promise<'npm' | 'yarn' | 'pnpm'> {
    try {
      const files = await fs.readdir(projectPath);
      if (files.includes('pnpm-lock.yaml')) return 'pnpm';
      if (files.includes('yarn.lock')) return 'yarn';
      return 'npm';
    } catch {
      return 'npm';
    }
  }
}

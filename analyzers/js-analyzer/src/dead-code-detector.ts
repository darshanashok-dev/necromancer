import fs from 'fs/promises';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { DeadFile } from './types.js';

export class DeadCodeDetector {
  private importGraph: Map<string, Set<string>> = new Map();
  private exportedSymbols: Map<string, Set<string>> = new Map();

  async detect(projectPath: string): Promise<DeadFile[]> {
    const files = await this.getJsFiles(projectPath);
    
    // Build import graph
    for (const file of files) {
      await this.analyzeFile(file, projectPath);
    }

    // Find entry points
    const entryPoints = await this.findEntryPoints(projectPath, files);
    
    // Find reachable files
    const reachable = this.findReachableFiles(entryPoints);
    
    // Find dead files
    const deadFiles: DeadFile[] = [];
    for (const file of files) {
      if (!reachable.has(file)) {
        const stats = await fs.stat(file);
        const relativePath = path.relative(projectPath, file);
        deadFiles.push({
          path: relativePath,
          reason: 'Unreachable from entry points',
          size: stats.size,
        });
      }
    }

    return deadFiles;
  }

  private async getJsFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    async function walk(currentPath: string) {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
          continue;
        }
        
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    
    await walk(dir);
    return files;
  }

  private async analyzeFile(filePath: string, projectPath: string) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const ast = parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });

      const imports = new Set<string>();
      const exports = new Set<string>();

      traverse(ast, {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          if (source.startsWith('.') || source.startsWith('/')) {
            const resolved = this.resolveImport(filePath, source, projectPath);
            if (resolved) imports.add(resolved);
          }
        },
        ExportNamedDeclaration(path) {
          if (path.node.declaration) {
            // @ts-ignore
            if (path.node.declaration.declarations) {
              // @ts-ignore
              path.node.declaration.declarations.forEach(decl => {
                if (decl.id.name) exports.add(decl.id.name);
              });
            }
          }
        },
        ExportDefaultDeclaration() {
          exports.add('default');
        },
      });

      this.importGraph.set(filePath, imports);
      this.exportedSymbols.set(filePath, exports);
    } catch (error) {
      // Skip files that can't be parsed
    }
  }

  private resolveImport(fromFile: string, importPath: string, projectPath: string): string | null {
    const dir = path.dirname(fromFile);
    let resolved = path.resolve(dir, importPath);

    // Try different extensions
    const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.ts'];
    for (const ext of extensions) {
      const withExt = resolved + ext;
      try {
        if (fs.access(withExt)) {
          return withExt;
        }
      } catch {}
    }

    return null;
  }

  private async findEntryPoints(projectPath: string, files: string[]): Promise<string[]> {
    const entryPoints: string[] = [];

    // Common entry point patterns
    const patterns = [
      'index.js', 'index.ts', 'main.js', 'main.ts',
      'app.js', 'app.ts', 'server.js', 'server.ts',
      'src/index.js', 'src/index.ts', 'src/main.js', 'src/main.ts',
    ];

    for (const pattern of patterns) {
      const fullPath = path.join(projectPath, pattern);
      if (files.includes(fullPath)) {
        entryPoints.push(fullPath);
      }
    }

    // Check package.json main field
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      if (packageJson.main) {
        const mainPath = path.join(projectPath, packageJson.main);
        if (files.includes(mainPath)) {
          entryPoints.push(mainPath);
        }
      }
    } catch {}

    return entryPoints.length > 0 ? entryPoints : files.slice(0, 1);
  }

  private findReachableFiles(entryPoints: string[]): Set<string> {
    const reachable = new Set<string>();
    const queue = [...entryPoints];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (reachable.has(current)) continue;

      reachable.add(current);
      const imports = this.importGraph.get(current) || new Set();
      
      for (const imported of imports) {
        if (!reachable.has(imported)) {
          queue.push(imported);
        }
      }
    }

    return reachable;
  }
}

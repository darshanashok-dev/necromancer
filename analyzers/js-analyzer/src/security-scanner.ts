import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { SecurityIssue } from './types.js';

const execAsync = promisify(exec);

export class SecurityScanner {
  async scan(projectPath: string): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    // Run npm audit
    const auditIssues = await this.runNpmAudit(projectPath);
    issues.push(...auditIssues);

    // Scan for secrets
    const secretIssues = await this.scanForSecrets(projectPath);
    issues.push(...secretIssues);

    return issues;
  }

  private async runNpmAudit(projectPath: string): Promise<SecurityIssue[]> {
    try {
      const { stdout } = await execAsync('npm audit --json', {
        cwd: projectPath,
        timeout: 30000,
      });

      const auditResult = JSON.parse(stdout);
      const issues: SecurityIssue[] = [];

      if (auditResult.vulnerabilities) {
        for (const [name, vuln] of Object.entries(auditResult.vulnerabilities)) {
          const v = vuln as any;
          issues.push({
            type: 'dependency-vulnerability',
            severity: v.severity,
            description: `${name}: ${v.via[0]?.title || 'Security vulnerability'}`,
            location: `package.json (${name})`,
            cve: v.via[0]?.cve,
          });
        }
      }

      return issues;
    } catch (error) {
      // npm audit returns non-zero exit code when vulnerabilities found
      // Try to parse the output anyway
      try {
        const errorOutput = (error as any).stdout;
        if (errorOutput) {
          const auditResult = JSON.parse(errorOutput);
          const issues: SecurityIssue[] = [];

          if (auditResult.vulnerabilities) {
            for (const [name, vuln] of Object.entries(auditResult.vulnerabilities)) {
              const v = vuln as any;
              issues.push({
                type: 'dependency-vulnerability',
                severity: v.severity,
                description: `${name}: ${v.via[0]?.title || 'Security vulnerability'}`,
                location: `package.json (${name})`,
                cve: v.via[0]?.cve,
              });
            }
          }

          return issues;
        }
      } catch {}
      
      return [];
    }
  }

  private async scanForSecrets(projectPath: string): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];
    const files = await this.getFiles(projectPath);

    const secretPatterns = [
      { pattern: /(?:api[_-]?key|apikey)[\s]*[:=][\s]*['"]([^'"]+)['"]/gi, type: 'API Key' },
      { pattern: /(?:secret[_-]?key|secretkey)[\s]*[:=][\s]*['"]([^'"]+)['"]/gi, type: 'Secret Key' },
      { pattern: /(?:password|passwd|pwd)[\s]*[:=][\s]*['"]([^'"]+)['"]/gi, type: 'Password' },
      { pattern: /(?:token)[\s]*[:=][\s]*['"]([^'"]+)['"]/gi, type: 'Token' },
      { pattern: /(?:aws[_-]?access[_-]?key[_-]?id)[\s]*[:=][\s]*['"]([^'"]+)['"]/gi, type: 'AWS Access Key' },
    ];

    for (const file of files) {
      // Skip node_modules and common ignore patterns
      if (file.includes('node_modules') || file.includes('.git')) continue;

      try {
        const content = await fs.readFile(file, 'utf-8');
        const relativePath = path.relative(projectPath, file);

        for (const { pattern, type } of secretPatterns) {
          const matches = content.matchAll(pattern);
          for (const match of matches) {
            // Skip if it looks like a placeholder
            const value = match[1];
            if (value && !this.isPlaceholder(value)) {
              issues.push({
                type: 'hardcoded-secret',
                severity: 'high',
                description: `Potential ${type} found in code`,
                location: relativePath,
              });
            }
          }
        }
      } catch {
        // Skip files that can't be read
      }
    }

    return issues;
  }

  private async getFiles(dir: string): Promise<string[]> {
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
        } else {
          files.push(fullPath);
        }
      }
    }
    
    await walk(dir);
    return files;
  }

  private isPlaceholder(value: string): boolean {
    const placeholders = [
      'your', 'example', 'test', 'demo', 'placeholder', 'xxx', 'yyy', 'zzz',
      'changeme', 'replace', 'todo', 'fixme', '123', 'abc',
    ];

    const lowerValue = value.toLowerCase();
    return placeholders.some(p => lowerValue.includes(p));
  }
}

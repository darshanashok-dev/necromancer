import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { DependencyInfo } from './types.js';

const execAsync = promisify(exec);

export class DependencyAnalyzer {
  async analyze(projectPath: string): Promise<DependencyInfo[]> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      const dependencies: DependencyInfo[] = [];

      // Analyze dependencies
      if (packageJson.dependencies) {
        for (const [name, version] of Object.entries(packageJson.dependencies)) {
          dependencies.push(await this.analyzeDependency(name, version as string, 'dependencies'));
        }
      }

      // Analyze devDependencies
      if (packageJson.devDependencies) {
        for (const [name, version] of Object.entries(packageJson.devDependencies)) {
          dependencies.push(await this.analyzeDependency(name, version as string, 'devDependencies'));
        }
      }

      return dependencies;
    } catch (error) {
      console.error('Error analyzing dependencies:', error);
      return [];
    }
  }

  private async analyzeDependency(
    name: string,
    current: string,
    type: 'dependencies' | 'devDependencies'
  ): Promise<DependencyInfo> {
    // Remove version prefixes (^, ~, etc.)
    const cleanVersion = current.replace(/^[\^~>=<]/, '');

    try {
      // Get latest version from npm
      const { stdout } = await execAsync(`npm view ${name} version`, { timeout: 5000 });
      const latest = stdout.trim();
      
      const isOutdated = this.compareVersions(cleanVersion, latest) < 0;

      return {
        name,
        current: cleanVersion,
        latest,
        wanted: latest,
        type,
        isOutdated,
        severity: isOutdated ? this.calculateSeverity(cleanVersion, latest) : undefined,
      };
    } catch {
      // If npm view fails, mark as not outdated
      return {
        name,
        current: cleanVersion,
        type,
        isOutdated: false,
      };
    }
  }

  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 < part2) return -1;
      if (part1 > part2) return 1;
    }

    return 0;
  }

  private calculateSeverity(current: string, latest: string): 'low' | 'medium' | 'high' | 'critical' {
    const [currentMajor] = current.split('.').map(Number);
    const [latestMajor] = latest.split('.').map(Number);

    const majorDiff = latestMajor - currentMajor;

    if (majorDiff >= 3) return 'critical';
    if (majorDiff >= 2) return 'high';
    if (majorDiff >= 1) return 'medium';
    return 'low';
  }
}

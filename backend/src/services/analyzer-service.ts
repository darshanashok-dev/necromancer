import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { CodeCoronerAgent } from '@necrostack/coroner';
import { prisma } from '../config/database.js';

const execAsync = promisify(exec);

export async function analyzeRepository(repositoryId: string, repoUrl: string) {
  const tempDir = path.join(os.tmpdir(), `necrostack-${repositoryId}`);

  try {
    // Clone repository
    console.log(`Cloning ${repoUrl}...`);
    await execAsync(`git clone ${repoUrl} ${tempDir}`, { timeout: 60000 });

    // Run Code Coroner Agent
    const agent = new CodeCoronerAgent();
    const report = await agent.performAutopsy(tempDir, {
      url: repoUrl,
      name: path.basename(repoUrl, '.git'),
    });

    // Save autopsy report
    await prisma.autopsy.create({
      data: {
        repositoryId,
        report: report as any,
      },
    });

    // Update repository status
    await prisma.repository.update({
      where: { id: repositoryId },
      data: {
        status: 'analyzed',
        language: report.repository.language,
        framework: report.repository.framework,
      },
    });

    console.log(`✅ Analysis complete for ${repositoryId}`);
  } catch (error) {
    console.error(`❌ Analysis failed for ${repositoryId}:`, error);

    // Update repository status to failed
    await prisma.repository.update({
      where: { id: repositoryId },
      data: { status: 'failed' },
    });
  } finally {
    // Cleanup temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

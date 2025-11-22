import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { analyzeRepository } from '../services/analyzer-service.js';

const analyzeSchema = z.object({
  repoUrl: z.string().url(),
});

export const analyzeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    const body = analyzeSchema.parse(request.body);

    // Extract repo name from URL
    const repoName = body.repoUrl.split('/').pop() || 'unknown';
    const owner = body.repoUrl.split('/').slice(-2, -1)[0] || 'unknown';

    // Create repository record
    const repository = await prisma.repository.create({
      data: {
        url: body.repoUrl,
        name: repoName,
        owner,
        status: 'analyzing',
      },
    });

    // Start analysis in background
    analyzeRepository(repository.id, body.repoUrl).catch(error => {
      fastify.log.error('Analysis failed:', error);
    });

    return { id: repository.id, status: 'analyzing' };
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const repository = await prisma.repository.findUnique({
      where: { id },
      include: { autopsy: true },
    });

    if (!repository) {
      return reply.code(404).send({ error: 'Repository not found' });
    }

    if (!repository.autopsy) {
      return { id, status: repository.status };
    }

    return {
      id,
      status: 'complete',
      report: repository.autopsy.report,
    };
  });
};

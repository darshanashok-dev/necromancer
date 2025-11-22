import { FastifyPluginAsync } from 'fastify';

export const artifactRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/:id/download', async (request, reply) => {
    // TODO: Implement artifact download
    return { url: 'temp-url' };
  });
};

import { FastifyPluginAsync } from 'fastify';

export const extractRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/:id', async (request, reply) => {
    // TODO: Implement extraction logic
    return { soulId: 'temp-id', status: 'extracting' };
  });

  fastify.get('/:id', async (request, reply) => {
    // TODO: Implement get soul spec
    return { id: request.params.id, status: 'complete' };
  });
};

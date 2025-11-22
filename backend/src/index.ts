import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { config } from './config/env.js';
import { analyzeRoutes } from './routes/analyze.js';
import { reviveRoutes } from './routes/revive.js';
import { extractRoutes } from './routes/extract.js';
import { reanimateRoutes } from './routes/reanimate.js';
import { artifactRoutes } from './routes/artifacts.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
await fastify.register(cors, {
  origin: config.frontendUrl,
  credentials: true,
});

await fastify.register(multipart, {
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register routes
await fastify.register(analyzeRoutes, { prefix: '/api/analyze' });
await fastify.register(reviveRoutes, { prefix: '/api/revive' });
await fastify.register(extractRoutes, { prefix: '/api/extract' });
await fastify.register(reanimateRoutes, { prefix: '/api/reanimate' });
await fastify.register(artifactRoutes, { prefix: '/api/artifacts' });

// Start server
try {
  await fastify.listen({ port: config.port, host: '0.0.0.0' });
  fastify.log.info(`🧟 NECROSTACK Backend running on port ${config.port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

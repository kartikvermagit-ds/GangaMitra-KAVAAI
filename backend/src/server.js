const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');

const server = app.listen(env.PORT, () => {
  logger.info(`====================================================`);
  logger.info(`🌊 GangaMitra-KAVAAI Backend Server Started!`);
  logger.info(`🚀 Environment: ${env.NODE_ENV}`);
  logger.info(`📡 Listening on: http://localhost:${env.PORT}`);
  logger.info(`🩺 Health check: http://localhost:${env.PORT}/api/health`);
  logger.info(`🤖 AI Provider: ${env.AI_PROVIDER}`);
  logger.info(`====================================================`);
});

// Graceful shutdown handling
const shutdown = () => {
  logger.info('Shutting down GangaMitra backend server gracefully...');
  server.close(() => {
    logger.info('Server closed. Goodbye!');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

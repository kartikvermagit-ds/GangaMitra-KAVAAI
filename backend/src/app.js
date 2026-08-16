const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes/index');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// CORS configuration
const corsOptions = {
  origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root info route
app.get('/', (req, res) => {
  res.json({
    name: 'GangaMitra Backend API',
    description: 'SIH1290 - Interactive Robot Mascot & Digital Avatar for Namami Gange',
    health: '/api/health',
    documentation: 'See README.md for endpoint details',
  });
});

// Mount all API routes under /api
app.use('/api', apiRoutes);

// 404 Not Found Middleware
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;

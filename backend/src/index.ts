import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { testConnection, pool } from './db/connection';
import { initializeDatabase } from './db/init';
import purchaseOrderRoutes from './routes/purchaseOrders';
import companyRoutes from './routes/company';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL || 'http://localhost:5173',
];

// Add production frontend URL if available
if (process.env.PRODUCTION_FRONTEND_URL) {
  allowedOrigins.push(process.env.PRODUCTION_FRONTEND_URL);
}

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/company', companyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Purchase Order API',
    version: '1.0.0',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
async function start() {
  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      console.log(
        'Warning: Database not connected. Please configure DATABASE_URL and run: npm run db:init'
      );
    } else {
      // Initialize database if connected
      await initializeDatabase();
    }

    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ API base URL: http://localhost:${PORT}/api`);
      console.log(`✓ Environment: ${NODE_ENV}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down gracefully...');
      server.close(async () => {
        await pool.end();
        console.log('✓ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('Terminating gracefully...');
      server.close(async () => {
        await pool.end();
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();

export default app;

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { initializeDatabase } from './config/database';
import studentRoutes from './routes/student.routes';
import subjectRoutes from './routes/subject.routes';
import markRoutes from './routes/mark.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import requestLogger from './middleware/request-logger.middleware';
import logger from './config/logger';

// Load environment variables
config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database connection
initializeDatabase()
  .then(() => {
    logger.info('Database initialization completed');
  })
  .catch((error) => {
    logger.error('Error during database initialization:', error);
    process.exit(1); // Exit if database initialization fails
  });

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/marks', markRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app; 
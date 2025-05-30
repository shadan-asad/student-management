import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';
import { Mark } from '../entities/mark.entity';
import logger from './logger';

// Load environment variables
config();

// Create a temporary connection to create the database if it doesn't exist
const createDatabase = async () => {
  const tempDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await tempDataSource.initialize();
    logger.info('Connected to postgres database');

    // Check if our database exists
    const result = await tempDataSource.query(
      `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME || 'student_manager'}'`
    );

    if (result.length === 0) {
      // Create the database if it doesn't exist
      await tempDataSource.query(`CREATE DATABASE ${process.env.DB_NAME || 'student_manager'}`);
      logger.info(`Database ${process.env.DB_NAME || 'student_manager'} created successfully`);
    } else {
      logger.info(`Database ${process.env.DB_NAME || 'student_manager'} already exists`);
    }

    await tempDataSource.destroy();
  } catch (error) {
    logger.error('Error creating database:', error);
    throw error;
  }
};

// Main database configuration
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'student_manager',
  entities: [Student, Subject, Mark],
  // migrations: ['src/migrations/*.ts'],
  synchronize: false, // Disable synchronize in favor of migrations
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
});

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    // First, ensure the database exists
    await createDatabase();

    // Then initialize the main connection
    await AppDataSource.initialize();
    logger.info('Database connection established');

    // Run migrations
    // await AppDataSource.runMigrations();
    // logger.info('Database migrations completed');

    // Verify tables exist
    const tables = await AppDataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    const requiredTables = ['student', 'subject', 'mark'];
    const existingTables = tables.map((t: any) => t.table_name);

    for (const table of requiredTables) {
      if (!existingTables.includes(table)) {
        logger.error(`Table ${table} does not exist`);
        throw new Error(`Table ${table} does not exist`);
      }
      logger.info(`Table ${table} exists`);
    }

    return AppDataSource;
  } catch (error) {
    logger.error('Error during database initialization:', error);
    throw error;
  }
}; 
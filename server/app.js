// Import required packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectToDB from './middlewares/db.conn.js';
import indexRouter from './routes/index.routes.js';
import testRouter from './routes/test.routes.js';
import { createAdminUserIfNotExist } from './models/User.js';
import cronJob from './middlewares/cronJop.js';
import { errorHandler } from './utils/error.handler.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(cors(
  {
    origin: true,
    credentials: true,
  },
)); // Enable Cross-Origin Resource Sharing for all origins
app.use(helmet()); // Enhance security by setting various HTTP headers
// Add a custom Cross-Origin-Resource-Policy header
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.json()); // Parse request bodies for JSON

// Routes
app.use('/api/v0', indexRouter);
app.use('/', testRouter);

// Create admin user if not exist
createAdminUserIfNotExist();

// Start cron job
cronJob();

// Global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening successfully on \n\t{ SERVER_URL::http://localhost:${port} }`);
});
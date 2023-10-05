// Import required packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import connectToDB from './middlewares/db.conn.js';
import indexRouter from './routes/index.routes.js';
import testRouter from './routes/test.routes.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.json()); // Parse request bodies for JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse request bodies for x-www-form-urlencoded

// Configure multer so that it will upload to '../uploads'
multer({
  dest: '../uploads',
  limits: {
    fileSize: 10000000, // 10MB Max file size
  },
});

// Routes
app.use('/api/v0', indexRouter);
app.use('/', testRouter);

app.listen(port, () => {
  console.log(`Server listening successfully on \n\t{ SERVER_URL::http://localhost:${port} }`);
});
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { ENV } from './env.js';
import { connectDB } from './config/db.js';
import mainRouter from './routers/index.js';

import { globalLimiter } from './middleware/rateLimiter.js';

import { seedAdminAccount } from './seeds/admin.seed.js';

const app = express();

app.use(morgan('dev'));

const allowedOrigins = [
  'http://localhost:5173',
  ENV.CLIENT_URL,
].filter(Boolean).map(url => url.replace(/\/$/, ''));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Blocked by CORS policy: ${origin} is not allowed`));
      }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(globalLimiter)


app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  res.send('HRM System Backend Server is Running...');
});

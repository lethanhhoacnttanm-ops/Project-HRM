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

app.use(helmet());
app.use(morgan('dev'));

const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000', 
  ENV.CLIENT_URL,          
  'https://project-hrm-zeta.vercel.app' 
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



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
  res.send('HRM System Backend Server is Running...');
});

const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await seedAdminAccount();

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    console.error(' Thất bại khi khởi động Server:', error);
    process.exit(1);
  }
};

startServer();

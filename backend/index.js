import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { ENV } from './env.js';
import { connectDB } from './config/db.js';
import mainRouter from './routers/index.js';
import { seedAdminAccount } from './seeds/admin.seed.js';

const app = express();

connectDB().then(async () => {
  await seedAdminAccount();

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${ENV.PORT}`);
  });
});

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

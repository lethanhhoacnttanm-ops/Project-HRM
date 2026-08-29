  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config();

  export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
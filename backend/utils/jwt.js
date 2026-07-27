import jwt from 'jsonwebtoken';
import { ENV } from '../env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '1d' });
};
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const {
  DATABASE_URL,
  PORT = 5001,
  NODE_ENV
} = process.env;
import dotenv from 'dotenv';

dotenv.config();

const { PORT, JWT_SECRET } = process.env;

if (!PORT && !JWT_SECRET) {
  throw new Error('Missing environment variables');
}

export const config = {
  PORT,
  JWT_SECRET
};

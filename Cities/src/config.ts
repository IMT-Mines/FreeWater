import dotenv from 'dotenv';

dotenv.config();

const { PORT, JWT_SECRET, MEMCACHED_URL } = process.env;

if (!PORT && !JWT_SECRET && !MEMCACHED_URL) {
  throw new Error('Missing environment variables');
}

export const config = {
  PORT: parseInt(PORT!, 10),
  JWT_SECRET: JWT_SECRET!,
  MEMCACHED_URL: MEMCACHED_URL!
};

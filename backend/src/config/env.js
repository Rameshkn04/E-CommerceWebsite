import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️  No .env file found, relying solely on process environment variables.');
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT ?? '4000', 10),
  mongoUri: process.env.MONGODB_URI,
  seedSampleCount: Number.parseInt(process.env.SEED_SAMPLE_COUNT ?? '12', 10)
};

if (!env.mongoUri) {
  console.warn('⚠️  MONGODB_URI is not set. Database connection will fail without it.');
}


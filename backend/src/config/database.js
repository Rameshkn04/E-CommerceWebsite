import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!env.mongoUri) {
    throw new Error('MONGODB_URI is not defined. Cannot establish MongoDB connection.');
  }

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected');
    isConnected = false;
  });

  await mongoose.connect(env.mongoUri, {
    autoIndex: env.nodeEnv !== 'production'
  });

  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
};


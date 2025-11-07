import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log('MongoDB connected:' + connect.connection.host);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};

export default connectDB;

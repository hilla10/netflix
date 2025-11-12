import { configDotenv } from 'dotenv';

configDotenv();

export const ENV_VARS = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

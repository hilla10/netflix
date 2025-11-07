import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import { ENV_VARS } from './config/envVars.js';
import movieRouter from './routes/movieRouter.js';
import tvRouter from './routes/tvRouter.js';
import { protectRoute } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import searchRouter from './routes/searchRouter.js';

dotenv.config();

await connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
const PORT = ENV_VARS.PORT;

app.get('/', (req, res) => res.send('Api is working'));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movie', protectRoute, movieRouter);
app.use('/api/v1/tv', protectRoute, tvRouter);
app.use('/api/v1/search', protectRoute, searchRouter);

app.listen(PORT, () =>
  console.log(`Server is running on PORT: http://localhost:${PORT}`)
);

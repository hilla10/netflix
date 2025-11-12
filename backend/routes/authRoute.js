import { Router } from 'express';
import {
  login,
  logout,
  signup,
  authCheck,
} from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/checkAuth', protectRoute, authCheck);

export default authRouter;

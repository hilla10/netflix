import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies['netflix-token'];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - No token provided' });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid Token',
      });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found.' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log('Error protectRoute middlewares', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
import { ENV_VARS } from '../config/envVars.js';
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username)
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: 'User registration failed. Please try again.',
      });
    }
    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      user: { ...newUser._doc, password: '' },
    });
  } catch (error) {
    console.log('Error signup controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Credentials.' });
    }

    generateTokenAndSetCookie(user._id, res);

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: '' } });
  } catch (error) {
    console.log('Error login controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('netflix-token', {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS,
      sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
      secure: ENV_VARS.NODE_ENV !== 'development',
    });
    res
      .status(200)
      .json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    console.log('Error logout controller', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

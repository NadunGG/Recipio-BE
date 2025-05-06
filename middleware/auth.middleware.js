import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/common.config.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET || 'your-secret-key');

    // Add user info to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

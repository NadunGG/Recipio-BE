import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getCurrentUser 
} from '../controllers/auth.controller.js';
import { 
  registerValidationRules, 
  loginValidationRules, 
  validate 
} from '../middleware/validation.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidationRules, validate, register);

// Login user
router.post('/login', loginValidationRules, validate, login);

// Logout user
router.post('/logout', logout);

// Get current user
router.get('/me', authenticate, getCurrentUser);

export default router;
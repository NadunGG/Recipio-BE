import { authenticate } from '../middleware/auth.middleware.js';
import express from 'express';
import {
  getRecommendedRecipes,
  scanIngredients,
  generateRecipes,
  getPreferences,
} from '../controllers/recipe.controller.js';

const router = express.Router();

router.post('/scan', authenticate, scanIngredients);
router.post('/generate', authenticate, generateRecipes);
router.post('/recommend', authenticate, getRecommendedRecipes);
router.get('/preferences', authenticate, getPreferences);
/* old */
// router.get('/search', authenticate, searchRecipes);
// router.get('/:id', authenticate, getRecipeById);
// router.post('/searchByImage', authenticate, createRecipe);


export default router;

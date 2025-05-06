import { authenticate } from '../middleware/auth.middleware.js';
import express from 'express';
import {
  getRecommendedRecipes,
  searchRecipes,
  getRecipeById,
  createRecipe,
  scanIngredients,
  generateRecipes,
  getPreferences,
} from '../controllers/recipe.controller.js';

const router = express.Router();
/* new */
router.post('/scan', scanIngredients);
router.post('/generate', generateRecipes);
router.get('/preferences', getPreferences);
/* old */
router.get('/recommended', authenticate, getRecommendedRecipes);
router.get('/search', authenticate, searchRecipes);
router.get('/:id', authenticate, getRecipeById);
router.post('/searchByImage', authenticate, createRecipe);


export default router;

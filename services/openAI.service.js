import { openai } from '../config/openai.config.js';
import pexelsService from './pexels.service.js';

async function scanIngredientsFromImage(base64Image) {
  try {
    const prompt = `Analyze the following image and return a string array of all clearly visible ingredient names.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini-2025-04-14',
      messages: [
        { role: 'system', content: 'You are a helpful kitchen assistant.' },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const content = response.choices?.[0]?.message?.content || '[]';
    const ingredients = JSON.parse(content);

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return { ingredients: [], error: 'No recognizable ingredients found in the image.' };
    }

    return { ingredients };
  } catch (err) {
    console.error(err);
    return { ingredients: [], error: 'Failed to process image. Please try again.' };
  }
}

async function generateRecipes(ingredients, preferences) {
  if (!ingredients.length) {
    return { recipes: [], error: 'Ingredient list is empty.' };
  }

  try {
    const prompt = `
  Given the ingredients: ${ingredients.join(', ')} and preferences: ${preferences.join(', ')}, 
  generate 4 recipes in the exact format below.
  
  [
    {
      "id": "...",
      "name": "...",
      "description": "...",
      "cookTime": "...",
      "calories": "...",
      "ingredients": [{ "ingredient-name": "amount" }],
      "steps": ["...", "..."]
    }
  ]
  `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [
        { role: 'system', content: 'You are a recipe generator.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices?.[0]?.message?.content || '[]';
    const recipes = JSON.parse(content);

    if (!Array.isArray(recipes) || recipes.length === 0) {
      return { recipes: [], error: 'No recipes could be generated. Try different ingredients.' };
    }

    const recipesWithImageURLs = await pexelsService.attachImagesToRecipes(recipes);
    return { recipes: recipesWithImageURLs };
  } catch (err) {
    console.error(err);
    return { recipes: [], error: 'Failed to generate recipes. Please try again later.' };
  }
}

async function generateDailyRecommendations(preferences = []) {
  try {
    const preferenceList = preferences.join(', ') || 'any';
    const prompt = `
Generate 3 diverse and creative ${preferenceList} recipes suitable for today. 
Respond in the following JSON format without markdown or code blocks:

[
  {
    "id": "...",
    "name": "...",
    "description": "...",
    "cookTime": "...",
    "calories": "...",
    "ingredients": [{ "ingredient-name": "amount" }],
    "steps": ["...", "..."]
  }
]
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano-2025-04-14',
      messages: [
        { role: 'system', content: 'You are a recipe generator.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices?.[0]?.message?.content || '[]';
    const recipes = JSON.parse(content);

    if (!Array.isArray(recipes) || recipes.length === 0) {
      return { recipes: [], error: 'No recommendations could be generated. Try again later.' };
    }

    const recipesWithImageURLs = await pexelsService.attachImagesToRecipes(recipes);
    return { recipes: recipesWithImageURLs };
  } catch (err) {
    console.error(err);
    return {
      recipes: [],
      error: 'Failed to generate daily recommendations. Please try again later.',
    };
  }
}

async function getUserFoodPreferences() {
  try {
    const preferences = ['vegan', 'vegetarian', 'non-veg', 'gluten-free', 'keto', 'dairy-free'];
    return { preferences };
  } catch (err) {
    console.error(err);
    return { preferences: [], error: 'Failed to load preferences.' };
  }
}

export default {
  scanIngredientsFromImage,
  generateRecipes,
  generateDailyRecommendations,
  getUserFoodPreferences,
};

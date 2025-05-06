import { PEXELS_API_KEY } from '../config/common.config.js';
import axios from 'axios';

const PEXELS_URL = 'https://api.pexels.com/v1/search';

async function fetchImageForRecipe(recipeName) {
  try {
    const response = await axios.get(PEXELS_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: recipeName,
        orientation: 'square',
        per_page: 1,
      },
    });

    const photo = response.data.photos[0];
    return photo?.src?.medium || null;
  } catch (err) {
    console.error(`Error fetching image for "${recipeName}":`, err.message);
    return null;
  }
}

async function attachImagesToRecipes(recipes = []) {
  const enrichedRecipes = [];

  for (const recipe of recipes) {
    const imageURL = await fetchImageForRecipe(recipe.name);
    enrichedRecipes.push({
      ...recipe,
      imageURL: imageURL || 'https://placehold.co/300/png?text=No+Image',
    });
  }

  return enrichedRecipes;
}

export default { attachImagesToRecipes };

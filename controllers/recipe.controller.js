import openAIService from "../services/openAI.service.js";


const recommendedRecipes = [
  {
    name: "Grilled Veggie Salad",
    cookTime: "15 Mins",
    imageURL: "https://hearthandvine.com/wp-content/uploads/2021/05/grilled-vegetable-salad.jpg",
    recipe:
      "1. Chop zucchini, bell pepper, and red onion.\n2. Toss with olive oil, salt, and pepper.\n3. Grill for 5–7 mins until tender.\n4. Mix with lettuce and your favorite dressing.",
  },
  {
    name: "Creamy Tomato Pasta",
    cookTime: "20 Mins",
    imageURL: "https://thewoodenskillet.com/wp-content/uploads/2023/03/creamy-tomato-pasta-recipe-1.jpg",
    recipe:
      "1. Cook pasta in salted water.\n2. In a pan, sauté garlic in olive oil.\n3. Add crushed tomatoes and cream.\n4. Mix in pasta and simmer for 5 mins.\n5. Top with fresh basil.",
  },
  {
    name: "Avocado Toast Deluxe",
    cookTime: "10 Mins",
    imageURL: "https://mallorythedietitian.com/wp-content/uploads/2024/05/smashed-avocado-toast-with-egg-and-red-pepper-flakes.jpg",
    recipe:
      "1. Toast sourdough bread.\n2. Smash avocado with lemon, salt, and chili flakes.\n3. Spread on toast.\n4. Top with poached egg and microgreens.",
  },
  {
    name: "Spicy Chickpea Wraps",
    cookTime: "25 Mins",
    imageURL: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roasted-chickpea-wraps-6aac456-scaled.jpg",
    recipe:
      "1. Sauté onions and garlic.\n2. Add chickpeas, paprika, cumin, and chili powder.\n3. Cook until crispy.\n4. Wrap in tortilla with lettuce and tahini sauce.",
  },
  {
    name: "Mushroom Stir-Fry",
    cookTime: "18 Mins",
    imageURL: "https://www.allrecipes.com/thmb/jxoapnx3xsFKCxWFPLR_K1jEqOc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4x3-PASSANO_ALR1122_InSeason_BUBBLES_ONLY_3125-3e8232f903f24d66af0b06167b73b1f4.jpg",
    recipe:
      "1. Slice mushrooms, bell peppers, and carrots.\n2. Stir-fry in sesame oil with garlic.\n3. Add soy sauce and a pinch of sugar.\n4. Serve over rice or noodles.",
  },
];



export const searchRecipes = async (req, res) => {
  const { query } = req.query;
  //   const recipes = await searchRecipes(query);
  res.status(200).json(recipes);
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  //   const recipe = await getRecipeById(id);
  res.status(200).json(recipe);
};

export const createRecipe = async (req, res) => {
  const { image } = req.body;
  //   const recipe = await createRecipe(image);
  res.status(200).json(recipe);
};

/* new */
export const scanIngredients = async (req, res) => {
  const base64Image = req.body.image;

  const { ingredients, error } = await openAIService.scanIngredientsFromImage(base64Image);

  if (error) return res.status(400).json({ error });
  return res.json({ ingredients });
};

export const generateRecipes = async (req, res) => {
  const { ingredients, preferences } = req.body;

  const { recipes, error } = await openAIService.generateRecipes(ingredients, preferences);

  if (error) return res.status(400).json({ error });
  return res.json({ recipes });
};

export const getRecommendedRecipes = async (req, res) => {
  const { preferences } = req.body;

  const { recipes, error } = await openAIService.generateDailyRecommendations(preferences);

  if (error) return res.status(400).json({ error });
  return res.json({ recipes });
};

export const getPreferences = async (_req, res) => {
  const { preferences, error } = await openAIService.getUserFoodPreferences();

  if (error) return res.status(500).json({ error });
  return res.json({ preferences });
};

import openAIService from '../services/openAI.service.js';
import { MOCK_RESPONSES } from '../config/common.config.js';

const recommendedRecipes = [
  {
    name: 'Grilled Veggie Salad',
    cookTime: '15 Mins',
    imageURL: 'https://hearthandvine.com/wp-content/uploads/2021/05/grilled-vegetable-salad.jpg',
    recipe:
      '1. Chop zucchini, bell pepper, and red onion.\n2. Toss with olive oil, salt, and pepper.\n3. Grill for 5–7 mins until tender.\n4. Mix with lettuce and your favorite dressing.',
  },
  {
    name: 'Creamy Tomato Pasta',
    cookTime: '20 Mins',
    imageURL:
      'https://thewoodenskillet.com/wp-content/uploads/2023/03/creamy-tomato-pasta-recipe-1.jpg',
    recipe:
      '1. Cook pasta in salted water.\n2. In a pan, sauté garlic in olive oil.\n3. Add crushed tomatoes and cream.\n4. Mix in pasta and simmer for 5 mins.\n5. Top with fresh basil.',
  },
  {
    name: 'Avocado Toast Deluxe',
    cookTime: '10 Mins',
    imageURL:
      'https://mallorythedietitian.com/wp-content/uploads/2024/05/smashed-avocado-toast-with-egg-and-red-pepper-flakes.jpg',
    recipe:
      '1. Toast sourdough bread.\n2. Smash avocado with lemon, salt, and chili flakes.\n3. Spread on toast.\n4. Top with poached egg and microgreens.',
  },
  {
    name: 'Spicy Chickpea Wraps',
    cookTime: '25 Mins',
    imageURL:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roasted-chickpea-wraps-6aac456-scaled.jpg',
    recipe:
      '1. Sauté onions and garlic.\n2. Add chickpeas, paprika, cumin, and chili powder.\n3. Cook until crispy.\n4. Wrap in tortilla with lettuce and tahini sauce.',
  },
  {
    name: 'Mushroom Stir-Fry',
    cookTime: '18 Mins',
    imageURL:
      'https://www.allrecipes.com/thmb/jxoapnx3xsFKCxWFPLR_K1jEqOc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4x3-PASSANO_ALR1122_InSeason_BUBBLES_ONLY_3125-3e8232f903f24d66af0b06167b73b1f4.jpg',
    recipe:
      '1. Slice mushrooms, bell peppers, and carrots.\n2. Stir-fry in sesame oil with garlic.\n3. Add soy sauce and a pinch of sugar.\n4. Serve over rice or noodles.',
  },
];

const generateMock = [
      {
          "id": "1",
          "name": "Spicy Sausage Pasta",
          "description": "A delicious and flavorful pasta dish with spicy sausages.",
          "cookTime": "30 minutes",
          "calories": "500",
          "ingredients": {
              "pasta": "8 oz",
              "sausages": "6 links",
              "olive oil": "2 tbsp",
              "garlic": "3 cloves",
              "crushed red pepper flakes": "1 tsp",
              "tomato sauce": "1 cup",
              "salt and pepper": "to taste",
              "parmesan cheese": "for garnish"
          },
          "steps": [
              "Cook pasta according to package instructions.",
              "In a large skillet, heat olive oil and cook sausages until browned. Add garlic and red pepper flakes.",
              "Stir in tomato sauce and cooked pasta. Season with salt and pepper.",
              "Serve hot, garnished with parmesan cheese."
          ],
          "imageURL": "https://images.pexels.com/photos/14853728/pexels-photo-14853728.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "id": "2",
          "name": "Creamy Sausage Alfredo",
          "description": "A creamy and indulgent pasta dish with savory sausages in Alfredo sauce.",
          "cookTime": "25 minutes",
          "calories": "600",
          "ingredients": {
              "pasta": "10 oz",
              "sausages": "8 links",
              "butter": "4 tbsp",
              "heavy cream": "1 cup",
              "parmesan cheese": "1 cup",
              "garlic powder": "1 tsp",
              "salt and pepper": "to taste",
              "parsley": "for garnish"
          },
          "steps": [
              "Cook pasta according to package instructions.",
              "In a large skillet, cook sausages until browned. Add butter and garlic powder.",
              "Stir in heavy cream and parmesan cheese until sauce is creamy. Season with salt and pepper.",
              "Toss in cooked pasta and serve hot, garnished with parsley."
          ],
          "imageURL": "https://images.pexels.com/photos/9296995/pexels-photo-9296995.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "id": "3",
          "name": "Sausage and Mushroom Pasta",
          "description": "A hearty pasta dish featuring sausages and mushrooms in a rich tomato sauce.",
          "cookTime": "40 minutes",
          "calories": "550",
          "ingredients": {
              "pasta": "12 oz",
              "sausages": "10 links",
              "olive oil": "3 tbsp",
              "onion": "1, chopped",
              "mushrooms": "8 oz, sliced",
              "tomato paste": "2 tbsp",
              "diced tomatoes": "1 can",
              "Italian seasoning": "1 tsp",
              "salt and pepper": "to taste"
          },
          "steps": [
              "Cook pasta according to package instructions.",
              "In a large skillet, heat olive oil and cook sausages until browned. Add onion and mushrooms.",
              "Stir in tomato paste, diced tomatoes, and Italian seasoning. Simmer until flavors combine.",
              "Serve sausages and mushrooms over cooked pasta. Season with salt and pepper."
          ],
          "imageURL": "https://images.pexels.com/photos/19239118/pexels-photo-19239118.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "id": "4",
          "name": "Sausage and Peppers Pasta",
          "description": "A vibrant and colorful pasta dish with sausages, bell peppers, and onions.",
          "cookTime": "35 minutes",
          "calories": "520",
          "ingredients": {
              "pasta": "10 oz",
              "sausages": "8 links",
              "bell peppers": "2, sliced",
              "onion": "1, sliced",
              "olive oil": "2 tbsp",
              "garlic": "3 cloves, minced",
              "italian seasoning": "1 tsp",
              "tomato sauce": "1 cup",
              "salt and pepper": "to taste"
          },
          "steps": [
              "Cook pasta according to package instructions.",
              "In a large skillet, heat olive oil and cook sausages until browned. Add garlic, bell peppers, and onion.",
              "Stir in Italian seasoning and tomato sauce. Simmer until vegetables are tender.",
              "Serve sausages and peppers over cooked pasta. Season with salt and pepper."
          ],
          "imageURL": "https://images.pexels.com/photos/26597663/pexels-photo-26597663.jpeg?auto=compress&cs=tinysrgb&h=350"
      }
]

const scanMock = [
  'green beans',
  'apples',
  'tomatoes',
  'eggs',
  'green grapes',
  'capsicum (bell pepper)',
  'lemons',
  'carrots',
  'lettuce',
  'watermelon',
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
  
  if (MOCK_RESPONSES) {
    return  res.json({ingredients: scanMock })
  }
  
  const { ingredients, error } = await openAIService.scanIngredientsFromImage(base64Image);

  if (error) return res.status(400).json({ error });
  return res.json({ ingredients });
};

export const generateRecipes = async (req, res) => {
  const { ingredients, preferences } = req.body;
  
  if (MOCK_RESPONSES) {
    return  res.json({ recipes: generateMock })
  }

  const { recipes, error } = await openAIService.generateRecipes(ingredients, preferences);

  if (error) return res.status(400).json({ error });
  return res.json({ recipes });
};

export const getRecommendedRecipes = async (req, res) => {
  const { preferences } = req.body;

  if (MOCK_RESPONSES) {
    return  res.json({recipes: generateMock })
  }

  const { recipes, error } = await openAIService.generateDailyRecommendations(preferences);

  if (error) return res.status(400).json({ error });
  return res.json({ recipes });
};

export const getPreferences = async (_req, res) => {
  const { preferences, error } = await openAIService.getUserFoodPreferences();

  if (error) return res.status(500).json({ error });
  return res.json({ preferences });
};

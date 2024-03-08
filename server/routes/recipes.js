const express = require('express');
const Recipe = require('./models/Recipe');
const { getRecipe, searchRecipes } = require('./recipeUtils');  // 

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().exec();
    console.log('Number of documents:', recipes.length);
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipe(id);
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search for recipes based on a query
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const recipes = await searchRecipes(query);
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

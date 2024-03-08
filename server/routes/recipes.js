const express = require('express');
const { getRecipe, searchRecipes } = require('./recipeUtils'); 

const router = express.Router();

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipe(id);
    
    if (!recipe) {
      // Handle case where recipe is not found
      return res.status(404).json({ error: 'Recipe Not Found' });
    }

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

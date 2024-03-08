const express = require('express');
const Recipe = require('../models/Recipe'); // Adjust the path as needed
const { getRecipe, searchRecipes } = require('./recipeUtils');

const router = express.Router();

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

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
    const recipes = await Recipe.find({ $text: { $search: query } }); // Use $text for text search
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

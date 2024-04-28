const express = require('express');
const Recipe = require('../backend/models/Recipe'); 
const { getRecipe, searchRecipes } = require('./recipeUtils');

const router = express.Router();


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe Not Found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const recipes = await Recipe.find({ $text: { $search: query } });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

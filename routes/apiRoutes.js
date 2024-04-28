const express = require('express');
const Recipe = require('../backend/models/Recipe');

const router = express.Router();

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

module.exports = router;

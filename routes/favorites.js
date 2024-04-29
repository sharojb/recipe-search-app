// routes/favorites.js

import express from 'express';
import Favorites from '../../backend/models/Favorites';
import dbConnect from '../../backend/config/db';

const router = express.Router();

// Connect to the database
dbConnect();

// Route for adding favorite
router.post('/add', async (req, res) => {
  try {
    const { username, recipe_id, title, image } = req.body;

    // Check if the recipe is already a favorite
    const existingFavorite = await Favorites.findOne({ username, recipe_id });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe already a favorite' });
    }

    // If not already a favorite, add it
    const newFavorite = new Favorites({ username, recipe_id, title, image });
    await newFavorite.save();

    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for removing favorite
router.post('/remove', async (req, res) => {
  try {
    const { username, recipe_id } = req.body;

    // Find the favorite and remove it
    await Favorites.findOneAndDelete({ username, recipe_id });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

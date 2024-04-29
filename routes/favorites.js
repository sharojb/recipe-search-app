import express from 'express';
import Favorites from '../backend/models/Favorites';
import dbConnect from '../backend/config/db';

const router = express.Router();

dbConnect();

router.post('/add', async (req, res) => {
  try {
    const { username, recipe_id, title, image } = req.body;
    const existingFavorite = await Favorites.findOne({ username, recipe_id });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe already a favorite' });
    }
    const newFavorite = new Favorites({ username, recipe_id, title, image });
    await newFavorite.save();

    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/remove', async (req, res) => {
  try {
    const { username, recipe_id } = req.body;

    await Favorites.findOneAndDelete({ username, recipe_id });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

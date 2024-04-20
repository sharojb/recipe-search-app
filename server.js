const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const next = require('next');
const path = require('path');
const bcrypt = require('bcrypt');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cors());

  const url = process.env.MONGODB_URI;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      mail: {
        type: String,
        required: true
      }
    });

    const favoriteSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      recipe_id: {
        type: String,
        required: true
      }
    });
    
    const User = mongoose.model('User', userSchema);
    const Favorites = mongoose.model('Favorites', favoriteSchema)
    
    module.exports = User;
    module.exports = Favorites;

  server.get('/api/login/:username/:password', async (req, res) => {
    try {
      const username = req.params.username;
      const password = req.params.password;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.get('/api/getfavorites/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const recipe = await Favorites.find({ username });

      if (!recipe) {
        res.json({ message: 'No Favorites for this user' });
      }
      else{
        res.json({ recipe });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.get('/api/addfavorites/:username/:recipe_id', async (req, res) => {
    try {
      const username = req.params.username;
      const recipe_id = req.params.recipe_id;
      const recipe = await Favorites.findOne({ username, recipe_id });

      if (!recipe) {
        const newFavorite = new Favorites({ username: username, recipe_id: recipe_id });
    
        await newFavorite.save();

        res.json({ message: 'Favorite added' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  server.get('/api/removefavorites/:username/:recipe_id', async (req, res) => {
    try {
      const username = req.params.username;
      const recipe_id = req.params.recipe_id;
      const recipe = await Favorites.findOne({ username, recipe_id });

      if (recipe) {
        await Favorites.deleteOne({ username, recipe_id })

        res.json({ message: 'Favorite deleted' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  server.get('/api/register/:username/:mail/:password', async (req, res) => {
    try {
      // const { username, password } = req.body;
      const username = req.params.username;
      const password = req.params.password;
      const mail = req.params.mail;
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ username: username, password: hashedPassword, mail: mail });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }  
  });

  server.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
  });
});
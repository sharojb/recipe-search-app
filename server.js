require('dotenv').config();

const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const next = require('next');

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
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  });
  
  const User = mongoose.model('User', userSchema);
  const Favorites = mongoose.model('Favorites', favoriteSchema);

  module.exports = { User, Favorites };

  server.get('/api/login/:mail/:password', async (req, res) => {
    try {
      const mail = req.params.mail;
      const password = req.params.password;
      const user = await User.findOne({ mail });

      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      console.log('Request GET Login')
      console.log(ip)

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.post('/api/addfavorites/', async (req, res) => {
    try {
      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      console.log('Request POST AddFavorites')
      console.log("Request Body:", req.body);
      console.log(ip)

      const { username, recipe_id, title, image } = req.body;

      console.log(username, recipe_id, title, image)

      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
      const recipe = await Favorites.findOne({ username, recipe_id });

      if (!recipe) {
        const newFavorite = new Favorites({ username, recipe_id, title, image });
        await newFavorite.save();
        res.json({ message: 'Favorite added' });
      } else {
        res.status(400).json({ message: 'Recipe already a favorite' });
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  server.post('/api/removefavorites/', async (req, res) => {
    try {
      
      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      
      const { username, recipe_id, title, image } = req.body;
      
      const recipe = await Favorites.findOne({ username, recipe_id });
      console.log('Request POST RemoveFavorites')
      console.log(ip)

      if (recipe) {
        await Favorites.deleteOne({ username, recipe_id });
        res.json({ message: 'Favorite deleted' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  server.get('/api/user/favorites/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const favorites = await Favorites.find({ username });

      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      console.log('Request GET Favorites')
      console.log(ip)

      res.json({ userFavorites: favorites });
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });  

  server.post('/api/register', async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      
      var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

      console.log('Request POST Register')
      console.log(ip)
      
      const { username, mail, password } = req.body;
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, mail, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
});
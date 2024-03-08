const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const next = require('next');
const path = require('path');
const recipesRouter = require('./routes/recipes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY || 'your-default-api-key';

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cors());

  // MongoDB connection
  const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucook';

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });

  server.get('/api/initialData', async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}&number=5`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  server.use('/api/recipes', recipesRouter);

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

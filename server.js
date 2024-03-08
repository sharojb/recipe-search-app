const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucook';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const spoonacularApiKey = process.env.SPOONACULAR_API_KEY || 'your-default-api-key';

app.get('/api/initialData', async (req, res) => {
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

app.use('/api/recipes', recipesRouter);

app.get('/', (req, res) => {
  res.send('ucook now');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

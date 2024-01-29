const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const spoonacularApiKey = '4e1ab513731c4ffeaa22089bd7a2d2a3';

app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/search?apiKey=${spoonacularApiKey}&query=${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Search App');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

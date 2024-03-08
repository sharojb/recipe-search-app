const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const spoonacularApiKey = '4e1ab513731c4ffeaa22089bd7a2d2a3';

// Adjust this endpoint to fetch initial data from the external API (Spoonacular)
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

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Search App');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

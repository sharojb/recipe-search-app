const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017/ucook';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

const Recipe = mongoose.model('Recipe', {});

app.get('/app', async (req, res) => {
  try {
    const documents = await Recipe.find().exec();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});

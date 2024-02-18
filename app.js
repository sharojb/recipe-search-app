const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017/ucook';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  // Add other fields as per your document structure
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/app', async (req, res) => {
  try {
    const documents = await Recipe.find().exec();

    console.log('Retrieved documents:', documents);
    
    if (documents.length > 0) {
      res.json(documents);
    } else {
      res.status(404).json({ error: 'No documents found' });
    }
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


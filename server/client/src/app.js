const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const recipesRouter = require('./routes/recipes');

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017/ucook';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

app.use('/recipes', recipesRouter);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

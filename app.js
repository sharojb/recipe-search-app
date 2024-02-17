const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017/ucook';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

app.get('/app', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('recipe');
    const documents = await collection.find().toArray();
    res.send(documents);
  } catch (error) {
    console.error('Error fetching documents', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});
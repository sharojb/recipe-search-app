const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/users', async (req, res) => {
    try {
      const users = await db.collection('users').find({}).toArray();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/users', async (req, res) => {
    const newUser = req.body;

    try {
      const result = await db.collection('users').insertOne(newUser);
      res.json(result.ops[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};

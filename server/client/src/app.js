const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle all other routes by serving the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

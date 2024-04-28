const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
});

recipeSchema.index({ name: 'text', ingredients: 'text', instructions: 'text' });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

import mongoose from 'mongoose';

const favoritesSchema = new mongoose.Schema({
  username: String,
  recipe_id: Number,
  title: String,
  image: String
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

export default Favorites;
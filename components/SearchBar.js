import React, { useState } from 'react';
import styles from '../styles/search.module.css';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState(['Ingredient 1', 'Ingredient 2']);

  const handleInputChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddMore = () => {
    if (ingredients.length < 6) {
      setIngredients([...ingredients, '']);
    }
  };

  const handleLess = () => {
    if (ingredients.length > 2) {
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const handleSearch = () => {
    onSearch(ingredients.filter(ingredient => ingredient.trim() !== ''));
  };

  return (
    <div className={styles.searchContainer}>
      {ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Ingredient ${index + 1}`}
          value={ingredient}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className={styles.searchInput}
        />
      ))}
      <button onClick={handleAddMore} className={styles.smallButton}>Add More</button>
      {ingredients.length > 2 && <button onClick={handleLess} className={styles.smallButton}>Less</button>}
      <button onClick={handleSearch} className={styles.cookNowButton}>Cook Now</button>
    </div>
  );
};

export default SearchBar;

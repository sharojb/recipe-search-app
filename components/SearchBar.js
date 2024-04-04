// SearchBar.js
import React, { useState } from 'react';
import styles from '../styles/search.module.css';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState(['', '', '']);

  const handleInputChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddMore = () => {
    setIngredients([...ingredients, '']);
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
      <button onClick={handleAddMore} className={styles.addMoreButton}>
        Add More
      </button>
      <button onClick={handleSearch} className={styles.cookNowButton}>
        Cook Now
      </button>
    </div>
  );
};

export default SearchBar;

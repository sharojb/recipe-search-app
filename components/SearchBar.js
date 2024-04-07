import React, { useState } from 'react';
import styles from '../styles/search.module.css';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState(['']); 
  const [error, setError] = useState(null);

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
    if (ingredients.length > 1) { 
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const validateIngredients = async () => {
    for (const ingredient of ingredients) {
      if (!ingredient.trim()) {
        setError('Please enter a cooking ingredient');
        return false;
      }
      try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${encodeURIComponent(ingredient)}&apiKey=YOUR_API_KEY`);
        const data = await response.json();
        if (data.results && data.results.length === 0) {
          setError(`"${ingredient}" is not a valid cooking ingredient. Please try again.`);
          return false;
        }
      } catch (error) {
        console.error('Error validating ingredient:', error);
        setError('An error occurred while validating ingredients. Please try again.');
        return false;
      }
    }
    return true;
  };

  const handleSearch = async () => {
    setError(null); 
    if (!(await validateIngredients())) {
      return;
    }
    onSearch(ingredients.filter(ingredient => ingredient.trim() !== ''));
  };

  return (
    <div className={styles.searchContainer}>
      {ingredients.map((ingredient, index) => (
        <input 
          className={styles.searchInput}
          key={index}
          type="text"
          placeholder={ingredient ? '' : `Ingredient ${index + 1}`}
          value={ingredient}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleAddMore} className={styles.smallButton}>Add More</button>
      {ingredients.length > 1 && <button onClick={handleLess} className={styles.smallButton}>Less</button>}
      <button onClick={handleSearch} className={styles.cookNowButton}>Cook Now</button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';
import styles from '../styles/search.module.css';
import RecipeList from './RecipeList';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState(['']); 
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)
  const [searchActive, setSearchActive] = useState(false);

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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  const validateIngredients = async () => {
    for (const ingredient of ingredients) {
      if (!ingredient.trim()) {
        setError('Please enter a cooking ingredient');
        return false;
      }
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(ingredient)}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.results && data.results.length === 0) {
          setError(`"${ingredient}" is not a valid cooking ingredient. Please try again.`);
          return false;
        }
        else{
          setData(data)
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
    ingredients.filter(ingredient => ingredient.trim() !== '');
    setSearchActive(true);
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
          onKeyDown={index === ingredients.length - 1 ? handleKeyPress : null}
        />
      ))}
      <button onClick={handleAddMore} className={styles.smallButton}>Add More</button>
      {ingredients.length > 1 && <button onClick={handleLess} className={styles.smallButton}>Less</button>}
      <button onClick={handleSearch} className={styles.cookNowButton}>Cook Now</button>
      {searchActive && data && (
        <div className={styles.recipeListContainer}>
        <RecipeList recipes={data}/>
        </div>)}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default SearchBar;

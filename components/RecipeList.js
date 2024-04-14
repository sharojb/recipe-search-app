import React, { useState } from 'react';
import styles from '../styles/list.module.css';

const RecipeList = ({ recipes }) => {
  let recipeList = [];

  if (Array.isArray(recipes.recipes)) {
    recipeList = recipes.recipes;
  } else if (Array.isArray(recipes.results)) {
    recipeList = recipes.results;
  } else {
    return <p>No recipes available.</p>;
  }

  const [displayedRecipes, setDisplayedRecipes] = useState(6);

  const slicedRecipes = recipeList.slice(0, displayedRecipes);

  const handleLoadMore = () => {
    setDisplayedRecipes(displayedRecipes + 6);
  };

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  const handleCook = async (recipeId) => {
    console.log('Cook this button clicked for recipe ID:', recipeId);
    try {
      // Fetch the details of the selected recipe using its ID
          const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
      const recipeDetails = await response.json();

      // Display the details of the recipe to the user
      console.log('Recipe details:', recipeDetails);
      
      // Perform additional actions related to cooking the recipe
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Recipes</h2>
      <div className={styles.recipeList}>
        {slicedRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img
              src={`https://spoonacular.com/recipeImages/${recipe.image}`}
              alt="Recipe Image"
              className={styles.recipeImg}
            />
            <div className={styles.recipeDetails}>
              <h3 className={styles.recipeName}>{recipe.title}</h3>
              <p>Recipe ID: {recipe.id}</p>
              <button onClick={() => handleCook(recipe.id)} className={styles.cookThisButton}>
                Cook this
              </button>
            </div>
          </div>
        ))}
      </div>
      {displayedRecipes < recipeList.length && (
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
          Load More Recipes
        </button>
      )}
    </div>
  );
};

export default RecipeList;

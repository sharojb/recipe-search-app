import React, { useState } from "react";
import styles from "../styles/list.module.css";
import RecipeDetails from "./RecipeDetails";

const RecipeList = ({ recipes, isLoggedIn }) => {
  let recipeList = [];

  if (Array.isArray(recipes.recipes)) {
    recipeList = recipes.recipes;
  } else if (Array.isArray(recipes.results)) {
    recipeList = recipes.results;
  } else {
    return <p>No recipes available.</p>;
  }

  const [displayedRecipes, setDisplayedRecipes] = useState(6);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const slicedRecipes = recipeList.slice(0, displayedRecipes);

  const handleLoadMore = () => {
    setDisplayedRecipes(displayedRecipes + 6);
  };

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  const handleCook = async (recipeId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`,
      );
      const recipeDetails = await response.json();

      setSelectedRecipe(recipeDetails); 
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleFavorite = (recipeId) => {
    if (!isLoggedIn) {
      alert("Log In or Register first to favorite.");
      return;
    }
    console.log(`Recipe ${recipeId} favorited/unfavorited`);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className={styles.container}>
      {selectedRecipe ? (
        <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />
      ) : (
        <>
          <h2>Recipes</h2>
          <div className={styles.recipeListContainer}>
            <div className={styles.recipeList}>
              {slicedRecipes.map((recipe) => (
                <div key={recipe.id} className={styles.recipeCard}>
                  <img
                    src={recipe.image}
                    alt="Recipe Image"
                    width="200px"
                    height="100px"
                    className={styles.recipeImg}
                  />
                  <div className={styles.recipeDetails}>
                    <h3 className={styles.recipeName}>{recipe.title}</h3>
                    {/* <p>Ready in {recipe.readyInMinutes} minutes</p> */}
                    <p>Recipe ID: {recipe.id}</p>
                    <button
                      onClick={() => handleCook(recipe.id)}
                      className={styles.cookThisButton}
                    >
                      Cook this
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={() => handleFavorite(recipe.id)}
                        className={styles.favoriteButton}
                      >
                        Favorite
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {displayedRecipes < recipeList.length && (
            <button onClick={handleLoadMore} className={styles.loadMoreButton}>
              Load More Recipes
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeList;

import React, { useState } from "react";
import styles from "../styles/list.module.css";

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
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold the details of the selected recipe

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

      setSelectedRecipe(recipeDetails); // Set the selected recipe details
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleFavorite = (recipeId) => {
    if (!isLoggedIn) {
      alert("Log In or Register first to favorite.");
      return;
    }
    // Implement logic to handle favoriting/unfavoriting the recipe
    console.log(`Recipe ${recipeId} favorited/unfavorited`);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null); // Close the details section
  };

  return (
    <div className={styles.container}>
      {selectedRecipe ? (
        // Display details of the selected recipe
        <div className={styles.recipeDetailsContainer}>
          <div className={styles.recipeDetailsContent}>
            <button onClick={handleCloseDetails} className={styles.closeButton}>
              Close
            </button>
            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className={styles.recipeImage}
            />
            <p>Ready in {selectedRecipe.readyInMinutes} minutes</p>
            <div dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }} />
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <div
              dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
            />
          </div>
          <div className={styles.overlay} onClick={handleCloseDetails}></div>
        </div>
      ) : (
        // Display list of recipes
        <>
          <h2>Recipes</h2>
          <div className={styles.recipeListContainer}>
            <div className={styles.recipeList}>
              {slicedRecipes.map((recipe) => (
                <div key={recipe.id} className={styles.recipeCard}>
                  <img
                    src={`https://spoonacular.com/recipeImages/${recipe.image}`}
                    alt="Recipe Image"
                    width="200px"
                    height="100px"
                    className={styles.recipeImg}
                  />
                  <div className={styles.recipeDetails}>
                    <h3 className={styles.recipeName}>{recipe.title}</h3>
                    <p>Ready in {recipe.readyInMinutes} minutes</p>
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

import React, { useState, useEffect } from "react";
import styles from "../styles/favorites.module.css";
import RecipeDetails from "./RecipeDetails";

const FavoritesList = ({ username }) => {
  const [favorites, setFavorites] = useState([]);
  // const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/favorites/${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.userFavorites);
        } else {
          setError("Failed to fetch favorites");
        }
      } catch (error) {
        setError("Error fetching favorites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [username]);


  //   if (showFavorites) {
  //     fetchFavorites();
  //   }
  // }, [showFavorites, username]);

  return (
    <div className={styles.favoritesContainer}>
      {loading && <p>Loading favorites...</p>}
      {error && <p>{error}</p>}
      {favorites?.length > 0 && (
        <div className={styles.recipeListContainer}>
          <div className={styles.recipeList}>
            {favorites.map((favorite) => (
              <div key={favorite.recipe_id} className={styles.recipeCard}>
                <img
                  src={favorite.image}
                  alt="Recipe Image"
                  width="200px"
                  height="100px"
                  className={styles.recipeImg}
                />
                <div className={styles.recipeDetails}>
                  <h3 className={styles.recipeName}>{favorite.title}</h3>
                  {/* <p>Ready in {favorite.readyInMinutes} minutes</p> */}
                  <button
                    onClick={() => handleCook(favorite.recipe_id)}
                    className={styles.cookThisButton}
                  >
                    Cook this
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedRecipe && (
        <RecipeDetails recipe={selectedRecipe} onClose={handleCloseDetails} />
      )}
      {/* {favorites && favorites.length === 0 && (
        <p>No favorites found for {username}</p>
      )} */}
    </div>
  );
};

export default FavoritesList;

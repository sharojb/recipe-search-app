import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/favorites.module.css";
import RecipeDetails from "./RecipeDetails";
import { AuthContext } from "../AuthContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";

const FavoritesList = ({ username }) => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [startIndex, setStartIndex] = useState(0); 
  const [endIndex, setEndIndex] = useState(2);
  const [showPlusButton, setShowPlusButton] = useState(true);
  const [showMinusButton, setShowMinusButton] = useState(false);
  const [showPreviousFavorites, setShowPreviousFavorites] = useState(false);
  const [previousFavorites, setPreviousFavorites] = useState([]);
  
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

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://186.137.239.210:5000/api/user/favorites/${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.userFavorites);
          console.log("Favorites:", data.userFavorites);
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


  useEffect(() => {
    if (favorites.length > 0) {
    }
  }, [favorites, startIndex, endIndex]);

  const handleShowMore = () => {
    if (endIndex + 1 >= favorites.length) {
      return;
    }
    setStartIndex(endIndex + 1);
    setEndIndex(endIndex + 3);
    setShowPlusButton(false);
    setShowMinusButton(true);
    setShowPreviousFavorites(true);
  };

    const handleShowPrevious = () => {
      setEndIndex(startIndex - 1);
      setStartIndex(startIndex - 3);
      setShowPlusButton(true);
      setShowMinusButton(startIndex > 3);
      setShowPreviousFavorites(startIndex > 3);
    };
    
    const handleCloseDetails = () => {
      setSelectedRecipe(null);
    };

  return (
    <>
      {isAuthenticated && (
        <div className={styles.favoritesContainer}>
          {loading && <p>Loading favorites...</p>}
          {error && <p>{error}</p>}
          {favorites?.length > 0 && (
            <div className={styles.recipeListContainer}>
              <div className={styles.recipeList}>
                {favorites.slice(startIndex, endIndex + 1).map((favorite) => (
                  <div key={favorite.recipe_id}
                    className={styles.recipeCard}>
                    <div className={styles.recipeDetails}>
                    <h2 className={styles.recipeTitle}>{favorite.title}</h2>
                    <img src={favorite.image} alt={favorite.title} className={styles.recipeImage} />
                      <button
                        onClick={() => handleCook(favorite.recipe_id)}
                        className={styles.cookThisButton}>
                        Cook this
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {showPlusButton && (
                <FaPlus
                  onClick={handleShowMore}
                  className={styles.plusButton}
                />
              )}
              {showMinusButton && (
                <FaMinus
                  onClick={handleShowPrevious}
                  className={styles.minusButton}
                />
              )}
            </div>
          )}
          {selectedRecipe && (
            <RecipeDetails
              recipe={selectedRecipe}
              onClose={handleCloseDetails}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FavoritesList;
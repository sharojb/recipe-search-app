import React, { useState, useEffect } from "react";
import styles from "../styles/favorites.module.css";

const FavoritesList = ({ username }) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getfavorites/${username}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.recipe);
        } else {
          setError("Failed to fetch favorites");
        }
      } catch (error) {
        setError("Error fetching favorites");
      } finally {
        setLoading(false);
      }
    };

    if (showFavorites) {
      fetchFavorites();
    }
  }, [showFavorites, username]);

  return (
    <div>
      <button
        className={styles.myFavoritesButton} // Apply button styles
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {loading && <p>Loading favorites...</p>}
      {error && <p>{error}</p>}
      {showFavorites && favorites.length > 0 && (
        <div>
          <h3>{`${username}'s Favorites`}</h3>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.recipe_id}>{favorite.recipe_id}</li>
            ))}
          </ul>
        </div>
      )}
      {showFavorites && favorites.length === 0 && (
        <p>No favorites found for {username}</p>
      )}
    </div>
  );
};

export default FavoritesList;

// FavoritesList.js
import React, { useState, useEffect } from "react";
import styles from "../styles/create.module.css";

const FavoritesList = ({ username }) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/getfavorites/${username}`);
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.recipe);
        } else {
          console.error("Failed to fetch favorites:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (showFavorites) {
      fetchFavorites();
    }
  }, [showFavorites, username]);

  return (
    <div>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {showFavorites && (
        <div>
          <h3>{`${username}'s Favorites`}</h3>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.recipe_id}>{favorite.recipe_id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;


import React, { useState } from "react";
import styles from "../styles/details.module.css";

const RecipeDetails = ({ recipe, onClose }) => {
  const {
    image,
    title,
    readyInMinutes,
    instructions,
    summary,
    extendedIngredients,
    id,
  } = recipe;

  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorited: !isFavorited }),
      });

      if (response.ok) {
        setIsFavorited(!isFavorited);
      } else {
        console.error("Failed to update favorite status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div className={styles.recipeDetails}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <button onClick={toggleFavorite} className={styles.favoriteButton}>
        {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <h2 className={styles.recipeTitle}>{title}</h2>
      <img src={image} alt={title} className={styles.recipeImage} />
      <p>Ready in {readyInMinutes} minutes</p>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <h3>Ingredients</h3>
      <ul className={styles.ingredientsList}>
        {extendedIngredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>
            {ingredient.original}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </div>
  );
};

export default RecipeDetails;

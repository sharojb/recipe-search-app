import React, { useState } from "react";
import styles from "../styles/details.module.css";
import FavoritesList from "./FavoritesList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { PiCookingPotFill } from "react-icons/pi";
import { FaClock, FaListOl } from "react-icons/fa";

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
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [message, setMessage] = useState("");

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        const response = await fetch(
          `http://localhost:5000/api/${isFavorited ? 'removefavorites' : 'addfavorites'}/sharo/${id}`,
        );

        if (response.ok) {
          setIsFavorited(false);
          setMessage("Not Favorited");
        } else {
          console.error(
            "Failed to update favorite status:",
            response.statusText,
          );
        }
      } else {
        const response = await fetch(
          `http://localhost:5000/api/addfavorites/sharo/${id}`,
        );

        if (response.ok) {
          setIsFavorited(true);
          setMessage("Favorited");
        } else {
          console.error(
            "Failed to update favorite status:",
            response.statusText,
          );
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className={styles.recipeDetails}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <button onClick={toggleFavorite} className={styles.favoriteButton}>
      <FontAwesomeIcon icon={faHeart} style={{ color: isFavorited ? 'red' : 'coral' }} />
        {/* {isFavorited ? "Remove from Favorites" : "Add to Favorites"} */}
      </button>
      <p>{message}</p>
      <h2 className={styles.recipeTitle}>{title}</h2>
      <img src={image} alt={title} className={styles.recipeImage} />
      <div className={styles.recipeInfo}>
      <div>
          <FaClock style={{ marginRight: "5px" }} />
          <p>Ready in {readyInMinutes} minutes</p>
      </div>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: summary }} /> */}
      <div className={styles.ingredientsContainer}>
      <div className={styles.iconContainer}>
            <FaListOl
              onClick={toggleIngredients}
              className={styles.ingreButton}
              style={{ cursor: "pointer", fontSize: "30px" }}
            />
            <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={toggleIngredients}>
              {showIngredients ? "Hide Ingredients" : "Ingredients"}
            </span>
          </div>
          {showIngredients && (
            <div className={styles.ingredientsContent}>
              <h3>Ingredients</h3>
              <ul className={styles.ingredientsList}>
                {extendedIngredients.map((ingredient, index) => (
                  <li key={index} className={styles.ingredientItem}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
            )}
    </div>

      <div className={styles.instructionsContainer}>
        <div className={styles.iconContainer}>
          <PiCookingPotFill
            onClick={toggleInstructions}
            className={styles.instrucButton}
            style={{ cursor: "pointer", fontSize: "30px" }}
          />
          <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={toggleInstructions}>
            {showInstructions ? "Hide Instructions" : "Instructions"}
          </span>
        </div>
        {showInstructions && (
          <div className={styles.instructionsContent}>
            <h3>Instructions</h3>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
          </div>
        )}
      </div>

    </div>
  );
};

export default RecipeDetails;

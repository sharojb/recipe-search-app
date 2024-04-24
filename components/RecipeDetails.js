
import React, { useState, useEffect } from "react";
import styles from "../styles/details.module.css";
import FavoritesList from "./FavoritesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { PiCookingPotFill } from "react-icons/pi";
import { FaClock, FaListOl } from "react-icons/fa";
import { useAuth } from "../AuthContext";

const RecipeDetails = ({ recipe, onClose }) => {
  const { user } = useAuth();
  const userId = user ? user.userId : null;
  const username = user ? user.username : null;
  const {
    image,
    title,
    readyInMinutes,
    instructions,
    extendedIngredients,
    id,
  } = recipe;

  const [isFavorited, setIsFavorited] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Update favorite status when user changes
    if (user && user.favorites) {
      setIsFavorited(user.favorites.includes(id));
    } else {
      setIsFavorited(false);
    }
  }, [user, id]);

  const toggleFavorite = async () => {
    try {
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      console.log(username)
      const response = await fetch(
        `http://localhost:5000/api/${isFavorited ? "removefavorites" : "addfavorites"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // Specify content type as JSON
          },
          body: JSON.stringify({ username:username, recipe_id:id, title:title, image:image }) // Send data in JSON format
        },
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(!isFavorited);
        setMessage(data.message);
      } else {
        console.error("Failed to update favorite status:", response.statusText);
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
    <div>
      <div className={styles.recipeDetails}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <button onClick={toggleFavorite} className={styles.heartButton}>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: isFavorited ? "red" : "red" }}
          />
        </button>
        <p>{message}</p>
        <h2 className={styles.recipeTitle}>{title}</h2>
        <img src={image} alt={title} className={styles.recipeImage} />
        <div className={styles.recipeInfo}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaClock
              className={styles.timeButton}
              style={{ cursor: "pointer", fontSize: "30px", color: "black" }}
            />
            <p style={{ marginLeft: "10px" }}>
              Ready in {readyInMinutes} minutes
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ingredientsContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaListOl
            onClick={toggleIngredients}
            className={styles.ingreButton}
            style={{ cursor: "pointer", fontSize: "30px", color: "black" }}
          />
          <span
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={toggleIngredients}
          >
            {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
          </span>
        </div>
        {showIngredients && (
          <div className={styles.ingredientsContent}>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <PiCookingPotFill
            onClick={toggleInstructions}
            className={styles.instrucButton}
            style={{ cursor: "pointer", fontSize: "30px", color: "black" }}
          />
          <span
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={toggleInstructions}
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </span>
        </div>
        {showInstructions && (
          <div className={styles.instructionsContent}>
            <div dangerouslySetInnerHTML={{ __html: instructions }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
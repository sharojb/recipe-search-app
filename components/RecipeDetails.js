import React from 'react';
import styles from '../styles/details.module.css';

const RecipeDetails = ({ recipe, onClose }) => {
  const {
    image,
    title,
    readyInMinutes,
    instructions,
    summary,
    extendedIngredients,
  } = recipe;

  return (
    <div className={styles.recipeDetails}>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
      <h2>{title}</h2>
      <img src={image} alt={title} className={styles.recipeImage} />
      <p>Ready in {readyInMinutes} minutes</p>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <h3>Ingredients</h3>
      <ul className={styles.ingredientsList}>
        {extendedIngredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </div>
  );
};

export default RecipeDetails;

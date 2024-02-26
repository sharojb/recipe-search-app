import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Recipe ID: {recipe.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

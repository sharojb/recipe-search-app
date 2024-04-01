import React from 'react';

const RecipeList = ({ recipes }) => {
  if (Array.isArray(recipes.recipes)) {
    recipes = recipes.recipes
  }
  else if(Array.isArray(recipes.results)) {
    recipes = recipes.results
  }
  else{
    return <p>No recipes available.</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt="Recipe Image" width="100px" height="100px"/>
            <h3>{recipe.title}</h3>
            <p>Recipe ID: {recipe.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
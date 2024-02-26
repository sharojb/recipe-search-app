import React, { useState } from 'react';

const CreateProfile = () => {
  const [ingredients, setIngredients] = useState(['', '', '']);

  const handleChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddMoreIngredients = () => {
    setIngredients([...ingredients, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <img src="path/to/your/logo.png" alt="uCook Logo" />
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>{`Ingredient ${index + 1}:`}</label>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMoreIngredients}>
          Add More Ingredients
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProfile;

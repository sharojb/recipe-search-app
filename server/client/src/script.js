// function addMoreIngredients() {
//     const form = document.getElementById('profile-form');
//     const ingredientCount = form.querySelectorAll('input[name^="ingredient"]').length + 1;

//     const newIngredientInput = document.createElement('input');
//     newIngredientInput.type = 'text';
//     newIngredientInput.name = `ingredient${ingredientCount}`;
//     newIngredientInput.placeholder = `Ingredient ${ingredientCount}`;
    
//     const ingredient3Input = document.getElementById('ingredient3');
//     ingredient3Input.parentNode.insertBefore(newIngredientInput, ingredient3Input.nextSibling);
// }

// document.getElementById('profile-form').addEventListener('submit', function(event) {
//     event.preventDefault();
// });

import React from 'react';

export default function RecipeItem({ recipe, onAddToCart }) {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
      <p className="text-gray-600">Ingredients: {recipe.ingredients.slice(0, 3).join(', ')}...</p>
      <button
        onClick={onAddToCart}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-2 text-sm focus:outline-none focus:shadow-outline"
      >
        Add to Order
      </button>
    </div>
  );
}
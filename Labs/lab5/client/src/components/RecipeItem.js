import React from 'react';

const RecipeItem = ({ recipe, onAddToCart, showAddToCartRemove = false, onRemoveFromCart, cartQuantity = 0 }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
      <p className="text-gray-600 mb-2">{recipe.description && recipe.description.substring(0, 100)}...</p>
      {showAddToCartRemove && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onAddToCart}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            disabled={cartQuantity >= 99} // Basic limit
          >
            Add
          </button>
          {cartQuantity > 0 && (
            <div className="text-gray-700 font-semibold text-sm">
              Selected: {cartQuantity}
            </div>
          )}
          <button
            onClick={onRemoveFromCart}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            disabled={cartQuantity === 0}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
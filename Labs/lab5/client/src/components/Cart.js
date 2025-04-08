import React from 'react';

export default function Cart({ cart, recipes, onRemoveFromCart }) {
  const cartItems = Object.keys(cart);

  if (cartItems.length === 0) {
    return <p className="text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div>
      <ul>
        {cartItems.map(recipeId => {
          const recipe = recipes.find(r => r._id === recipeId);
          if (recipe) {
            return (
              <li key={recipeId} className="flex justify-between items-center py-2 border-b">
                <span>{recipe.name} x {cart[recipeId]}</span>
                <button
                  onClick={() => onRemoveFromCart(recipeId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-xs focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
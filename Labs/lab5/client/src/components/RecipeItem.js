import React from 'react';
import styles from '../app/page.module.css';

const RecipeItem = ({ recipe, onAddToCart, showAddToCartRemove = false, onRemoveFromCart, cartQuantity = 0 }) => {
  return (
    <div className={styles.recipeItemContainer}>
      <h3 className={styles.recipeTitle}>{recipe.name}</h3>
      <p className={styles.recipeDescription}>
        {recipe.description && recipe.description.substring(0, 100)}...
      </p>
      {showAddToCartRemove && (
        <div className={styles.recipeItemActions}>
          <button
            onClick={onAddToCart}
            className={styles.recipeButtonAction}
            disabled={cartQuantity >= 99}
          >
            Add
          </button>
          {cartQuantity > 0 && (
            <div className={styles.recipeQuantity}>
              Selected: {cartQuantity}
            </div>
          )}
          <button
            onClick={onRemoveFromCart}
            className={styles.recipeButtonAction}
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
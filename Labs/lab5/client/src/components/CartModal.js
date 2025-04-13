import React from 'react';
import styles from './CartModal.module.css';

const CartModal = ({ isOpen, onClose, cart, recipes, onRemoveFromCart, onPlaceOrder }) => {
  if (!isOpen) {
    return null;
  }

  const cartItems = Object.keys(cart).map(recipeId => {
    const recipe = recipes.find(r => r._id === recipeId);
    return recipe ? { ...recipe, quantity: cart[recipeId] } : null;
  }).filter(item => item !== null);

  const totalMeals = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Confirm Your Order</h2>
        {cartItems.length > 0 ? (
          <ul className={styles.cartItemsList}>
            {cartItems.map(item => (
              <li key={item._id} className={styles.cartItem}>
                <span>{item.name} x {item.quantity}</span>
                <button
                  onClick={() => onRemoveFromCart(item._id)}
                  className={styles.removeItemButton}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p className={styles.totalMeals}>Total Meals: {totalMeals}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          {cartItems.length > 0 && (
            <button
              onClick={onPlaceOrder}
              className={styles.placeOrderButton}
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
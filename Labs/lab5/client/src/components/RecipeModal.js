import React from 'react';
import styles from './CartModal.module.css'; // Import the CSS module

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} style={{alignItems: 'center'}}>
                <h2 className={styles.modalTitle} style={{textAlign: 'center'}}>{recipe.name}</h2>
                <div className={styles.cartItemsList} style={{textAlign: 'center'}}>
                    <p className={styles.cartItem}>
                        <span style={{fontWeight: 'bold'}}>Description: </span>
                        <span>{recipe.description}</span>
                    </p>
                    <p className={styles.cartItem}>
                        <span style={{fontWeight: 'bold'}}>Ingredients: </span>
                        <span>
                            {recipe.ingredients.map((ingredient, index) => (
                                <span key={index}>
                                    {ingredient}
                                    {index < recipe.ingredients.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    </p>
                    <p className={styles.cartItem}>
                        <span style={{fontWeight: 'bold'}}>Serves: </span>
                        <span>{recipe.serves}</span>
                    </p>
                    <p className={styles.cartItem}>
                        <span style={{fontWeight: 'bold'}}>Cook Time: </span>
                        <span>{recipe.cookTime} minutes</span>
                    </p>
                    <p className={styles.cartItem}>
                        <span style={{fontWeight: 'bold'}}>Prep Time: </span>
                        <span>{recipe.prepTime} minutes</span>
                    </p>
                </div>
                <div className={styles.buttonContainer} style={{justifyContent: 'center'}}>
                    <button
                        onClick={onClose}
                        className={styles.cancelButton}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
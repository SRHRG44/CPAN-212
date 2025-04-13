'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeModal from '@/components/RecipeModal';
import styles from '../page.module.css';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/recipes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRecipes(data);
                setLoading(false);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const openRecipeModal = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeRecipeModal = () => {
        setSelectedRecipe(null);
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto py-8 flex-grow flex justify-center items-center">
                Loading recipes...
            </div>
            <Footer />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto py-8 flex-grow flex justify-center items-center text-red-500">
                Error loading recipes: {error}
            </div>
            <Footer />
        </div>
    );

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.main}>
                <h1 className={styles.title}>Our Delicious Recipes</h1>
                <ul className={styles.recipeList}>
                    {recipes.map(recipe => (
                        <li key={recipe._id} className={styles.recipeListItem}>
                            <button
                                onClick={() => openRecipeModal(recipe)}
                                className={styles.recipeButton}
                            >
                                <span className={styles.recipeName}>{recipe.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
            </div>
            <Footer />
        </div>
    );
}

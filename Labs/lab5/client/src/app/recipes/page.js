'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecipeModal from '@/components/RecipeModal';

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
      <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <div className="container mx-auto py-8 flex-grow">
              <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Our Delicious Recipes</h1>
              <ul className="list-disc pl-5 space-y-2">
                  {recipes.map(recipe => (
                      <li key={recipe._id} className="mb-2">
                          <button
                              onClick={() => openRecipeModal(recipe)}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer p-0 text-left"
                              style={{
                                  textDecoration: 'underline',
                                  fontSize: '1.2rem',
                                  padding: '0.5rem 0',
                                  backgroundColor: 'black',
                                  color: 'white',
                                  borderRadius: '0.375rem',
                                  width: '100%',
                                  textAlign: 'left',
                              }}
                          >
                              <span className="text-lg font-medium">{recipe.name}</span>
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

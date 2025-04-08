'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes'); // Updated API endpoint to /api/recipes
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map(recipe => (
            <div key={recipe._id} className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
              <p className="text-gray-600">Ingredients: {recipe.ingredients.slice(0, 5).join(', ')}...</p>
              {/* You can add more details here if needed, e.g., description */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
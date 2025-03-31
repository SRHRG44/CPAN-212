"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8001/recipe');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Could not fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/recipe/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error('Could not delete recipe:', error);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <Link href="/recipes/new">Add Recipe</Link>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <div className="recipe-actions">
              <Link href={`/recipes/${recipe._id}`}>View</Link>
              <Link href={`/recipes/${recipe._id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
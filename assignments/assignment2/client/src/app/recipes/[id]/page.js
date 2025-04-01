"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link

function RecipeDetails({ params }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8001/recipe/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Recipe not found');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Could not fetch recipe:', error);
        setError('Could not fetch recipe');
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (error) {
    return (
      <div>
        <h1>Recipe Details</h1>

        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <h1>Recipe Details</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <h2>{recipe.name}</h2>
      <p>Description: {recipe.description}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Link href={`/recipes/${recipe._id}/edit`}>Edit Recipe</Link> {/* Add Link to edit page */}
    </div>
  );
}

export default RecipeDetails;
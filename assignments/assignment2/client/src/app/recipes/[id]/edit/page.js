"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../../../components/BackButton';
import Link from 'next/link'; // Corrected import

function RecipeEdit({ params }) { // Use params prop
  const router = useRouter(); // Use useRouter
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: [],
    steps: []
  });

  useEffect(() => {
    fetch(`http://localhost:8001/recipe/${params.id}`) // Use params.id
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error(error));
  }, [params.id]); // Use params.id

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  }

  function handleIngredientChange(index, value) {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: updatedIngredients
    }));
  }

  function handleStepChange(index, value) {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      steps: updatedSteps
    }));
  }

  function addIngredient() {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, '']
    }));
  }

  function addStep() {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, '']
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8001/recipe/${params.id}`, { // Use params.id
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(() => router.push(`/recipes/${params.id}`)) // Use router.push
      .catch(error => console.error(error));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: '20px' }}>
    <div style={{ width: '500px' }}>
    <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Difficulty:
          <select
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <br />
        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
        <br />
        <h3>Steps</h3>
        {recipe.steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addStep}>Add Step</button>
        <br />
        <button type="submit">Update Recipe</button>
      </form>
      <Link href={`/recipes/${params.id}`}>View Recipe</Link> {/* Use Link */}
    </div>
    </div>
  );
}

export default RecipeEdit;
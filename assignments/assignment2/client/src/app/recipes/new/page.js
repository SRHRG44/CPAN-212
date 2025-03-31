"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '../../components/BackButton';

function AddRecipe() {
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    difficulty: '',
    ingredients: [''],
    steps: [''],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  }

  function handleArrayChange(e, index, key) {
    const { value } = e.target;
    setRecipe((prevRecipe) => {
      const updatedArray = [...prevRecipe[key]];
      updatedArray[index] = value;
      return { ...prevRecipe, [key]: updatedArray };
    });
  }

  function addArrayItem(key) {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [key]: [...prevRecipe[key], ''],
    }));
  }

  function removeArrayItem(index, key) {
    setRecipe((prevRecipe) => {
      const updatedArray = [...prevRecipe[key]];
      updatedArray.splice(index, 1);
      return { ...prevRecipe, [key]: updatedArray };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8001/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(() => router.push('/recipes'))
      .catch((error) => console.error(error));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: '20px' }}>
      <div style={{ width: '500px' }}>
        <h1>Add New Recipe</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '10px' }}>
            Name:
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Description:
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Difficulty:
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <h3>Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleArrayChange(e, index, 'ingredients')}
                required
              />
              <button type="button" onClick={() => removeArrayItem(index, 'ingredients')}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('ingredients')}>
            Add Ingredient
          </button>

          <h3>Steps</h3>
          {recipe.steps.map((step, index) => (
            <div key={index}>
              <input
                type="text"
                value={step}
                onChange={(e) => handleArrayChange(e, index, 'steps')}
                required
              />
              <button type="button" onClick={() => removeArrayItem(index, 'steps')}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('steps')}>
            Add Step
          </button>

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
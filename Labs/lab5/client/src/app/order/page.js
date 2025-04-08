'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeItem from '@/components/RecipeItem';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const mealOptions = [
  { label: '1 Meal per Day', value: 1 },
  { label: '2 Meals per Day', value: 2 },
];

const durationOptions = [
  { label: '1 Week', value: 7 },
  { label: '3 Weeks', value: 21 },
  { label: '1 Month (4 weeks)', value: 28 },
  { label: '4 Months (16 weeks)', value: 112 },
];

export default function OrderPage() {
  const [mealsPerDay, setMealsPerDay] = useState(1);
  const [duration, setDuration] = useState(7);
  const [totalMeals, setTotalMeals] = useState(7);
  const [recipes, setRecipes] = useState([]);
  const [cart, setCart] = useState({}); // { recipeId: quantity }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState(null); // Example for user authentication
  const [orderStatus, setOrderStatus] = useState(null); // 'success' or 'error'
  const [orderErrorMessage, setOrderErrorMessage] = useState('');

  useEffect(() => {
    // Example: Check for user ID in localStorage on component mount
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login'); // Redirect if not logged in
    } else {
      setUserId(storedUserId);
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
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
  }, [router]);

  useEffect(() => {
    setTotalMeals(mealsPerDay * duration);
    // Reset cart when meal plan changes
    setCart({});
  }, [mealsPerDay, duration]);

  const handleMealsPerDayChange = (event) => {
    setMealsPerDay(parseInt(event.target.value));
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value));
  };

  const addToCart = (recipeId) => {
    const currentCartTotal = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    if (currentCartTotal < totalMeals) {
      setCart(prevCart => ({
        ...prevCart,
        [recipeId]: (prevCart[recipeId] || 0) + 1,
      }));
    } else {
      alert("You have reached the total number of meals for your order.");
    }
  };

  const removeFromCart = (recipeId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[recipeId] > 0) {
        newCart[recipeId] -= 1;
        if (newCart[recipeId] === 0) {
          delete newCart[recipeId];
        }
      }
      return newCart;
    });
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      alert('Please log in to place an order.');
      router.push('/login');
      return;
    }

    if (Object.values(cart).reduce((sum, qty) => sum + qty, 0) !== totalMeals) {
      alert('Please select the total number of meals for your order.');
      return;
    }

    setOrderStatus(null);
    setOrderErrorMessage('');

    try {
      const selectedRecipes = Object.keys(cart).map(recipeId => ({
        recipeId,
        quantity: cart[recipeId],
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          mealsPerDay,
          durationWeeks: duration / 7, // Convert days to weeks
          selectedRecipes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
        setOrderStatus('success');
        setCart({}); // Clear the cart
        // Optionally redirect to an order confirmation page
      } else {
        const errorData = await response.json();
        setOrderStatus('error');
        setOrderErrorMessage(errorData.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order placement error:', err);
      setOrderStatus('error');
      setOrderErrorMessage('An unexpected error occurred');
    }
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
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Customize Your Meal Prep</h1>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Choose Your Meal Plan</h2>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="mealsPerDay" className="block text-gray-700 text-sm font-bold mb-2">Meals per Day:</label>
              <select id="mealsPerDay" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={mealsPerDay} onChange={handleMealsPerDayChange}>
                {mealOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration:</label>
              <select id="duration" className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={duration} onChange={handleDurationChange}>
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Total Meals for this plan: <span className="font-semibold">{totalMeals}</span></p>
        </div>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Select Your Recipes ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)} / {totalMeals} meals selected)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map(recipe => (
              <RecipeItem key={recipe._id} recipe={recipe} onAddToCart={() => addToCart(recipe._id)} />
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Your Cart</h2>
          <Cart cart={cart} recipes={recipes} onRemoveFromCart={removeFromCart} />
          {orderStatus === 'success' && (
            <p className="mt-4 text-green-500">Order placed successfully!</p>
          )}
          {orderStatus === 'error' && (
            <p className="mt-4 text-red-500">{orderErrorMessage}</p>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) === totalMeals && (
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full mt-4 focus:outline-none focus:shadow-outline"
            >
              Place Order
            </button>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) < totalMeals && (
            <p className="mt-4 text-yellow-600">Please select {totalMeals - Object.values(cart).reduce((sum, qty) => sum + qty, 0)} more meals to complete your order.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
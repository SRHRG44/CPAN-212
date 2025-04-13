'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeItem from '@/components/RecipeItem';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';

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
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderErrorMessage, setOrderErrorMessage] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/recipes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            router.push('/login');
            return;
          }
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
    setUserId(localStorage.getItem('userId'));
  }, [router]);

  useEffect(() => {
    setTotalMeals(mealsPerDay * duration);
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

  const openCartModal = () => {
    if (Object.values(cart).reduce((sum, qty) => sum + qty, 0) === totalMeals) {
      setIsCartModalOpen(true);
    } else {
      alert('Please select the total number of meals for your order before proceeding.');
    }
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    if (!userId) {
      alert('User information not found. Please log in again.');
      router.push('/login');
      return;
    }

    const selectedRecipes = Object.keys(cart).map(recipeId => ({
      recipeId,
      quantity: cart[recipeId],
    }));

    setOrderStatus(null);
    setOrderErrorMessage('');

    try {
      const response = await fetch('http://localhost:8001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          userId,
          mealsPerDay,
          durationWeeks: duration / 7,
          selectedRecipes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order placed successfully:', data);
        setOrderStatus('success');
        setCart({});
        setIsCartModalOpen(false);
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
    <div>Loading...</div>
  );
  if (error) return (
    <div>Error: {error}</div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Customize Your Meal Prep</h1>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          {/* ... (meal plan selection) */}
        </div>

        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Select Your Recipes ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)} / {totalMeals} meals selected)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map(recipe => (
              <RecipeItem
                key={recipe._id}
                recipe={recipe}
                onAddToCart={() => addToCart(recipe._id)}
                showAddToCartRemove
                onRemoveFromCart={() => removeFromCart(recipe._id)}
                cartQuantity={cart[recipe._id] || 0}
              />
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Review and Confirm Your Order</h2>
          <p>Once you have selected {totalMeals} meals, click the button below to review your cart and place your order.</p>
          {orderStatus === 'success' && (
            <p className="mt-4 text-green-500">Order placed successfully!</p>
          )}
          {orderStatus === 'error' && (
            <p className="mt-4 text-red-500">{orderErrorMessage}</p>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) === totalMeals && (
            <button
              onClick={openCartModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mt-4 focus:outline-none focus:shadow-outline"
            >
              Review and Place Order
            </button>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) < totalMeals && (
            <p className="mt-4 text-yellow-600">Please select {totalMeals - Object.values(cart).reduce((sum, qty) => sum + qty, 0)} more meals to complete your order.</p>
          )}
        </div>
      </div>
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cart={cart}
        recipes={recipes}
        onRemoveFromCart={removeFromCart}
        onPlaceOrder={handlePlaceOrder}
      />
      <Footer />
    </div>
  );
}

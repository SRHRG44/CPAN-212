'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RecipeItem from '@/components/RecipeItem';
import Cart from '@/components/Cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';
import styles from '../page.module.css';

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
    <div className={styles.page}>
      <Navbar />
      <div className={styles.main}>
        <h1 className={styles.title}>Customize Your Meal Prep</h1>

        <div className={styles.mealPlanSelection}>

        </div>

        <div className={styles.recipeSelection}>
          <h2 className={styles.sectionTitle}>2. Select Your Recipes ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)} / {totalMeals} meals selected)</h2>
          <div className={styles.recipeGrid}>
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

        <div className={styles.reviewAndConfirm}>
          <h2 className={styles.sectionTitle}>3. Review and Confirm Your Order</h2>
          <p>Once you have selected {totalMeals} meals, click the button below to review your cart and place your order.</p>
          {orderStatus === 'success' && (
            <p className={styles.successMessage}>Order placed successfully!</p>
          )}
          {orderStatus === 'error' && (
            <p className={styles.errorMessage}>{orderErrorMessage}</p>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) === totalMeals && (
            <button
              onClick={openCartModal}
              className={styles.reviewButton}
            >
              Review and Place Order
            </button>
          )}
          {Object.values(cart).reduce((sum, qty) => sum + qty, 0) < totalMeals && (
            <p className={styles.mealCountWarning}>Please select {totalMeals - Object.values(cart).reduce((sum, qty) => sum + qty, 0)} more meals to complete your order.</p>
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

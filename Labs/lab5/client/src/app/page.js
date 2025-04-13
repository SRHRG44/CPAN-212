'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

    return (
      <div className={styles.page}>
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <div className={styles.main}>
              <h1 className={styles.title}>Welcome to Your Food Prep Paradise!</h1>
              <p className={styles.description}>
                  Get delicious and healthy meals prepared just the way you like them.
                  Choose your favorite recipes and customize your weekly or monthly meal plan.
              </p>
              <div className={styles.ctas}>
                  <Link href="/order" className={styles.primary}>Start Your Order</Link>
                  <Link href="/recipes" className={styles.secondary}>View Our Recipes</Link>
              </div>

              {!isLoggedIn && (
                  <div className={styles.authLinks}>
                      <p className={styles.authPrompt}>Ready to get started?</p>
                      <Link href="/register" className={styles.authLink}>Register</Link>
                      <span className={styles.orText}>or</span>
                      <Link href="/login" className={styles.authLink}>Login</Link>
                  </div>
              )}
          </div>
          <Footer />
      </div>
  );
}
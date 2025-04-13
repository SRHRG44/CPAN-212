'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './register.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    console.log('Submitting registration with:', { username, email, password });
    try {
      const response = await fetch('http://localhost:8001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response && response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        router.push('/order');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.registerPage}> {/* Apply CSS Module class */}
      <Navbar />
      <div className={styles.container}> {/* Apply CSS Module class */}
        <h2 className={styles.heading}>Register</h2> {/* Apply CSS Module class */}
        {error && <p className={styles.errorMessage}>{error}</p>} {/* Apply CSS Module class */}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}> {/* Apply CSS Module class */}
            <label htmlFor="username" className={styles.label}>Username:</label> {/* Apply CSS Module class */}
            <input type="text" id="username" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} required /> {/* Apply CSS Module class */}
          </div>
          <div className={styles.formGroup}> {/* Apply CSS Module class */}
            <label htmlFor="email" className={styles.label}>Email:</label> {/* Apply CSS Module class */}
            <input type="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required /> {/* Apply CSS Module class */}
          </div>
          <div className={styles.formGroup}> {/* Apply CSS Module class */}
            <label htmlFor="password" className={styles.label}>Password:</label> {/* Apply CSS Module class */}
            <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Apply CSS Module class */}
          </div>
          <button type="submit" className={styles.submitButton}> {/* Apply CSS Module class */}
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
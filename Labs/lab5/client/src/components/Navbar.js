'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);

        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('authToken');
            setIsLoggedIn(!!updatedToken);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogoutClick = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link href="/" className="text-gray-700 hover:text-green-600 font-semibold">Home</Link>
                {!isLoggedIn && (
                    <>
                        <Link href="/register" className="text-gray-700 hover:text-green-600">Register</Link>
                        <Link href="/login" className="text-gray-700 hover:text-green-600">Login</Link>
                    </>
                )}
                <Link href="/feedback" className="text-gray-700 hover:text-green-600">Feedback</Link>
                <Link href="/order" className="text-gray-700 hover:text-green-600">Order Now</Link>
                <Link href="/recipes" className="text-gray-700 hover:text-green-600">Recipes</Link>
                {isLoggedIn && (
                    <button
                        onClick={handleLogoutClick}
                        style={{
                            color: 'var(--accent-light-blue)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            transition: 'color 0.3s ease',
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
            <button className={styles.mobileMenuButton}>☰</button>
        </nav>
    );
}
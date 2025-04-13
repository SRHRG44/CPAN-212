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

    return (
        <div className={`min-h-screen bg-gray-100 flex flex-col ${styles.page}`}>
            <Navbar isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn to Navbar */}
            <div className="container mx-auto text-center py-16 flex-grow">
                <h1 className="text-4xl font-bold text-green-600 mb-8">Welcome to Your Food Prep Paradise!</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Get delicious and healthy meals prepared just the way you like them.
                    Choose your favorite recipes and customize your weekly or monthly meal plan.
                </p>
                <div className={styles.ctas}>
                    <Link href="/order" className="primary">
                        Start Your Order
                    </Link>
                    <Link href="/recipes" className="secondary">
                        View Our Recipes
                    </Link>
                </div>
                {/* Conditionally render this section */}
                {!isLoggedIn && (
                    <div className={styles.authLinks}>
                        <p className="text-lg text-gray-700">Ready to get started?</p>
                        <Link href="/register" className="">Register</Link>
                        <span>or</span>
                        <Link href="/login" className="">Login</Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

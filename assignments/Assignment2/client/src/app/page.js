"use client";
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Recipe App</h1>

        <p className={styles.description}>
          Welcome to your recipe collection!
        </p>

        <div className={styles.grid}>
          <Link href="/pages" className={styles.card}>
            <h2>View Recipes &rarr;</h2>
            <p>Browse and manage your delicious recipes.</p>
          </Link>

          <Link href="/pages/new" className={styles.card}>
            <h2>Add Recipe &rarr;</h2>
            <p>Add a new recipe to your collection.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Created by Sergio Romero n00466753
        </p>
      </footer>
    </div>
  );
}
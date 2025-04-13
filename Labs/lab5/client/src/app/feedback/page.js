'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './feedback.module.css';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setSubmissionStatus('error');
        setErrorMessage(errorData.message || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error('Feedback submission error:', err);
      setSubmissionStatus('error');
      setErrorMessage('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.feedbackPage}>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.heading}>Send Us Your Feedback</h2>
        {submissionStatus === 'success' && (
          <p className={styles.successMessage}>Thank you for your feedback!</p>
        )}
        {submissionStatus === 'error' && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input type="text" id="name" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input type="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message:</label>
            <textarea id="message" rows="5" className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
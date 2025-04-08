import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css'; // Import the CSS module

export default function HomePage() {
  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col ${styles.page}`}> {/* Apply the .page style */}
      <Navbar />
      <div className="container mx-auto text-center py-16 flex-grow">
        <h1 className="text-4xl font-bold text-green-600 mb-8">Welcome to Your Food Prep Paradise!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Get delicious and healthy meals prepared just the way you like them.
          Choose your favorite recipes and customize your weekly or monthly meal plan.
        </p>
        <div className={styles.ctas}> {/* Apply the .ctas style for the button container */}
          <Link href="/order" className="primary"> {/* Use the .primary style from CSS module */}
            Start Your Order
          </Link>
          <Link href="/recipes" className="secondary"> {/* Use the .secondary style from CSS module */}
            View Our Recipes
          </Link>
        </div>
        <div className={styles.authLinks}> {/* Apply the .authLinks style for the register/login links */}
          <p className="text-lg text-gray-700">Ready to get started?</p>
          <Link href="/register" className="">Register</Link>
          <span>or</span>
          <Link href="/login" className="">Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

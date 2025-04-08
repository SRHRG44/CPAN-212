import Link from 'next/link';
import styles from './Navbar.module.css'; // Import the CSS module

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
  {/* <div className={styles.logo}>Your Logo</div> */}
  <div className={styles.navLinks}>
        <Link href="/" className="text-gray-700 hover:text-green-600 font-semibold">Home</Link>
        <Link href="/register" className="text-gray-700 hover:text-green-600">Register</Link>
        <Link href="/login" className="text-gray-700 hover:text-green-600">Login</Link>
        <Link href="/feedback" className="text-gray-700 hover:text-green-600">Feedback</Link>
        <Link href="/order" className="text-gray-700 hover:text-green-600">Order Now</Link>
        <Link href="/recipes" className="text-gray-700 hover:text-green-600">Recipes</Link>
      </div>
      <button className={styles.mobileMenuButton}>☰</button>
    </nav>
  );
}
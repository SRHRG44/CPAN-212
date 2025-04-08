import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-around">
        <Link href="/" className="text-gray-700 hover:text-green-600 font-semibold">Home</Link>
        <Link href="/register" className="text-gray-700 hover:text-green-600">Register</Link>
        <Link href="/login" className="text-gray-700 hover:text-green-600">Login</Link>
        <Link href="/feedback" className="text-gray-700 hover:text-green-600">Feedback</Link>
        <Link href="/order" className="text-gray-700 hover:text-green-600">Order Now</Link>
        <Link href="/recipes" className="text-gray-700 hover:text-green-600">Recipes</Link>
      </div>
    </nav>
  );
}
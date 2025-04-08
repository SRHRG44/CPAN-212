import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto text-center py-16 flex-grow">
        <h1 className="text-4xl font-bold text-green-600 mb-8">Welcome to Your Food Prep Paradise!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Get delicious and healthy meals prepared just the way you like them.
          Choose your favorite recipes and customize your weekly or monthly meal plan.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/order" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
            Start Your Order
          </Link>
          <Link href="/recipes" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            View Our Recipes
          </Link>
        </div>
        <div className="mt-8 text-lg text-gray-700">
          <p>Ready to get started?</p>
          <Link href="/register" className="text-green-600 hover:underline mr-4">Register</Link>
          <span>or</span>
          <Link href="/login" className="text-blue-600 hover:underline ml-4">Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">📚 Welcome to Book Review App</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Discover new reads, write reviews, and keep track of books you want to read.
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 shadow-md transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;

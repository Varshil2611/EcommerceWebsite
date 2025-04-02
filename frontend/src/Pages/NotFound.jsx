import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Animated 404 Number */}
      <h1 className="text-9xl font-extrabold text-gray-900 animate-pulse">404</h1>

      {/* Message */}
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center px-6">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/home"
        className="mt-6 px-6 py-3 bg-gray-900 text-white text-lg rounded-full shadow-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
      >
        Go Home
      </Link>

    </div>
  );
}

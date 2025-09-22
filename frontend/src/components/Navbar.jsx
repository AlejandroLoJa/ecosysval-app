import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center py-4 bg-transparent">
      <div className="flex space-x-6 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
        <Link
          to="/login"
          className="text-gray-900 font-semibold px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="text-gray-900 font-semibold px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Registro
        </Link>

        <Link
          to="/subscribe"
          className="text-gray-900 font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300"
        >
          Suscribirse
        </Link>
      </div>
    </nav>
  );
}

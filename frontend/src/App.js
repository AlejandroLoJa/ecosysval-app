import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 p-4 shadow">
        <ul className="flex list-none space-x-6 justify-center">
          <li>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Registro
            </Link>
          </li>
          <li>
            <Link
              to="/subscribe"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Suscríbete
            </Link>
          </li>
        </ul>
      </nav>



      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </Router>
  );
}

export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


// Navbar en components
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import Perfil from "./pages/Perfil";

function AppContent() {
  const location = useLocation();

  // Obtenemos usuario desde localStorage
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = !!storedUser; // true si existe usuario

  // Rutas donde queremos mostrar el Navbar
  const showNavbar =
    !isLoggedIn &&
    (location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/subscribe");

  return (
    <>
      {/* Solo mostramos Navbar si el usuario NO está logueado */}
      {showNavbar && <Navbar />}

      {/* Contenido de las páginas */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/perfil" element={<Perfil />} />

        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navbar en components
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      {/* Menú de navegación */}
      <Navbar />

      {/* Contenido de cada página */}
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Redirección inicial a Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas principales */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

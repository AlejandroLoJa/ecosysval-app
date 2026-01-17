import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Navbar en components
import Navbar from "./components/Navbar";

// Pages
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import Perfil from "./pages/Perfil";
import MapaPage from "./pages/MapaPage";
import Cursos from "./pages/Cursos";
import FormularioComercio from "./pages/FormularioComercio";
import Recompensas from "./pages/Recompensas";
import TopMundial from "./pages/TopMundial";
import Notificaciones from "./pages/Notificaciones";
import Mensajes from "./pages/Mensajes";
import Empleos from "./pages/Empleos";

function AppContent() {
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const isLoggedIn = !!storedUser;

  const showNavbar =
    !isLoggedIn &&
    (location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/subscribe");

  return (
    <>
      {showNavbar && <Navbar />}

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/formulario-comercio/:empresaId" element={<FormularioComercio />}/>
          <Route path="/recompensas" element={<Recompensas />} />
          <Route path="/top-mundial" element={<TopMundial />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/empleos" element={<Empleos />} />
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

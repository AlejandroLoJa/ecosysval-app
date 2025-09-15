import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // 🔑 Guardamos token
        localStorage.setItem("token", data.access_token);

        // 🔑 Guardamos el usuario que viene del backend
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirigir al perfil
        window.location.href = "/profile";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };



  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      <header className="p-6">
        <h1 className="text-xl font-bold text-gray-800">ECOSYSVAL</h1>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div
          className="w-full max-w-md rounded-lg shadow-lg p-8"
          style={{ backgroundColor: "transparent" }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Inicio de sesión
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-red-600 mt-4">{message}</p>
          )}

          <p className="text-center text-sm text-gray-800 mt-6">
            ¿No está registrado?{" "}
            <a href="/register" className="text-blue-800 hover:underline">
              Créese una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;




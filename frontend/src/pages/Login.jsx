import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 Para mostrar/ocultar contraseña
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

      const data = await res.json();
      console.log("Respuesta del backend:", data); // 👈 Depuración

      if (res.ok) {
        // Guardar token y datos de usuario en localStorage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/profile"); // Redirigir al perfil
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/fondo.png')" }}
    >
      {/* Header */}
      <header className="p-6">
        <h1 className="text-xl font-bold text-gray-800">ECOSYSVAL</h1>
      </header>

      {/* Contenedor principal */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-lg shadow-lg p-8" style={{ backgroundColor: "transparent" }}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Inicio de sesión
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo de correo electrónico */}
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

            {/* Campo de contraseña con botón de mostrar/ocultar */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Botón de inicio de sesión */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Mensaje de error */}
          {message && (
            <p className="text-center text-sm text-red-600 mt-4">{message}</p>
          )}

          {/* Link para registro */}
          <p className="text-center text-sm text-gray-800 mt-6">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-800 hover:underline">
              Crear una cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

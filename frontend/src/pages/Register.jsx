import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    // Expresión regular básica para emails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (name.trim().length < 3) {
      setMessage("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Ingrese un correo válido.");
      return;
    }
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("Usuario registrado correctamente!");
        setName(""); setEmail(""); setPassword("");
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.message || "No se pudo registrar el usuario"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/fondo.png')" }}>
      <header className="p-6">
        <h1 className="text-xl font-bold text-gray-800">ECOSYSVAL</h1>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-lg shadow-lg p-8" style={{ backgroundColor: "transparent" }}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear cuenta</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Nombre completo</label>
              <input
                type="text"
                placeholder="Escriba su nombre"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Contraseña con ojito */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-800 mb-1">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Registrarse
            </button>
          </form>

          {message && <p className="text-center text-sm text-red-600 mt-4">{message}</p>}

          <p className="text-center text-sm text-gray-800 mt-6">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-blue-800 hover:underline">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

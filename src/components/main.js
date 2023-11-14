import React, { useState, useEffect } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

function Index() {
  const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombre_completo"));
  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const [mensaje] = useState("¡Gracias por usar nuestra aplicación!");
  const [darkMode, setDarkMode] = useState(false);

  // Actualizar los valores cuando se produce un cambio en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setNombreUsuario(localStorage.getItem("nombre_completo"));
      setRol(localStorage.getItem("rol"));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.style.setProperty('background-color', '#1a202c');
      document.body.style.setProperty('color', '#f7fafc');
    } else {
      document.body.style.setProperty('background-color', '#f7fafc');
      document.body.style.setProperty('color', '#1a202c');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-3">{`¡Bienvenido, ${nombreUsuario}!`}</h1>
      <h2 className="text-2xl font-semibold mb-3">{rol}</h2>
      <p className="text-lg">{mensaje}</p>

      <div className="flex items-center mt-6">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md shadow-md mr-4"
        >
          Alternar Modo Oscuro/Claro
        </button>
        {darkMode ? <IoMdMoon className="text-3xl" /> : <IoMdSunny className="text-3xl" />}
      </div>
    </div>
  );
}

export default Index;
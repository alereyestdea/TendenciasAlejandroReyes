import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar las variables de localStorage
    localStorage.removeItem('nombre_completo');
    localStorage.removeItem('cedula');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Cerrando sesión...</p>
      {/* Puedes agregar un mensaje de cierre de sesión u otra información si lo deseas */}
    </div>
  );
};

export default Logout;

import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Importa useHistory de react-router-dom
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los iconos de ojo

const Login = () => {
  const navigate = useNavigate(); // Obtén el objeto history

  const [formData, setFormData] = useState({
    nombre_usuario: '',
    contrasena: '',
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Agrega el estado para mostrar/ocultar la contraseña

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/clinicaApp/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const {nombre_completo,token, rol, cedula } = data;

        // Almacena el token y el rol en localStorage
        localStorage.setItem('nombre_completo', nombre_completo);
        localStorage.setItem('cedula', cedula);
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
        

        // Redirige al usuario a la página adecuada según su rol
        if (rol === 'Recursos Humanos') {
            navigate('/rh');

        } else if (rol === 'Personal administrativo') {
            navigate('/pa'); // Redirige al path '/pa'
        } else if (rol === 'Enfermera') {
          navigate('/en'); // Redirige al path '/pa'
        } else if (rol === 'Médico') {
          navigate('/me'); // Redirige al path '/pa'
  
        } else {
          // Puedes agregar más redirecciones para otros roles aquí
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error en la solicitud');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Clinica Reyes</h1>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Sesión</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_usuario">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="nombre_usuario"
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasena">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado de showPassword
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 pr-10" // Agrega un padding derecho para el botón
            />
            <button
              type="button"
              className="absolute top-3 right-0 h-full w-10 text-gray-400 hover:text-gray-600 flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)} // Cambia el estado de showPassword al hacer clic en el botón
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Muestra el icono de ojo según el estado de showPassword */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

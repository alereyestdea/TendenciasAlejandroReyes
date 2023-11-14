import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
const AuthGuard = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line
  }, []);

  const validateToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Si no hay token, redirige al inicio de sesión.
      navigate('/');
      return;
    }

    const decodedToken = decodeJwt(token);  // Decodifica el token
    if (!decodedToken) {
      // Si no se puede decodificar el token, redirige al inicio de sesión.
      navigate('/');
      return;
    }

    const expirationTime = decodedToken.exp * 1000;  // Convierte la expiración en milisegundos
    const currentTime = Date.now();

    if (currentTime < expirationTime) {
      // El token es válido, permite el acceso.
      const userRole = decodedToken.rol; // Obtiene el rol del token
      if (allowedRoles.includes(userRole)) {
        setIsTokenValid(true);
      } else {
        // El rol no es válido para esta ruta, redirige al inicio de sesión.
        navigate('/');
      }
    } else {
      // El token ha caducado, redirige al inicio de sesión.
      navigate('/');
    }
  };

  // Función para decodificar el token
  const decodeJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  };

  if (isTokenValid === null) {
    return <p>Validando token...</p>;
  }

  return isTokenValid && children;
};

export default AuthGuard;

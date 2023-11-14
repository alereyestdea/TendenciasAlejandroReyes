import React, { useEffect, useState } from "react";
import Formulario from "../Formulario";
import { useNavigate } from "react-router-dom";
import * as usuariosServer from "./usuariosServer";
import { useParams } from "react-router-dom";

function RegistroUsuario() {
  const params = useParams();
  const [usuario, setUsuario] = useState({
    nombre_completo: "",
    cedula: "",
    correo: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    rol: "",
    nombre_usuario: "",
    contrasena: "",
  });
  const [error, setError] = useState(null); // Estado para almacenar el mensaje de error
  const [success, setSuccess] = useState(null); // Estado para almacenar el mensaje de éxito

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extrae la fecha de nacimiento en formato 'YYYY-MM-DD'
    const fechaFormateada = usuario.fecha_nacimiento.split("T")[0];

    // Actualiza el valor de la fecha de nacimiento en el objeto de usuario
    setUsuario({
      ...usuario,
      fecha_nacimiento: fechaFormateada,
    });

    // Ahora puedes enviar el objeto 'usuario' al servidor con la fecha formateada
    //console.log(usuario);

    try {
      let res;
      if(!params.cedula){
        res = await usuariosServer.createUsuario(usuario);
        const data = await res.json();
        if (res.status === 200 && data.mensaje === 'success'){
          setSuccess('Usuario creado con exito'); // Almacena el mensaje de éxito en el estado
          setError(null); // Limpia el mensaje de error
          setTimeout(() => {
            setSuccess(null); // Limpia el mensaje de éxito después de 3 segundos
            window.location.reload();
          }, 3000);
        } else {
          setError(data.mensaje); // Almacena el mensaje de error en el estado
          setSuccess(null); // Limpia el mensaje de éxito
        }
      }
      else{
        res = await usuariosServer.updateUsuario(params.cedula,usuario);
        const data = await res.json();
        if (res.status === 200 && data.mensaje === 'success'){
          setSuccess('Usuario actualizado con exito'); // Almacena el mensaje de éxito en el estado
          setError(null); // Limpia el mensaje de error
          setTimeout(() => {
            setSuccess(null); // Limpia el mensaje de éxito después de 3 segundos
            window.location.reload();
          }, 3000);
        } else {
          setError(data.mensaje); // Almacena el mensaje de error en el estado
          setSuccess(null); // Limpia el mensaje de éxito
        }
      }
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error al procesar la solicitud"); // Almacena el mensaje de error en el estado
      setSuccess(null); // Limpia el mensaje de éxito
    }
  };

  const getUsuario = async (cedula) => {
    try {
      const res = await usuariosServer.getUsuario(cedula);
      const data = await res.json();
      setUsuario(data.usuario); // Establece los datos del usuario en el estado de usuario
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error al procesar la solicitud"); // Almacena el mensaje de error en el estado
      setSuccess(null); // Limpia el mensaje de éxito
    }
  };

  useEffect(() => {
    if (params.cedula) {
      getUsuario(params.cedula);
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        {params.cedula ? "Editar Usuario" : "Nuevo Usuario"}
      </h1>
      <p className="mt-3">Llena todos los campos</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {error && ( // Muestra la alerta de error solo si hay un mensaje de error
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.25 1.25 0 0 1-1.768 1.768l-2.58-2.58-2.58 2.58a1.25 1.25 0 1 1-1.768-1.768l2.58-2.58-2.58-2.58a1.25 1.25 0 1 1 1.768-1.768l2.58 2.58 2.58-2.58a1.25 1.25 0 1 1 1.768 1.768l-2.58 2.58 2.58 2.58z"/></svg>
            </span>
          </div>
        )}
        {success && ( // Muestra la alerta de éxito solo si hay un mensaje de éxito
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{success}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setSuccess(null)} className="fill-current h-6 w-6 text-green-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.25 1.25 0 0 1-1.768 1.768l-2.58-2.58-2.58 2.58a1.25 1.25 0 1 1-1.768-1.768l2.58-2.58-2.58-2.58a1.25 1.25 0 1 1 1.768-1.768l2.58 2.58 2.58-2.58a1.25 1.25 0 1 1 1.768 1.768l-2.58 2.58 2.58 2.58z"/></svg>
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Formulario onInputChange={onInputChange} usuario={usuario} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 rounded"
            value={params.cedula ? "Actualizar Usuario" : "Registrar Usuario"}
          />
        </form>
      </div>
    </>
  );
}

export default RegistroUsuario;
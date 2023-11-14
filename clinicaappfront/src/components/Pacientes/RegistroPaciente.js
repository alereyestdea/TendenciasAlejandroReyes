import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pacientesServer from "./pacientesServer";
import { useParams } from "react-router-dom";
import FormularioPA from "./Formulariopa";

function RegistroPaciente() {
  const params = useParams();
  const [paciente, setPaciente] = useState({
    nombre_completo: "",
    cedula: "",
    fecha_nacimiento: "",
    genero: "",
    direccion: "",
    telefono: "",
    correo: "",
    nombre_contacto_emergencia: "",
    relacion_paciente: "",
    nro_contact_emer: "",
    nombre_seguro: "",
    nro_poliza: "",
    estadopoliza: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaFormateada = paciente.fecha_nacimiento.split("T")[0];
    setPaciente({
      ...paciente,
      fecha_nacimiento: fechaFormateada,
    });

    try {
      let res;
      if (!params.cedula) {
        res = await pacientesServer.createpaciente(paciente);
      } else {
        res = await pacientesServer.updatepaciente(params.cedula, paciente);
      }

      const data = await res.json();
      if (res.status === 200 && data.mensaje === 'success') {
        const successMessage = !params.cedula ? 'Paciente creado con éxito' : 'Paciente actualizado con éxito';
        setSuccess(successMessage);
        setError(null);
        setTimeout(() => {
          setSuccess(null);
          window.location.reload();
        }, 3000);
      } else {
        setError(data.mensaje);
        setSuccess(null);
      }
    } catch (error) {
      console.log(error);
      setError("Ocurrió un error al procesar la solicitud");
      setSuccess(null);
    }
  };

const getpaciente = async (cedula) => {
  try {
    const res = await pacientesServer.getpaciente(cedula);
    const data = await res.json();

    if (data.mensaje === 'success' && data.usuario) {
      const userData = data.usuario;

      setPaciente({
        nombre_completo: userData.nombre_completo || '',
        cedula: userData.cedula || '',
        fecha_nacimiento: userData.fecha_nacimiento || '',
        genero: userData.genero || '',
        direccion: userData.direccion || '',
        telefono: userData.telefono || '',
        correo: userData.correo || '',
        nombre_contacto_emergencia: userData.nombre_contacto_emergencia || '',
        relacion_paciente: userData.relacion_paciente || '',
        nro_contact_emer: userData.nro_contact_emer || '',
        nombre_seguro: userData.nombre_seguro || '',
        nropoliza: userData.nropoliza || '',
        estadopoliza: userData.estadopoliza || '',
        // Asegúrate de agregar los demás campos si existen
      });

      // Imprime el estado del paciente en la consola
    }
  } catch (error) {
    console.log(error);
    setError("Ocurrió un error al procesar la solicitud");
    setSuccess(null);
  }
};

  useEffect(() => {
    if (params.cedula) {
      getpaciente(params.cedula);
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        {params.cedula ? "Editar paciente" : "Nuevo paciente"}
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
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.25 1.25 0 0 1-1.768 1.768l-2.58-2.58-2.58 2.58a1.25 1.25 0 1 1-1.768-1.768l2.58-2.58-2.58-2.58a1.25 1.25 0 1 1 1.768-1.768l2.58 2.58 2.58-2.58a1.25 1.25 0 1 1 1.768 1.768l-2.58 2.58 2.58 2.58z"/></svg>
            </span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Éxito: </strong>
            <span className="block sm:inline">{success}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setSuccess(null)} className="fill-current h-6 w-6 text-green-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.25 1.25 0 0 1-1.768 1.768l-2.58-2.58-2.58 2.58a1.25 1.25 0 1 1-1.768-1.768l2.58-2.58-2.58-2.58a1.25 1.25 0 1 1 1.768-1.768l2.58 2.58 2.58-2.58a1.25 1.25 0 1 1 1.768 1.768l-2.58 2.58 2.58 2.58z"/></svg>
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
        <FormularioPA onInputChange={onInputChange} paciente={paciente ? paciente : {}} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 rounded"
            value={params.cedula ? "Actualizar paciente" : "Registrar paciente"}
          />
        </form>
      </div>
    </>
  );
}

export default RegistroPaciente;

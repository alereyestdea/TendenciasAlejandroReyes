// RegistroVisita.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as visitasServer from "./visitasServer";
import { useParams } from "react-router-dom";
import FormularioEN from "../FormularioEn";

const RegistroVisita = () => {
  const params = useParams();
  const [visita, setVisita] = useState({
    cedula_paciente: "",
    presion_arterial: "",
    temperatura: "",
    pulso: "",
    nivel_oxigeno: "",
    medicamentos_administrados: "",
    pruebas_realizadas: "",
    observaciones: "",
    recordatorio_visita: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setVisita((prevVisita) => ({ ...prevVisita, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await visitasServer.registrarVisita(visita);

      if (response.ok) {
        const data = await response.json();
        if (data.mensaje === 'success') {
          setSuccess('Visita registrada con éxito');
          setError(null);
          setTimeout(() => {
            setSuccess(null);
            window.location.reload();
          }, 3000);
        } else {
          setError(data.mensaje);
          setSuccess(null);
        }
      } else {
        setError('Error en la solicitud');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Ocurrió un error al procesar la solicitud');
      setSuccess(null);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        {params.cedula ? "Editar visita" : "Nueva visita"}
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
          <FormularioEN onInputChange={onInputChange} formData={visita} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 rounded"
            value={params.cedula ? "Actualizar visita" : "Registrar visita"}
          />
        </form>
      </div>
    </>
  );
};

export default RegistroVisita;

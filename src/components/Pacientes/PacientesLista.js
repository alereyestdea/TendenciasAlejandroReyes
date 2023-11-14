import React, { useState } from 'react';
import PacientesList from './PacientesList';
import * as pacientesServer from "./pacientesServer";
import ConfirmModal from '../confirmacionpa';
import { useNavigate } from "react-router-dom";

function PacientesLista() {
    const pacientes = PacientesList() || [];
    const [showModal, setShowModal] = useState(false);
    const [pacienteToDelete, setPacienteToDelete] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const navigate = useNavigate();
    const handleDelete = (cedula) => {
        setPacienteToDelete(cedula);
        setShowModal(true);
      };
      
      const confirmDelete = async () => {
        // Obtiene el token de autenticación del localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          // Maneja el caso en el que el token no está disponible, por ejemplo, redirigiendo a la página de inicio de sesión
          navigate('/');
          return;
        }
      
        try {
          // Realiza la solicitud de eliminación con el token en el encabezado
          await pacientesServer.deletePaciente(pacienteToDelete, token);
          setShowModal(false);
          
          // Recarga la lista después de la eliminación
          window.location.reload();
        } catch (error) {
          // Maneja cualquier error, por ejemplo, mostrando un mensaje de error
          console.error('Error al eliminar paciente:', error);
        }
      };
      
    const esEnfermera = localStorage.getItem("rol") === "Enfermera";

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Pacientes</h1>
            <p className='mt-3'>Administrar Pacientes</p>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
            {pacientes.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Cedula</th>
                            <th className='p-2'>Contacto</th>
                            <th className='p-2'>Seguro</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pacientes.map(paciente => (
    <tr className='border-b' key={paciente.cedula}>
        <td className='p-6'>
            <p className='text-2xl text-gray-800'>{paciente.nombre_completo}</p>
        </td>
        <td className='p-6'>
            {paciente.cedula}
        </td>
        <td className='p-6'>
            <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'>Email: </span>{paciente.correo}</p>
            <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'>Telefono: </span>{paciente.telefono}</p>
        </td>
        <td className='p-6'>
            {paciente.nombre_seguro}
        </td>
        <td className='p-6 flex gap-3'>
            {!esEnfermera && ( // Aquí verificamos el rol para mostrar los botones Editar y Eliminar
                <>
                    <button onClick={() => navigate(`/pa/actualizarPaciente/${paciente.cedula}`)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Editar</button>
                    <button onClick={() => paciente.cedula && handleDelete(paciente.cedula)} className='bg-red-800 hover:bg-red-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Eliminar</button>
                </>
            )}
            <button onClick={() => {
                setSelectedPaciente(paciente);
                setShowDetails(true);
            }} className='bg-green-800 hover:bg-green-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Ver detalles</button>
        </td>
    </tr>
))}

                    </tbody>
                </table>
            ) : (
                <p className='text-center mt-10'>No hay pacientes registrados</p>
            )}
            {showDetails && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-5 rounded-lg'>
                        <h2 className='text-2xl font-bold mb-3'>{selectedPaciente.nombre_completo}</h2>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>ID Paciente: </span>{selectedPaciente.id}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Cedula: </span>{selectedPaciente.cedula}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Email: </span>{selectedPaciente.correo}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Fecha de nacimiento: </span>{selectedPaciente.fecha_nacimiento}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Genero: </span>{selectedPaciente.genero}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Telefono: </span>{selectedPaciente.telefono}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Direccion: </span>{selectedPaciente.direccion}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Nombre Contacto Emergencia: </span>{selectedPaciente.nombre_contacto_emergencia}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Relacion con el paciente: </span>{selectedPaciente.relacion_paciente}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Numero contacto de emergencia: </span>{selectedPaciente.nro_contact_emer}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Seguro: </span>{selectedPaciente.nombre_seguro}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Nro Poliza: </span>{selectedPaciente.nropoliza}</p>
                        <p>
                        <span className="font-bold">Estado de póliza:</span>{" "}
                        {selectedPaciente.estadopoliza ? "Activa" : "Inactiva"}
                        </p>
                        <button onClick={() => setShowDetails(false)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PacientesLista;
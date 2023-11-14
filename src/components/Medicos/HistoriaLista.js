import React, { useState } from 'react';
import HistoriaList from './HistoriaList';

function HistoriaLista() {
    const historias = HistoriaList() || [];
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

  
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Historias Clinicas</h1>
            {historias.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Cedula Paciente</th>
                            <th className='p-2'>Cedula Medico</th>
                            <th className='p-2'>Motivo Consulta</th>
                            <th className='p-2'>Sintomatología</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historias.map(historia => (
                            <tr className='border-b' key={historia.cedula_paciente}>
                            <td className='p-6'>
                            <p className='text-2xl text-gray-800'>{historia.cedula_paciente}</p>
                            </td>
                                <td className='text-2xl text-gray-800'>
                                    {historia.cedula_medico}
                                </td>
                                <td className='text-2xl text-gray-800'>
                                <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'></span>{historia.motivo_consulta}</p>

                                </td>
                                <td className='text-2xl text-gray-800'>
                                    {historia.sintomatologia}
                                </td>
                                <td className='p-6 flex gap-3'>
                                    <button onClick={() => {
                                        setSelectedUser(historia);
                                        setShowDetails(true);
                                    }} className='bg-green-800 hover:bg-green-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Ver detalles</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center mt-10'>No hay historia registrados</p>
            )}
{showDetails && (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-5 rounded-lg'>
            <h2 className='text-2xl font-bold mb-3'>{selectedUser.nombre_completo}</h2>

            {selectedUser.fecha && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Fecha: </span>{selectedUser.fecha}</p>}
            {selectedUser.cedula_paciente && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Cedula Paciente: </span>{selectedUser.cedula_paciente}</p>}
            {selectedUser.cedula_medico && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Cedula Medico: </span>{selectedUser.cedula_medico}</p>}
            {selectedUser.motivo_consulta && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Motivo Consulta: </span>{selectedUser.motivo_consulta}</p>}
            {selectedUser.sintomatologia && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Sintomatologia: </span>{selectedUser.sintomatologia}</p>}
            {selectedUser.diagnostico && <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Diagnostico: </span>{selectedUser.diagnostico}</p>}

            {/* Medicamentos */}
            {selectedUser.medicamentos && selectedUser.medicamentos.length > 0 && (
                <>
                    <p className='text-gray-800 font-bold mb-2'>Medicamentos:</p>
                    <ul className='list-disc list-inside'>
                        {selectedUser.medicamentos.map((medicamento, index) => (
                            <li key={index}>
                                {medicamento.nombre}
                                {medicamento.dosis && <span className='ml-2'>Dosis: {medicamento.dosis}</span>}
                                {medicamento.duracion_tratamiento && <span className='ml-2'>Duración Tratamiento: {medicamento.duracion_tratamiento}</span>}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Procedimientos */}
            {selectedUser.procedimientos && selectedUser.procedimientos.length > 0 && (
                <>
                    <p className='text-gray-800 font-bold mb-2'>Procedimientos:</p>
                    <ul className='list-disc list-inside'>
                        {selectedUser.procedimientos.map((procedimiento, index) => (
                            <li key={index}>
                                {procedimiento.nombre}
                                {procedimiento.cantidad && <span className='ml-2'>Cantidad: {procedimiento.cantidad}</span>}
                                {procedimiento.frecuencia && <span className='ml-2'>Frecuencia: {procedimiento.frecuencia}</span>}
                                {/* Agrega otros campos según sea necesario */}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Ayuda Diagnóstica */}
            {selectedUser.ayuda_diagnostica && (
                <>
                    <p className='text-gray-600 mb-3'>
                        <span className='text-gray-800 font-bold'>Numero Orden Ayuda Diagnostica: </span>
                        {selectedUser.ayuda_diagnostica.numero_orden}
                    </p>
                    <p className='text-gray-600 mb-3'>
                        <span className='text-gray-800 font-bold'>Nombre Ayuda Diagnostica: </span>
                        {selectedUser.ayuda_diagnostica.nombre}
                    </p>
                    <p className='text-gray-600 mb-3'>
                        <span className='text-gray-800 font-bold'>Cantidad Ayuda Diagnostica: </span>
                        {selectedUser.ayuda_diagnostica.cantidad}
                    </p>
                    {selectedUser.ayuda_diagnostica.requiere_asistencia !== null && (
                        <p className='text-gray-600 mb-3'>
                            <span className='text-gray-800 font-bold'>Requiere Asistencia Ayuda Diagnostica: </span>
                            {selectedUser.ayuda_diagnostica.requiere_asistencia}
                        </p>
                    )}
                </>
            )}

            <button onClick={() => setShowDetails(false)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Cerrar</button>
        </div>
    </div>
)}


        </>
    );
}

export default HistoriaLista;
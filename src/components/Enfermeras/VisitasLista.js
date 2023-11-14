import React, { useState } from 'react';
import useVisitasList from './VisitasList';

function VisitasLista() {
  const visitas = useVisitasList();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVisita, setSelectedVisita] = useState(null);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Visitas</h1>
      <p className='mt-3'>Administrar Visitas</p>
      {visitas.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Paciente ID</th>
              <th className='p-2'>Presión Arterial</th>
              <th className='p-2'>Temperatura</th>
              {/* Agrega más columnas según tus datos de visita */}
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map(visita => (
              <tr className='border-b' key={visita.id}>
                {/* Muestra los datos de la visita en las celdas */}
                <td className='p-6'>{visita.paciente_id}</td>
                <td className='p-6'>{visita.presion_arterial}</td>
                <td className='p-6'>{visita.temperatura}</td>
                {/* Agrega más celdas según tus datos de visita */}
                <td className='p-6 flex gap-3'>
                  {/* Botones de acciones (editar, eliminar, detalles) */}
                  <button onClick={() => {
                setSelectedVisita(visita);
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
                        <h2 className='text-2xl font-bold mb-3'>Detalles de visita</h2>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>ID Paciente: </span>{selectedVisita.paciente_id}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Presion Arterial: </span>{selectedVisita.presion_arterial}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Temperatura: </span>{selectedVisita.temperatura}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Pulso: </span>{selectedVisita.pulso}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Nivel de Oxigeno: </span>{selectedVisita.nivel_oxigeno}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Medicamentos Administrados: </span>{selectedVisita.medicamentos_administrados}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Pruebas realizadas: </span>{selectedVisita.pruebas_realizadas}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Observaciones: </span>{selectedVisita.observaciones}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Siguiente visita: </span>{selectedVisita.recordatorio_visita}</p>   
                                            
                        <button onClick={() => setShowDetails(false)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default VisitasLista;
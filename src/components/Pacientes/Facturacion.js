import React, { useState } from 'react';

const Facturacion = () => {
  const [cedula, setCedula] = useState('');
  const [facturaData, setFacturaData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/clinicaApp/factura/${cedula}/`);
      const data = await response.json();

      if (response.ok) {
        setFacturaData(data);
      } else {
        console.error('Error fetching data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Facturación</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                Cédula
              </label>
              <div className="mt-1">
                <input
                  id="cedula"
                  name="cedula"
                  type="text"
                  autoComplete="cedula"
                  required
                  value={cedula}
                  onChange={(event) => setCedula(event.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Facturar
              </button>
            </div>
          </form>

          {facturaData && (
            <div className="mt-6">
              <h1 className="text-2xl font-bold">Factura</h1>
              <p className="mt-2">
                <span className="font-bold">Nombre del paciente:</span> {facturaData.nombre_paciente}
              </p>
              <p className="mt-2">
                <span className="font-bold">Nombre del Doctor:</span> {facturaData.nombre_medico}
              </p>
              <p>
                <span className="font-bold">Cédula:</span> {facturaData.cedula}
              </p>
              <p>
                <span className="font-bold">Edad:</span> {facturaData.edad}
              </p>
              <p>
                <span className="font-bold">Compañía de seguro:</span> {facturaData.compania_seguro}
              </p>
              <p>
                <span className="font-bold">Número de póliza:</span> {facturaData.numero_poliza}
              </p>
              <p>
  <span className="font-bold">Medicamentos:</span> 
  <ul>
    {JSON.parse(facturaData.medicamentos).map((medicamento, index) => (
      <li key={index}>
        {medicamento.nombre_medicamento} - Costo: {medicamento.costo}
      </li>
    ))}
  </ul>
</p>

<p>
  <span className="font-bold">Procedimientos:</span> 
  <ul>
    {JSON.parse(facturaData.procedimientos).map((procedimiento, index) => (
      <li key={index}>
        {procedimiento.nombre_procedimiento} - Costo: {procedimiento.costo}
      </li>
    ))}
  </ul>
</p>

              <p>
                <span className="font-bold">Número de póliza:</span> {facturaData.numero_poliza}
              </p>
              <p>
  <span className="font-bold">Estado de póliza:</span>{" "}
  {facturaData.estado_poliza ? "Activa" : "Inactiva"}
</p>
<p>
                <span className="font-bold">Costo Total:</span> {facturaData.costo_total}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facturacion;
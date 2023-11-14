import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AsistenciasLista = () => {
    
    const [asistencias, setAsistencias] = useState([]);
    const [filtroCedula, setFiltroCedula] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        usuario_id: '',
        fecha: '',
        asistencia: false
    });
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/clinicaApp/asistencia/');
            if (response.ok) {
                const data = await response.json();
                setAsistencias(data.asistencias);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        return () => clearInterval();
    }, []);
    
    const handleFilterChange = (e) => {
        if (e.target.name === 'filtroCedula') {
            setFiltroCedula(e.target.value);
        } else if (e.target.name === 'filtroFecha') {
            setFiltroFecha(e.target.value);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleDateChange = date => {
        setSelectedDate(date);
        setFormData({
            ...formData,
            fecha: format(date, 'yyyy-MM-dd') // Formatea la fecha en el formato YYYY-MM-DD
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/clinicaApp/asistencia/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const responseData = await response.json();
                setFormData({
                    usuario_id: '',
                    fecha: '',
                    asistencia: false
                });
                fetchData(); // Realizar GET después del POST
                alert(responseData.mensaje); // Muestra el mensaje del backend
            } else {
                const errorData = await response.json();
                alert(errorData.mensaje); // Muestra el mensaje de error del backend
                console.error('Error submitting form:', errorData.mensaje);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const asistenciasFiltradas = asistencias ? asistencias.filter(asistencia => {
        if (asistencia && asistencia.usuario_id && asistencia.fecha) {
          return asistencia.usuario_id.toString().includes(filtroCedula) && asistencia.fecha.includes(filtroFecha);
        }
        return false;
      }) : [];

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="usuario_id" className="text-sm font-medium text-gray-700 mb-2">Usuario ID</label>
                        <input type="text" name="usuario_id" placeholder=" Cedula del usuario" id="usuario_id" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md mb-2" value={formData.usuario_id} onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fecha" className="text-sm font-medium text-gray-700 mb-2">Fecha</label>
                        <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md mb-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="asistencia" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            Asistio
                            <input type="checkbox" name="asistencia" id="asistencia" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block ml-2 sm:text-sm border rounded-md mb-2" checked={formData.asistencia} onChange={handleInputChange} />
                        </label>
                    </div>
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">
                        Registrar asistencia
                    </button>
                </form>
            </div>
            <div className="flex flex-col mt-8">
                <div className="w-full">
                    <label htmlFor="filtroCedula" className="sr-only">
                        Buscar por número de cédula
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="text"
                            name="filtroCedula"
                            id="filtroCedula"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Buscar por cédula"
                            value={filtroCedula}
                            onChange={handleFilterChange}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929ZM7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <label htmlFor="filtroFecha" className="sr-only">
                        Buscar por fecha
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="text"
                            name="filtroFecha"
                            id="filtroFecha"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Buscar por fecha (YYYY-MM-DD)"
                            value={filtroFecha}
                            onChange={handleFilterChange}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929ZM7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="p-2">Usuario ID</th>
                                <th className="p-2">Fecha</th>
                                <th className="p-2">Asistencia</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-400">
                            {asistenciasFiltradas.map(asistencia => (
                                <tr key={asistencia.id} className="hover:bg-gray-100">
                                    <td className="p-2">{asistencia.usuario_id}</td>
                                    <td className="p-2">{asistencia.fecha}</td>
                                    <td className="p-2">{asistencia.asistencia.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AsistenciasLista;

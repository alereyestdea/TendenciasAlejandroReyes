import React, { useState } from 'react';
import UsuariosList from './usuariosLists';
import * as usuariosServer from "./usuariosServer";
import ConfirmModal from '../confirmacion';
import { useNavigate } from "react-router-dom";

function UsuariosLista() {
    const usuarios = UsuariosList() || [];
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const handleDelete = (cedula) => {
        setUserToDelete(cedula);
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
          await usuariosServer.deleteUsuario(userToDelete, token);
          setShowModal(false);
          
          // Recarga la lista después de la eliminación
          window.location.reload();
        } catch (error) {
          // Maneja cualquier error, por ejemplo, mostrando un mensaje de error
          console.error('Error al eliminar usuario:', error);
        }
      };
      
  
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Usuarios</h1>
            <p className='mt-3'>Administrar Usuarios</p>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
            {usuarios.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Cedula</th>
                            <th className='p-2'>Contacto</th>
                            <th className='p-2'>Rol</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr className='border-b' key={usuario.cedula}>
                            <td className='p-6'>
                            <p className='text-2xl text-gray-800'>{usuario.nombre_completo}</p>
                            </td>
                                <td className='p-6'>
                                    {usuario.cedula}
                                </td>
                                <td className='p-6'>
                                <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'>Email: </span>{usuario.correo}</p>
                                <p className='text-gray-600'> <span className='text-gray-800 uppercase font-bold'>Telefono: </span>{usuario.telefono}</p>

                                </td>
                                <td className='p-6'>
                                    {usuario.rol}
                                </td>
                                <td className='p-6 flex gap-3'>
                                    <button onClick={()=>navigate(`/rh/actualizarUsuario/${usuario.cedula}`)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Editar</button>
                                    <button onClick={()=>usuario.cedula && handleDelete(usuario.cedula)} className='bg-red-800 hover:bg-red-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Eliminar</button>
                                    <button onClick={() => {
                                        setSelectedUser(usuario);
                                        setShowDetails(true);
                                    }} className='bg-green-800 hover:bg-green-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Ver detalles</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='text-center mt-10'>No hay usuarios registrados</p>
            )}
            {showDetails && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-5 rounded-lg'>
                        <h2 className='text-2xl font-bold mb-3'>{selectedUser.nombre_completo}</h2>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Cedula: </span>{selectedUser.cedula}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Email: </span>{selectedUser.correo}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Telefono: </span>{selectedUser.telefono}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Direccion: </span>{selectedUser.direccion}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Rol: </span>{selectedUser.rol}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Nombre usuario: </span>{selectedUser.nombre_usuario}</p>
                        <p className='text-gray-600 mb-3'><span className='text-gray-800 font-bold'>Contraseña: </span>{selectedUser.contrasena}</p>
                        <button onClick={() => setShowDetails(false)} className='bg-blue-800 hover:bg-blue-700 px-4 py-2 inline-block text-white rounded transition duration-200'>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UsuariosLista;
import { Outlet, Link, useLocation } from 'react-router-dom'

function LayoutPa() {
    const location = useLocation();
    
    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">Clinica Reyes</h2>
                <nav className="mt-10">
                <Link to ="/pa/" className="block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Inicio</Link>
                <Link to="/pa/pacientes" className={`${location.pathname === '/pa/pacientes' ? 'text-blue-300' : 'text-white'} block font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Pacientes</Link>
                <Link to ="/pa/pacientes/nuevo" className={`${location.pathname === '/pa/pacientes/nuevo' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Nuevo Paciente</Link>
                <Link to ="/pa/facturacion/" className={`${location.pathname === '/pa/facturacion/' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Facturacion</Link>
                <Link to ="/pa/logout" className={`${location.pathname === '/pa/logout' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Cerrar Sesion</Link>
                </nav>
                    
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </main>
        </div>
    );
}


export default LayoutPa;
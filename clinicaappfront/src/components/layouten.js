import { Outlet, Link, useLocation } from 'react-router-dom'

function LayoutEn() {
    const location = useLocation();
    
    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">Clinica Reyes</h2>
                <nav className="mt-10">
                <Link to ="/en/" className="block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Inicio</Link>
                <Link to="/en/pacientes" className={`${location.pathname === '/en/pacientes' ? 'text-blue-300' : 'text-white'} block font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Pacientes</Link>
                <Link to ="/en/registrarvisita/" className={`${location.pathname === '/en/registrarvisita/' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Registra Visita</Link>
                <Link to ="/en/listavisitas/" className={`${location.pathname === '/en/listavisitas/' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Lista de Visitas</Link>
                <Link to ="/en/logout" className={`${location.pathname === '/en/logout' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Cerrar Sesion</Link>
                </nav>
                    
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </main>
        </div>
    );
}


export default LayoutEn;
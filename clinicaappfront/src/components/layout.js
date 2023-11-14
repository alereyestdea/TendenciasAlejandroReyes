import { Outlet, Link, useLocation } from 'react-router-dom'

function Layout() {
    const location = useLocation();
    
    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">Clinica Reyes</h2>
                <nav className="mt-10">
                <Link to ="/rh/" className="block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Inicio</Link>
                <Link to="/rh/usuarios" className={`${location.pathname === '/rh/usuarios' ? 'text-blue-300' : 'text-white'} block font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Usuarios</Link>
                <Link to ="/rh/usuarios/nuevo" className={`${location.pathname === '/rh/usuarios/nuevo' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Nuevo Usuario</Link>
                <Link to ="/rh/asistencias" className={`${location.pathname === '/rh/asistencias' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Asistencias</Link>
                <Link to ="/rh/licencias" className={`${location.pathname === '/rh/licencias' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Licencias</Link>
                <Link to ="/rh/logout" className={`${location.pathname === '/rh/logout' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Cerrar Sesion</Link>
                </nav>
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </main>
        </div>
    );
}


export default Layout;
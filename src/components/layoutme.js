import { Outlet, Link, useLocation } from 'react-router-dom'

function LayoutMe() {
    const location = useLocation();
    
    return (
        <div className="md:flex md:min-h-screen">
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-cmeter text-white">Clinica Reyes</h2>
                <nav className="mt-10">
                <Link to ="/me/" className="block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Inicio</Link>
                <Link to ="/me/registrarhistoria/" className={`${location.pathname === '/me/registrarhistoria/' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Registra Historia Clinica</Link>
                <Link to ="/me/historiasclinicas/" className={`${location.pathname === '/me/historiasclinicas/' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Historias Clinicas</Link>
                <Link to ="/me/logout" className={`${location.pathname === '/me/logout' ? 'text-blue-300' : 'text-white'} block text-white font-black py-2 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white`}>Cerrar Sesion</Link>
                </nav>
                    
            </aside>
            <main className="md:w-3/4 p-10 md:h-screme overflow-scroll">
                <Outlet />
            </main>
        </div>
    );
}


export default LayoutMe;
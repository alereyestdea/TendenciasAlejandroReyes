import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/AuthGuard'; // Importa tu componente AuthGuard
import UsuariosLista from './components/Usuarios/UsuariosLista';
import './index.css';
import Layout from './components/layout';
import RegistroUsuario from './components/Usuarios/RegistroUsuario';
import Index from './components/main';
import Login from './components/Login';
import Logout from './components/Logout';
import LayoutPa from './components/layoutpa';
import PacientesLista from './components/Pacientes/PacientesLista';
import RegistroPaciente from './components/Pacientes/RegistroPaciente';
import Facturacion from './components/Pacientes/Facturacion';
import AsistenciasLista from './components/Usuarios/AsistenciasLista';
import LicenciasLista from './components/Usuarios/LicenciasLista';
import LayoutEn from './components/layouten';
import RegistrarVisita from './components/Enfermeras/RegistrarVisita';
import VisitasLista from './components/Enfermeras/VisitasLista';
import LayoutMe from './components/layoutme';
import HistoriaLista from './components/Medicos/HistoriaLista';
import RegistroHistoria from './components/Medicos/RegistrarHistoria';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/rh" element={<AuthGuard allowedRoles={['Recursos Humanos']}><Layout /></AuthGuard>}>
        <Route index element={<Index />} />
        <Route
          path="usuarios"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><UsuariosLista /></AuthGuard>}
        />
        <Route
          path="actualizarUsuario/:cedula"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><RegistroUsuario /></AuthGuard>}
        />
        <Route
          path="usuarios/nuevo"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><RegistroUsuario /></AuthGuard>}
        />
        <Route
          path="asistencias"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><AsistenciasLista/></AuthGuard>}
        />
        <Route
          path="licencias"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><LicenciasLista/></AuthGuard>}
        />
        <Route
          path="logout"
          element={<AuthGuard allowedRoles={['Recursos Humanos']}><Logout /></AuthGuard>}
        />
      </Route>
      <Route path="/pa" element={<AuthGuard allowedRoles={['Personal administrativo']}><LayoutPa /></AuthGuard>}>
        <Route index element={<Index />} />
        <Route
          path="pacientes"
          element={<AuthGuard allowedRoles={['Personal administrativo']}><PacientesLista /></AuthGuard>}
        />
        <Route
          path="actualizarPaciente/:cedula"
          element={<AuthGuard allowedRoles={['Personal administrativo']}><RegistroPaciente /></AuthGuard>}
        />
        <Route
          path="pacientes/nuevo"
          element={<AuthGuard allowedRoles={['Personal administrativo']}><RegistroPaciente /></AuthGuard>}
        />
       <Route
          path="facturacion/"
          element={<AuthGuard allowedRoles={['Personal administrativo']}><Facturacion /></AuthGuard>}
        />
        <Route
          path="logout"
          element={<AuthGuard allowedRoles={['Personal administrativo']}><Logout /></AuthGuard>}
        />
      </Route>
      <Route path="/en" element={<AuthGuard allowedRoles={['Enfermera']}><LayoutEn /></AuthGuard>}>
        <Route index element={<Index />} />
        <Route
          path="pacientes"
          element={<AuthGuard allowedRoles={['Enfermera']}><PacientesLista /></AuthGuard>}
        />
        <Route
          path="registrarvisita"
          element={<AuthGuard allowedRoles={['Enfermera']}><RegistrarVisita /></AuthGuard>}
        />
        <Route
          path="listavisitas"
          element={<AuthGuard allowedRoles={['Enfermera']}><VisitasLista /></AuthGuard>}
        />
        <Route
          path="logout"
          element={<AuthGuard allowedRoles={['Enfermera']}><Logout /></AuthGuard>}
        />
      </Route>
      <Route path="/me" element={<AuthGuard allowedRoles={['Médico']}><LayoutMe /></AuthGuard>}>
        <Route index element={<Index />} />
        <Route
          path="registrarhistoria"
          element={<AuthGuard allowedRoles={['Médico']}><RegistroHistoria /></AuthGuard>}
        />
        <Route
          path="historiasclinicas"
          element={<AuthGuard allowedRoles={['Médico']}><HistoriaLista /></AuthGuard>}
        />
        <Route
          path="logout"
          element={<AuthGuard allowedRoles={['Médico']}><Logout /></AuthGuard>}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();

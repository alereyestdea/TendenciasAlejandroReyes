import { useEffect, useState } from "react";
import * as pacientesServer from "./pacientesServer";


const PacientesList = () => {
    const [pacientes, setPacientes] = useState([]);

    const listPacientes = async () => {
        try {
            const res = await pacientesServer.listPacientes();
            const data = await res.json();
            setPacientes(data.pacientes);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listPacientes();
    }, []);

    return pacientes; // Retorna la matriz de usuarios como resultado del componente.
};

export default PacientesList;

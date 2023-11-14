import { useEffect, useState } from "react";
import * as usuariosServer from "./usuariosServer";


const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);

    const listUsuarios = async () => {
        try {
            const res = await usuariosServer.listUsuarios();
            const data = await res.json();
            setUsuarios(data.usuarios);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listUsuarios();
    }, []);

    return usuarios; // Retorna la matriz de usuarios como resultado del componente.
};

export default UsuariosList;

import { useEffect, useState } from "react";
import * as medicosServer from "./medicosServer";

const HistoriaList = () => {
    const [historias, setHistorias] = useState([]);

    const listHistorias = async () => {
        try {
            const res = await medicosServer.listHistorias();
            setHistorias(res); // Establecer directamente el array de historias
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listHistorias();
    }, []);

    return historias;
};

export default HistoriaList;
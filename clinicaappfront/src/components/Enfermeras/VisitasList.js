import { useEffect, useState } from "react";
import * as visitasServer from "./visitasServer";

const useVisitasList = () => {
  const [visitas, setVisitas] = useState([]);

  const listVisitas = async () => {
    try {
      const res = await visitasServer.listarVisitas();
      const data = await res.json();
      setVisitas(data.visitas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listVisitas();
  }, []);

  return visitas;
};

export default useVisitasList;

const API_URL = 'http://127.0.0.1:8000/clinicaApp/historia_clinica/';

export const listHistorias = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.log(error);
        throw error; // Re-lanzar el error para que el componente pueda manejarlo
    }
}

export const createHistoria = async (historia) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: historia.fecha,
          cedula_paciente: historia.cedula_paciente,
          cedula_medico: historia.cedula_medico,
          motivo_consulta: historia.motivo_consulta,
          sintomatologia: historia.sintomatologia,
          diagnostico: historia.diagnostico,
          med_numero_orden: historia.med_numero_orden,
          med_nombre: historia.med_nombre,
          med_dosis: historia.med_dosis,
          med_duracion_tratamiento: historia.med_duracion_tratamiento,
          med_costo: historia.med_costo,
          proc_numero_orden: historia.proc_numero_orden,
          proc_nombre: historia.proc_nombre,
          proc_cantidad: historia.proc_cantidad,
          proc_frecuencia: historia.proc_frecuencia,
          proc_requiere_asistencia: historia.proc_requiere_asistencia,
          proc_especialidades: historia.proc_especialidades,
          proc_costo: historia.proc_costo,
          diag_numero_orden: historia.diag_numero_orden,
          diag_nombre: historia.diag_nombre,
          diag_cantidad: historia.diag_cantidad,
          diag_especialidades: historia.diag_especialidades
        }),
      });
  
      const responseBody = await res.text();
      console.log('Contenido del cuerpo de la respuesta:', responseBody);
  
      if (res.ok) {
        return responseBody; // Devolver el cuerpo de la respuesta tal como está
      } else {
        // Devolver el objeto de respuesta para que el frontend pueda acceder a los detalles del error
        return { status: res.status, message: responseBody };
      }
    } catch (error) {
      console.error('Error en createHistoria:', error);
      return null;
    }
  };
const API_URL='http://127.0.0.1:8000/clinicaApp/registrovisita/';

export const listarVisitas =  async() => {
    return await fetch(API_URL)
}


export const registrarVisita = async (visita) => {
    return await fetch('http://127.0.0.1:8000/clinicaApp/registrovisita/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula_paciente: String(visita.cedula_paciente),
        presion_arterial: String(visita.presion_arterial),
        temperatura: parseFloat(visita.temperatura),
        pulso: parseInt(visita.pulso),
        nivel_oxigeno: parseFloat(visita.nivel_oxigeno),
        medicamentos_administrados: String(visita.medicamentos_administrados),
        pruebas_realizadas: String(visita.pruebas_realizadas),
        observaciones: String(visita.observaciones),
        recordatorio_visita: String(visita.recordatorio_visita),
      }),
    });
  };
  
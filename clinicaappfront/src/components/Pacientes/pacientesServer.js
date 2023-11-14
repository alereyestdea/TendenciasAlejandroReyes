const API_URL='http://127.0.0.1:8000/clinicaApp/pacientes/';

export const listPacientes =  async() => {
    return await fetch(API_URL)
}

export const getpaciente =  async(cedula) => {
    return await fetch(`${API_URL}${cedula}`)
}

export const createpaciente = async(paciente) => {
    return await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre_completo: String(paciente.nombre_completo),
            cedula: parseInt(paciente.cedula),
            fecha_nacimiento: (paciente.fecha_nacimiento),
            genero: String(paciente.genero),
            direccion: String(paciente.direccion),
            telefono: parseInt(paciente.telefono),
            correo: String(paciente.correo),
            nombre_contacto_emergencia: String(paciente.nombre_contacto_emergencia),
            relacion_paciente: String(paciente.relacion_paciente),
            nro_contact_emer: String(paciente.nro_contact_emer),
            nombre_seguro: String(paciente.nombre_seguro),
            nropoliza: String(paciente.nropoliza),
            estadopoliza: Boolean(paciente.estadopoliza),
        }),
    })
}

export const updatepaciente = async(cedula,updatepaciente) => {
    return await fetch(`${API_URL}${cedula}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre_completo: String(updatepaciente.nombre_completo),
            cedula: parseInt(updatepaciente.cedula),
            fecha_nacimiento: (updatepaciente.fecha_nacimiento),
            genero: String(updatepaciente.genero),
            direccion: String(updatepaciente.direccion),
            telefono: parseInt(updatepaciente.telefono),
            correo: String(updatepaciente.correo),
            nombre_contacto_emergencia: String(updatepaciente.nombre_contacto_emergencia),
            relacion_paciente: String(updatepaciente.relacion_paciente),
            nro_contact_emer: String(updatepaciente.nro_contact_emer),
            nombre_seguro: String(updatepaciente.nombre_seguro),
            nropoliza: String(updatepaciente.nropoliza),
            estadopoliza: Boolean(updatepaciente.estadopoliza),

        }),
    })
}

export const deletePaciente = async(cedula) => {
    return await fetch(`${API_URL}${cedula}`,{
        method: 'DELETE',

    })
}
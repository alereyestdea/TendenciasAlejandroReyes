const API_URL='http://127.0.0.1:8000/clinicaApp/usuarios/';

export const listUsuarios =  async() => {
    return await fetch(API_URL)
}

export const getUsuario =  async(cedula) => {
    return await fetch(`${API_URL}${cedula}`)
}

export const createUsuario = async(usuario) => {
    return await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre_completo: String(usuario.nombre_completo),
            cedula: parseInt(usuario.cedula),
            correo: String(usuario.correo),
            telefono: parseInt(usuario.telefono),
            fecha_nacimiento: (usuario.fecha_nacimiento),
            direccion: String(usuario.direccion),
            rol: String(usuario.rol),
            nombre_usuario: String(usuario.nombre_usuario),
            contrasena: String(usuario.contrasena),

        }),
    })
}

export const updateUsuario = async(cedula,updateUsuario) => {
    return await fetch(`${API_URL}${cedula}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre_completo: String(updateUsuario.nombre_completo),
            cedula: parseInt(updateUsuario.cedula),
            correo: String(updateUsuario.correo),
            telefono: parseInt(updateUsuario.telefono),
            fecha_nacimiento: (updateUsuario.fecha_nacimiento),
            direccion: String(updateUsuario.direccion),
            rol: String(updateUsuario.rol),
            nombre_usuario: String(updateUsuario.nombre_usuario),
            contrasena: String(updateUsuario.contrasena),

        }),
    })
}

export const deleteUsuario = async(cedula) => {
    return await fetch(`${API_URL}${cedula}`,{
        method: 'DELETE',

    })
}
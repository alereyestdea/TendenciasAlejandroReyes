import React from "react";

const Formulario = ({ onInputChange, usuario}) => {
  
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre">
          Nombre:
        </label>

        <input
          id="nombre_completo"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Usuario"
          name="nombre_completo"
          value={usuario.nombre_completo}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="cedula">
          Cedula:
        </label>
        <input
          id="cedula"
          type="tel"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Cedula del Usuario"
          name="cedula"
          inputMode="numeric"
          onChange={onInputChange}
          value={usuario.cedula}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="email">
          E-mail:
        </label>
        <input
          id="correo"
          type="email"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Email del Usuario"
          name="correo"
          value={usuario.correo}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="telefono">
          Teléfono:
        </label>
        <input
          id="telefono"
          type="tel"
          inputMode="numeric"
          maxLength="10"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Teléfono del Usuario"
          name="telefono"
          pattern="[0-9]{10}"
          title="Ingresa un número de 10 dígitos"
          value={usuario.telefono}
          onChange={onInputChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="fecha_nacimiento">
          Fecha de Nacimiento:
        </label>
        <input
          id="fecha_nacimiento"
          type="date"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Fecha de Nacimiento del Usuario"
          name="fecha_nacimiento"
          value={usuario.fecha_nacimiento}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="direccion">
          Direccion:
        </label>
        <input
          id="direccion"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Direccion del Usuario"
          name="direccion"
          value={usuario.direccion}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="rol">
          Rol del usuario
        </label>
        <select id="rol" className="mt-2 block w-full p-3 bg-gray-50" name="rol" onChange={onInputChange} value={usuario.rol}>
        <option value="">Seleccionar un rol</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Personal administrativo">Personal administrativo</option>
          <option value="Enfermera">Enfermera</option>
          <option value="Médico">Médico</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre_usuario">
          Usuario:
        </label>
        <input
          id="nombre_usuario"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Usuario"
          name="nombre_usuario"
          value={usuario.nombre_usuario}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="contrasena">
          Password:
        </label>
        <input
          id="contrasena"
          type="password"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Password del Usuario"
          name="contrasena"
          value={usuario.contrasena}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default Formulario;

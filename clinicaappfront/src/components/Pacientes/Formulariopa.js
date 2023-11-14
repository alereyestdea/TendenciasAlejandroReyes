import React from "react";

const FormularioPA = ({ onInputChange, paciente}) => {
  
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre_completo">
          Nombre Completo:
        </label>
        <input
          id="nombre_completo"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Paciente"
          name="nombre_completo"
          value={paciente.nombre_completo}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="cedula">
          Cedula:
        </label>
        <input
          id="cedula"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Cedula del Usuario"
          name="cedula"
          onChange={onInputChange}
          value={paciente.cedula}
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
          value={paciente.fecha_nacimiento}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="rol">
          Genero
        </label>
        <select id="genero" className="mt-2 block w-full p-3 bg-gray-50" name="genero" onChange={onInputChange} value={paciente.genero}>
        <option value="">Seleccionar un genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
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
          value={paciente.direccion}
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
          value={paciente.telefono}
          onChange={onInputChange}
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
          value={paciente.correo}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre_contacto_emergencia">
          Nombre contacto de emergencia:
        </label>
        <input
          id="nombre_contacto_emergencia"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Contacto"
          name="nombre_contacto_emergencia"
          value={paciente.nombre_contacto_emergencia}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="relacion_paciente">
          Relacion con el paciente:
        </label>
        <input
          id="relacion_paciente"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Relacion del contacto con el paciente"
          name="relacion_paciente"
          value={paciente.relacion_paciente}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nro_contact_emer">
          Teléfono de contacto de emergencia:
        </label>
        <input
          id="nro_contact_emer"
          type="tel"
          inputMode="numeric"
          maxLength="10"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Teléfono del Contacto de emergencia"
          name="nro_contact_emer"
          pattern="[0-9]{10}"
          title="Ingresa un número de 10 dígitos"
          value={paciente.nro_contact_emer}
          onChange={onInputChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nombre_seguro">
          Nombre del seguro:
        </label>
        <input
          id="nombre_seguro"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del seguro"
          name="nombre_seguro"
          value={paciente.nombre_seguro}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nropoliza">
          Numero de poliza:
        </label>
        <input
          id="nropoliza"
          type="tel"
          maxLength={10}
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Numero de poliza"
          name="nropoliza"
          inputMode="numeric"
          onChange={onInputChange}
          value={paciente.nropoliza}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="rol">
          Estado de poliza
        </label>
        <select id="estadopoliza" className="mt-2 block w-full p-3 bg-gray-50" name="estadopoliza" onChange={onInputChange} value={paciente.estadopoliza}>
        <option value="">Seleccionar su estado de poliza</option>
          <option value="true">Activa</option>
          <option value="false">Desactiva</option>
        </select>
      </div>
    </div>
  );
};

export default FormularioPA;

import React from "react";

const FormularioMe = ({ onInputChange, onTipoRegistroChange, historia, tipoRegistro }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="fecha">
          Fecha:
        </label>
        <input
          id="fecha"
          type="date"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Fecha de Consulta"
          name="fecha"
          value={historia.fecha}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="cedula_paciente">
          Cédula del Paciente:
        </label>
        <input
          id="cedula_paciente"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Cédula del Paciente"
          name="cedula_paciente"
          value={historia.cedula_paciente}
          onChange={onInputChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="cedula_medico">
          Cédula del Médico:
        </label>
        <input
          id="cedula_medico"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Cédula del Médico"
          name="cedula_medico"
          value={historia.cedula_medico}
          onChange={onInputChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="motivo_consulta">
          Motivo de Consulta:
        </label>
        <input
          id="motivo_consulta"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Motivo de Consulta"
          name="motivo_consulta"
          value={historia.motivo_consulta}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="sintomatologia">
          Sintomatología:
        </label>
        <input
          id="sintomatologia"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Sintomatología"
          name="sintomatologia"
          value={historia.sintomatologia}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="diagnostico">
          Diagnóstico:
        </label>
        <input
          id="diagnostico"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Diagnóstico"
          name="diagnostico"
          value={historia.diagnostico}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="tipo_registro">
          Tipo de Registro:
        </label>
        <select
          id="tipo_registro"
          className="mt-2 block w-full p-3 bg-gray-50"
          name="tipo_registro"
          onChange={onTipoRegistroChange}
          value={tipoRegistro}
        >
          <option value="">Seleccionar tipo de registro</option>
          <option value="medicamento">Medicamento/s</option>
          <option value="procedimiento">Procedimiento/s</option>
          <option value="ayuda_diagnostica">Ayuda Diagnóstica</option>
        </select>
      </div>
      {tipoRegistro === "medicamento" && (
        <div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="med_numero_orden">
              Número de Orden (Medicamento):
            </label>
            <input
              id="med_numero_orden"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Número de Orden (Medicamento)"
              name="med_numero_orden"
              value={historia.med_numero_orden}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="med_nombre">
              Nombre del Medicamento/s, (separar por comas si son varios):
            </label>
            <input
              id="med_nombre"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombre del Medicamento"
              name="med_nombre"
              value={historia.med_nombre}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="med_dosis">
              Dosis del Medicamento/s:
            </label>
            <input
              id="med_dosis"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Dosis del Medicamento"
              name="med_dosis"
              value={historia.med_dosis}
              onChange={onInputChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="med_duracion_tratamiento">
              Duración del Tratamiento/s:
            </label>
            <input
              id="med_duracion_tratamiento"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Duracion del tratamiento"
              name="med_duracion_tratamiento"
              value={historia.med_duracion_tratamiento}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="med_costo">
              Costo:
            </label>
            <input
              id="med_costo"
              type="tel"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Costo"
              name="med_costo"
              value={historia.med_costo}
              onChange={onInputChange}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </div>
      )}

      {tipoRegistro === "procedimiento" && (
        <div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="proc_numero_orden">
              Número de Orden (Procedimiento/s), (separar por comas si son varios):
            </label>
            <input
              id="proc_numero_orden"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Número de Orden (Procedimiento)"
              name="proc_numero_orden"
              value={historia.proc_numero_orden}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="proc_nombre">
              Nombre del Procedimiento:
            </label>
            <input
              id="proc_nombre"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombre del Procedimiento"
              name="proc_nombre"
              value={historia.proc_nombre}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="proc_cantidad">
              Cantidad:
            </label>
            <input
              id="proc_cantidad"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Cantidad del Procedimiento"
              name="proc_cantidad"
              value={historia.proc_cantidad}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="proc_frecuencia">
              Frecuencia del procedimiento:
            </label>
            <input
              id="proc_frecuencia"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Frecuencia del Procedimiento"
              name="proc_frecuencia"
              value={historia.proc_frecuencia}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
  <label className="text-gray-800" htmlFor="proc_costo">
    Costo:
  </label>
  <input
    id="proc_costo"
    type="tel"
    className="mt-2 block w-full p-3 bg-gray-50"
    placeholder="Costo"
    name="proc_costo"
    value={historia.proc_costo}
    onChange={onInputChange}
    onKeyPress={(event) => {
      if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
    }}
  />
</div>
          <div className="mb-4">
        <label className="text-gray-800" htmlFor="proc_requiere_asistencia">
          Requiere asistencia:
        </label>
        <select
          id="proc_requiere_asistencia"
          className="mt-2 block w-full p-3 bg-gray-50"
          name="proc_requiere_asistencia"
          value={historia.proc_requiere_asistencia}
          onChange={onInputChange}
        >
          <option value="">Selecciona</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      {historia.proc_requiere_asistencia === 'true' && (
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="proc_especialidades">
            Especialidades:
          </label>
          <select
            id="proc_especialidades"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="proc_especialidades"
            value={historia.proc_especialidades}
            onChange={onInputChange}
          >
            <option value="Cirugía General">Cirugía General</option>
            <option value="Anestesiología">Anestesiología</option>
            <option value="Oftalmología">Oftalmología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Cardiología">Cardiología</option>
          </select>
        </div>
              )}
        </div>
      )}

      {tipoRegistro === "ayuda_diagnostica" && (
        <div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="diag_numero_orden">
              Número de Orden (Ayuda Diagnóstica):
            </label>
            <input
              id="diag_numero_orden"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Número de Orden (Ayuda Diagnóstica)"
              name="diag_numero_orden"
              value={historia.diag_numero_orden}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="diag_nombre">
              Nombre de la Ayuda Diagnóstica:
            </label>
            <input
              id="diag_nombre"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombre de la Ayuda Diagnóstica"
              name="diag_nombre"
              value={historia.diag_nombre}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="diag_cantidad">
              Cantidad de la Ayuda Diagnóstica:
            </label>
            <input
              id="diag_cantidad"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Cantidad de la Ayuda Diagnóstica"
              name="diag_cantidad"
              value={historia.diag_cantidad}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-4">
        <label className="text-gray-800" htmlFor="diag_requiere_asistencia">
          Requiere asistencia:
        </label>
        <select
          id="diag_requiere_asistencia"
          className="mt-2 block w-full p-3 bg-gray-50"
          name="diag_requiere_asistencia"
          value={historia.diag_requiere_asistencia}
          onChange={onInputChange}
        >
          <option value="">Selecciona</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      {historia.diag_requiere_asistencia === 'true' && (
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="diag_especialidades">
            Especialidades:
          </label>
          <select
            id="diag_especialidades"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="diag_especialidades"
            value={historia.diag_especialidades}
            onChange={onInputChange}
          >
            <option value="Cirugía General">Cirugía General</option>
            <option value="Anestesiología">Anestesiología</option>
            <option value="Oftalmología">Oftalmología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Cardiología">Cardiología</option>
          </select>
        </div>
              )}
        </div>
      )}

    </div>
  );
};

export default FormularioMe;
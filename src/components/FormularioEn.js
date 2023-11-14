import React from "react";

const FormularioEN = ({ onInputChange, formData }) => {
    return (
      <div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="cedula_paciente">
            Cédula del Paciente:
          </label>
          <input
            id="cedula_paciente"
            type="tel"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Cédula del Paciente"
            name="cedula_paciente"
            inputMode="numeric"
            onChange={onInputChange}
            value={formData?.cedula_paciente || ''}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="presion_arterial">
          Presión Arterial:
        </label>
        <input
          id="presion_arterial"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Presión Arterial"
          name="presion_arterial"
          onChange={onInputChange}
          value={formData.presion_arterial || ""}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="temperatura">
          Temperatura:
        </label>
        <input
          id="temperatura"
          type="text"
          step="0.1"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Temperatura"
          name="temperatura"
          onChange={onInputChange}
          value={formData.temperatura || ""}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="pulso">
          Pulso:
        </label>
        <input
          id="pulso"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Pulso"
          name="pulso"
          onChange={onInputChange}
          value={formData.pulso || ""}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="nivel_oxigeno">
          Nivel de Oxígeno:
        </label>
        <input
          id="nivel_oxigeno"
          type="text"
          step="0.1"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nivel de Oxígeno"
          name="nivel_oxigeno"
          onChange={onInputChange}
          value={formData.nivel_oxigeno || ""}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="medicamentos_administrados">
          Medicamentos Administrados:
        </label>
        <input
          id="medicamentos_administrados"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Medicamentos Administrados y orden asociada"
          name="medicamentos_administrados"
          onChange={onInputChange}
          value={formData.medicamentos_administrados || ""}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="pruebas_realizadas">
          Pruebas Realizadas:
        </label>
        <input
          id="pruebas_realizadas"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Pruebas Realizadas"
          name="pruebas_realizadas"
          onChange={onInputChange}
          value={formData.pruebas_realizadas || ""}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="observaciones">
          Observaciones:
        </label>
        <textarea
          id="observaciones"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Observaciones"
          name="observaciones"
          onChange={onInputChange}
          value={formData.observaciones || ""}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="recordatorio_visita">
          Recordatorio de Visita:
        </label>
        <input
          id="recordatorio_visita"
          type="datetime-local"
          className="mt-2 block w-full p-3 bg-gray-50"
          name="recordatorio_visita"
          onChange={onInputChange}
          value={formData.recordatorio_visita || ""}
        />
      </div>
    </div>
  );
};

export default FormularioEN;

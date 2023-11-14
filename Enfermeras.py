# -*- coding: utf-8 -*-
"""
Created on Sun Aug 20 17:43:03 2023

@author: user
"""
import datetime
from Personal_Administrativo import PersonalAdministrativo

class Enfermera:
    def __init__(self, pacientes=None):
        self.pacientes = pacientes if pacientes is not None else []
        self.visitas_registradas = []  

    def registrar_registro_visitas(self):
        if not self.pacientes:
            print("No se han cargado pacientes. Por favor, cargue pacientes primero.")
            return
    
        print("Lista de Pacientes:")
        for paciente in self.pacientes:
            print(f"ID: {paciente.id} - Nombre: {paciente.nombre_completo} - Cédula: {paciente.cedula}")
    
        paciente_id = input("Ingrese el ID del paciente: ")
    
        paciente = None
        for p in self.pacientes:
            if str(p.id) == paciente_id:
                paciente = p
                break
    
        if paciente:
            print(f"Registrando visita para {paciente.nombre_completo}")
            presion_arterial = input("Presión arterial: ")
            temperatura = input("Temperatura: ")
            pulso = input("Pulso: ")
            nivel_oxigeno = input("Nivel de oxígeno en la sangre: ")
            observacion = input("Observacion relevante durante la atención al paciente:")
            

            medicamentos_administrados = input("Medicamentos administrados: ")
            orden_del_medicamento = input("Orden del medicamento: ")
            pruebas_realizadas = input("Pruebas realizadas: ")
    
            visita = {
                "id": paciente.id,
                "nombre": paciente.nombre_completo,
                "cedula": paciente.cedula,
                "presion_arterial": presion_arterial,
                "temperatura": temperatura,
                "pulso": pulso,
                "nivel_oxigeno": nivel_oxigeno,
                "observacion": observacion,
                "medicamentos_administrados": medicamentos_administrados,
                "orden_del_medicamento": orden_del_medicamento,
                "pruebas_realizadas": pruebas_realizadas,
                "fecha": datetime.date.today().strftime('%d/%m/%Y')
            }
            self.visitas_registradas.append(visita)
    
            print("Registro de visita guardado con éxito:")
            print(visita)
        else:
            print("No se encontró un paciente con el ID proporcionado.")
    
    def imprimir_visitas(self):
        if not self.visitas_registradas:
            print("No se han registrado visitas.")
        else:
            print("Visitas registradas:")
            for visita in self.visitas_registradas:
                print(f"Fecha: {visita['fecha']}")
                print(f"ID del paciente: {visita['id']}")
                print(f"Nombre del paciente: {visita['nombre']}")
                print(f"Cédula del paciente: {visita['cedula']}")
                print(f"Presión arterial: {visita['presion_arterial']}")
                print(f"Temperatura: {visita['temperatura']}")
                print(f"Pulso: {visita['pulso']}")
                print(f"Nivel de oxígeno: {visita['nivel_oxigeno']}")
                print(f"Observación: {visita['observacion']}")
                print(f"Medicamentos administrados: {visita['medicamentos_administrados']}")
                print(f"Orden del medicamento: {visita['orden_del_medicamento']}")
                print(f"Pruebas realizadas: {visita['pruebas_realizadas']}")


def enfermeras_main(enfermera):
    while True:
        print("Opciones:")
        print("1. Registra visita de paciente")
        print("2. Mostrar visitas registradas")
        print("3. Salir")

        opcion = input("Elige una opción (número): ")

        if opcion == "1":
            enfermera.registrar_registro_visitas()
        elif opcion == "2":
            enfermera.imprimir_visitas()
        elif opcion == "3":
            print("Saliendo...")
            break
        else:
            print("Opción no válida.")

if __name__ == "__main__":
    pa = PersonalAdministrativo()  
    enfermera = Enfermera(pa.pacientes)  
    enfermeras_main(enfermera)  

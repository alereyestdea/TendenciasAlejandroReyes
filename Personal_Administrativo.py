# -*- coding: utf-8 -*-
"""
Created on Tue Aug 15 10:14:31 2023

@author: alejreye
"""

import re
from datetime import datetime
from Medico import Medico
from recursos_humanos import RecursosHumanos  
class Paciente:
    def __init__(self, id, nombre_completo, cedula, fecha_nacimiento, genero, direccion, phone, email,
                 nombre_contacto_emergencia, relacion_paciente, nro_contact_emer, nombre_seguro, nropoliza,
                 estadopoliza):
        self.id = id
        self.nombre_completo = nombre_completo
        self.cedula = cedula
        self.fecha_nacimiento = fecha_nacimiento
        self.genero = genero
        self.direccion = direccion
        self.phone = phone
        self.email = email
        self.nombre_contacto_emergencia = nombre_contacto_emergencia
        self.relacion_paciente = relacion_paciente
        self.nro_contact_emer = nro_contact_emer
        self.nombre_seguro = nombre_seguro
        self.nropoliza = nropoliza
        self.estadopoliza = estadopoliza

class PersonalAdministrativo:
    def __init__(self):
        self.pacientes = []
        paciente_inicial = Paciente(
    "1",
    "alejo",
    "12",
    "12/02/2000",
    "masculino",
    "Laureles",
    "3053313312",
    "ale@gmail.com",
    "Yeimi",
    "Familiar",
    "3059099092",
    "Sura",
    "123456",
    "Activo"
)
        self.pacientes.append(paciente_inicial)
    def validar_cedula_unica(self, cedula):
        return all(p.cedula != cedula for p in self.pacientes)

    def validar_correo(self, correo):
        return re.match(r"[^@]+@[^@]+\.[^@]+", correo)

    def validar_fecha(self, fecha):
        return re.match(r"\d{2}/\d{2}/\d{4}", fecha)

    def validar_telefono(self, telefono):
        return len(telefono) == 10 and telefono.isdigit()

    def crear_paciente(self):
        id = len(self.pacientes) + 1  
        nombre_completo = input("Nombre completo del paciente: ")

        while True:
            cedula = input("Número de cédula: ")
            if not self.validar_cedula_unica(cedula):
                print("La cédula ya está en uso.")
            else:
                break

        while True:
            fecha_nacimiento = input("Fecha de nacimiento (DD/MM/YYYY): ")
            if not self.validar_fecha(fecha_nacimiento):
                print("La fecha no es válida. Formato: DD/MM/YYYY")
            else:
                break

        genero = input("Género (masculino/femenino/otro): ")
        direccion = input("Dirección: ")

        while True:
            phone = input("Número de teléfono: ")
            if not self.validar_telefono(phone):
                print("El número de teléfono no es válido. Debe tener 10 dígitos.")
            else:
                break

        while True:
            email = input("Correo electrónico: ")
            if not self.validar_correo(email) or any(p.email == email for p in self.pacientes):
                print("El correo no es válido o ya está en uso.")
            else:
                break

        nombre_contacto_emergencia = input("Nombre del contacto de emergencia: ")
        relacion_paciente = input("Relación con el paciente: ")
        
        while True:
            nro_contact_emer = input("Número de teléfono de emergencia: ")
            if len(nro_contact_emer) == 10 and nro_contact_emer.isdigit():
                break
            else:
                print("El número de teléfono de emergencia no es válido. Debe tener 10 dígitos.")
        
        nombre_seguro = input("Nombre de la compañía de seguros: ")
        nropoliza = input("Número de póliza: ")
        
        while True:
            estadopoliza = input("Estado de la póliza (activo/inactivo): ")
            if estadopoliza.lower() in ["activo", "inactivo"]:
                break
            else:
                print("El estado de la póliza debe ser 'activo' o 'inactivo'.")

        nuevo_paciente = Paciente(
            id, nombre_completo, cedula, fecha_nacimiento, genero, direccion, phone, email,
            nombre_contacto_emergencia, relacion_paciente, nro_contact_emer, nombre_seguro, nropoliza,
            estadopoliza.lower() == "activo"
        )
        self.pacientes.append(nuevo_paciente)
        print("Paciente creado con éxito.")

            
    def programar_cita(self):
        if not self.pacientes:
            print("No hay pacientes disponibles para programar citas.")
            return

        print("Pacientes disponibles:")
        for paciente in self.pacientes:
            print(f"ID: {paciente.id} - Nombre: {paciente.nombre_completo}")

        paciente_id = input("Ingrese el ID del paciente para programar la cita: ")
        paciente_a_programar = None

        for paciente in self.pacientes:
            if str(paciente.id) == paciente_id:
                paciente_a_programar = paciente
                break

        if paciente_a_programar is None:
            print(f"No se encontró un paciente con el ID '{paciente_id}'.")
            return

        fecha_cita = input("Ingrese la fecha de la cita (DD/MM/YYYY): ")
        hora_cita = input("Ingrese la hora de la cita (HH:MM): ")
        motivo_cita = input("Ingrese el motivo o especialidad de la cita: ")

        cita_programada = {
            "id_paciente": paciente_a_programar.id,
            "nombre_paciente": paciente_a_programar.nombre_completo,
            "fecha_cita": fecha_cita,
            "hora_cita": hora_cita,
            "motivo_cita": motivo_cita
        }

        
        if not hasattr(self, 'citas_programadas'):
            self.citas_programadas = []  
        self.citas_programadas.append(cita_programada)

        print("Cita programada con éxito.")

    
    def eliminar_paciente(self):
        if not self.pacientes:
            print("No hay pacientes disponibles para eliminar.")
            return

        print("Pacientes disponibles:")
        for paciente in self.pacientes:
            print(f"ID: {paciente.id} - Nombre: {paciente.nombre_completo}")

        paciente_id = input("Ingrese el ID del paciente a eliminar: ")

        paciente_eliminado = None
        nuevos_pacientes = []

        for paciente in self.pacientes:
            if str(paciente.id) == paciente_id:
                paciente_eliminado = paciente
            else:
                nuevos_pacientes.append(paciente)

        if paciente_eliminado is None:
            print(f"No se encontró un paciente con el ID '{paciente_id}'.")
            return

        self.pacientes = nuevos_pacientes
        print(f"Paciente '{paciente_eliminado.nombre_completo}' eliminado con éxito.")

    def facturacion(self, medico, rh):
        cedula_paciente = input("Ingrese la cédula del paciente para la facturación:")
    
        paciente_encontrado = None
        for paciente in self.pacientes:
            if paciente.cedula == cedula_paciente:
                paciente_encontrado = paciente
                break
    
        if not paciente_encontrado:
            print("Paciente no encontrado.")
            return
    
        print("Facturación:")
        print(f"Nombre del paciente: {paciente_encontrado.nombre_completo}")
    
        
        fecha_nacimiento = datetime.strptime(paciente_encontrado.fecha_nacimiento, "%d/%m/%Y")
        edad = datetime.now().year - fecha_nacimiento.year
        print(f"Edad: {edad} años")
    
        print(f"Cédula: {paciente_encontrado.cedula}")
    
       
        if hasattr(paciente_encontrado, 'historias_clinicas'):
            cedula_medico_encontrada = False  
            for historia in paciente_encontrado.historias_clinicas:
                if 'cedula_medico' in historia:
                    cedula_medico = historia['cedula_medico']
                    
                    for usuario in rh.usuarios:
                        if usuario.cedula == cedula_medico and usuario.rol == 'Medico':
                            print(f"Nombre del médico tratante: {usuario.nombre_completo}")
                            cedula_medico_encontrada = True
                            break
    
            if not cedula_medico_encontrada:
                print('Cédula del medico tratante no encontrada')
    
        
        print(f"Nombre de la compañía de seguro: {paciente_encontrado.nombre_seguro}")
        print(f"Número de póliza: {paciente_encontrado.nropoliza}")
        print(f"Vigencia de la póliza: {'Activa' if paciente_encontrado.estadopoliza else 'Inactiva'}")


        
def main(pa, medico,rh):
    while True:
        print("Opciones:")
        print("1. Crear paciente")
        print("2. Eliminar paciente")
        print("3. Programar cita")
        print("4. Facturación")
        print("5. Salir")
        
        opcion = input("Elige una opción (número): ")
        
        if opcion == "1":
            pa.crear_paciente()
        elif opcion == "2":
            pa.eliminar_paciente()
        elif opcion == "3":
            pa.programar_cita()
        elif opcion == "4":
            pa.facturacion(medico,rh)  
        elif opcion == "5":
            print("Saliendo...")
            break
        else:
            print("Opción no válida.")

if __name__ == "__main__":
    pa = PersonalAdministrativo()  
    medico = Medico()  
    main(pa, medico)



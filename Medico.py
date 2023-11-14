# -*- coding: utf-8 -*-
"""
Created on Sun Sep  3 19:38:36 2023

@author: user
"""
import re
ultima_orden = 1  

class Medico:
    def __init__(self, usuario_autenticado, pacientes):
        self.usuario_autenticado = usuario_autenticado
        self.pacientes = pacientes

    def buscar_paciente_por_cedula(self, cedula):
        for paciente in self.pacientes:
            if paciente.cedula == cedula:
                return paciente
        print("Paciente no encontrado.")
        return None
    
    def validar_fecha(self, fecha):
        return re.match(r"\d{2}/\d{2}/\d{4}", fecha)
    
    def validar_orden(self, orden):
        return len(orden) == 10 and orden.isdigit()
    
    def visualizar_informacion_paciente(self, paciente):
        if paciente:
            print("Información del Paciente:")
            print(f"Nombre: {paciente.nombre_completo}")
            print(f"Cédula: {paciente.cedula}")
            print(f"Fecha de Nacimiento: {paciente.fecha_nacimiento}")
            print(f"Género: {paciente.genero}")
            print(f"Dirección: {paciente.direccion}")
            print(f"Nro de Teléfono: {paciente.phone}")
            print(f"Correo Electrónico: {paciente.email}")
            print(f"Nombre del Contacto de Emergencia: {paciente.nombre_contacto_emergencia}")
            print(f"Relación con el Paciente: {paciente.relacion_paciente}")
            print(f"Nro de Teléfono de Emergencia: {paciente.nro_contact_emer}")
            print(f"Nombre de la Compañía de Seguros: {paciente.nombre_seguro}")
            print(f"Nro de Póliza: {paciente.nropoliza}")
            print(f"Estado de la Póliza: {'Activo' if paciente.estadopoliza else 'Inactivo'}")





    def registrar_historia_clinica(self, paciente, medico_autenticado):
        global ultima_orden
        if paciente and medico_autenticado:
            print("Registrando Historia Clínica para el Paciente:")
            print(f"Nombre: {paciente.nombre_completo}")
            print(f"Cédula: {paciente.cedula}")
            
            while True:
                fecha_consulta = input("Ingrese la fecha de la consulta (DD/MM/YYYY): ")
                if not self.validar_fecha(fecha_consulta):
                    print("La fecha no es válida. Formato: DD/MM/YYYY")
                else:
                    break
                
            motivo_consulta = input("Motivo de la consulta: ")
            sintomatologia = input("Sintomatología: ")
    

            cedula_medico = medico_autenticado.cedula
    

            historia_clinica = {
                "fecha_consulta": fecha_consulta,
                "motivo_consulta": motivo_consulta,
                "sintomatologia": sintomatologia,
                "cedula_medico": cedula_medico 
            }

            tipo_registro = input("¿Desea diagnosticar (D) o enviar ayuda diagnóstica (A)? ").strip().lower()
    
            if tipo_registro == 'd':

                diagnostico = input("Ingrese el diagnóstico: ")
                historia_clinica["diagnostico"] = diagnostico
    

                recetar_medicamentos = input("¿Desea recetar medicamentos? (S/N): ").strip().lower()
                if recetar_medicamentos == 's':
                    medicamentos = []
                    nueva_orden = str(ultima_orden + 1)
                    ultima_orden += 1  
                    numero_orden = nueva_orden
                    while True:
                        nombre_medicamento = input("Nombre del medicamento: ")
                        dosis = input("Dosis: ")
                        duracion = input("Duración del tratamiento: ")
                        medicamento = {
                            "numero_orden": numero_orden,
                            "nombre_medicamento": nombre_medicamento,
                            "dosis": dosis,
                            "duracion": duracion
                        }
                        medicamentos.append(medicamento)
                        agregar_otro = input("¿Desea agregar otro medicamento? (S/N): ").strip().lower()
                        if agregar_otro != 's':
                            break
                    historia_clinica["medicamentos"] = medicamentos
    

                recetar_procedimientos = input("¿Desea recetar procedimientos? (S/N): ").strip().lower()
                if recetar_procedimientos == 's':
                    procedimientos = []
                    nueva_orden = str(ultima_orden + 1)
                    ultima_orden += 1  
                    numero_orden = nueva_orden
                    while True:
                        nombre_procedimiento = input("Nombre del procedimiento: ")
                        cantidad = input("Cantidad: ")
                        frecuencia = input("Frecuencia con la que se repite: ")
                        requiere_especialista = input("¿Requiere asistencia de un especialista? (S/N): ").strip().lower() == 's'
                        especialidades = []
                        if requiere_especialista:
                            print("Especialidades disponibles:")
                            print("1. Dermatología")
                            print("2. Cardiología")
                            print("3. Gastroenterología")
                            print("4. Oftalmologia")
                            print("5. Ortopedista")
                            
                            especialidades_seleccionadas = input("Seleccione las especialidades requeridas (separe con comas y/o números): ")
                            especialidades_dict = {
                                '1': 'Dermatología',
                                '2': 'Cardiología',
                                '3': 'Gastroenterología',
                                '4': 'Oftalmologia',
                                '5': 'Ortopedista'
                                
                            }
                            especialidades_seleccionadas = [especialidades_dict[opcion.strip()] for opcion in especialidades_seleccionadas.split(',')]
                            especialidades = especialidades_seleccionadas
                        procedimiento = {
                            "numero_orden": numero_orden,
                            "nombre_procedimiento": nombre_procedimiento,
                            "cantidad": cantidad,
                            "frecuencia": frecuencia,
                            "requiere_especialista": requiere_especialista,
                            "especialidades": especialidades
                        }
                        procedimientos.append(procedimiento)
                        agregar_otro = input("¿Desea agregar otro procedimiento? (S/N): ").strip().lower()
                        if agregar_otro != 's':
                            break
                    historia_clinica["procedimientos"] = procedimientos
    
            elif tipo_registro == 'a':

                nueva_orden = str(ultima_orden + 1)
                ultima_orden += 1                 
                numero_orden = nueva_orden
                nombre_ayuda = input("Nombre de la ayuda diagnóstica: ")
                cantidad_ayuda = input("Cantidad: ")
                requiere_especialista = input("¿Requiere asistencia de un especialista? (S/N): ").strip().lower() == 's'
                especialidades = []
    
                if requiere_especialista:
                    print("Especialidades disponibles:")
                    print("1. Dermatología")
                    print("2. Cardiología")
                    print("3. Gastroenterología")
                    print("4. Oftalmologia")
                    print("5. Ortopedista")
                    
                    especialidades_seleccionadas = input("Seleccione las especialidades requeridas (separe con comas y/o números): ")
                    especialidades_dict = {
                        '1': 'Dermatología',
                        '2': 'Cardiología',
                        '3': 'Gastroenterología',
                        '4': 'Oftalmologia',
                        '5': 'Ortopedista'
                        
                    }
                    especialidades_seleccionadas = [especialidades_dict[opcion.strip()] for opcion in especialidades_seleccionadas.split(',')]
                    especialidades = especialidades_seleccionadas
                ayuda_diagnostica = {
                    "numero_orden": numero_orden,
                    "nombre_ayuda": nombre_ayuda,
                    "cantidad": cantidad_ayuda,
                    "requiere_especialista": requiere_especialista,
                    "especialidades": especialidades
                }
                historia_clinica["ayuda_diagnostica"] = ayuda_diagnostica
    
                
                if "diagnostico" in historia_clinica:
                    del historia_clinica["diagnostico"]
    
            else:
                print("Opción no válida.")
    
            if not hasattr(paciente, 'historias_clinicas'):
                paciente.historias_clinicas = []  
            paciente.historias_clinicas.append(historia_clinica)
            print("Historia Clínica registrada con éxito.")

            
    def consultar_historia_clinica(self, paciente):
        if paciente and hasattr(paciente, 'historias_clinicas'):
            print("Historias Clínicas del Paciente:")
            for idx, historia in enumerate(paciente.historias_clinicas, 1):
                print(f"Consulta {idx}:")
                print(f"Fecha: {historia['fecha_consulta']}")
                print(f"Cedula_Medico: {historia['cedula_medico']}")
                print(f"Motivo: {historia['motivo_consulta']}")
                print(f"Sintomatología: {historia['sintomatologia']}")
                
                
                if 'diagnostico' in historia:
                    print(f"Diagnóstico: {historia['diagnostico']}")
                    if 'medicamentos' in historia:
                        print("Medicamentos:")
                        for medicamento in historia['medicamentos']:
                            print(f" - Orden: {medicamento['numero_orden']}")
                            print(f" - Nombre: {medicamento['nombre_medicamento']}")
                            print(f"   Dosis: {medicamento['dosis']}")
                            print(f"   Duración: {medicamento['duracion']}")
                    if 'procedimientos' in historia:
                        print("Procedimientos:")
                        for procedimiento in historia['procedimientos']:
                            print(f" - Orden: {procedimiento['numero_orden']}")
                            print(f" - Nombre: {procedimiento['nombre_procedimiento']}")
                            print(f"   Cantidad: {procedimiento['cantidad']}")
                            print(f"   Frecuencia: {procedimiento['frecuencia']}")
                            if procedimiento['requiere_especialista']:
                                print("   Especialidades requeridas:")
                                for especialidad in procedimiento['especialidades']:
                                    print(f"     - {especialidad}")
                elif 'ayuda_diagnostica' in historia:
                    ayuda = historia['ayuda_diagnostica']
                    print("Ayuda Diagnóstica:")
                    print(f" - Orden: {ayuda['numero_orden']}")
                    print(f" - Nombre: {ayuda['nombre_ayuda']}")
                    print(f" - Cantidad: {ayuda['cantidad']}")
                    if ayuda['requiere_especialista']:
                        print("   Especialidades requeridas:")
                        for especialidad in ayuda['especialidades']:
                            print(f"     - {especialidad}")
                
                print("------------------------")

    def actualizar_historia_clinica(self, cedula_paciente):
        
        paciente = self.buscar_paciente_por_cedula(cedula_paciente)

        if paciente:
            
            if hasattr(paciente, 'historias_clinicas'):
                for historia_clinica in paciente.historias_clinicas:
                    print(f"Historia clínica actual:\n{historia_clinica}")
                    print("Opciones de actualización:")
                    print("1. Actualizar Fecha de Consulta")
                    print("2. Actualizar Motivo de Consulta")
                    print("3. Actualizar Sintomatología")
                    print("4. Actualizar Diagnóstico")
                    print("5. Salir")

                    opcion_actualizacion = input("Elija una opción (número): ")

                    if opcion_actualizacion == "1":
                        nueva_fecha = input("Ingrese la nueva fecha de consulta (DD/MM/YYYY): ")
                        historia_clinica["fecha_consulta"] = nueva_fecha
                        print("Fecha de consulta actualizada con éxito.")
                    elif opcion_actualizacion == "2":
                        nuevo_motivo = input("Ingrese el nuevo motivo de consulta: ")
                        historia_clinica["motivo_consulta"] = nuevo_motivo
                        print("Motivo de consulta actualizado con éxito.")
                    elif opcion_actualizacion == "3":
                        nueva_sintomatologia = input("Ingrese la nueva sintomatología: ")
                        historia_clinica["sintomatologia"] = nueva_sintomatologia
                        print("Sintomatología actualizada con éxito.")
                    elif opcion_actualizacion == "4":
                        nuevo_diagnostico = input("Ingrese el nuevo diagnóstico: ")
                        historia_clinica["diagnostico"] = nuevo_diagnostico
                        print("Diagnóstico actualizado con éxito.")
                    elif opcion_actualizacion == "5":
                        print("Saliendo de la actualización de historias clínicas.")
                        break
                    else:
                        print("Opción no válida.")
            else:
                print("El paciente no tiene una historia clínica registrada.")
        else:
            print("Paciente no encontrado.")
    def ver_resultados_ayuda_diagnostica_y_crear_nuevo_registro(self, cedula_paciente, medico_autenticado):
        
        global ultima_orden
        paciente = self.buscar_paciente_por_cedula(cedula_paciente)
        
        if paciente:
            
            if "ayuda_diagnostica" in paciente.historias_clinicas[-1]:
                print("Resultados de ayuda diagnóstica:(El paciente tiene los siguientes problemas:.... y se recomienda esto:......)")
                
                while True:
                    nueva_fecha_consulta = input("Ingrese la fecha de la consulta (DD/MM/YYYY): ")
                    if not self.validar_fecha(nueva_fecha_consulta):
                        print("La fecha no es válida. Formato: DD/MM/YYYY")
                    else:
                        break
                nuevo_motivo_consulta = input("Motivo de la consulta: ")
                nueva_sintomatologia = input("Sintomatología: ")
                nuevo_diagnostico = input("Ingrese el diagnóstico: ")
                
                nuevo_registro = {
                    "fecha_consulta": nueva_fecha_consulta,
                    "motivo_consulta": nuevo_motivo_consulta,
                    "sintomatologia": nueva_sintomatologia,
                    "cedula_medico": medico_autenticado.cedula,
                    "diagnostico": nuevo_diagnostico
                }
                
                
                recetar_medicamentos = input("¿Desea recetar medicamentos? (S/N): ").strip().lower()
                if recetar_medicamentos == 's':
                    medicamentos = []
                    nueva_orden = str(ultima_orden + 1)
                    ultima_orden += 1                
                    numero_orden = nueva_orden
                    while True:
                        nombre_medicamento = input("Nombre del medicamento: ")
                        dosis = input("Dosis: ")
                        duracion = input("Duración del tratamiento: ")
                        medicamento = {
                            "numero_orden": numero_orden,
                            "nombre_medicamento": nombre_medicamento,
                            "dosis": dosis,
                            "duracion": duracion
                        }
                        medicamentos.append(medicamento)
                        agregar_otro = input("¿Desea agregar otro medicamento? (S/N): ").strip().lower()
                        if agregar_otro != 's':
                            break
                    nuevo_registro["medicamentos"] = medicamentos
                
                
                recetar_procedimientos = input("¿Desea recetar procedimientos? (S/N): ").strip().lower()
                if recetar_procedimientos == 's':
                    procedimientos = []
                    nueva_orden = str(ultima_orden + 1)
                    ultima_orden += 1                
                    numero_orden = nueva_orden
                    while True:
                        nombre_procedimiento = input("Nombre del procedimiento: ")
                        cantidad = input("Cantidad: ")
                        frecuencia = input("Frecuencia con la que se repite: ")
                        requiere_especialista = input("¿Requiere asistencia de un especialista? (S/N): ").strip().lower() == 's'
                        especialidades = []
                        if requiere_especialista:
                            print("Especialidades disponibles:")
                            print("1. Dermatología")
                            print("2. Cardiología")
                            print("3. Gastroenterología")
                            print("4. Oftalmologia")
                            print("5. Ortopedista")
                           
                            especialidades_seleccionadas = input("Seleccione las especialidades requeridas (separe con comas y/o números): ")
                            especialidades_dict = {
                                '1': 'Dermatología',
                                '2': 'Cardiología',
                                '3': 'Gastroenterología',
                                '4': 'Oftalmologia',
                                '5': 'Ortopedista'
                            
                            }
                            especialidades_seleccionadas = [especialidades_dict[opcion.strip()] for opcion in especialidades_seleccionadas.split(',')]
                            especialidades = especialidades_seleccionadas
                        procedimiento = {
                            "numero_orden": numero_orden,
                            "nombre_procedimiento": nombre_procedimiento,
                            "cantidad": cantidad,
                            "frecuencia": frecuencia,
                            "requiere_especialista": requiere_especialista,
                            "especialidades": especialidades
                        }
                        procedimientos.append(procedimiento)
                        agregar_otro = input("¿Desea agregar otro procedimiento? (S/N): ").strip().lower()
                        if agregar_otro != 's':
                            break
                    nuevo_registro["procedimientos"] = procedimientos

                
                paciente.historias_clinicas.append(nuevo_registro)
                
                print("Nuevo registro creado con éxito.")
            else:
                print("El paciente no tiene resultados de ayuda diagnóstica.")
        else:
            print("Paciente no encontrado. Verifique la cédula.")

    def obtener_cedula_medico_por_cedula_paciente(self, cedula_paciente):
        for paciente in self.pacientes:
            if hasattr(paciente, 'historias_clinicas'):
                for historia in paciente.historias_clinicas:
                    if 'cedula_medico' in historia and 'cedula_paciente' in historia:
                        if historia['cedula_paciente'] == paciente.cedula:
                            return historia['cedula_medico']
        return None
def realizar_acciones_medico(medico):
    while True:
        print("\nOpciones para el médico:")
        print("1. Consultar Información del Paciente")
        print("2. Registrar Historia Clínica")
        print("3. Consultar Historias Clínicas")
        print("4. Actualizar Historias Clínicas")
        print("5. Ver resultados de ayuda diagnóstica y crear nuevo registro")
        print("6. Cerrar Sesión")

        
        opcion = input("Elige una opción (número): ")
        
        if opcion == "1":
            cedula_paciente = input("Ingrese la cédula del paciente que desea consultar: ")
            paciente = medico.buscar_paciente_por_cedula(cedula_paciente)
            medico.visualizar_informacion_paciente(paciente)
        elif opcion == "2":
            cedula_paciente = input("Ingrese la cédula del paciente para registrar la historia clínica: ")
            paciente = medico.buscar_paciente_por_cedula(cedula_paciente)
            medico.registrar_historia_clinica(paciente, medico.usuario_autenticado)
        elif opcion == "3":
            cedula_paciente = input("Ingrese la cédula del paciente para consultar las historias clínicas: ")
            paciente = medico.buscar_paciente_por_cedula(cedula_paciente)
            medico.consultar_historia_clinica(paciente)
        elif opcion == "4":
            cedula_paciente = input("Ingrese la cédula del paciente para actualizar la historias clínicas: ")
            medico.actualizar_historia_clinica(cedula_paciente)   
        elif opcion == '5':
        # Ver resultados de ayuda diagnóstica y crear nuevo registro
            cedula_paciente = input("Ingrese la cédula del paciente para actualizar la historias clínicas: ")
            medico_autenticado = medico.usuario_autenticado
            medico.ver_resultados_ayuda_diagnostica_y_crear_nuevo_registro(cedula_paciente, medico_autenticado)   
        elif opcion == "6":
            print("Cerrando Sesión...")
            break
        else:
            print("Opción no válida.")

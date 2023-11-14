# -*- coding: utf-8 -*-
"""
Created on Mon Aug 14 09:48:47 2023

@author: alejreye
"""
import re
import datetime

class Usuario:
    def __init__(self, nombre_completo, cedula, correo, telefono, fecha_nacimiento, direccion, rol, nombre_usuario, contrasena):
        self.nombre_completo = nombre_completo
        self.cedula = cedula
        self.correo = correo
        self.telefono = telefono
        self.fecha_nacimiento = fecha_nacimiento
        self.direccion = direccion
        self.rol = rol
        self.nombre_usuario = nombre_usuario
        self.contrasena = contrasena

class RecursosHumanos:
    def __init__(self):
        self.usuarios = []
        usuario_inicial = Usuario(
    "Admin Recursos",
    "1234567891",
    "admin_rh@example.com",
    "3053313313",
    "01/01/1990",
    "123 Calle Principal",
    "RecursosHumanos",
    "admin",
    "password"
)
        self.usuarios.append(usuario_inicial)
        usuario_inicial = Usuario(
    "Admin Personal",
    "1234567892",
    "admin_rh@example.com",
    "3053313313",
    "01/01/1990",
    "123 Calle Principal",
    "Enfermera",
    "admin2",
    "password"
)
        self.usuarios.append(usuario_inicial)
        usuario_inicial = Usuario(
    "Admin Medico",
    "1234567893",
    "admin_rh@example.com",
    "3053313313",
    "01/01/1990",
    "123 Calle Principal",
    "Medico",
    "admin3",
    "password"
)
        self.usuarios.append(usuario_inicial)
        self.roles_dict = {
            "1": "RecursosHumanos",
            "2": "PersonalAdministrativo",
            "3": "Enfermera",
            "4": "Medico",
            "5": "SoporteDeInformacion"
        }
        self.roles_validos = ["1", "2", "3", "4", "5"]
    
    def validar_cedula_unica(self, cedula):
        return all(u.cedula != cedula for u in self.usuarios)

    def validar_correo(self, correo):
        return re.match(r"[^@]+@[^@]+\.[^@]+", correo)

    def validar_telefono(self, telefono):
        return len(telefono) == 10 and telefono.isdigit()

    def validar_fecha(self, fecha):
        return re.match(r"\d{2}/\d{2}/\d{4}", fecha)

    def validar_direccion(self, direccion):
        return len(direccion) <= 30

    def validar_usuario_unico(self, nombre_usuario):
        return all(u.nombre_usuario != nombre_usuario for u in self.usuarios)

    def validar_contrasena(self, contrasena):
        return (
            any(c.isupper() for c in contrasena) and
            any(c.isdigit() for c in contrasena) and
            any(not c.isalnum() for c in contrasena) and
            len(contrasena) >= 8
        )

    def mostrar_roles_disponibles(self):
        print("Roles disponibles:")
        print("1 - RecursosHumanos")
        print("2 - PersonalAdministrativo")
        print("3 - Enfermera")
        print("4 - Medico")
        print("5 - SoporteDeInformacion")

    def crear_usuario(self):
        self.mostrar_roles_disponibles()
        rol_elegido = input("Elige un rol (número): ")

        roles_validos = ["1", "2", "3", "4", "5"]
        if rol_elegido not in roles_validos:
            print("Rol no válido.")
            return

        nombre_completo = input("Nombre completo: ")
        
        while True:
            cedula = input("Número de cédula: ")
            if not self.validar_cedula_unica(cedula):
                print("La cédula ya está en uso.")
            else:
                break

        while True:
            correo = input("Correo electrónico: ")
            if not self.validar_correo(correo):
                print("El correo no es válido. Ejemplo: usuario@dominio.com")
            else:
                break

        while True:
            telefono = input("Número de teléfono: ")
            if not self.validar_telefono(telefono):
                print("El número de teléfono no es válido. Debe tener 10 dígitos.")
            else:
                break

        while True:
            fecha_nacimiento = input("Fecha de nacimiento (DD/MM/YYYY): ")
            if not self.validar_fecha(fecha_nacimiento):
                print("La fecha no es válida. Formato: DD/MM/YYYY")
            else:
                break

        while True:
            direccion = input("Dirección: ")
            if not self.validar_direccion(direccion):
                print("La dirección no es válida. Máximo 30 caracteres.")
            else:
                break

        rol = rol_elegido
        roles_dict = {
            "1": "RecursosHumanos",
            "2": "PersonalAdministrativo",
            "3": "Enfermera",
            "4": "Medico",
            "5": "SoporteDeInformacion"
        }
        rol_nombre = roles_dict[rol]
        while True:
            nombre_usuario = input("Nombre de usuario: ")
            if not self.validar_usuario_unico(nombre_usuario):
                print("El nombre de usuario ya está en uso.")
            else:
                break

        while True:
            contrasena = input("Contraseña: ")
            if not self.validar_contrasena(contrasena):
                print("La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.")
            else:
                break

        nuevo_usuario = Usuario(
            nombre_completo, cedula, correo, telefono,
            fecha_nacimiento, direccion, rol_nombre, nombre_usuario,
            contrasena
        )
        self.usuarios.append(nuevo_usuario)
        print("Usuario creado con éxito.")
        print("Usuarios guardados:", self.usuarios)
    def eliminar_usuario(self):
        if not self.usuarios:
            print("No hay usuarios cargados para eliminar.")
            return
        
        print("Usuarios cargados:")
        for usuario in self.usuarios:
            print(f"Nombre de usuario: {usuario.nombre_usuario} - Rol: {usuario.rol}")
        
        nombre_usuario = input("Ingrese el nombre de usuario del usuario que desea eliminar: ").lower()  # Convertir a minúsculas
        usuario_a_eliminar = None
        for usuario in self.usuarios:
            if usuario.nombre_usuario.lower() == nombre_usuario:  # Comparar en minúsculas
                usuario_a_eliminar = usuario
                break
            
        if usuario_a_eliminar is None:
            print(f"No se encontró un usuario con el nombre de usuario '{nombre_usuario}'.")
            return
            
        self.usuarios.remove(usuario_a_eliminar)
        print(f"Usuario {usuario_a_eliminar.nombre_completo} eliminado con éxito.")
        print("Usuarios guardados:", self.usuarios)

    def actualizar_informacion(self):
        nombre_usuario = input("Ingrese el nombre de usuario del usuario cuya información desea actualizar: ").lower()
        usuario_a_actualizar = None

        for usuario in self.usuarios:
            if usuario.nombre_usuario.lower() == nombre_usuario:
                usuario_a_actualizar = usuario
                break
        
        if usuario_a_actualizar is None:
            print(f"No se encontró un usuario con el nombre de usuario '{nombre_usuario}'.")
            return

        print(f"Actualizando información para el usuario: {usuario_a_actualizar.nombre_completo}")
        
        while True:
            print("Campos disponibles para actualización:")
            print("1 - Nombre completo")
            print("2 - Número de cédula")
            print("3 - Correo electrónico")
            print("4 - Número de teléfono")
            print("5 - Fecha de nacimiento")
            print("6 - Dirección")
            print("7 - Rol")
            print("8 - Contraseña")
            print("9 - Salir")
            
            opcion_actualizacion = input("Elige el campo que deseas actualizar (número): ")
            
            if opcion_actualizacion == "1":
                nuevo_nombre_completo = input("Nuevo nombre completo: ")
                usuario_a_actualizar.nombre_completo = nuevo_nombre_completo
            elif opcion_actualizacion == "2":
                nueva_cedula = input("Nuevo número de cédula: ")
                if self.validar_cedula_unica(nueva_cedula):
                    usuario_a_actualizar.cedula = nueva_cedula
                else:
                    print("La cédula ya está en uso.")
            elif opcion_actualizacion == "3":
                nuevo_correo = input("Nuevo correo electrónico: ")
                if self.validar_correo(nuevo_correo):
                    usuario_a_actualizar.correo = nuevo_correo
                else:
                    print("El correo no es válido.")
            elif opcion_actualizacion == "4":
                nuevo_telefono = input("Nuevo número de teléfono: ")
                if self.validar_telefono(nuevo_telefono):
                    usuario_a_actualizar.telefono = nuevo_telefono
                else:
                    print("El número de teléfono no es válido.")
            elif opcion_actualizacion == "5":
                nueva_fecha_nacimiento = input("Nueva fecha de nacimiento (DD/MM/YYYY): ")
                if self.validar_fecha(nueva_fecha_nacimiento):
                    usuario_a_actualizar.fecha_nacimiento = nueva_fecha_nacimiento
                else:
                    print("La fecha no es válida.")
            elif opcion_actualizacion == "6":
                nueva_direccion = input("Nueva dirección: ")
                if self.validar_direccion(nueva_direccion):
                    usuario_a_actualizar.direccion = nueva_direccion
                else:
                    print("La dirección no es válida.")
            elif opcion_actualizacion == "7":
                nuevo_rol = input("Nuevo rol (número): ")
                if nuevo_rol in self.roles_validos:
                    usuario_a_actualizar.rol = self.roles_dict[nuevo_rol]
                else:
                    print("Rol no válido.")
            elif opcion_actualizacion == "8":
                nueva_contrasena = input("Nueva contraseña: ")
                if self.validar_contrasena(nueva_contrasena):
                    usuario_a_actualizar.contrasena = nueva_contrasena
                else:
                    print("La contraseña no cumple con los requisitos.")
            elif opcion_actualizacion == "9":
                break
            else:
                print("Opción no válida.")
        
        print("Información actualizada con éxito.")

    def registrar_asistencia(self):
        fecha_actual = datetime.date.today().strftime('%d/%m/%Y')
        
        for usuario in self.usuarios:
            respuesta = input(f"¿{usuario.nombre_completo} asistió hoy? (1=Si/2=No): ").lower()
            if respuesta == "1":
                usuario.asistencia = {"fecha": fecha_actual, "asistio": True}
            else:
                usuario.asistencia = {"fecha": fecha_actual, "asistio": False}
        
        print("Asistencias registradas con éxito.")

    def registrar_licencias(self):
        for usuario in self.usuarios:
            print(f"Registrando licencias para el usuario: {usuario.nombre_usuario}")

            licencia_seguridad = input("Licencia en seguridad y salud en el Trabajo (Sí/No): ").lower()
            licencia_salud_ocupacional = input("Licencia en salud ocupacional (Sí/No): ").lower()

            usuario.licencias = {
                "fecha": datetime.date.today().strftime('%d/%m/%Y'),
                "licencia_seguridad": licencia_seguridad == "sí",
                "licencia_salud_ocupacional": licencia_salud_ocupacional == "sí"
            }

            print("Licencias registradas con éxito.")
def main(rh):
    while True:
        print("Opciones:")
        print("1. Crear usuario")
        print("2. Eliminar usuario")
        print("3. Actualizar información de usuario")
        print("4. Registrar asistencia")
        print("5. Manejo de licencias")
        print("6. Salir")
        
        opcion = input("Elige una opción (número): ")
        
        if opcion == "1":
            rh.crear_usuario()
        elif opcion == "2":
            rh.eliminar_usuario()
        elif opcion == "3":
            rh.actualizar_informacion()
        elif opcion == "4":
            rh.registrar_asistencia()
        elif opcion == "5":
            rh.registrar_licencias()
        elif opcion == "6":
            print("Saliendo...")
            break
        else:
            print("Opción no válida.")

if __name__ == "__main__":
    recursos_humanos_instance = RecursosHumanos()  
    main(recursos_humanos_instance)  
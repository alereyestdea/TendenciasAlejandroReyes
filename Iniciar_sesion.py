# -*- coding: utf-8 -*-
"""
Created on Sat Aug 19 11:44:00 2023

@author: alejreye"""

from recursos_humanos import main as recursos_humanos_main
from Personal_Administrativo import main as personal_administrativo_main
from Enfermeras import enfermeras_main, Enfermera  
from recursos_humanos import RecursosHumanos  
from Personal_Administrativo import PersonalAdministrativo
from Medico import Medico
from Medico import realizar_acciones_medico  
def autenticar_usuario(nombre_usuario, contrasena, usuarios):
    for usuario in usuarios:
        if usuario.nombre_usuario == nombre_usuario and usuario.contrasena == contrasena:
            return usuario  
    return None  

def obtener_usuario_autenticado(rh):
    while True:
        nombre_usuario = input("Nombre de usuario: ")
        contrasena = input("Contraseña: ")


        usuario_autenticado = autenticar_usuario(nombre_usuario, contrasena, rh.usuarios)

        if usuario_autenticado:
            print(f"Autenticación exitosa como {usuario_autenticado.rol}.")
            return usuario_autenticado
        else:
            print("Autenticación fallida.")

def main():
    print("Bienvenido al sistema de gestión de la clínica")


    rh = RecursosHumanos()
    pa = PersonalAdministrativo()
    enfermera = Enfermera(pa.pacientes)
    medico = Medico(None, pa.pacientes) 
    while True:  
        usuario_autenticado = obtener_usuario_autenticado(rh)  

        if usuario_autenticado:
            if usuario_autenticado.rol == "RecursosHumanos":
                recursos_humanos_main(rh) 
            elif usuario_autenticado.rol == "PersonalAdministrativo":
                personal_administrativo_main(pa,medico,rh)
                medico = Medico(usuario_autenticado, pa.pacientes)
            elif usuario_autenticado.rol == "Enfermera":
                enfermeras_main(enfermera)
            elif usuario_autenticado.rol == "Medico":

                 pacientes = pa.pacientes
                 medico = Medico(usuario_autenticado, pacientes)
                 realizar_acciones_medico(medico)  
            else:
                print("Autenticación fallida o rol no autorizado.")
        else:
            print("Autenticación fallida.")
        
        continuar = input("¿Desea volver a iniciar sesión? (S/N): ")
        if continuar.lower() != "s":
            break  

if __name__ == "__main__":
    main()


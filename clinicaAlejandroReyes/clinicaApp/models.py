from django.db import models
from django import forms
from djongo import models
import datetime
# Create your models here.


class Usuario(models.Model):
    nombre_completo = models.CharField(max_length=255)
    cedula = models.BigIntegerField(unique=True,primary_key=True)
    correo = models.EmailField()
    telefono = models.BigIntegerField()
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(max_length=255)
    rol = models.CharField(max_length=100)
    nombre_usuario = models.CharField(max_length=50, unique=True)
    contrasena = models.CharField(max_length=255)

class Paciente(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=255)
    cedula = models.BigIntegerField(max_length=20, unique=True)
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=15)
    direccion = models.CharField(max_length=255)
    telefono = models.BigIntegerField()
    correo = models.EmailField(unique=True)
    nombre_contacto_emergencia = models.CharField(max_length=255)
    relacion_paciente = models.CharField(max_length=50)
    nro_contact_emer = models.CharField(max_length=15)
    nombre_seguro = models.CharField(max_length=100)
    nropoliza = models.CharField(max_length=20)
    estadopoliza = models.BooleanField()



class Asistencia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField(default=datetime.date.today)
    asistencia = models.BooleanField(default=False)

class Licencia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    licencia = models.CharField(max_length=50)
    fecha_vencimiento = models.DateField()

class VisitaPaciente(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    presion_arterial = models.CharField(max_length=50)
    temperatura = models.DecimalField(max_digits=5, decimal_places=2)
    pulso = models.PositiveSmallIntegerField()
    nivel_oxigeno = models.DecimalField(max_digits=5, decimal_places=2)
    medicamentos_administrados = models.TextField()
    pruebas_realizadas = models.TextField()
    observaciones = models.TextField()
    recordatorio_visita = models.DateTimeField()

class Orden(models.Model):
    numero_orden = models.IntegerField()
    cedula_paciente = models.CharField(max_length=20)
    cedula_medico = models.CharField(max_length=20)
    fecha_creacion = models.DateField()
    tipo_orden = models.CharField(max_length=20)
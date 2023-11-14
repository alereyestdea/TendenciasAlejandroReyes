from django.http import HttpResponse
from django.views import View
from .models import Usuario, Paciente, Asistencia, Licencia, VisitaPaciente, Orden
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
import re
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from datetime import datetime, timedelta
import jwt
from .mongo_connection import get_mongo_connection
import pymongo
from django.utils import timezone
from bson import json_util

valid_tokens = {}



class ValidateRoleView(APIView):
    def post(self, request):
        try:
            sent_token = request.data.get('token')
            sent_role = request.data.get('rol')
            print("Token a validar:", sent_token)

            if sent_token in valid_tokens:
                try:
                    decoded_token = jwt.decode(sent_token, 'clavedeprueba', algorithms=['HS256'])
                    if decoded_token['rol'] == sent_role:
                        print("Rol válido:", sent_role)
                        return Response({'message': 'Rol válido'}, status=status.HTTP_200_OK)
                except jwt.ExpiredSignatureError:
                    # El token ha expirado
                    pass

            print("Rol inválido:", sent_role)
            return Response({'message': 'Rol inválido'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print("Error en la validación del rol:", str(e))
            return Response({'message': 'Error en la validación del rol'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ValidateTokenView(APIView):
    def post(self, request):
        try:
            sent_token = request.data.get('token')
            print("Token a validar:", sent_token)

            if sent_token in valid_tokens:
                print("Token válido:", sent_token)
                return Response({'message': 'Token válido'}, status=status.HTTP_200_OK)

            print("Token inválido:", sent_token)
            return Response({'message': 'Token inválido'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print("Error en la validación del token:", str(e))
            return Response({'message': 'Error en la validación del token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IsRecursosHumanos(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.auth.decode("utf-8")  # Decodificar el token desde la solicitud
        user_rol = jwt.decode(token, 'clavedeprueba', algorithms=['HS256']).get('rol')
        return user_rol == 'Recursos Humanos'

class IsPersonalAdministrativo(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.auth.decode("utf-8")
        user_rol = jwt.decode(token, 'clavedeprueba', algorithms=['HS256']).get('rol')
        return user_rol == 'Personal administrativo'

    


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('nombre_usuario')
        password = request.data.get('contrasena')
        
        try:
            user = Usuario.objects.get(nombre_usuario=username)
            if user.contrasena == password:
                # Obtener el rol del usuario desde la base de datos
                rol = user.rol
                nombre_completo = user.nombre_completo
                cedula = user.cedula
                # Genera un token JWT manualmente
                expiration_time = datetime.now() + timedelta(hours=1)  # Token válido por 1 hora
                payload = {
                    'user_id': user.cedula,
                    'rol': rol,  # Agregar el rol al token
                    'exp': expiration_time.timestamp()
                }
                secret_key = 'clavedeprueba'
                token = jwt.encode(payload, secret_key, algorithm='HS256')

                # Almacena el nuevo token en la memoria del backend
                valid_tokens[token] = expiration_time

                print("Token generado y almacenado:", valid_tokens)

                # Devuelve el nombre de usuario, rol y token en la respuesta
                return JsonResponse({
                    'rol': rol,
                    'token': token,
                    'nombre_completo': nombre_completo,
                    'cedula':cedula
                })
            else:
                return JsonResponse({'detail': 'Credenciales incorrectas'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'detail': 'Credenciales incorrectas'}, status=401)



class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'detail': 'Proporciona un token de actualización válido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'detail': 'Cierre de sesión exitoso.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({'detail': 'No se pudo cerrar la sesión.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsuarioVista(View):
    permission_classes = [IsRecursosHumanos]
    def _validar_datos(self,jd, validar_cedula=True,usuario_unico=True):
        
            cedula = jd.get('cedula')
            correo = jd.get('correo')
            telefono = jd.get('telefono')
            fecha_nacimiento = jd.get('fecha_nacimiento')
            direccion = jd.get('direccion')
            rol = jd.get('rol')
            nombre_usuario = jd.get('nombre_usuario')
            contrasena = jd.get('contrasena')

            # Validación de cédula única
            if validar_cedula and Usuario.objects.filter(cedula=cedula).exists():
                datos = {'mensaje': 'Cedula ya está en uso.'}
                return JsonResponse(datos, status=400)
            
            if not cedula or not correo or not telefono or not fecha_nacimiento or not direccion or not rol or not nombre_usuario or not contrasena:
                 datos = {'mensaje': 'Ninguno de los campos puede estar vacío.'}
                 return JsonResponse(datos, status=400)

            # Validación de correo electrónico
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', correo):
                datos = {'mensaje': 'El correo electrónico no es válido.'}
                return JsonResponse(datos, status=400)

            # Validación de número de teléfono
            try:
                telefono = int(telefono)
                if telefono < 10**9 or telefono >= 10**10:
                    return JsonResponse({'mensaje': 'El número de teléfono debe contener 10 dígitos.'}, status=400)
            except (ValueError, TypeError):
                return JsonResponse({'mensaje': 'El número de teléfono debe ser un valor numérico válido.'}, status=400)


            # Validación de fecha de nacimiento
            #if not re.match(r'^\d{2}/\d{2}/\d{4}$', fecha_nacimiento):
             #   datos = {'mensaje': 'La fecha de nacimiento debe tener el formato DD/MM/YYYY.'}
              #  return JsonResponse(datos, status=400)

            # Validación de dirección
            if len(direccion) > 30:
                datos = {'mensaje': 'La dirección no puede tener más de 30 caracteres.'}
                return JsonResponse(datos, status=400)

            # Validación de rol
            roles_validos = ['Médico', 'Enfermera', 'Personal administrativo', 'Recursos Humanos']
            if rol not in roles_validos:
                datos = {'mensaje': 'El rol no es válido.'}
                return JsonResponse(datos, status=400)

            # Validación de nombre de usuario único
            if usuario_unico and Usuario.objects.filter(nombre_usuario=nombre_usuario).exists():
                datos = {'mensaje': 'El nombre de usuario ya está en uso.'}
                return JsonResponse(datos, status=400)

            # Validación de contraseña
            if not re.match(r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$', contrasena):
                datos = {'mensaje': 'La contraseña debe incluir al menos una mayúscula, un número, un carácter especial y tener por lo menos 8 caracteres.'}
                return JsonResponse(datos, status=400)
            
            return None

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def get(self,request,cedula=None):
        if (cedula!=None):
            usuarios= list(Usuario.objects.filter(cedula=cedula).values())
            if len  (usuarios)>0:
                usuario=usuarios[0]
                datos={'mensaje':'success','usuario':usuario}
            else:
                datos={'mensaje':'no existe el usuario'}
            return JsonResponse(datos)
        else:
            usuarios= list(Usuario.objects.values())
            if len  (usuarios)>0:
                datos={'mensaje':'success','usuarios':usuarios}
            else:
                datos={'mensaje':'no hay usuarios registrados'}
            return JsonResponse(datos)
        
    def post(self,request):
            jd = json.loads(request.body)
            error_response = self._validar_datos(jd)
            if error_response: 
                return error_response
            Usuario.objects.create(nombre_completo=jd['nombre_completo'],cedula=jd['cedula'],correo=jd['correo'],telefono=jd['telefono'],fecha_nacimiento=jd['fecha_nacimiento'],direccion=jd['direccion'],rol=jd['rol'],nombre_usuario=jd['nombre_usuario'],contrasena=jd['contrasena'])
            datos = {'mensaje':'success'}
            return JsonResponse(datos)
    
    def put(self, request, cedula):
        jd = json.loads(request.body)
        error_response = self._validar_datos(jd, validar_cedula=False,usuario_unico=False)
        if error_response:
            return error_response

        try:
            usuario = Usuario.objects.get(cedula=cedula)
        except Usuario.DoesNotExist:
            datos = {'mensaje': 'Usuario no encontrado.'}
            return JsonResponse(datos, status=404)
        # Actualiza los datos del usuario
        usuario.nombre_completo = jd['nombre_completo']
        usuario.cedula = jd['cedula']
        usuario.correo = jd['correo']
        usuario.telefono = jd['telefono']
        usuario.fecha_nacimiento = jd['fecha_nacimiento']
        usuario.direccion = jd['direccion']
        usuario.rol = jd['rol']
        usuario.nombre_usuario = jd['nombre_usuario']
        usuario.contrasena = jd['contrasena']
        usuario.save()

        datos = {'mensaje': 'success'}
        return JsonResponse(datos)



    def delete(self,request, cedula):
        usuarios = list(Usuario.objects.filter(cedula=cedula).values())
        if len(usuarios) > 0:
            Usuario.objects.filter(cedula=cedula).delete()
            datos = {'mensaje': 'success'}
        else:
            datos = {'mensaje': 'no existe el usuario'}
        return JsonResponse(datos)
    

from django.http import JsonResponse
from django.views import View
import json

class PacienteVista(View):
    permission_classes = [IsPersonalAdministrativo]

    def _validar_datos(self, jd):
        cedula = jd.get('cedula')
        telefono = str(jd.get('telefono'))  # Convertir a string para verificar la longitud y si son dígitos
        nro_contact_emer = str(jd.get('nro_contact_emer'))  # Igualmente para el número de emergencia


        if len(telefono) != 10 or not telefono.isdigit():
            datos = {'mensaje': 'El número de teléfono debe tener 10 caracteres y contener solo números'}
            return JsonResponse(datos, status=400)

        if len(nro_contact_emer) != 10 or not nro_contact_emer.isdigit():
            datos = {'mensaje': 'El número de teléfono de emergencia debe tener máximo 10 dígitos y contener solo números'}
            return JsonResponse(datos, status=400)

        return None

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, cedula=None):
        if cedula is not None:
            pacientes = list(Paciente.objects.filter(cedula=cedula).values())
            if len(pacientes) > 0:
                paciente = pacientes[0]
                datos = {'mensaje': 'success', 'usuario': paciente}
            else:
                datos = {'mensaje': 'no existe el usuario'}
            return JsonResponse(datos)
        else:
            pacientes = list(Paciente.objects.values())
            if len(pacientes) > 0:
                datos = {'mensaje': 'success', 'pacientes': pacientes}
            else:
                datos = {'mensaje': 'no hay usuarios registrados'}
            return JsonResponse(datos)

    def post(self, request):
        jd = json.loads(request.body)
        error_response = self._validar_datos(jd)
        if error_response:
            return error_response

        Paciente.objects.create(
            nombre_completo=jd['nombre_completo'],
            cedula=jd['cedula'],
            fecha_nacimiento=jd['fecha_nacimiento'],
            genero=jd['genero'],
            direccion=jd['direccion'],
            telefono=jd['telefono'],
            correo=jd['correo'],
            nombre_contacto_emergencia=jd['nombre_contacto_emergencia'],
            relacion_paciente=jd['relacion_paciente'],
            nro_contact_emer=jd['nro_contact_emer'],
            nombre_seguro=jd['nombre_seguro'],
            nropoliza=jd['nropoliza'],
            estadopoliza=jd['estadopoliza']
        )
        datos = {'mensaje': 'success'}
        return JsonResponse(datos)

    def put(self, request, cedula):
        jd = json.loads(request.body)
        error_response = self._validar_datos(jd)
        if error_response:
            return error_response

        try:
            paciente = Paciente.objects.get(cedula=cedula)
        except Paciente.DoesNotExist:
            datos = {'mensaje': 'Paciente no encontrado.'}
            return JsonResponse(datos, status=404)

        # Actualiza los datos del paciente
        paciente.nombre_completo = jd['nombre_completo']
        paciente.cedula = jd['cedula']
        paciente.fecha_nacimiento = jd['fecha_nacimiento']
        paciente.genero = jd['genero']
        paciente.direccion = jd['direccion']
        paciente.telefono = jd['telefono']
        paciente.correo = jd['correo']
        paciente.nombre_contacto_emergencia = jd['nombre_contacto_emergencia']
        paciente.relacion_paciente = jd['relacion_paciente']
        paciente.nro_contact_emer = jd['nro_contact_emer']
        paciente.nombre_seguro = jd['nombre_seguro']
        paciente.nropoliza = jd['nropoliza']
        paciente.estadopoliza = jd['estadopoliza']
        paciente.save()

        datos = {'mensaje': 'success'}
        return JsonResponse(datos)

    def delete(self, request, cedula):
        pacientes = list(Paciente.objects.filter(cedula=cedula).values())
        if len(pacientes) > 0:
            Paciente.objects.filter(cedula=cedula).delete()
            datos = {'mensaje': 'success'}
        else:
            datos = {'mensaje': 'no existe el paciente'}
        return JsonResponse(datos)




class Facturacion(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, cedula):
        try:
            paciente = Paciente.objects.get(cedula=cedula)

            fecha_nacimiento = paciente.fecha_nacimiento
            fecha_actual = datetime.now().date()
            edad = fecha_actual.year - fecha_nacimiento.year - ((fecha_actual.month, fecha_actual.day) < (fecha_nacimiento.month, fecha_nacimiento.day))

            # Obtener todas las órdenes del paciente
            try:
                ordenes = Orden.objects.filter(cedula_paciente=cedula).order_by('-id')
            except Orden.DoesNotExist:
                ordenes = []

            # Inicializar listas de medicamentos y procedimientos
            medicamentos_list = []
            procedimientos_list = []

            for orden in ordenes:
                cedula_medico = orden.cedula_medico
                numero_orden = orden.numero_orden

                try:
                    usuario_medico = Usuario.objects.get(cedula=cedula_medico)
                    nombre_medico = usuario_medico.nombre_completo
                except Usuario.DoesNotExist:
                    nombre_medico = "No disponible"

                print(f"Orden encontrada: {numero_orden}")

                db = get_mongo_connection()
                if db is not None and numero_orden:
                    # Obtener medicamentos asociados a la orden
                    collection_medicamentos = db.Medicamentos
                    medicamentos = collection_medicamentos.find({"numero_orden": str(numero_orden)})
                    medicamentos_list.extend(list(medicamentos))

                    # Obtener procedimientos asociados a la orden
                    collection_procedimientos = db.Procedimientos
                    procedimientos = collection_procedimientos.find({"numero_orden": str(numero_orden)})
                    procedimientos_list.extend(list(procedimientos))

            # Calcular el costo total
            costo_medicamentos = sum([float(medicamento['costo']) for medicamento in medicamentos_list])
            costo_procedimientos = sum([float(procedimiento['costo']) for procedimiento in procedimientos_list])

            costo_total = costo_medicamentos + costo_procedimientos
            # Puedes hacer lo mismo para la colección Procedimientos si es necesario

            factura_data = {
                'nombre_paciente': paciente.nombre_completo,
                'nombre_medico': nombre_medico,
                'cedula': paciente.cedula,
                'edad': edad,
                'compania_seguro': paciente.nombre_seguro,
                'numero_poliza': paciente.nropoliza,
                'estado_poliza': paciente.estadopoliza,
                'medicamentos': json_util.dumps(medicamentos_list, default=str),
                'procedimientos': json_util.dumps(procedimientos_list, default=str),
                'costo_total': costo_total,  # Ajusta según tu lógica de cálculo
            }


            return JsonResponse(factura_data)
        except Paciente.DoesNotExist:
            return JsonResponse({'error': 'Paciente no encontrado'}, status=404)



class AsistenciaView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, usuario_id=None):
        if usuario_id is not None:
            asistencias = Asistencia.objects.filter(usuario_id=usuario_id)
            if asistencias.exists():
                datos = {'mensaje': 'success', 'asistencias': list(asistencias.values())}
            else:
                datos = {'mensaje': 'No hay asistencias para este usuario'}
            return JsonResponse(datos)
        else:
            asistencias = Asistencia.objects.all()
            if asistencias.exists():
                datos = {'mensaje': 'success', 'asistencias': list(asistencias.values())}
            else:
                datos = {'mensaje': 'No hay asistencias registradas'}
            return JsonResponse(datos)


    def post(self, request):
        jd = json.loads(request.body)
        usuario_id = jd.get('usuario_id')
        fecha = jd.get('fecha')
        asistencia = jd.get('asistencia')

        if usuario_id:
            usuario = Usuario.objects.filter(cedula=usuario_id).first()
            if usuario:
                Asistencia.objects.create(usuario_id=usuario.cedula, fecha=fecha, asistencia=asistencia)
                datos = {'mensaje': 'success'}
            else:
                datos = {'mensaje': 'El usuario no existe'}
        else:
            datos = {'mensaje': 'No se proporcionó el usuario_id'}

        return JsonResponse(datos)


class LicenciaView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, usuario_id=None):
        if usuario_id is not None:
            licencias = Licencia.objects.filter(usuario_id=usuario_id)
            if licencias.exists():
                datos = {'mensaje': 'success', 'licencias': list(licencias.values())}
            else:
                datos = {'mensaje': 'No hay licencias para este usuario'}
            return JsonResponse(datos)
        else:
            licencias = Licencia.objects.all()
            if licencias.exists():
                datos = {'mensaje': 'success', 'licencias': list(licencias.values())}
            else:
                datos = {'mensaje': 'No hay licencias registradas'}
            return JsonResponse(datos)

    def post(self, request):
        jd = json.loads(request.body)
        usuario_id = jd.get('usuario_id')
        licencia = jd.get('licencia')
        fecha_vencimiento = jd.get('fecha_vencimiento')

        if usuario_id:
            usuario = Usuario.objects.filter(cedula=usuario_id).first()
            if usuario:
                Licencia.objects.create(usuario=usuario, licencia=licencia, fecha_vencimiento=fecha_vencimiento)
                datos = {'mensaje': 'Asistencia registrada con exito'}
            else:
                datos = {'mensaje': 'El usuario no existe'}
        else:
            datos = {'mensaje': 'No se proporcionó el usuario_id'}

        return JsonResponse(datos)
    
class VisitaPacienteView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, paciente_id=None):
        if paciente_id is not None:
            visitas = VisitaPaciente.objects.filter(paciente__cedula=paciente_id)
            if visitas.exists():
                data = {'mensaje': 'success', 'visitas': list(visitas.values())}
            else:
                data = {'mensaje': 'No hay visitas para este paciente'}
            return JsonResponse(data)
        else:
            visitas = VisitaPaciente.objects.all()
            if visitas.exists():
                data = {'mensaje': 'success', 'visitas': list(visitas.values())}
            else:
                data = {'mensaje': 'No hay visitas registradas'}
            return JsonResponse(data)

    def post(self, request):
        jd = json.loads(request.body)
        cedula_paciente = jd.get('cedula_paciente')
        # Aquí, se asume que 'cedula_paciente' es el campo 'cedula' en el modelo 'Paciente'.
        paciente = Paciente.objects.filter(cedula=cedula_paciente).first()
        
        if paciente:
            # Crear una nueva visita asociada al paciente encontrado.
            visita = VisitaPaciente(
                paciente=(paciente),
                presion_arterial=jd.get('presion_arterial'),
                temperatura=jd.get('temperatura'),
                pulso=jd.get('pulso'),
                nivel_oxigeno=jd.get('nivel_oxigeno'),
                medicamentos_administrados=jd.get('medicamentos_administrados'),
                pruebas_realizadas=jd.get('pruebas_realizadas'),
                observaciones=jd.get('observaciones'),
                recordatorio_visita=jd.get('recordatorio_visita')
            )
            visita.save()
            data = {'mensaje': 'success'}
        else:
            data = {'mensaje': 'El paciente no existe'}
        
        return JsonResponse(data)
    


ordenes_existentes = set()
@method_decorator(csrf_exempt, name='dispatch')
class HistoriaClinicaView(View):
    def get(self, request):
        # Obtiene la conexión a la base de datos MongoDB.
        mongo_db = get_mongo_connection()

        if mongo_db is not None:
            # Consulta y muestra todas las historias clínicas almacenadas.
            collection = mongo_db.HistoriaClinica
            historias_clinicas = list(collection.find())

            # Convertir ObjectId a cadena y serializar el resultado
            for historia in historias_clinicas:
                historia['_id'] = str(historia['_id'])

            return JsonResponse(historias_clinicas, safe=False, json_dumps_params={'default': str})
        else:
            return HttpResponse("Error de conexión a MongoDB")

    def post(self, request):
        global numero_orden_global  # Asegúrate de que estás utilizando la variable global
        global ordenes_existentes  # Asegúrate de que estás utilizando el conjunto global
                # Validar cédula del médico
        db = get_mongo_connection()


        # Obtiene la conexión a la base de datos MongoDB.
        mongo_db = get_mongo_connection()

        if mongo_db is not None:
            # Inserta una nueva historia clínica en la colección "HistoriaClinica".
            collection = mongo_db.HistoriaClinica

            # Extrae y analiza los datos del cuerpo JSON de la solicitud POST.
            data = json.loads(request.body.decode('utf-8'))

            # Validación: Si se receta ayuda diagnóstica, no debe haber procedimientos ni medicamentos.
            if 'diag_numero_orden' in data and ('proc_numero_orden' in data or 'med_numero_orden' in data):
                return HttpResponse("No se puede recetar procedimiento o medicamento cuando se receta ayuda diagnóstica.", status=400)

            # Guardar el número de orden global
            numero_orden_global = {
                'med': data.get('med_numero_orden'),
                'proc': data.get('proc_numero_orden'),
                'diag': data.get('diag_numero_orden'),
            }

            # Validar que las órdenes sean únicas
            todas_las_ordenes = list(collection.find({}, {'_id': 0, 'medicamentos.numero_orden': 1, 'procedimientos.numero_orden': 1, 'ayuda_diagnostica.numero_orden': 1}))
            for order in todas_las_ordenes:
                if 'medicamentos' in order:
                    ordenes_existentes.add(order['medicamentos'][0]['numero_orden'])
                if 'procedimientos' in order:
                    ordenes_existentes.add(order['procedimientos'][0]['numero_orden'])
                if 'ayuda_diagnostica' in order:
                    ordenes_existentes.add(order['ayuda_diagnostica']['numero_orden'])

            # Validar que las nuevas órdenes sean únicas
            if (
                numero_orden_global['med'] in ordenes_existentes or
                numero_orden_global['proc'] in ordenes_existentes or
                numero_orden_global['diag'] in ordenes_existentes
            ):
                return HttpResponse("Las órdenes deben ser únicas.", status=400)
            # Validar que las órdenes 'med' y 'proc' sean diferentes
            if (
                (numero_orden_global['med'] is not None and numero_orden_global['proc'] is not None) and
                (numero_orden_global['med'] == numero_orden_global['proc'])
            ):
                return HttpResponse("Las ordenes deben ser diferentes.", status=400)

            # Validación: Si se ven los resultados de la ayuda diagnóstica, crea un nuevo registro con diagnóstico y recetas.
            if 'resultados_ayuda_diagnostica' in data:
                # Crea un nuevo registro con diagnóstico y recetas.
                nuevo_registro = {
                    'diagnostico': data.get('diagnostico'),
                    'medicamentos': data.get('medicamentos', []),
                    'procedimientos': data.get('procedimientos', []),
                }
                
                # Inserta el nuevo registro en la base de datos.
                try:
                    result = collection.insert_one(nuevo_registro)
                    return HttpResponse("Nuevo registro creado con éxito. ID: {}".format(result.inserted_id))
                except pymongo.errors.PyMongoError as e:
                    return HttpResponse("Error al insertar nuevo registro: {}".format(str(e)))
              
            # Validación: En caso de haber varios medicamentos recetados, todos van asociados a la misma orden.
            numeros_de_orden = [med.get('numero_orden') for med in data.get('medicamentos', [])]
            numeros_de_orden = [num for num in numeros_de_orden if num is not None]  # Filtra aquellos que son None

            if len(set(numeros_de_orden)) > 1:
                return HttpResponse("Todos los medicamentos deben tener el mismo número de orden.", status=400)

            # Validación: En caso de haber varios procedimientos solicitados, todos van asociados a la misma orden.
            if len(set(proc['numero_orden'] for proc in data.get('procedimientos', []))) > 1:
                return HttpResponse("Todos los procedimientos deben tener el mismo número de orden.", status=400)

            fecha = data.get('fecha')
            cedula_paciente = data.get('cedula_paciente')
            cedula_medico = data.get('cedula_medico')
            motivo_consulta = data.get('motivo_consulta')
            sintomatologia = data.get('sintomatologia')
            diagnostico = data.get('diagnostico')
            medicamentos = None

            if (
                data.get('med_numero_orden') is not None or
                data.get('med_nombre') is not None or
                data.get('med_dosis') is not None or
                data.get('med_duracion_tratamiento') is not None
            ):
                medicamentos = [
                    {
                        'numero_orden': data.get('med_numero_orden'),
                        'nombre': data.get('med_nombre'),
                        'dosis': data.get('med_dosis'),
                        'duracion_tratamiento': data.get('med_duracion_tratamiento'),
                    }
                ]

            # Crear la lista de procedimientos solo si hay información válida
            procedimientos = None

            if (
                data.get('proc_numero_orden') is not None or
                data.get('proc_nombre') is not None or
                data.get('proc_cantidad') is not None or
                data.get('proc_frecuencia') is not None or
                data.get('proc_requiere_asistencia') is not None or
                data.get('proc_especialidades') is not None
            ):
                procedimientos = [
                    {
                        'numero_orden': data.get('proc_numero_orden'),
                        'nombre': data.get('proc_nombre'),
                        'cantidad': data.get('proc_cantidad'),
                        'frecuencia': data.get('proc_frecuencia'),
                        'requiere_asistencia': data.get('proc_requiere_asistencia'),
                        'especialidades': data.get('proc_especialidades'),
                    }
                ]
            ayuda_diagnostica = None

            if (
                data.get('diag_numero_orden') is not None or
                data.get('diag_nombre') is not None or
                data.get('diag_cantidad') is not None or
                data.get('diag_requiere_asistencia') is not None
            ):
                ayuda_diagnostica = {
                    'numero_orden': data.get('diag_numero_orden'),
                    'nombre': data.get('diag_nombre'),
                    'cantidad': data.get('diag_cantidad'),
                    'requiere_asistencia': data.get('diag_requiere_asistencia'),
                }
            
            new_historia_clinica = {
                "fecha": fecha,
                "cedula_paciente": cedula_paciente,
                "cedula_medico": cedula_medico,
                "motivo_consulta": motivo_consulta,
                "sintomatologia": sintomatologia,
                "diagnostico": diagnostico,
            }

            # Añadir medicamentos si están presentes
            if medicamentos is not None:
                new_historia_clinica["medicamentos"] = medicamentos

            # Añadir procedimientos si están presentes
            if procedimientos is not None:
                new_historia_clinica["procedimientos"] = procedimientos

            # Añadir ayuda diagnóstica si está presente
            if ayuda_diagnostica is not None:
                new_historia_clinica["ayuda_diagnostica"] = ayuda_diagnostica
        try:
            medico = Usuario.objects.get(cedula=cedula_medico, rol='Medico')
        except Usuario.DoesNotExist:
            return HttpResponse("El médico no está registrado o no tiene el rol adecuado.", status=400)

        # Validar cédula del paciente
        try:
            paciente = Paciente.objects.get(cedula=cedula_paciente)
        except Paciente.DoesNotExist:
            return HttpResponse("El paciente no está registrado.", status=400)
            
        # Guardar en MongoDB
        try:
            result_mongo = collection.insert_one(new_historia_clinica)
            print("Historia clínica insertada en MongoDB con éxito. ID: {}".format(result_mongo.inserted_id))
        except pymongo.errors.PyMongoError as e:
            return HttpResponse("Error al insertar historia clínica en MongoDB: {}".format(str(e)))

        # Guardar en MongoDB - Medicamento
        try:
            collection_medicamentos = db.Medicamentos  # Ajusta según el nombre real de tu colección
            medicamento_data = {
                'numero_orden': numero_orden_global['med'],
                'nombre_medicamento': data.get('med_nombre'),
                'dosis': data.get('med_dosis'),
                'duracion_tratamiento': data.get('med_duracion_tratamiento'),
                'costo': data.get('med_costo'),
            }
            result_mongo_medicamento = collection_medicamentos.insert_one(medicamento_data)
            print("Medicamento insertado en MongoDB con éxito. ID: {}".format(result_mongo_medicamento.inserted_id))
        except pymongo.errors.PyMongoError as e:
            return HttpResponse("Error al insertar medicamento en MongoDB: {}".format(str(e)))


        # Guardar en MongoDB - Procedimiento
        try:
            collection_procedimientos = db.Procedimientos  # Ajusta según el nombre real de tu colección
            procedimiento_data = {
                'numero_orden': numero_orden_global['proc'],
                'nombre_procedimiento': data.get('proc_nombre'),
                'cantidad': data.get('proc_cantidad'),
                'frecuencia': data.get('proc_frecuencia'),
                'costo': data.get('proc_costo'),
                'requiere_asistencia': data.get('proc_requiere_asistencia'),
            }
            result_mongo_procedimiento = collection_procedimientos.insert_one(procedimiento_data)
            print("Procedimiento insertado en MongoDB con éxito. ID: {}".format(result_mongo_procedimiento.inserted_id))
        except pymongo.errors.PyMongoError as e:
            return HttpResponse("Error al insertar procedimiento en MongoDB: {}".format(str(e)))

        # Guardar en MySQL - Medicamento
        try:
            orden_medicamento = Orden.objects.create(
                numero_orden=numero_orden_global['med'],
                cedula_paciente=cedula_paciente,
                cedula_medico=cedula_medico,
                fecha_creacion=timezone.now(),
                tipo_orden='medicamento'
            )
            print("Orden de medicamento insertada en MySQL con éxito. ID: {}".format(orden_medicamento.id))
        except Exception as e:
            # Manejar el error apropiadamente según tus necesidades
            print("Error al insertar orden de medicamento en MySQL: {}".format(str(e)))

        # Guardar en MySQL - Procedimiento
        try:
            orden_procedimiento = Orden.objects.create(
                numero_orden=numero_orden_global['proc'],
                cedula_paciente=cedula_paciente,
                cedula_medico=cedula_medico,
                fecha_creacion=timezone.now(),
                tipo_orden='procedimiento'
            )
            print("Orden de procedimiento insertada en MySQL con éxito. ID: {}".format(orden_procedimiento.id))
        except Exception as e:
            # Manejar el error apropiadamente según tus necesidades
            print("Error al insertar orden de procedimiento en MySQL: {}".format(str(e)))

        # Retorna una respuesta exitosa
        return HttpResponse("Datos guardados con éxito.")

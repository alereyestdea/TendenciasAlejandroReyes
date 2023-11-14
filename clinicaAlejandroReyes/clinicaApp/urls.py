from django.urls import path
from clinicaApp.views import UsuarioVista, PacienteVista,Facturacion, LoginView, LogoutView, ValidateTokenView, ValidateRoleView, HistoriaClinicaView,AsistenciaView, LicenciaView, VisitaPacienteView


urlpatterns = [
    path('usuarios/', UsuarioVista.as_view(), name='usuarios_list'),
    path('usuarios/<int:cedula>', UsuarioVista.as_view(), name='usuarios_process'),
    path('pacientes/', PacienteVista.as_view(), name='pacientes_list'),
    path('pacientes/<int:cedula>', PacienteVista.as_view(), name='pacientes_process'),
    path('factura/<int:cedula>/', Facturacion.as_view(), name='factura'),
    path('asistencia/', AsistenciaView.as_view(), name='asistencia'),
    path('asistencia/<int:usuario_id>/', AsistenciaView.as_view(), name='asistencia_process'),
    path('licencia/', LicenciaView.as_view(), name='licencia-list'),
    path('licencia/<str:usuario_id>/', LicenciaView.as_view(), name='licencia-detail'),
    path('registrovisita/', VisitaPacienteView.as_view(), name='registrovisita'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('validate-token/', ValidateTokenView.as_view(), name='validate-token'),
    path('validate_rol/', ValidateRoleView.as_view(), name='validate-rol'),
    path('historia_clinica/', HistoriaClinicaView.as_view(), name='historia_clinica'),
]
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clinicaApp/',include('clinicaApp.urls'))
    # Define otras rutas según tus necesidades
]
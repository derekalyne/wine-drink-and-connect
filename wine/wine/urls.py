from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('wine/', include('wine.urls')),
    path('admin/', admin.site.urls),
]
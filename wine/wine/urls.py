from django.contrib import admin
from django.urls import include, path
from welcome import views
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('template/', include('template.urls')),
    path('welcome/', include('welcome.urls')),
    path('admin/', admin.site.urls),
    path('api/',include('api.urls')),
    url(r'^api/members/$', csrf_exempt(views.member_list)),
]
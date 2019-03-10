from django.contrib import admin
from django.urls import include, path
from welcome import views
from django.conf.urls import url

urlpatterns = [
    path('template/', include('template.urls')),
    path('welcome/', include('welcome.urls')),
    path('admin/', admin.site.urls),
    url(r'^api/members/$', views.member_list),
]
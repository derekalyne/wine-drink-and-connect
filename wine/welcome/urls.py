from django.urls import path
from django.conf.urls import url
from . import views
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    url(r'^', csrf_exempt(views.FrontendAppView.as_view())),
]
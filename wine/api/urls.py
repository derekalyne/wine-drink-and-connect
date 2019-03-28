from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('drinkers/', csrf_exempt(views.user_list)),
    path('drinkers/<str:username>', csrf_exempt(views.user_detail)),
    path('login/', csrf_exempt(views.user_login)),
    path('reviews/wid/<int:wid>', csrf_exempt(views.review_list)),
    path('reviews/rid/<int:rid>', csrf_exempt(views.review_update)),
    path('wines/', csrf_exempt(views.wine_list)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('drinkers/', views.user_list),
    path('drinkers/<str:username>', views.user_detail),
    path('login/', views.user_login),
    path('reviews/<int:wid>', views.review_list),
    path('wines/', views.wine_list),
]

urlpatterns = format_suffix_patterns(urlpatterns)
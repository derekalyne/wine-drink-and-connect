from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from api import mongo_views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('drinkers/', csrf_exempt(views.user_list)),
    path('drinkers/<str:username>', csrf_exempt(views.user_detail)),
    path('login/', csrf_exempt(views.user_login)),
    path('reviews/wid/<int:wid>', csrf_exempt(views.review_list)),
    path('reviews/rid/<int:rid>', csrf_exempt(views.review_update)),
    path('reviews/username/<str:username>', csrf_exempt(views.review_from_user)),
    path('wines/', csrf_exempt(views.wine_list)),
    path('group', csrf_exempt(mongo_views.createGroup)),
    path('group/<int:gid>/members', csrf_exempt(views.group_members)),
    path('group/<str:username>', csrf_exempt(views.groups_by_username)),
    path('message/<str:groupId>', csrf_exempt(mongo_views.messages)),
]

urlpatterns = format_suffix_patterns(urlpatterns)
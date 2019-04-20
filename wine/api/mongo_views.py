from .mongo_models import Group, Message
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from bson import json_util
from bson.json_util import dumps
from django.http import HttpResponse
from .views import add_member_to_group
import pprint

db = MongoClient().practice


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


@api_view(['GET','POST'])
@csrf_exempt
def messages(request, groupId, format=None):
    """
        API endpoint that gets all messages on GET
            GET simply requires groupId passed through url
        and creates a new message when POST
            POST takes groupId in URL and data
            { author: str, text: str}
        /api/drinkers
        """
    if request.method == 'GET':
        if groupId is None:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
        objId = groupId
        pipeline = [
            {"$match": {"_id": ObjectId(objId)}},
            {"$project":
                 {
                     "name": 1,
                     "messages": {"$slice": ["$messages", -100]}
                 }
             }
        ]
        found = db.test2.aggregate(pipeline)
        ret = dumps(found, default=json_util.default)
        return HttpResponse(ret, content_type='application/json', status=status.HTTP_200_OK)

    if request.method == 'POST':
        if "author" not in request.data or "text" not in request.data or groupId is None:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
        author = request.data['author']
        text = request.data['text']
        objId = ObjectId(groupId)
        new_message = vars(Message(author=author, text=text))
        update_response = db.test2.update_one({'_id': objId}, {'$push': {'messages': new_message}})
        print(update_response)
        return Response(request.data, status=status.HTTP_201_CREATED)


# http://api.mongodb.com/python/3.7.0/examples/aggregation.html
@api_view(['POST'])
@csrf_exempt
def createGroup(request, format=None):
    """
        API endpoint that gets all messages on GET
        and creates a new user when POST
        /api/drinkers
        """
    if request.method == 'POST':
        if "name" not in request.data or "members" not in request.data or len(request.data['members'])==0:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
        name = request.data['name']
        members = request.data['members']
        new_group = vars(Group(name=name))
        insert_id = db.test2.insert(new_group)
        mongo_id = str(insert_id)

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO groups (name, mongoId) VALUES (%s, %s)", [name, mongo_id])
            gid = cursor.lastrowid

        for member in members:
            add_member_to_group(gid, member)

        retVal = {
            "gid": gid,
            "name": name,
            "mongoId": mongo_id,
        }
        return Response(retVal, status=status.HTTP_201_CREATED)

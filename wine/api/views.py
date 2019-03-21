from .serializers import DrinkersSerializer, LocationsSerializer,ReviewsSerializer,WinesSerializer
from .models import Drinkers,Locations,Reviews,Wines
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist

@api_view(['GET','POST'])
def user_list(request, format=None):
    """
    API endpoint that gives all users when GET
    and creates a new user when POST
    /api/drinkers 
    """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        members = Drinkers.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(members, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = DrinkersSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/drinkers/?page=' + str(nextPage), 'prevlink': '/api/drinkers/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = DrinkersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT'])
def user_detail(request,username,format=None):
    """
    API endpoint that gives specific users when GET
    and updates a the user when PUT
    /api/drinkers 
    """
    if request.method == 'GET':
        try:
            user = Drinkers.objects.get(username = username)
            return Response(DrinkersSerializer(user).data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response("User Does Not Exist",status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            user = Drinkers.objects.get(username = username)
            if request.data['username']:
                user.username = request.data['username']
            if request.data['password']:
                user.password = request.data['password']
            if request.data['name']:
                user.name = request.data['name']
            if request.data['age']:
                user.age = request.data['age']
            if request.data['gender']:
                user.gender = request.data['gender']
            user.save()
            return Response(DrinkersSerializer(user).data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response("User Does Not Exist",status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request, format=None):
    """
    API endpoint that checks the input username and password and returns a match or fail as login token
    /api/login 
    """
    print(request.data)
    try:
        user = Drinkers.objects.get(username = request.data['username'])
        if user.password == request.data['password']:
            return Response(DrinkersSerializer(user).data, status=status.HTTP_200_OK)
        else:
            return Response("Wrong Password",status=status.HTTP_400_BAD_REQUEST)

    except ObjectDoesNotExist:
        return Response("User Does Not Exist",status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def review_list(request,wid,format=None):
    """
    API endpoint that return list of reviews and wine info for a given wine
    /api/reviews/{wid}
    """
    pass

@api_view(['GET'])
def wine_list(request,format=None):
    """
    API endpoint that 
    1. Get list of wines by name
    2. Paginated list with page size of 20
    3. In future add other searchable options
    /api/wines/?name={name}?page={page}
    """
    name = request.GET.get('name')
    page = request.GET.get('page', 1)
    pass
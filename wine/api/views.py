from .serializers import DrinkersSerializer, LocationsSerializer,ReviewsSerializer,WinesSerializer
from .models import Drinkers,Locations,Reviews,Wines
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings

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

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages})

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
    data = []
    members = Reviews.objects.all()
    members = members.filter(wid = wid)
    page = request.GET.get('page', 1)
    paginator = Paginator(members, 10)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = ReviewsSerializer(data,context={'request': request} ,many=True)
    
    return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages})
    

@api_view(['GET'])
def wine_list(request,format=None):
    """
    API endpoint that 
    1. Get list of wines by name
    2. Paginated list with page size of 20
    3. In future add other searchable options
    /api/wines/?name={name}&?page={page}
    """
    name = request.GET.get('name')
    winery = request.GET.get('winery')
    year_gt = request.GET.get('year_gt')
    year_lt = request.GET.get('year_lt')
    variety = request.GET.get('variety')
    price_gt = request.GET.get('price_gt')
    price_lt = request.GET.get('price_lt')
    designation = request.GET.get('designation')
    data = []
    nextPage = 1
    previousPage = 1
    members = Wines.objects.all()
    if name:
        members = members.filter(name = name)
    if winery:
        members = members.filter(winery = winery)
    if year_gt:
        members = members.filter(year__gte = year_gt)
    if year_lt:
        members = members.filter(year__lte = year_lt)
    if variety:
        members = members.filter(variety = variety)
    if price_gt:
        members = members.filter(price__gte = price_gt)
    if price_lt:
        members = members.filter(price__lte = price_lt)
    if designation:
        members.members.filter(designation = designation)
        
    
    page = request.GET.get('page', 1)
    paginator = Paginator(members, 20)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = WinesSerializer(data,context={'request': request} ,many=True)
    if data.has_next():
        nextPage = data.next_page_number()
    if data.has_previous():
        previousPage = data.previous_page_number()
    import os
    for dictionary in serializer.data:
        if os.path.exists(settings.BASE_DIR +'/image/wid'+ str(dictionary['wid'])):
            dictionary.update({'image1': request.META['HTTP_HOST']+'/static'+'/wid'+str(dictionary['wid'])+'/'+'0.jpg'})
            dictionary.update({'image2': request.META['HTTP_HOST']+'/static'+'/wid'+str(dictionary['wid'])+'/'+'1.jpg'})
    

    return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages})

    pass
from .serializers import DrinkersSerializer, LocationsSerializer,ReviewsSerializer,WinesSerializer,WineLocSerializer,GroupSerializer
from .models import Drinkers,Locations,Reviews,Wines,WineLoc,Group
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


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening

@api_view(['GET','POST'])
@csrf_exempt
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
@csrf_exempt
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
@csrf_exempt
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


@api_view(['GET', 'POST'])
@csrf_exempt
def review_list(request, wid, format=None):
    """
    GET: API endpoint that return list of reviews and wine info for a given wine
    POST: API endpoint that creates a new review
    /api/reviews/{wid}
    """
    if request.method == "GET":
        data = []
        members = Reviews.objects.raw("SELECT * from reviews where wid=%s", [wid])
        page = request.GET.get('page', 1)
        paginator = Paginator(members, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ReviewsSerializer(data, context={'request': request}, many=True)

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages})
    elif request.method == "POST":
        serializer = ReviewsSerializer(data=request.data)
        # serializer.initial_data["wid"] = wid
        if serializer.is_valid():
            review_obj = serializer.data
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO reviews (description, rating, wid, username) VALUES (%s, %s, %s, %s)",
                                [review_obj["description"], review_obj["rating"], review_obj["wid"], review_obj["username"]])
                return Response(review_obj, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@csrf_exempt
def review_from_user(request, username, format=None):
    """
        GET: API endpoint that return a users single top rated review and wine info for the wine reviewed
        /api/reviews/username/{username}?top={top}
        """

    if request.method == "GET":
        top = request.GET.get('top', "1")
        top = int(top)
        data = []
        with connection.cursor() as cursor:
            cursor.execute("select * from reviews r, wines w where r.wid=w.wid and r.username=%s order by rating desc limit %s", [username, top])
            col_names = [desc[0] for desc in cursor.description]
            import os
            while True:
                row = cursor.fetchone()
                if row is None:
                    break
                else:
                    row_dict = dict(zip(col_names, row))
                    if os.path.exists(settings.BASE_DIR + '/image/wid' + str(row_dict['wid'])):
                        row_dict.update(
                            {'image1': request.META['HTTP_HOST'] + '/static' + '/wid' + str(
                                row_dict['wid']) + '/' + '0.jpg'})
                        row_dict.update(
                            {'image2': request.META['HTTP_HOST'] + '/static' + '/wid' + str(
                                row_dict['wid']) + '/' + '1.jpg'})
                    else:
                        row_dict.update(
                            {'image1': request.META['HTTP_HOST'] + '/static' + '/wid' + str(1) + '/' + '0.jpg'})
                data.append(row_dict)
        return Response({'data': data})


@api_view(['DELETE', 'PUT'])
@csrf_exempt
def review_update(request, rid, format=None):
    """
    DELETE: API endpoint that deletes a review of a wine by a user
    /api/reviews/{rid}
    """
    if request.method == "DELETE":
        with connection.cursor() as cursor:
            try:
                cursor.execute("DELETE FROM reviews WHERE rid = %s", [rid])
                return Response(status=status.HTTP_200_OK)
            except:
                return Response("Could not delete", status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PUT":
        serializer = ReviewsSerializer(data=request.data)
        if serializer.is_valid():
            review_obj = serializer.data
            with connection.cursor() as cursor:
                try:
                    cursor.execute("UPDATE reviews SET description = %s, rating = %s WHERE rid = %s",
                               [review_obj["description"], review_obj["rating"], rid])
                    return Response(status=status.HTTP_200_OK)
                except:
                    return Response("Could not update", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def wine_list(request, format=None):
    """
    API endpoint that
    1. Get list of wines by name
    2. Paginated list with page size of 20
    3. In future add other searchable options
    /api/wines/?name={name}&?page={page}
    """
    wid = request.GET.get('wid')
    name = request.GET.get('name')
    winery = request.GET.get('winery')
    year_gt = request.GET.get('year_gt')
    year_lt = request.GET.get('year_lt')
    variety = request.GET.get('variety')
    price_gt = request.GET.get('price_gt')
    price_lt = request.GET.get('price_lt')
    designation = request.GET.get('designation')
    sql_stmt, sql_conditionals = wine_list_sql_generator(wid, name, winery, year_gt, year_lt, variety, price_gt, price_lt, designation)
    wines = WineLoc.objects.raw(sql_stmt, sql_conditionals)

    page = request.GET.get('page', 1)
    paginator = Paginator(wines, 20)

    data = []
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)

    serializer = WineLocSerializer(data, context={'request': request}, many=True)
    previous_page = 1
    next_page = 1
    if data.has_next():
        next_page = data.next_page_number()
    if data.has_previous():
        previous_page = data.previous_page_number()
    import os
    for dictionary in serializer.data:
        if os.path.exists(settings.BASE_DIR + '/image/wid' + str(dictionary['wid'])):
            dictionary.update(
                {'image1': request.META['HTTP_HOST'] + '/static' + '/wid' + str(dictionary['wid']) + '/' + '0.jpg'})
            dictionary.update(
                {'image2': request.META['HTTP_HOST'] + '/static' + '/wid' + str(dictionary['wid']) + '/' + '1.jpg'})
        else:
            dictionary.update(
                {'image1': request.META['HTTP_HOST'] + '/static' + '/wid' + 1 + '/' + '0.jpg'})
            

    return Response({'data': serializer.data, 'count': paginator.count, 'numPages': paginator.num_pages, 'nextPage':next_page, 'previousPage':previous_page})


def wine_list_sql_generator(wid, name, winery, year_gt, year_lt, variety, price_gt, price_lt, designation):
    sql_conditionals = []
    sql_vars = []
    if wid:
        sql_conditionals.append("wid = " + str(wid))
    if name:
        sql_conditionals.append("name LIKE %s")
        sql_vars.append("%" + str(name) + "%")
    if winery:
        sql_conditionals.append("winery LIKE %s")
        sql_vars.append("%" + str(winery) + "%")
    if year_gt:
        sql_conditionals.append("year > " + str(year_gt))
    if year_lt:
        sql_conditionals.append("year < " + str(year_lt))
    if variety:
        sql_conditionals.append("variety LIKE %s")
        sql_vars.append("%" + str(variety) + "%")
    if price_gt:
        sql_conditionals.append("price > " + str(price_gt))
    if price_lt:
        sql_conditionals.append("price < " + str(price_lt))
    if designation:
        sql_conditionals.append("designation LIKE %s")
        sql_vars.append("%" + str(designation) + "%")

    sql_stmt = "SELECT w.wid as wid, name, winery, year, variety, price, designation, l.locid as locid, region, province, country FROM wines w, locations l"

    if len(sql_conditionals) > 0:
        sql_stmt += " WHERE l.locid=w.locid AND " + ' AND '.join(sql_conditionals)
    else:
        sql_stmt += " WHERE l.locid=w.locid"
        sql_vars = None

    print(sql_stmt)
    print(sql_vars)

    return sql_stmt, sql_vars


@api_view(['GET'])
@csrf_exempt
def groups_by_username(request, username, format=None):
    """
    POST: API endpoint that adds a member to a group
    DELETE: API endpoint to remove user from a group
    /api/reviews/{wid}
    """
    if request.method == "GET":
        if username is None:
            return Response(request, status=status.HTTP_400_BAD_REQUEST)
        sql_query = "SELECT g1.name, m1.gid, group_concat(username) as members " \
                    "FROM members m1, groups g1 " \
                    "WHERE m1.gid=g1.gid and m1.gid IN " \
                    "(SELECT g.gid from groups g, members m where g.gid=m.gid and username=%s) " \
                    "GROUP BY m1.gid"
        data = Group.objects.raw(sql_query, [username])
        groupSerializer = GroupSerializer(data, context={'request': request}, many=True)
        return Response({'data': groupSerializer.data}, status=status.HTTP_200_OK)


@api_view(['POST', 'DELETE'])
@csrf_exempt
def group_members(request, gid, format=None):
    """
    POST: API endpoint that adds a member to a group
    DELETE: API endpoint to remove user from a group
    group/<int:gid>/members
    """
    if request.method == "POST":
        if "username" not in request.data or gid is None:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
        user_to_add = request.data["username"]
        add_member_to_group(username=user_to_add, gid=gid)
        return Response(request.data, status=status.HTTP_201_CREATED)

    elif request.method == "DELETE":
        if "username" not in request.data or gid is None:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
        user_to_delete = request.data["username"]
        try:
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM members WHERE username=%s AND gid=%s", [user_to_delete, gid])
                return Response(request.data, status=status.HTTP_200_OK)
        except:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)


def add_member_to_group(gid, username):
    try:
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO members (username, gid) VALUES (%s, %s)", [username, gid])
        return True
    except:
        return False


def get_random_members(username, n):
    rands = list()
    with connection.cursor() as cursor:
        cursor.execute("select username from drinkers where username != %s ORDER BY RAND() LIMIT %s", [username, n])
        col_names = [desc[0] for desc in cursor.description]
        while True:
            row = cursor.fetchone()
            if row is None:
                break
            else:
                rands.append(row[0])
                print(row)
    return rands



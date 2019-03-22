from rest_framework import serializers
from .models import Drinkers,Locations,Reviews,Wines



class DrinkersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Drinkers 
        fields = ("username","password","name","age","gender")


class LocationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Locations 
        fields = ("locid","region","province","country")


class ReviewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reviews 
        fields = ("rid","description","rating","wid","username")


class WinesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wines 
        fields = ("wid","name","winery","year","variety","price","designation","locid")
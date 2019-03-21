# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

sclass Drinkers(models.Model):
    username = models.CharField(primary_key=True, max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'drinkers'


class Locations(models.Model):
    locid = models.AutoField(primary_key=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    province = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'locations'


class Reviews(models.Model):
    rid = models.AutoField(primary_key=True)
    description = models.CharField(max_length=511)
    rating = models.IntegerField(blank=True, null=True)
    wid = models.IntegerField()
    username = models.CharField(max_length=255)

    class Meta:
        db_table = 'reviews'


class WelcomeMember(models.Model):
    netid = models.CharField(max_length=200)
    name = models.CharField(max_length=200)

    class Meta:
        db_table = 'welcome_member'


class Wines(models.Model):
    wid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    winery = models.CharField(max_length=255, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    variety = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    designation = models.CharField(max_length=255, blank=True, null=True)
    locid = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'wines'

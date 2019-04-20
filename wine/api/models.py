# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Drinkers(models.Model):
    username = models.CharField(primary_key=True, max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return "username: " + str(self.username) + " password: " + str(self.password) \
        + " name: " + str(self.name) + " age: " + str(self.age) \
        + " gender: " + str(self.gender)

    class Meta:
        db_table = 'drinkers'


class Locations(models.Model):
    locid = models.AutoField(primary_key=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    province = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return "locid: " + str(self.locid) + " region: " + str(self.region) \
        + " province: " + str(self.province) + " country: " + str(self.country) 

    class Meta:
        db_table = 'locations'


class Reviews(models.Model):
    rid = models.AutoField(primary_key=True)
    description = models.CharField(max_length=511)
    rating = models.IntegerField()
    wid = models.IntegerField()
    username = models.CharField(max_length=255)

    def __str__(self):
        return "rid: " + str(self.rid) + " description: " + str(self.description) \
        + " rating: " + str(self.rating) + " wid: " + str(self.wid) \
        + " username: " + str(self.username)
    class Meta:
        db_table = 'reviews'





class Wines(models.Model):
    wid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    winery = models.CharField(max_length=255, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    variety = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    designation = models.CharField(max_length=255, blank=True, null=True)
    locid = models.IntegerField(blank=True, null=True)
   

    def __str__(self):
        return "wid: "+str(self.wid)+" name: " + str(self.name) + " winery: " + str(self.winery) \
        + " year: " + str(self.year) + " variety: " + str(self.variety) \
        + " price: " + str(self.price) + " designation: " + str(self.designation) \
        + " locid: " + str(self.locid) 

    class Meta:
        db_table = 'wines'


class WineLoc(models.Model):
    wid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    winery = models.CharField(max_length=255, null=True)
    year = models.IntegerField(null=True)
    variety = models.CharField(max_length=255, null=True)
    price = models.FloatField(null=True)
    designation = models.CharField(max_length=255, null=True)
    locid = models.IntegerField(null=True)
    region = models.CharField(max_length=255, null=True)
    province = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)

    def __str__(self):
        return "name: " + str(self.name) + " winery: " + str(self.winery) \
               + " year: " + str(self.year) + " variety: " + str(self.variety) \
               + " price: " + str(self.price) + " designation: " + str(self.designation) \
               + " locid: " + str(self.locid) + " region: " + str(self.designation) \
               + " province: " + str(self.locid) + " country: " + str(self.designation) \

    class Meta:
        managed = False
        db_table = "wines"


class Group(models.Model):
    gid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    mongoId = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = "groups"
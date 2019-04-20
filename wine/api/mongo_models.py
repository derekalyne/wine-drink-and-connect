# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import time

# https://stackoverflow.com/questions/6892942/django-mongodb-problem
# https://django-mongodb-engine.readthedocs.io/en/latest/tutorial.html
class Group:
    name = None
    messages = []
    discussed_wines = []

    def __init__(self, name, messages=None, discussed_wines = []):
        self.name = name
        if messages is not None:
            self.messages = messages
        else:
            self.messages = []

        if discussed_wines is not None:
            self.discussed_wines = discussed_wines
        else:
            self.discussed_wines = []

    def __str__(self):
        string = "Name: " + str(self.name) + " Messages: "
        for i in self.messages:
            string += ",,," + str(i)
        return string


class Message:
    author = None
    text = None
    sent_at = None

    def __init__(self, author, text, sent_at=None):
        self.author = author
        self.text = text
        self.sent_at = time.time()
from django.contrib import admin
from .models import Drinkers,Locations,Reviews,Wines
# Register your models here.
admin.site.register(Drinkers)
admin.site.register(Locations)
admin.site.register(Reviews)
admin.site.register(Wines)
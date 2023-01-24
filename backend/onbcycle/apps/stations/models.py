from django.db import models

# Create your models here.
class Station(models.Model):
    id_station = models.CharField(primary_key=True, unique=True, max_length=15)
    name = models.CharField(max_length=60)
    x = models.CharField()
    y = models.CharField()
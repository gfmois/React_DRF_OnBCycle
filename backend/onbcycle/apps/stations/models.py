from django.db import models

# Create your models here.
class Station(models.Model):
    id_station = models.CharField(primary_key=True, unique=True, max_length=15)
    name = models.CharField(max_length=60)
    lat = models.CharField(max_length=255)
    long = models.CharField(max_length=255)
    capacity = models.IntegerField()
    state = models.BooleanField(default=True)
    
    def __str__(self):
        return str(self.id_station)
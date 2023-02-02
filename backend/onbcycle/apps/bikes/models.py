from django.db import models

# Create your models here.
class Bike(models.Model):
    id_bike = models.CharField(primary_key=True, unique=True, max_length=15, blank=True)
    status = models.BooleanField(default=True)
from django.db import models

# Create your models here.
class Rent(models.Model):
    id_rent = models.CharField(primary_key=True, unique=True, max_length=15, blank=True)
    bike_id = models.ForeignKey('bikes.Bike', on_delete=models.DO_NOTHING)
    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=True)
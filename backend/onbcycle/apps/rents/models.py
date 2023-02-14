from django.db import models

# Create your models here.
class Rent(models.Model):
    id_rent = models.CharField(primary_key=True, unique=True, max_length=15, blank=True)
    id_user = models.ForeignKey('users.User', on_delete=models.DO_NOTHING)
    bike_id = models.ForeignKey('bikes.Bike', on_delete=models.DO_NOTHING)
    start_date = models.CharField(blank=False, max_length=255)
    end_date = models.DateField(blank=True, null=True)
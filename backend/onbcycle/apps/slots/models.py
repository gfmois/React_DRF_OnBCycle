from django.db import models

# Create your models here.
class Slot(models.Model):
    id_slot = models.CharField(primary_key=True, unique=True, max_length=15)
    id_station = models.ForeignKey("Station.id_station", on_delete=models.DO_NOTHING)
    busy = models.BooleanField(default=True) #? Change to State?
    
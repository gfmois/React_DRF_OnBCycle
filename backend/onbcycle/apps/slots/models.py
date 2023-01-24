from django.db import models

# Create your models here.
class Slot(models.Model):
    id_slot = models.CharField(primary_key=True, unique=True, max_length=15)
    id_station = models.ForeignKey("station.id_station", on_delete=models.DO_NOTHING)
    
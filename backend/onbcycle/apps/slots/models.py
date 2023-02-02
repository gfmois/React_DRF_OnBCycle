from django.db import models
from ..bikes.models import Bike

# Create your models here.
class Slot(models.Model):
    id_slot = models.CharField(primary_key=True, unique=True, max_length=15)
    id_station = models.ForeignKey("stations.Station", on_delete=models.DO_NOTHING)
    state = models.BooleanField(default=True)
    bike = models.OneToOneField(Bike, blank=True, on_delete=models.DO_NOTHING, null=True)
    
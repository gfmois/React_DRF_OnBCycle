from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Station
from onbcycle.apps.core.utils import generate_uuid

@receiver(pre_save, sender = Station)
def set_uuid_to_model(sender, instance, *args, **kwargs):
    instance.id_station = generate_uuid()
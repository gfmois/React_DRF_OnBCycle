from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Rent
from onbcycle.apps.core.utils import generate_uuid

@receiver(pre_save, sender = Rent)
def set_uuid_to_model(sender, instance, *args, **kwargs):
    instance.id_rent = generate_uuid()
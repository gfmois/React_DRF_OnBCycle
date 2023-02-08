from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import User
from onbcycle.apps.core.utils import generate_uuid
from cryptography.fernet import Fernet

@receiver(pre_save, sender = User)
def set_uuid_to_model(sender, instance, *args, **kwargs):
    instance.id_user = generate_uuid()
    instance.avatar = f'https://api.multiavatar.com/{Fernet.generate_key()}.png'
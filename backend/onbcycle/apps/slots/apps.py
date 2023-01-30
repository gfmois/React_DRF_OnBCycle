from django.apps import AppConfig

class SlotsConfig(AppConfig):
    default_auto_field  = 'django.db.models.BigAutoField',
    name = 'onbcycle.apps.slots'
    
    def ready(self):
        import onbcycle.apps.slots.signals
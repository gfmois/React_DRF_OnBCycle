from django.apps import AppConfig

class RentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'onbcycle.apps.rents'
    
    def ready(self):
        import onbcycle.apps.rents.signals
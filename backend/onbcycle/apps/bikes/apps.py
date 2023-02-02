from django.apps import AppConfig

class BikesConfig(AppConfig):
    default_auto_field  = 'django.db.models.BigAutoField',
    name = 'onbcycle.apps.bikes'
    
    def ready(self):
        import onbcycle.apps.bikes.signals
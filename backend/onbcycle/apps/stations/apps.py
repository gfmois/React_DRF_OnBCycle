from django.apps import AppConfig

class StationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'onbcycle.apps.stations'
    
    def ready(self):
        import onbcycle.apps.stations.signals
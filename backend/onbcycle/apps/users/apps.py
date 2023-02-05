from django.apps import AppConfig

class UserConfig(AppConfig):
    default_auto_field  = 'django.db.models.BigAutoField',
    name = 'onbcycle.apps.users'
    
    def ready(self):
        import onbcycle.apps.users.signals
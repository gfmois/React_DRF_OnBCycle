from django.apps import AppConfig

class NotificationsConfig(AppConfig):
    default_auto_field  = 'django.db.models.BigAutoField',
    name = 'onbcycle.apps.notifications'
    
    def ready(self):
        import onbcycle.apps.notifications.signals
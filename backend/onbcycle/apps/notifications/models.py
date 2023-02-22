from django.db import models

# Create your models here.
class Notification(models.Model):
    id_notification = models.CharField(primary_key=True, unique=True, max_length=15, blank=True)
    from_user_id = models.ForeignKey('users.User', on_delete=models.DO_NOTHING, related_name="from_user_id")
    to_user_id = models.ForeignKey('users.User', on_delete=models.DO_NOTHING, related_name="to_user_id", blank=True, null=True)
    title = models.CharField(max_length=40)
    body = models.CharField(max_length=255)
    send_date = models.CharField(max_length=255)
    read = models.BooleanField(default=0)
    station = models.ForeignKey('stations.Station', on_delete=models.DO_NOTHING, related_name="station", blank=True, null=True)
from rest_framework import serializers
from datetime import datetime
from ..users.serializers import UserSerializer
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id_notification', 'from_user_id', 'to_user_id',
                  'title', 'body', 'send_date', 'read')

    def to_notification(instance):
        try:
            fecha = datetime.strptime(
                instance.send_date, "%Y-%m-%d %H:%M:%S.%f")
            dif = datetime.now() - fecha
            hrs, segs = divmod(dif.seconds, 3600)
            mnts = segs // 60

            return {
                "id_notification": instance.id_notification,
                "from": "Administrator" if instance.from_user_id.role == 'Admin' else UserSerializer.get_user_by_email(instance.from_user_id.email)['name'],
                'date': (f"{dif.days} days and {hrs} hours ago"
                         if dif.days > 0 else
                         f"{hrs} hours and {mnts} minutes ago"
                         if hrs > 0 else
                         f"{mnts} minutes ago")
            }
        except Exception as e:
            return {
                'msg': f"Error: {e}",
                'status': 'error'
            }

    def send_notification(email_user, data):
        try:
            id_user = UserSerializer.get_user_by_email(email_user)['id_user']
            Notification.objects.create(
                send_date=datetime.now(),
                to_user_id_id=UserSerializer.get_user_by_email(data['to'])[
                    'id_user'],
                from_user_id_id=id_user,
                title=data['title'],
                body=data['body'],
                read=0
            )

            return {
                'msg': 'Notification Sended Correctly',
                'status': 'success'
            }
        except:
            return {
                'msg': 'It was an error sending the notitication',
                'status': 'error'
            }

    def get_user_notifications(email):
        try:
            id_user = UserSerializer.get_user_by_email(email)['id_user']
            notifications = [NotificationSerializer.to_notification(
                notification) for notification in Notification.objects.filter(to_user_id=id_user)]
            return notifications
        except:
            return {
                "msg": "It was a problem getting user notifications",
                'status': 'error'
            }

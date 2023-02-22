from rest_framework import serializers
from django.db.models import Q
from datetime import datetime
from ..users.serializers import UserSerializer
from ..stations.serializers import StationSerializer
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id_notification', 'from_user_id', 'to_user_id',
                  'title', 'body', 'send_date', 'read')

    def to_notification(instance, to_view=True):
        try:
            if to_view:
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
                             f"{mnts} minutes ago"),
                    "title": instance.title,
                    "body": instance.body,
                    'id_station': str(instance.station)
                }

            return {
                "id_notification": instance.id_notification,
                "from": str(instance.from_user_id),
                "to": str(instance.to_user_id),
                "date": instance.send_date,
                "read": instance.read,
                'id_station': str(instance.station)
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
            user = UserSerializer.get_user_by_email(email)
            notifications = [NotificationSerializer.to_notification(notification) for notification in Notification.objects.filter(Q(to_user_id=user['id_user'], read=0) | Q(to_user_id=None, read=0))]
            return notifications
        except:
            return {
                "msg": "It was a problem getting user notifications",
                'status': 'error'
            }

    def get_notification_by_id(id_notification):
        notification = NotificationSerializer.to_notification(
            Notification.objects.filter(id_notification=id_notification).first(), False)
        return notification

    def read_notification(id_notification):
        try:
            notification = Notification.objects.filter(
                id_notification=id_notification).update(read=1)
            return {
                'msg': 'Notification Readed',
                'status': 'success'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }

    def send_incidence(incidence):
        try:
            incidence['station'] = StationSerializer.get_station_instance(incidence['station'])
            incidence['send_date'] = datetime.now()
            if Notification.objects.create(**incidence):
                return {
                    'msg': 'Incidence sended',
                    'status': 'success'
                }
            return {
                'msg': 'Error while trying to send the incidence',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'Error': f'Error: {e}',
                'status': 'error'
            }

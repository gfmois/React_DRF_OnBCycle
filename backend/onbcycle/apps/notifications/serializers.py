from rest_framework import serializers
from datetime import datetime
from ..users.serializers import UserSerializer
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id_notification', 'from_user_id', 'to_user_id', 'title', 'body', 'send_date', 'read')
        
    def send_notification(email_user, data):
        try:
            id_user = UserSerializer.get_user_by_email(email_user)['id_user']
            Notification.objects.create(
                send_date=datetime.now(),
                to_user_id_id=data['id_user'],
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
from django.shortcuts import render
from rest_framework import mixins, viewsets
from .serializers import NotificationSerializer
from .models import Notification
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
class NotificationView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    
    def send_notification(self, request, *args, **kwargs):
        serializer = NotificationSerializer.send_notification(request.user, request.data)
        return Response(serializer)
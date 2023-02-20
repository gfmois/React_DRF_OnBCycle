from rest_framework.urls import path
from .views import NotificationView

urlpatterns = [
    path('send_notification', NotificationView.as_view({ 'post': 'send_notification' })),
    path('get_user_notifications', NotificationView.as_view({ 'get': 'get_user_notifications' }))

]

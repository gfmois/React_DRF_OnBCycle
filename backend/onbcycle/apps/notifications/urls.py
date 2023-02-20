from rest_framework.urls import path
from .views import NotificationView

urlpatterns = [
    path('send_notification', NotificationView.as_view({ 'post': 'send_notification' })),
    path('get_user_notifications', NotificationView.as_view({ 'get': 'get_user_notifications' })),
    path('get_notification/<str:id_notification>', NotificationView.as_view({ 'get': 'get_notification' })),
    path('read_notification/<str:id_notification>', NotificationView.as_view({ 'put': 'read_notification' }))
]

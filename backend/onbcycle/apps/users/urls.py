from django.urls import path
from .views import UserView

urlpatterns = [
    path('register', UserView.as_view({ 'post': 'register' })),
    path('dashboard', UserView.as_view({ 'get': 'get_dashboard_info' })),
    path('update_profile', UserView.as_view({ 'post': 'update_profile' })),
    path('login', UserView.as_view({ 'post': 'login' })),
    path('user', UserView.as_view({ 'get': 'user' })),
    path('users', UserView.as_view({ 'get': 'get_users' })),
    path('delete_profile/<str:id_user>', UserView.as_view({ 'delete': 'delete_user' }))
]

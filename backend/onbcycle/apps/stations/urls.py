from django.urls import path
from .views import StationView

urlpatterns = [
    path('', StationView.as_view({ 'get': 'read' })),
    path('create', StationView.as_view({ 'post': 'create' })),
    path('delete/<str:id_station>', StationView.as_view({ 'delete': 'delete' })),
    path('update/<str:id_station>', StationView.as_view({ 'put': 'update' })),
    path('<str:id_station>', StationView.as_view({ 'get': 'getStation' }))
]


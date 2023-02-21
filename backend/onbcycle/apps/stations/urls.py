from django.urls import path
from .views import StationView

urlpatterns = [
    path('', StationView.as_view({ 'get': 'read' })),
    path('create', StationView.as_view({ 'post': 'create' })),
    path('delete/<str:id_station>', StationView.as_view({ 'delete': 'delete' })),
    path('update_station', StationView.as_view({ 'post': 'update_station' })),
    path('cols', StationView.as_view({ 'get': 'getModelCols' })),
    path('<str:id_station>', StationView.as_view({ 'get': 'getStation' })),
    path('info/<str:id_station>', StationView.as_view({ 'get': 'get_station_info' })),

]


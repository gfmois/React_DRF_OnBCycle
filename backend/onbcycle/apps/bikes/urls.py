from django.urls import path
from .views import BikeView

urlpatterns = [
    path('', BikeView.as_view({ 'get': 'get_bikes' })),
    path('<str:id_slot>', BikeView.as_view({ 'get': 'get_bike_from_slot' })),
]

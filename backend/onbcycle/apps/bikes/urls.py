from django.urls import path
from .views import BikeView

urlpatterns = [
    path('<str:id_slot>', BikeView.as_view({ 'get': 'get_bike_from_slot' }))
]

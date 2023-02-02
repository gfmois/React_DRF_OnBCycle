from django.urls import path
from .views import SlotView

urlpatterns = [
    path('<str:id_station>', SlotView.as_view({ 'get': 'getStationSlots' })),
]

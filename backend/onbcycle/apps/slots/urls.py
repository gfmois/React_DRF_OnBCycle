from django.urls import path
from .views import SlotView

urlpatterns = [
    path('cols', SlotView.as_view({ 'get': 'get_model_cols' })),
    path('create_slot', SlotView.as_view({ 'post': 'add_slot' })),
    path('update_slot', SlotView.as_view({ 'post': 'update_slot' })),
    path('delete_slot/<str:id_slot>', SlotView.as_view({ 'get': "delete_slot" })),
    path('<str:id_station>', SlotView.as_view({ 'get': 'getStationSlots' })),
    path('', SlotView.as_view({ 'get': 'get_slots' })),
]

from django.urls import path
from .views import BikeView

urlpatterns = [
    path('', BikeView.as_view({ 'get': 'get_bikes' })),
    path('create_bike', BikeView.as_view({ 'post': 'create_bike' })),
    path('cols', BikeView.as_view({ 'get': 'model_cols' })),
    path('modify_bike', BikeView.as_view({ 'post': 'update_bike' })),
    path('deleteBike/<str:id_bike>', BikeView.as_view({ 'get': 'delete_bike' })),
    path('<str:id_slot>', BikeView.as_view({ 'get': 'get_bike_from_slot' })),
]

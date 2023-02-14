from django.urls import path
from .views import RentView

urlpatterns = [
    path('<str:id_station>', RentView.as_view({ 'get': 'rent_bike' }))
]

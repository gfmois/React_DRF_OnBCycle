from django.urls import path
from .views import RentView

urlpatterns = [
    path('<str:id_station>', RentView.as_view({ 'get': 'rent_bike' })),
    path('leave_bike', RentView.as_view({ 'post': 'leave_bike'})),
    path('getRentedBike', RentView.as_view({ 'get': 'get_rented_bike' })),
]

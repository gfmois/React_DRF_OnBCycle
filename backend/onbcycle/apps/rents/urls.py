from django.urls import path
from .views import RentView

urlpatterns = [
    path('getRentedBike', RentView.as_view({ 'get': 'get_rented_bike' })),
    path('get_user_rents', RentView.as_view({'get': 'get_user_rents'})),
    path('getRents', RentView.as_view({ 'get': 'get_rents' })),
    path('leave_bike', RentView.as_view({ 'post': 'leave_bike'})),
    path('<str:id_station>', RentView.as_view({ 'get': 'rent_bike' })),
]

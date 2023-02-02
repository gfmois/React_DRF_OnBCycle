from rest_framework import serializers
from .models import Rent
from datetime import datetime
from ..bikes.serializers import BikeSerializer

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ('id_rent', 'bike_id', 'start_date', 'end_date')
        
    def rent_bike(id_slot):
        print(id_slot)
        bike = BikeSerializer.rent_bike_slot(id_slot)
        Rent.objects.create(bike_id=bike.bike_id, start_date=datetime.now())
from rest_framework import serializers
from .models import Rent
from datetime import datetime
from ..slots.serializers import SlotSerializer


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ('id_rent', 'bike_id', 'start_date', 'end_date')

    def rent_bike(id_slot):
        id_bike = SlotSerializer.rent_bike_slot(id_slot)
        print(id_bike)

        if type(id_bike) == dict and id_bike.get('status'):
            return id_bike
        elif type(id_bike) == str:
            Rent.objects.create(
                start_date=datetime.now(),
                end_date=None,
                bike_id_id=id_bike,
            )

            return {
                'msg': 'Reserva creada correctamente',
                'status': 200
            }

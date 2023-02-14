from rest_framework import serializers
from .models import Rent
from datetime import datetime
from ..slots.serializers import SlotSerializer
from ..users.serializers import UserSerializer

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ('id_rent', 'bike_id', 'start_date', 'end_date')

    def rent_bike(id_slot, token):
        id_bike = SlotSerializer.rent_bike_slot(id_slot)
        user = UserSerializer.get_user(token)['id_user']
        
        # TODO: Check if reserve
        # Rent.objects.raw('SELECT * FROM')

        if type(id_bike) == dict and id_bike.get('status'):
            return id_bike
        elif type(id_bike) == str:
            Rent.objects.create(
                start_date=datetime.now(),
                end_date=None,
                bike_id_id=id_bike,
                id_user_id=user
            )

            return {
                'msg': 'Reserva creada correctamente',
                'bike': id_bike,
                'status': 200
            }

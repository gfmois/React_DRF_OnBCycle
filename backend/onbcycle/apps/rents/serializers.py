from django.db import models, transaction
from rest_framework import serializers
from .models import Rent
from datetime import datetime
from ..slots.serializers import SlotSerializer
from ..users.serializers import UserSerializer


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ('id_rent', 'bike_id', 'start_date', 'end_date')

    def rent_bike(id_slot, token, id_station):
        print('AAA')
        user = UserSerializer.get_user(token)['id_user']
        if len(Rent.objects.raw(f'SELECT * FROM rents_rent r WHERE r.id_user_id = "{user}" AND r.end_date IS NULL;')) > 0:
            return {
                'msg': 'You have an rent already',
                'status': 400
            }

        id_bike = SlotSerializer.rent_bike_slot(id_slot)

        if type(id_bike) == dict and id_bike.get('status'):
            return id_bike
        elif type(id_bike) == str:
            Rent.objects.create(
                start_date=datetime.now(),
                end_date=None,
                bike_id_id=id_bike,
                id_user_id=user,
                station_to_id=None,
                station_from_id=id_station
            )

            return {
                'msg': 'Rent correctly formed',
                'bike': id_bike,
                'status': 200
            }
    
    def leave_bike(token, id_bike, id_station):
        user = UserSerializer.get_user(token)['id_user']
        if len(Rent.objects.filter(id_user=user)) == 0:
            return {
                'msg': "You don't have active rents",
                'status': 200
            }
        
        try:
            with transaction.atomic():
                rent = Rent.objects.filter(id_user=user, end_date__isnull=True)
                if rent.exists():
                    slot = SlotSerializer.get_slot_instance(SlotSerializer.get_random_slot(id_station, to_rent=True)['id_slot'])
                    if slot.exists():
                        rent.update(end_date=datetime.now(), station_to_id=id_station)
                        slot.update(bike_id=id_bike)
                        return {
                            'msg': 'You leaved correctly the bike',
                            'status': 200
                        }
                    
                    raise AssertionError('Error updating rent')
                
                raise ValueError('No rent found for this user')
        except Exception as e:
            transaction.set_rollback(True)
            return {
                'msg': f'Error while trying leave the bike: {str(e)}',
                'status': 400
            }
    
    def get_bike(token):
        try:
            user_id = UserSerializer.get_user(token)['id_user']
            rent = Rent.objects.filter(id_user_id=user_id, end_date__isnull=True).first()
            if rent is None:
                return {
                    'msg': 'No bike rented already',
                    'status': 200
                }
            return {
                'bike': str(rent.bike_id.id_bike),
                'status': 200
            }
        except:
            return {
                'msg': 'Error trying to get user rent',
                'status': 400
            }

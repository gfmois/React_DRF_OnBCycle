from django.db import models, transaction
from rest_framework import serializers
from .models import Rent
from datetime import datetime
from ..slots.serializers import SlotSerializer
from ..users.serializers import UserSerializer
from ..stations.serializers import StationSerializer


class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ('id_rent', 'bike_id', 'start_date',
                  'end_date', 'station_from', 'station_to')

    def to_rent(instance):
        return {
            'id_rent': instance.id_rent,
            'bike_id': instance.bike_id.id_bike,
            'start_date': instance.start_date,
            'end_date': instance.end_date,
            'station_from': str(instance.station_from.id_station),
            'station_to': str(instance.station_to.id_station)
        }
    
    def get_rents():
        return [RentSerializer.to_rent(rent) for rent in Rent.objects.all()]

    def rent_bike(id_slot, token, id_station):
        user = UserSerializer.get_user(token)['id_user']
        if len(Rent.objects.raw(f'SELECT * FROM rents_rent r WHERE r.id_user_id = "{user}" AND r.end_date IS NULL;')) > 0:
            return {
                'msg': 'You have an rent already',
                'status': 'warning'
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
                'status': 'success'
            }

    @transaction.atomic()
    def leave_bike(token, id_bike, id_station):
        user = UserSerializer.get_user(token)['id_user']
        if len(Rent.objects.filter(id_user=user)) == 0:
            return {
                'msg': "You don't have active rents",
                'status': 'success'
            }

        try:
            rent = Rent.objects.filter(id_user=user, end_date__isnull=True)
            if rent.exists():
                slot = SlotSerializer.get_random_slot(id_station, to_rent=True)
                try:
                    if ('msg', 'status') not in slot:
                        slot_instance = SlotSerializer.get_slot_instance(
                            slot['id_slot'])
                    if slot_instance.exists():
                        rent.update(end_date=datetime.now(),
                                    station_to_id=id_station)
                        slot_instance.update(bike_id=id_bike)
                        return {
                            'msg': 'You leaved correctly the bike',
                            'status': 'success'
                        }
                except:
                    return slot

            raise Exception('No rent found for this user')
        except Exception as e:
            transaction.set_rollback(True)
            return {
                'msg': 'Error while trying leave the bike',
                'status': 'error'
            }

    def get_bike(token):
        try:
            user_id = UserSerializer.get_user(token)['id_user']
            rent = Rent.objects.filter(
                id_user_id=user_id, end_date__isnull=True).first()
            if rent is None:
                return {
                    'msg': 'No bike rented already',
                    'status': 'success'
                }
            return {
                'bike': str(rent.bike_id.id_bike),
                'status': 'success'
            }
        except:
            return {
                'msg': 'Error trying to get user rent',
                'status': 'error'
            }

    def get_user_rents(user):
        try:
            formater = "%Y-%m-%d %H:%M:%S.%f"
            rents = []
            for rent in Rent.objects.filter(id_user=user.id_user):
                end_date = datetime.strptime(rent.end_date, formater)
                start_date = datetime.strptime(rent.start_date, formater)
                dif = start_date - end_date
                hrs, segs = divmod(dif.seconds, 3600)
                mnts = segs // 60
            rents = [
                {
                    **RentSerializer.to_rent(rent),
                    'station_img': str(rent.station_to.image),
                    "from": str(rent.station_from.name),
                    "to": str(rent.station_to.name),
                    'str_date': (f"{dif.days} days and {hrs} hours ago"
                                 if dif.days > 0 else
                                 f"{hrs} hours and {mnts} minutes ago"
                                 if hrs > 0 else
                                 f"{mnts} minutes ago")
                } for rent in Rent.objects.filter(id_user=user.id_user)]
            return rents
        except Exception as e:
            print(e)
            return {
                'msg': 'Error recovering user rents',
                'status': 'error'
            }

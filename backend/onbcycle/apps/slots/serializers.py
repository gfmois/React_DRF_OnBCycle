from rest_framework import serializers
from django.db import connection
from .models import Slot
from ..bikes.serializers import BikeSerializer


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ('id_slot', 'id_station', 'state', 'bike_id')

    def to_slot(instance: Slot, showStationId: bool = True):
        slot = {
            'id_slot': instance.id_slot,
            'state': instance.state,
            'bike_id': instance.bike_id or None
        }

        if showStationId:
            slot['id_station'] = instance.id_station,

        return slot

    def getStationSlots(id_station):
        slots = [{**SlotSerializer.to_slot(slot, False), 'bike': BikeSerializer.get_bike_from_slot(
            slot.bike_id)} for slot in Slot.objects.filter(id_station=id_station)]

        return slots

    def rent_bike_slot(id_slot):
        slot = Slot.objects.filter(id_slot=id_slot)

        if slot.first().bike is None:
            return {
                'msg': 'Hubo un error al realizar la reserva',
                'status': 400
            }

        bike = slot.first().bike.id_bike
        if slot.update(bike=None):
            return bike

        return {
            'msg': 'Hubo un error al realizar la reserva',
            'status': 400
        }

    def get_random_slot(id_station):
        slots = [SlotSerializer.to_slot(slot, False) for slot in Slot.objects.raw(
            f'SELECT * FROM slots_slot s WHERE s.id_station_id = "{id_station}" AND bike_id IS NOT NULL;')]
        
        if len(slots) is not 0:
            return slots[0]
        
        return {
            'msg': 'No hay bicicletas disponibles',
            'status': 400
        }
            

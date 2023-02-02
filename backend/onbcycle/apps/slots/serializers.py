from rest_framework import serializers
from django.db import connection
from .models import Slot
from ..bikes.serializers import BikeSerializer


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ('id_slot', 'id_station', 'state')

    def to_slot(instance: Slot, showStationId: bool = True):
        slot = {
            'id_slot': instance.id_slot,
            'state': instance.state
        }

        if showStationId:
            slot['id_station'] = instance.id_station,

        return slot

    def getStationSlots(id_station):
        slots = [{**SlotSerializer.to_slot(slot, False), 'bike': BikeSerializer.get_bike_from_slot(
            slot.id_slot)} for slot in Slot.objects.filter(id_station=id_station)]

        return slots

from rest_framework import serializers
from django.core import serializers as coreserializers
from django.db import connection
from .models import Slot


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ('id_slot', 'id_station', 'state')

    def to_slot(instance: Slot):
        return {
            'id_slot': instance.id_slot,
            'id_station': instance.id_station,
            'state': instance.state
        }

    def getStationSlots(self, id_station):
        slots = []
        for slot in Slot.objects.filter(id_station=id_station):
            slots.append({'id_slot': slot.id_slot,
                         'id_station': slot.id_station.id_station, 'state': slot.state})

        return slots

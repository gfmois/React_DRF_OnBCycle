from rest_framework import serializers
from django.db import connection
from .models import Slot
from ..bikes.serializers import BikeSerializer


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ('id_slot', 'id_station', 'status', 'bike_id')

    def to_slot(instance: Slot, showStationId: bool = True):
        slot = {
            'id_slot': instance.id_slot,
            'status': instance.status,
            'bike_id': instance.bike_id or None
        }

        if showStationId:
            slot['id_station'] = str(instance.id_station)

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
                'status': 'error'
            }

        bike = slot.first().bike.id_bike
        if slot.update(bike=None):
            return bike

        return {
            'msg': 'Hubo un error al realizar la reserva',
            'status': 'error'
        }
        
    def update_slot(slot):
        try:
            if Slot.objects.filter(id_slot=slot['id_slot']).update(
                id_station = slot['id_station'],
                status = str(slot['status']).capitalize(),
                bike_id = None if str(slot['bike_id']).__len__() is 0 else slot['bike_id']
            ):
                return {
                    'msg': f'Slot {slot["id_slot"]} updated correctly',
                    'status': 'success'
                }
            
            return {
                'msg': 'No Slot found with this ID',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }
    
    def delete_slot(slotID):
        try:
            if Slot.objects.filter(id_slot=slotID).delete():
                return {
                    'msg': f'Slot {slotID} removed',
                    'status': 'success'
                }
            
            return {
                'msg': f'Error Removing Slot {slotID}',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }

    def get_random_slot(id_station, to_rent=False):
        if to_rent:
            slots = [SlotSerializer.to_slot(slot, False) for slot in Slot.objects.raw(
                f'SELECT * FROM slots_slot s WHERE s.id_station_id = "{id_station}" AND bike_id IS NULL;')]
        else:
            slots = [SlotSerializer.to_slot(slot, False) for slot in Slot.objects.raw(
                f'SELECT * FROM slots_slot s WHERE s.id_station_id = "{id_station}" AND bike_id IS NOT NULL;')]

        return slots[0] if len(slots) != 0 else {'msg': 'No items avalaibles', 'status': 'warning'}

    def get_slot_instance(id_slot):
        slot = Slot.objects.filter(id_slot=id_slot)
        return slot

    def get_model_cols():
        types = {
            "varchar": "text",
            "tinyint": "bool",
            "int": "number"
        }

        with connection.cursor() as c:
            c.execute(
                'SELECT COLUMN_NAME as name, DATA_TYPE as type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "slots_slot"')
            cols = [(item[0], 'file' if item[0] == 'image' else types[item[1]],)
                    for item in c.fetchall()]

        cols.pop(0)
        return cols

    def add_slot(slot):
        try:
            slot['status'] = str(slot['status']).capitalize()
            slot['bike_id'] = None if str(slot['bike_id']).__len__() is 0 else slot['bike_id']
            if Slot.objects.create(**slot):
                return {
                    'msg': 'Slot Created',
                    'status': 'success'
                }
            return {
                'msg': 'Error while trying to create the slot',
                'status': 'error'
            }
        except Exception as e:
            return {
                'msg': "Check if ID_STATION exists",
                'status': 'error'
            }
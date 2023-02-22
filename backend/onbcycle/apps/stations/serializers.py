from rest_framework import serializers
from django.db import connection
from .models import Station
from ..slots.serializers import SlotSerializer


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('id_station', 'name', 'lat', 'long',
                  'capacity', 'status', 'city', 'image', 'type')

    def to_station(instance: Station):
        return {
            "id_station": instance.id_station,
            "name": instance.name,
            "lat": instance.lat,
            "long": instance.long,
            "capacity": instance.capacity,
            "status": instance.status,
            'city': instance.city,
            'image': instance.image,
            'type': instance.type
        }
        
    def get_station_instance(stationID):
        return Station.objects.filter(id_station=stationID).first()

    def read():
        stations = [{**StationSerializer.to_station(station), 'slots': SlotSerializer.getStationSlots(
            station.id_station)} for station in Station.objects.all()]
        
        return stations

    def getStationById(id_station):
        station = Station.objects.filter(id_station=id_station).first()
        if station is not None:
            return StationSerializer.to_station(station)

        return {
            "msg": "Station not found or not exists",
            "status": 400
        }

    def getModelCols():
        types = {
            "varchar": "text",
            "tinyint": "bool",
            "int": "number"
        }

        with connection.cursor() as c:
            c.execute(
                'SELECT COLUMN_NAME as name, DATA_TYPE as type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "stations_station"')
            cols = [(item[0], 'file' if item[0] == 'image' else types[item[1]],)
                    for item in c.fetchall()]

        cols.pop(0)
        return cols

    def create(self, validate_data):
        station = Station.objects.create(**validate_data)
        return station

    def get_station_info(id_station):
        station = StationSerializer.getStationById(id_station)
        station = {**station,
                   'slots': SlotSerializer.getStationSlots(id_station)}

        return station

    def update_station(station):
        station['status'] = str(station['status']).capitalize()
        try:
            if Station.objects.filter(id_station=station['id_station']).update(**station):
                return {
                    'msg': f'Station {station["id_station"]} Updated',
                    'status': 'success'
                }
            
            return {
                'msg': 'Error modifying the station',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }

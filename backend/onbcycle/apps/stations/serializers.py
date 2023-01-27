from rest_framework import serializers
from .models import Station

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ( 'id_station', 'name', 'lat', 'long', 'capacity', 'status', 'city', 'image', 'type' )
        
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
        
    def read():
        stations = []
        for station in Station.objects.all():
            stations.append(StationSerializer.to_station(station))
            
        return stations
    
    def getStationById(self, id_station):
        station = Station.objects.filter(id_station=id_station).first()
        if station is not None:
            return StationSerializer.to_station(station)

        return {
            "msg": "Station not found or not exists",
            "status": 400
        }
        
    def getModelCols():
        cols = []
        for item in Station.objects.raw('SELECT 1 id_station, COLUMN_NAME as name, DATA_TYPE as type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "stations_station"'):
            print(item)
            cols.append(item)
            
        return cols
    
    def create(self, validate_data):
        station = Station.objects.create(**validate_data)
        return station
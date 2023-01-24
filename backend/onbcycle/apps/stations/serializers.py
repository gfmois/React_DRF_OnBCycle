from rest_framework import serializers
from .models import Station

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ( 'id_station', 'name', 'lat', 'long', 'capacity', 'state' )
        
    def to_station(instance: Station):
        return {
            "id_station": instance.id_station,
            "name": instance.name,
            "lat": instance.lat,
            "long": instance.long,
            "capacity": instance.capacity,
            "state": instance.state
        }
        
    def read():
        stations = []
        for station in Station.objects.all():
            stations.append(StationSerializer.to_station(station))
            
        return stations
    
    def create(self, validate_data):
        station = Station.objects.create(**validate_data)
        return station
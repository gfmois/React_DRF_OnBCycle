from rest_framework import serializers
from .models import Bike

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ( 'id_bike', 'status' )
        
    def to_bike(instance: Bike):
        if instance is None: 
            return {}
        
        return {
            'id_bike': instance.id_bike,
            'status': instance.status
        }
        
    def get_bike_from_slot(id_bike):
        bike = Bike.objects.filter(id_bike=id_bike).first()
        return BikeSerializer.to_bike(bike)
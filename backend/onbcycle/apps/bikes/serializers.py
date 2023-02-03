from rest_framework import serializers
from .models import Bike

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ( 'id_bike', 'status' )
        
    def to_bike(instance: Bike):
        if instance is None: 
            return {}
        
        print(instance)
        return {
            'id_bike': instance.id_bike,
            'status': instance.status
        }
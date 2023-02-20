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
    
    def remove_bike(id_bike):
        try:
            if Bike.objects.filter(id_bike=id_bike).delete():
                return {
                    'msg': 'Bike removed correctly',
                    'status': 'success'
                }
            
            return {
                'msg': 'No bike found with this ID',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': "error"
            }
    
    def update_bike(bike):
        try:
            if Bike.objects.filter(id_bike=bike['id_bike']).update(
                id_bike=bike['id_bike'],
                status=1 if str(bike['status']).capitalize() == 'True' else 0
            ):
                return {
                    'msg': f'Bike {bike["id_bike"]} Updated',
                    'status': 'success'
                }
            
            return {
                'msg': 'Error updating',
                'status': 'error'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }
from rest_framework import serializers
from .models import Bike
from django.db import connection
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
    
    def create_bike(bike):
        try:
            bike['status'] = str(bike['status']).capitalize()
            if Bike.objects.create(**bike):
                return {
                    'msg': 'Bike created',
                    'status': 'success'
                }
            return {
                'msg': 'Error while trying to create the bike',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }
    
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
        except:
            return {
                'msg': 'Please Delete or Modify first the Slot',
                'status': "error"
            }
    
    def update_bike(bike):
        try:
            if Bike.objects.filter(id_bike=bike['id_bike']).update(
                id_bike=bike['id_bike'],
                status=str(bike['status']).capitalize()
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
    
    def get_model_cols():
        types = {
            "varchar": "text",
            "tinyint": "bool",
            "int": "number"
        }

        with connection.cursor() as c:
            c.execute(
                'SELECT COLUMN_NAME as name, DATA_TYPE as type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "bikes_bike"')
            cols = [(item[0], 'file' if item[0] == 'image' else types[item[1]],)
                    for item in c.fetchall()]

        cols.pop(0)
        return cols
        
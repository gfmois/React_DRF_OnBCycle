from .models import Bike
from django.shortcuts import render
from .serializers import BikeSerializer
from rest_framework import mixins, viewsets
from rest_framework.response import Response

# Create your views here.
class BikeView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = BikeSerializer
    queryset = Bike.objects.all()
    
    def get_bike_from_slot(self, request, *args, **kwargs):
        serializer = BikeSerializer.get_bike_from_slot(kwargs['id_slot'])
        return Response(serializer)
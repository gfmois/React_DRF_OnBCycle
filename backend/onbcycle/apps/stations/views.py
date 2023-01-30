from .models import Station
from django.shortcuts import render
from .serializers import StationSerializer
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from rest_framework import generics, mixins, status, viewsets
from rest_framework.permissions import (
    AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

# Create your views here.
class StationView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    # permission_classes = (AllowAny)
    serializer_class = StationSerializer
    queryset = Station.objects.all()

    def read(self, request):
        serializer = StationSerializer.read()
        return Response(serializer)

    def getStation(self, *args, **kwargs):
        serializer = StationSerializer.getStationById(self, kwargs['id_station'])
        return Response(serializer)
    
    def getStationSlots(self, *args, **kwargs):
        return "a"
    
    def getModelCols(self, request):
        serializer = StationSerializer.getModelCols()
        return Response(serializer, status=status.HTTP_200_OK)

    def create(self, request: Request):    
        serializer_context = {
            'name': request.POST.get('name'),
            'lat': request.POST.get('lat'),
            'long': request.POST.get('long'),
            'capacity': request.POST.get('capacity'),
            'status': request.POST.get('status'),
            'image': request.data.get('image'),
            'city': request.data.get('city'),
            'type': request.data.get('type')
        }

        serializer_data = request.data
        serializer = self.serializer_class(
            data=serializer_data,
            context=serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(request: Request, *args, **kwargs):
        id = kwargs['id_station']
        station = Station.objects.filter(id_station=id).first()
        if station is None:
            return Response({
                "msg": "The station does not exists",
                "status": 400
            }, status=status.HTTP_400_BAD_REQUEST)

        station.delete()
        return Response({
            "msg": "Station deleted correctly",
            "status": 200
        }, status=status.HTTP_200_OK)

    def update(self, request: Request, *args, **kwargs):
        id = kwargs['id_station']
        station = Station.objects.get(id_station=id)
        newStationInfo = {
            'name': request.data.get('name'),
            'lat': request.data.get('lat'),
            'long': request.data.get('long'),
            'capacity': request.data.get('capacity'),
            'status': request.data.get('status') or 0,
            'city': request.data.get('city'),
            'image': request.data.get('image'),
            'type': request.data.get('type')
        }
        
        needs = []
        for key in newStationInfo.keys():
            if newStationInfo[key] is None:
                needs.append(key + ' is not in the object, please add it.')
                
        if len(needs) != 0:
            return Response({
                "msg": needs,
                "status": 400
            }, status = status.HTTP_400_BAD_REQUEST)
        
        if station is None:
            return Response({
                "msg": "The station does not exists",
                "status": 400
            }, status=status.HTTP_400_BAD_REQUEST)

        
        for key in newStationInfo.keys():
            setattr(station, key, newStationInfo[key])
        
        station.save()
        return Response({
            "msg": "The station has been updated",
            "status": 200
        }, status = status.HTTP_200_OK)
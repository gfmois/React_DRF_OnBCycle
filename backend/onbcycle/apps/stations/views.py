from .models import Station
from django.shortcuts import render
from .serializers import StationSerializer
from rest_framework.response import Response 
from rest_framework import generics, mixins, status, viewsets
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)


# Create your views here.
class StationView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    # permission_classes = (AllowAny)
    serializer_class = StationSerializer
    queryset = Station.objects.all()
    
    def read(self, request):
        serializer = StationSerializer.read()
        return Response(serializer)
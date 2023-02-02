from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import Slot
from .serializers import SlotSerializer
from rest_framework.response import Response

# Create your views here.
class SlotView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()
    
    def getStationSlots(self, request, *args, **kwargs):
        serializer = SlotSerializer.getStationSlots(kwargs['id_station'])
        return Response(serializer)
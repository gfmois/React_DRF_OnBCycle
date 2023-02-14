from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import Slot
from .serializers import SlotSerializer
from rest_framework.response import Response
from rest_framework.request import Request

# Create your views here.
class SlotView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()
    
    def getStationSlots(self, request, *args, **kwargs):
        serializer = SlotSerializer.getStationSlots(kwargs['id_station'])
        return Response(serializer)
    
    def get_slots(self, request: Request):
        serializer = [SlotSerializer.to_slot(slot) for slot in self.queryset]
        return Response(serializer)
        # try:
        #     if request.headers['Authorization']:
        #         print(request.headers['Authorization'])
        # except:
        #     return Response({
        #         'msg': 'No token found',
        #         'status': 401
        #     })
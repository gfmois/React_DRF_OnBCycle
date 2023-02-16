from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import Slot
from .serializers import SlotSerializer
from rest_framework.response import Response
from rest_framework.request import Request
from ..core.permisions import IsLocalAdmin

# Create your views here.
class SlotView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()

    def get_permissions(self):
        if self.request.method in ('GET') and not 'id_station' in self.request.data:
            self.permission_classes = [IsLocalAdmin]

        return super(SlotView, self).get_permissions()

    def getStationSlots(self, request, *args, **kwargs):
        serializer = SlotSerializer.getStationSlots(kwargs['id_station'])
        return Response(serializer)

    def get_slots(self, request: Request):
        serializer = [SlotSerializer.to_slot(slot) for slot in self.queryset]
        return Response(serializer)

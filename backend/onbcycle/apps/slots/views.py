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
        serializer = [SlotSerializer.to_slot(slot) for slot in Slot.objects.all()]
        return Response(serializer)

    def update_slot(self, request):
        serializer = SlotSerializer.update_slot(request.data)
        return Response(serializer)

    def delete_slot(self, request, *args, **kwargs):
        return Response(SlotSerializer.delete_slot(kwargs['id_slot']))

    def get_model_cols(self, request):
        return Response(SlotSerializer.get_model_cols())

    def add_slot(self, request):
        return Response(SlotSerializer.add_slot(request.data))
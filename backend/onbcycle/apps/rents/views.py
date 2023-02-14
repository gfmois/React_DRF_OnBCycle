from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from .serializers import RentSerializer
from ..slots.serializers import SlotSerializer
from .models import Rent
from rest_framework.permissions import (IsAuthenticated)
from rest_framework import status

# Create your views here.


class RentView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = RentSerializer
    queryset = Rent.objects.all()
    permission_classes = [IsAuthenticated]

    def rent_bike(self, request, *args, **kwargs):
        try:
            slot = SlotSerializer.get_random_slot(kwargs['id_station'])
            if 'status' in slot:
                return Response(slot, status=status.HTTP_400_BAD_REQUEST)

            rent = RentSerializer.rent_bike(
                slot['id_slot'], request.headers['Authorization'])
            return Response(rent, status=status.HTTP_200_OK)
        except:
            return Response({
                'msg': 'Hubo un error en la reserva',
                'status': 400
            }, status=status.HTTP_400_BAD_REQUEST)

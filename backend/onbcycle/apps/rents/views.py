from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import RentSerializer
from ..slots.serializers import SlotSerializer
from .models import Rent
from rest_framework.permissions import (IsAuthenticated)
from ..core.permisions import IsLocalAdmin
from rest_framework import status

# Create your views here.
class RentView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = RentSerializer
    queryset = Rent.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'get_rents':
            self.permission_classes = [IsLocalAdmin]
        return super(RentView, self).get_permissions()

    def rent_bike(self, request, *args, **kwargs):
        try:
            slot = SlotSerializer.get_random_slot(kwargs['id_station'])
            if ('msg', 'status') in slot:
                return Response(slot, status=status.HTTP_400_BAD_REQUEST)

            rent = RentSerializer.rent_bike(
                slot['id_slot'], request.headers['Authorization'], id_station=kwargs['id_station'])

            return Response(rent, status=status.HTTP_200_OK)
        except:
            return Response({
                'msg': 'It was an error on the rent',
                'status': 'error'
            }, status=status.HTTP_400_BAD_REQUEST)

    def get_rented_bike(self, request: Request):
        try:
            serializer = RentSerializer.get_bike(
                request.headers['Authorization'])
            return Response(serializer)
        except Exception as e:
            return Response(e)

    def leave_bike(self, request: Request, *args, **kwargs):
        serializer = RentSerializer.leave_bike(
            request.headers['Authorization'], request.data['bike'], request.data['station'])
        return Response(serializer)

    # @local_admin_required
    def get_rents(self, request, *args, **kwargs):
        return Response(RentSerializer.to_rent(rent) for rent in Rent.objects.all())

    def get_user_rents(self, request):
        return Response(RentSerializer.get_user_rents(request.user))
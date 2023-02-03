from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from .serializers import RentSerializer
from .models import Rent

# Create your views here.
class RentView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = RentSerializer
    queryset = Rent.objects.all()
    
    def rent_bike(self, request, *args, **kwargs):
        rent = RentSerializer.rent_bike(kwargs['id_slot'])
        return Response(rent)
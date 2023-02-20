from .models import Bike
from .serializers import BikeSerializer
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..core.permisions import IsLocalAdmin

# Create your views here.
class BikeView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = BikeSerializer
    permission_classes = IsAuthenticated
    queryset = Bike.objects.all()

    def get_permissions(self):
        if self.request.method in ('POST', 'DELETE', 'PUT', 'GET') and not 'id_slot' in self.request.data:
            self.permission_classes = [IsLocalAdmin]

        return super(BikeView, self).get_permissions()

    def get_bike_from_slot(self, request, *args, **kwargs):
        serializer = BikeSerializer.get_bike_from_slot(kwargs['id_slot'])
        return Response(serializer)

    def get_bikes(self, request):
        return Response([BikeSerializer.to_bike(bike) for bike in self.queryset])

    def update_bike(self, request):
        return Response(BikeSerializer.update_bike(request.data))
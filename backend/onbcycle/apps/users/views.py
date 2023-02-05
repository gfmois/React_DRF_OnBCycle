from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import AllowAny


# Create your views here.
class UserView(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = User

    def register(self, request: Request):
        inputs = ('email', 'name', 'phone', 'password')
        errors = []
        
        #! FIXME: Not working
        for input in inputs:
            if request.data[input] is None:
                errors.append(f'{input} is required')
        
        
        return Response(errors)
        data = {
            'email': request.data['email'],
            'name': request.data['name'],
            'phone': request.data['phone'],
            'password': request.data['password']
        }
        
        return Response(data)
        
        for input in data.keys():
            if data[input] is None:
                raise ValueError(f'{input} is required')
            
        return Response(data)
        serializer = UserSerializer.register(data)
        return Response(serializer, status=status.HTTP_200_OK)
        
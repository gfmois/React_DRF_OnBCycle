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
        data = {
            'email': request.data['email'],
            'name': request.data['name'],
            'phone': request.data['phone'],
            'password': request.data['password']
        }
        
        serializer = UserSerializer.register(data)
        return Response(serializer, status=status.HTTP_200_OK)
        
    def login(self, requst: Request):
        data = {
            'email': requst.data['email'],
            'password': requst.data['password']
        }
        
        serializers = UserSerializer.login(data)
        return Response(serializers, status=status.HTTP_200_OK)
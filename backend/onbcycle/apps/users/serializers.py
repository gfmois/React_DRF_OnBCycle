from rest_framework import serializers
from django.contrib.auth.hashers import (make_password, check_password)
from django.contrib.auth import authenticate
from django.conf import settings
from .models import User
import jwt


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = (
            'id_user', 'email', 'name', 'phone', 'password', 'avatar'
        )

    def to_user(instance: User, is_to_show: bool = False):
        user = {
            'id_user': instance.id_user,
            'email': instance.email,
            'phone': instance.phone,
            'name': instance.name,
            'avatar': instance.avatar,
            'role': instance.role
        }
        
        if is_to_show is False:
            user['password'] = instance.password,
        
        return user
        
    def get_user(token):
        try:
            dec_token = dict(jwt.decode(token, settings.SECRET_KEY)) 
            user = User.objects.filter(email=dec_token['email']).first()
            if user is None:
                return {
                    'msg': 'No user found',
                    'status': 400
                }
            return UserSerializer.to_user(user, is_to_show=True)
        except:
            return {
                'msg': 'Error on decode token',
                'status': 400
            }

    def register(context):
        email = context['email']
        password = context['password']
        name = context['name']
        phone = context['phone']

        try:
            user = User.objects.get(email=email)
            raise serializers.ValidationError(
                'This email is already taken.'
            )
        except User.DoesNotExist:
            user = User.objects.create(
                email=email,
                password=make_password(password),
                name=name,
                phone=phone,
                role='Client',
            )

            return {
                'user': UserSerializer.to_user(user),
                'token': user.token,
                'refresh_token': user.refresh_token
            }

    def login(context):
        email = context['email']
        password = context['password']

        if email is None or password is None:
            raise ValueError('Email or Password not provided')

        user = User.objects.filter(email=email).first()
        if user is None:
            raise serializers.ValidationError("Email not found")
        
        try:
            if check_password(password, user.password):
                return {
                    'email': user.email,
                    'name': user.name,
                    'token': user.token,
                    'refresh_token': user.refresh_token
                }
            else:
                return {
                    'msg': 'Password or Email invalid',
                    'status': 400
                }
        except:
            raise('Error on Login')


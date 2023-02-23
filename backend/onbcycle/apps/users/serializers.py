from rest_framework import serializers
from django.contrib.auth.hashers import (make_password, check_password)
from django.contrib.auth import authenticate
from django.conf import settings
from .models import User
from ..bikes.models import Bike
from ..slots.models import Slot
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
            if 'Bearer' in token:
                token = str(token).split(' ')[1]
                
            dec_token = dict(jwt.decode(token, settings.SECRET_KEY))
            user = User.objects.filter(email=dec_token['email']).first()
            if user is None:
                return {
                    'msg': 'No user found',
                    'status': 'error'
                }
            return UserSerializer.to_user(user, is_to_show=True)
        except:
            return {
                'msg': 'Error on decode token',
                'status': 'error'
            }
        
    def get_user_by_email(email):
        return UserSerializer.to_user(User.objects.filter(email=email).first())
        

    def get_users():
        users = []
        for user in User.objects.all():
            users.append(UserSerializer.to_user(user, True))

        return users

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
                'user': UserSerializer.to_user(user, True),
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
                    'avatar': user.avatar,
                    'role': user.role,
                    'refresh_token': user.refresh_token
                }
            else:
                return {
                    'msg': 'Password or Email invalid',
                    'status': 'warning'
                }
        except:
            raise ('Error on Login')
    
    def update_profile(profileData):
        try:
            user = UserSerializer.get_user_by_email(profileData['email'])
            if str(profileData['password']).__len__() > 0 and str(profileData['re_password'].__len__() > 0):
                if profileData['password'] != profileData['re_password']:
                    return {
                        'msg': 'Passwords does not match',
                        'status': 'error'
                    }
                profileData['password'] = make_password(profileData['password'])
            else:
                del profileData['password']
                
            del profileData['re_password']
            if User.objects.filter(id_user=user['id_user']).update(**profileData):
                return {
                    'msg': 'User Updated',
                    'status': 'success'
                }
                
            return {
                'msg': 'User not found',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }
        
    def delete_user(user_id):
        try:
            if User.objects.filter(id_user=user_id).delete():
                return {
                    'msg': 'User deleted',
                    'status': 'success'
                }
            return {
                'msg': 'No user found',
                'status': 'warning'
            }
        except Exception as e:
            return {
                'msg': f'Error: {e}',
                'status': 'error'
            }
    
    def get_dashboard_info():
        return {
            'users': User.objects.all().__len__(),
            "bikes": Bike.objects.all().__len__(),
            'slots': Slot.objects.all().__len__()
        }
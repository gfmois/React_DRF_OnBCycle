from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = (
            'id_user', 'email', 'name', 'phone', 'password'
        )
        
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
                email = email,
                password = password,
                name = name,
                phone = phone,
                role = 'Client',
            )
            
            return {
                'user': user,
                'token': user.token
            }
        
            
        

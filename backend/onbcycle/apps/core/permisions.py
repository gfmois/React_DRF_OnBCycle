from rest_framework import permissions
from ..users.serializers import UserSerializer
from django.http import HttpResponseForbidden
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.decorators import user_passes_test

class IsLocalAdmin(permissions.BasePermission):
    """
    Allow access only for Local Administrators of the site
    """
    message = 'You are not Administrator of this site'
    def has_permission(self, request, view):
        if type(request.user) is AnonymousUser:
            return False
        
        return request.user and request.user.role == 'Admin'
        
# def is_local_admin(user):
#     if user:
#         return UserSerializer.get_user_by_email(user)['role'] == 'Admin'
#     return False

# def local_admin_required(v_func):
#     decorated_v_func = user_passes_test(is_local_admin)
    
#     def wrapper(self, request, *args, **kwargs):
#         if not is_local_admin(request.user):
#             return HttpResponseForbidden('You are not Administrator of this site')
        
#         return decorated_v_func(v_func)(self, request, *args, **kwargs)

#     return wrapper

        
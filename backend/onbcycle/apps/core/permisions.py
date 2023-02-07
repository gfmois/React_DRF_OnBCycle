from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser

class IsLocalAdmin(permissions.BasePermission):
    """
    Allow access only for Local Administrators of the site
    """
    message = 'You are not Administrator of this site'
    def has_permission(self, request, view):
        if type(request.user) is AnonymousUser:
            return False
        return request.user and request.user.role == 'Admin'
        
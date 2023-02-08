from django.db import models, transaction
from datetime import datetime, timedelta
import time
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, Group, Permission, BaseUserManager)
from django.conf import settings
import jwt

# class UserManager(BaseUserManager):
#     def _create_user(self, email, password, **extra_fields):
#         if not email:
#             raise ValueError('Email is required')
#         try:
#             with transaction.atomic():
#                 user = self.model(emai=email, **extra_fields)
#                 user.set_password(password)
#                 user.save(using=self._db)
#                 return user
#         except:
#             raise

#     def create_user(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_superuser', False)
#         extra_fields.setdefault('role', 'Client')
#         return self._create_user(email, password, **extra_fields)

#     def create_admin_user(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_superuser', False)
#         extra_fields.setdefault('role', 'Admin')
#         return self._create_user(email, password, **extra_fields)

#     def create_super_user(self, email, password, **extra_fields):
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('role', 'Admin')
#         return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, models.Model):  # PermissionsMixin
    id_user = models.CharField(primary_key=True, unique=True, max_length=15)
    name = models.CharField(max_length=40)
    email = models.EmailField(unique=True, max_length=254)
    phone = models.CharField(blank=False, max_length=9)
    role = models.CharField(max_length=15, default='Client')
    avatar = models.CharField(max_length=255)

    # objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'name', 'phone', 'role']

    # groups = models.ManyToManyField(
    #     Group,
    #     related_name='custom_groups',
    # )

    # user_permissions = models.ManyToManyField(
    #     Permission,
    #     related_name='custom_user_permissions',
    # )

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    @property
    def token(self):
        return self.generate_token_jwt()

    @property
    def refresh_token(self):
        return self.generate_token_jwt(is_refresh=True)

    def generate_token_jwt(self, is_refresh=False):
        dt = datetime.now() + (timedelta(minutes=60) if is_refresh else timedelta(minutes=180))
        segs = int(time.mktime(dt.timetuple()))

        token = jwt.encode({
            'email': self.email,
            'exp': segs
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

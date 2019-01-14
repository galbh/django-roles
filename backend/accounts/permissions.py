from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions

from backend.accounts.models import User


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if isinstance(request.user, AnonymousUser):
            return False

        if request.user.is_superuser:
            return True

        return int(request.user.user_type) == User.ADMIN_USER_ID


class IsGodUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if isinstance(request.user, AnonymousUser):
            return False

        if request.user.is_superuser:
            return True

        return int(request.user.user_type) == User.GOD_USER_ID


class IsGodOrAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if isinstance(request.user, AnonymousUser):
            return False

        if request.user.is_superuser:
            return True

        return int(request.user.user_type) == User.GOD_USER_ID or int(request.user.user_type) == User.ADMIN_USER_ID

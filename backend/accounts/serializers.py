from backend.accounts.models import UserProfile, User
# from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='user.id')
    username = serializers.CharField(source='user.username')
    is_staff = serializers.CharField(source='user.is_staff')
    is_superuser = serializers.CharField(source='user.is_superuser')
    email = serializers.CharField(source='user.email')
    user_type = serializers.CharField(source='user.user_type')
    full_name = serializers.CharField()

    class Meta:
        model = UserProfile
        fields = (
            'id',
            'username',
            'phone_number',
            'email',
            'full_name',
            'is_superuser',
            'is_staff',
            'user_type'
        )


class UpdateProfileSerializer(UserProfileSerializer):
    id = None
    user_type = None

    class Meta:
        model = UserProfile
        exclude = ('user', )


class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class RequestResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', )


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()


class RegistrationSerializer(serializers.ModelSerializer):
    user_type = serializers.IntegerField(source='user.user_type')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password', 'user_type', 'email')

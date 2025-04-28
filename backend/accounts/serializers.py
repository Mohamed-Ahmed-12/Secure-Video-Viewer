import re
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username","email","password")
        extra_kwargs = {
            "password": {"write_only": True}  # Don't show password when returning data
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
        
    def validate_email(self, value):
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Email must be a valid @example.com address.")
        return value
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password length must be at least 8 characters.")
        return value

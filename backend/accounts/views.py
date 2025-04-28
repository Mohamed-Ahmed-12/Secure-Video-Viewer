from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import UserSerializer
from django.contrib.auth.models import User
# Create your views here.
class RegisterView(APIView):
    """Register new user for given credentials username , email and password """
    def post(self , request ,*args, **kwargs):
        user_data = request.data
        serializer = UserSerializer(data = user_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)
    
class UserInfoView(APIView):
    """Simple View for validate user's Access Token and return user info"""
    permission_classes = [IsAuthenticated]
    def get(self , request):
        auth_header = request.headers.get('Authorization')
        token = auth_header.split(' ')[1]
        access_token = AccessToken(token,verify=True)
        user_id = access_token['user_id']
        # Fetch the user object
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

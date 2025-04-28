from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenVerifyView
from .views import RegisterView  , UserInfoView


urlpatterns = [
    path("register",RegisterView.as_view(),name="register"),
    path('me', UserInfoView.as_view(), name='me'),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('verify', TokenVerifyView.as_view(), name='token_verify'),
]

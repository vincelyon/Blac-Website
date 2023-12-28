# urls.py

from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('category/<str:category_name>/', views.category, name='category'),
    path('login/', views.user_login, name='login'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    # Add URLs for admin login and image modification here
    # ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from .models import Category, Item
from .models import User
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import CategoryForm, ItemForm
from django.contrib import messages
from django.urls import reverse
import pyrebase

# Initialize Firebase
firebaseConfig = {
  apiKey: "AIzaSyAITjBnmNzakwA4ihymPCog1oLamEO0_RA",
  authDomain: "blac-69a47.firebaseapp.com",
  databaseURL: "https://blac-69a47-default-rtdb.firebaseio.com",
  projectId: "blac-69a47",
  storageBucket: "blac-69a47.appspot.com",
  messagingSenderId: "386156923266",
  appId: "1:386156923266:web:2f1dcaa49d79013035279b"
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def index(request):
    categories = db.child("categories").get().val()
    return render(request, 'index.html', {'categories': categories})

def category(request, category_name):
    category = Category.objects.get(name=category_name)
    items = Item.objects.filter(category=category)
    return render(request, 'category.html', {'category_name': category_name, 'items': items})


def dashboard(request):
    total_categories = Category.objects.count()
    total_items = Item.objects.count()

    return render(request, 'dashboard.html', {
        'total_categories': total_categories,
        'total_items': total_items,
    })

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to the Django admin dashboard
            return redirect(reverse('admin:index'))  # Redirects to the admin dashboard
        else:
            # Handle invalid login
            messages.error(request, 'Invalid username or password. Please try again.')  # Add an error message
            # You can perform other actions upon unsuccessful login if needed
            return render(request, 'login.html')  # Render the login page again with the error message

    return render(request, 'login.html')


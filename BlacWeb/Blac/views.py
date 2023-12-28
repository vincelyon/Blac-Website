from .models import Category, Item
from .models import User
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import CategoryForm, ItemForm
from django.contrib import messages
from django.urls import reverse


def categories(request):
    categories = Category.objects.all()
    return render(request, 'categories.html', {'categories': categories})

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


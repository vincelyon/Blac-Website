from django import forms
from .models import Category, Item

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name','image']

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['category', 'name', 'description', 'image', 'price']

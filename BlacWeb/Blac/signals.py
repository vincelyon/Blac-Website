from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from firebase_admin import db, storage
from .models import Category, Item  # Import your Django models here

# Signal to sync Category data with Firebase
@receiver(post_save, sender=Category)
def sync_category_with_firebase(sender, instance, created, **kwargs):
    if created:
        # Create or update data in Firebase Realtime Database when a new Category is created
        ref = db.reference('categories')
        category_data = {
            'name': instance.name,
            'image_url': upload_image_to_storage(instance.image) if instance.image else None,
            # Include more fields as needed
        }
        ref.child(str(instance.id)).set(category_data)

# Signal to sync Item data with Firebase
@receiver(post_save, sender=Item)
def sync_item_with_firebase(sender, instance, created, **kwargs):
    if created:
        # Create or update data in Firebase Realtime Database when a new Item is created
        ref = db.reference('items')
        item_data = {
            'category_id': instance.category_id,
            'name': instance.name,
            'description': instance.description,
            'image_url': upload_image_to_storage(instance.image) if instance.image else None,
            'price': str(instance.price),
            # Include more fields as needed
        }
        ref.child(str(instance.id)).set(item_data)

def upload_image_to_storage(image):
    # Upload the image binary data to Firebase Storage and get the download URL
    bucket = storage.bucket()  # Replace with your Firebase Storage bucket name
    blob = bucket.blob(f"images/{image.name}")
    with image.open() as img:
        blob.upload_from_file(img, content_type=image.content_type)
    return blob.public_url

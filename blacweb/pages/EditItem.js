import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import withAuth from '../utils/withAuth';

const EditItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemPrice, setItemPrice] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (selectedCategory) {
        try {
          const categoryDocRef = doc(db, 'categories', selectedCategory);
          const querySnapshot = await getDocs(collection(categoryDocRef, 'items'));
          const itemsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setItems(itemsList);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setItemImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem) {
      alert('Please select an item to update.');
      return;
    }

    try {
      const itemDocRef = doc(db, 'categories', selectedCategory, 'items', selectedItem);
      await updateDoc(itemDocRef, {
        itemName: itemName,
        itemDescription: itemDescription,
        itemImage: itemImage,
        itemPrice: itemPrice,
      });
      alert('Item updated successfully.');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div style={{ width: '70%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#333', color: '#fff' }}>
      <h1 className="text-5xl font-bold m-10">Edit Item</h1>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="category">Select Category</label>
        <select
          style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.data.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="item">Select Item</label>
          <select
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
            id="item"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.data.itemName}
              </option>
            ))}
          </select>
          {selectedItem && (
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="itemName">Item Name</label>
              <input
                style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="itemDescription">Item Description</label>
              <input
                style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
                type="text"
                id="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
              <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="itemImage">Item Image</label>
              <input
                style={{ marginBottom: '15px', color: '#333' }}
                type="file"
                id="itemImage"
                onChange={handleImageUpload}
              />
              <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="itemPrice">Item Price</label>
              <input
                style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333' }}
                type="number"
                id="itemPrice"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
              <button
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                onClick={handleUpdate}
              >
                Update Item
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default withAuth(EditItem);

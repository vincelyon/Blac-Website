import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import withAuth from '../utils/withAuth';
import Sidebar from '@/components/Sidebar';

const EditItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

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

  const handleUpdate = async () => {
    if (!selectedCategory || !selectedItem || !newItemName || !newItemDescription) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const itemDocRef = doc(db, 'categories', selectedCategory, 'items', selectedItem);
      await updateDoc(itemDocRef, { itemName: newItemName, itemDescription: newItemDescription });
      setSelectedItem('');
      setNewItemName('');
      setNewItemDescription('');
      alert('Item updated successfully.');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#333', color: '#fff', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ width: '70%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',backgroundColor:'white', color:'black'}}>
          <h1 className="text-5xl font-bold m-10">Edit Item</h1>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="category">Select Category</label>
            <select
              style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
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
              <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="item">Select Item</label>
              <select
                style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
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
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="newItemName">New Item Name</label>
                <input
                  style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
                  type="text"
                  id="newItemName"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="newItemDescription">New Item Description</label>
                <input
                  style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
                  type="text"
                  id="newItemDescription"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                />
              </div>
              <button
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                onClick={handleUpdate}
              >
                Update Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(EditItem);

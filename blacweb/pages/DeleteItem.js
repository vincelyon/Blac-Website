import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import withAuth from '../utils/withAuth';

const DeleteItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

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

  const handleDelete = async () => {
    if (!selectedItem) {
      alert('Please select an item to delete.');
      return;
    }

    try {
      const itemDocRef = doc(db, 'categories', selectedCategory, 'items', selectedItem);
      await deleteDoc(itemDocRef);
      setSelectedItem('');
      alert('Item deleted successfully.');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '70%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-5xl font-bold m-10">Delete An Item</h1>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="category">Select Category</label>
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
            <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }} htmlFor="item">Select Item</label>
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
            <button
              style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              onClick={handleDelete}
            >
              Delete Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(DeleteItem);

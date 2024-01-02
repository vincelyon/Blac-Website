import React, { useState, useEffect } from 'react';
import db from '../utils/firebaseconfig';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';

const AddItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null); // State for the item image
  const [itemPrice, setItemPrice] = useState(''); // State for the item price

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

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !itemName || !itemDescription || !itemImage || !itemPrice) {
      alert('Please fill all the fields.');
      return;
    }

    try {
      const itemData = {
        itemName: itemName,
        itemDescription: itemDescription,
        itemImage: itemImage, // Add item image
        itemPrice: itemPrice, // Add item price
      };

      const categoryDocRef = doc(db, 'categories', selectedCategory);
      await addDoc(collection(categoryDocRef, 'items'), itemData);

      setSelectedCategory('');
      setItemName('');
      setItemDescription('');
      setItemImage(null);
      setItemPrice('');
      alert('Item added to Firestore');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div style={{ width: '70%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ marginBottom: '20px' }}>Add Item</h2>
      <form onSubmit={handleItemSubmit}>
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
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="itemName">Item Name</label>
        <input
          style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="itemDescription">Item Description</label>
        <input
          style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
          type="text"
          id="itemDescription"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="itemImage">Item Image</label>
        <input
          style={{ marginBottom: '15px' }}
          type="file"
          id="itemImage"
          onChange={(e) => handleImageUpload(e)}
        />
        <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="itemPrice">Item Price</label>
        <input
          style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
          type="number"
          id="itemPrice"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <button
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          type="submit"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;

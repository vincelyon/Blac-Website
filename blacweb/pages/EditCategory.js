import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import withAuth from '../utils/withAuth';

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

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

  const handleUpdate = async () => {
    if (!selectedCategory || !newCategoryName) {
      alert('Please select a category and provide a new category name.');
      return;
    }

    try {
      const categoryDocRef = doc(db, 'categories', selectedCategory);
      await updateDoc(categoryDocRef, { name: newCategoryName });
      setSelectedCategory('');
      setNewCategoryName('');
      alert('Category updated successfully.');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', maxWidth: '600px', padding: '20px', borderRadius: '10px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#333', textAlign: 'center' }}>Edit Category</h1>
        <div>
          <label htmlFor="category" style={{ marginBottom: '10px', color: '#333' }}>Select Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px', marginBottom: '20px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.data.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="newCategoryName" style={{ marginBottom: '10px', color: '#333' }}>New Category Name</label>
          <input
            type="text"
            id="newCategoryName"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            style={{ padding: '8px', marginBottom: '20px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default withAuth(EditCategory);

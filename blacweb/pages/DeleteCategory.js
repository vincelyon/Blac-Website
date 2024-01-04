import { useState, useEffect } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import withAuth from '../utils/withAuth';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoryList = [];
        querySnapshot.forEach((doc) => {
          categoryList.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!selectedCategory) {
      alert('Please select a category to delete.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'categories', selectedCategory));
      setSelectedCategory('');
      alert('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', maxWidth: '600px', padding: '20px', borderRadius: '10px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#333', textAlign: 'center' }}>Delete A Category</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginBottom: '20px', padding: '8px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select a category to delete</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DeleteCategory);

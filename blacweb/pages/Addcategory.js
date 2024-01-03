import { useState } from 'react';
import db from '../utils/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import withAuth from '../utils/withAuth';

async function addDataToFirestore(name, imageUrl) {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      name: name,
      imageUrl: imageUrl,
    });
    console.log('Successful', docRef.id);
    return true;
  } catch (error) {
    console.log('Error adding document: ', error);
    return false;
  }
}

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setCategoryImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      alert('Please enter a category name and select an image.');
      return;
    }

    try {
      const added = await addDataToFirestore(categoryName, categoryImage);

      if (added) {
        setCategoryName('');
        setCategoryImage('');
        alert('Data added to Firestore');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <main style={{ textAlign: 'center', padding: '20px' }}>
      <h1 className="text-5xl font-bold m-10">Add A New Category</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="categoryName" style={{ marginBottom: '10px' }}>Category Name</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ padding: '8px', marginBottom: '20px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <label htmlFor="categoryImage" style={{ marginBottom: '10px' }}>Category Image</label>
        <input
          type="file"
          id="categoryImage"
          accept="image/*"
          onChange={handleCategoryImageChange}
          style={{ marginBottom: '20px' }}
        />
        {categoryImage && (
          <img
            src={categoryImage}
            alt="Category"
            style={{ maxWidth: '300px', marginTop: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        )}
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default withAuth(AddCategory);

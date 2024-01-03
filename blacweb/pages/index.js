// Index.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import db from '../utils/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import './styles.css';

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const colRef = collection(db, 'categories');
        const snapshots = await getDocs(colRef);

        const categoriesData = snapshots.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchItemsForCategory = async (categoryId, categoryName) => {
    try {
      const docRef = collection(db, 'categories', categoryId, 'items');
      const snapshots = await getDocs(docRef);

      const itemsData = snapshots.docs.map((itemDoc) => ({
        id: itemDoc.id,
        itemName: itemDoc.data().itemName,
        itemDescription: itemDoc.data().itemDescription,
        itemPrice: itemDoc.data().itemPrice,
        itemImage: itemDoc.data().itemImage,
        categoryName: categoryName,
      }));

      setSelectedCategory({ categoryId, categoryName, items: itemsData });
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
  };

  const handleCategoryClick = async (categoryId, categoryName) => {
    await fetchItemsForCategory(categoryId, categoryName);
  };

  return (
    <div>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#333', padding: '10px 20px', color: '#fff', height: '50px' }}>
        <div style={{ marginRight: 'auto' }}>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <ul style={{ listStyle: 'none', display: 'flex' }}>
          <li style={{ marginLeft: '20px', cursor: 'pointer' }}>Home</li>
          <li style={{ marginLeft: '20px', cursor: 'pointer' }}>About Us</li>
          <li style={{ marginLeft: '20px', cursor: 'pointer' }}>Contact Us</li>
          <li style={{ marginLeft: '20px', cursor: 'pointer' }}>Login</li>
        </ul>
      </nav>

      <div style={{ backgroundColor: 'lightblue', padding: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img src="images/image2.jpg" alt="Side Image 2" style={{ width: '250px', height: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div style={{ flex: '2', textAlign: 'center' }}>
          <h1 style={{ fontSize: '35px', margin: '0', marginBottom: '10px', fontWeight: 'bolder' }}>WELCOME TO BLAC!</h1>
          <h2 style={{ fontSize: '22px', margin: '0', marginBottom: '10px' }}>THE RIGHT TRIB</h2>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img src="images/image1.jpg" alt="Side Image 1" style={{ width: '250px', height: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
      </div>

      <div style={{ marginTop: '2px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Categories</h2>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '10px', borderRadius: '10px', backgroundColor: '#52BE80', justifyContent: 'center' }}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', margin: '5px', cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
              onClick={() => handleCategoryClick(category.id, category.name)}
            >
              {category.imageUrl && (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
                />
              )}
              <p style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '5px' }}>{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <CategoryPage
          categoryName={selectedCategory.categoryName}
          items={selectedCategory.items}
        />
      )}

      <footer style={{ backgroundColor: '#52BE80', color: '#000', padding: '20px', textAlign: 'center', marginTop: '30px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div style={{ flex: '2', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '5px', color: '#000' }}>BLAC!</h3>
          <p style={{ fontSize: '14px', marginBottom: '5px', color: '#000' }}>Your ultimate fashion destination</p>
        </div>
        <div style={{ flex: '2', textAlign: 'center', color: '#000' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '10px' }}>For more information, contact us by pressing the button below:</h2>
          <button style={{ fontSize: '14px', padding: '8px 16px', backgroundColor: '#92E2B6', color: '#333', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Contact Us</button>
        </div>
        <div style={{ flex: '1', textAlign: 'right' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '5px', color: '#000', textAlign: 'right' }}>Follow Us On:</h3>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#facebook" style={{ textDecoration: 'none', color: '#043A63', marginRight: '10px' }}>
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px' }} />
            </a>
            <a href="#twitter" style={{ textDecoration: 'none', color: '#043A63', marginRight: '10px' }}>
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '20px' }} />
            </a>
            <a href="#instagram" style={{ textDecoration: 'none', color: '#043A63' }}>
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '20px' }} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CategoryPage = ({ categoryName, items }) => {
  return (
    <div style={{ marginTop: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>{categoryName}</h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'lightblue', flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
            <h3>{item.itemName}</h3>
            <p><strong>Category:</strong> {item.categoryName}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.itemImage} alt={item.itemName} style={{ width: '100px', height: '100px', borderRadius: '5px', marginRight: '20px' }} />
              <div>
                <p><strong>Description:</strong> {item.itemDescription}</p>
                <p><strong>Price:</strong> K{item.itemPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

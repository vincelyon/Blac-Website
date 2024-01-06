import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { db } from '../utils/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from "../components/Navbar"

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
    <div className="min-h-screen bg-black" style={{backgroundColor:'#92928E'}}>
      <Navbar />
      <div style={{ 
  color: 'white', 
  backgroundImage: "url('/images/hi.jpg')",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: '20px', 
  textAlign: 'center', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  fontFamily: 'Arial, sans-serif' 
}}>
        <div style={{ flex: '20%', textAlign: 'center', maxWidth: '40%' }}>
          <img src="images/a.jpeg" alt="Side Image 2" style={{ width: '100%', maxWidth: '250px', height: '100%', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div style={{ flex: '50%', textAlign: 'center', maxWidth: '40%', backgroundColor:'#3838385B', padding:'20px', borderRadius:'10px'}}>
          <h1 style={{ fontSize: '25px', margin: '0', marginBottom: '10px', fontWeight: 'bolder'}}>WELCOME TO BLAC!</h1>
          <h2 style={{ fontSize: '15px', margin: '0', marginBottom: '10px' }}>THE RIGHT TRIBE</h2>
        </div>
      </div>

      <div style={{
  marginTop: '40px',
  height: 'fit-content',
  backgroundImage: "url('/images/4.jpg')",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  color: 'white'
}}>
  <div style={{ backgroundColor: '#5461612D', padding: '20px' }}>
    <h2 style={{
      textAlign: 'center',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color:'#FFFFFFFD',
      backgroundColor:'#0000003B',
      padding:'20px',
    }}><b>C A T E G O R I E S</b></h2>
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      padding: '10px',
      borderRadius: '10px',
      justifyContent: 'center',
      scrollbarWidth: 'none', /* Hide scrollbar */
      WebkitOverflowScrolling: 'touch', /* Smooth scrolling for iOS */
      flexWrap: 'wrap', /* Allow items to wrap on smaller screens */
      '@media screen and (maxWidth: 768px)': { // <-- Media query removed from here
        flexDirection: 'row',
        overflowX: 'auto',
      }
    }}>
      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            padding: '10px',
            borderRadius: '8px',
            margin: '5px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            flex: '0 0 150px', /* Adjust the width according to your need */
            maxWidth: '200px', /* Set maximum width if necessary */
            '@media screen and (maxWidth: 768px)': { // <-- Media query removed from here
              flex: '0 0 100px', /* Adjust width for smaller screens */
              maxWidth: '150px', /* Max width for smaller screens */
            }
          }}
          onClick={() => handleCategoryClick(category.id, category.name)}
        >
          <p style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '5px',
            textAlign: 'center',
            backgroundColor: 'black',
            padding: '20px',
            whiteSpace: 'nowrap', /* Prevent wrapping of text */
            overflow: 'hidden',
            textOverflow: 'ellipsis' /* Show ellipsis for long text */
          }}>{category.name}</p>
        </div>
      ))}
    </div>
  </div>
</div>


      {selectedCategory && (
        <CategoryPage
          categoryName={selectedCategory.categoryName}
          items={selectedCategory.items}
        />
      )}

      <footer style={{ backgroundColor: '#424442', color: 'white', padding: '20px', textAlign: 'center', marginTop: '30px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 100%', marginBottom: '0px' }}>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '20px', marginTop: '-20px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'black' }}>B L A C !</h3>
          <p style={{ fontSize: '14px', marginBottom: '5px', color: 'black' }}><b>THE RIGHT TRIBE </b></p>
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '10px', color:'black' }}>For more information, contact us by pressing the button below:</h2>
          <button style={{ fontSize: '14px', padding: '8px 16px', backgroundColor: '#0A194B52', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Contact Us</button>
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'center' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '5px', color: 'black', textAlign: 'center' }}>Follow Us On:</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://www.facebook.com/blactherighttribe?mibextid=LQQJ4d" style={{ textDecoration: 'none', color: '#657ECF9F', marginRight: '10px' }}>
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px' }} />
            </a>
            <a href="https://twitter.com/blac_tribe/status/1742629874597028327?s=20" style={{ textDecoration: 'none', color: '#657ECF9F', marginRight: '10px' }}>
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '20px' }} />
            </a>
            <a href="https://www.instagram.com/blac_therighttribe/?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" style={{ textDecoration: 'none', color: '#657ECF9F' }}>
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '20px' }} />
            </a>
          </div>
        </div>
        <style jsx>{`
          @media screen and (min-width: 768px) { /* Tablet and larger screens */
            footer {
              flex-direction: row;
            }
            div {
              flex: 1 1 auto;
              text-align: center;
              margin-bottom: 0;
            }
          }
        `}
        </style>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#424442', flex: '0 0 calc(33.33% - 20px)', margin: '10px', minWidth: '250px' }}>
            <h3>{item.itemName}</h3>
            <p style={{color:'white'}}><strong>Category:</strong> {item.categoryName}</p>
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

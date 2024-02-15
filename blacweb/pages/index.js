import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import the spinner icon
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { db } from '../utils/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from "../components/Navbar";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsRef = useRef(null); // Ref for the items section

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

      // Scroll to the items section
      itemsRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
  };

  const handleCategoryClick = async (categoryId, categoryName) => {
    await fetchItemsForCategory(categoryId, categoryName);
  };

  const handleBuyConfirmation = (item) => {
    const isConfirmed = window.confirm(`Do you want to buy ${item.itemName}?`);
    if (isConfirmed) {
      // Implement logic to redirect to email with item details
      const itemDetails = `Item: ${item.itemName}, Price: K${item.itemPrice}, Category: ${item.categoryName}`;
      const emailSubject = encodeURIComponent(`Purchase: ${item.itemName}`);
      const emailBody = encodeURIComponent(`I would like to purchase the following item:\n\n${itemDetails}`);
      window.location.href = `mailto:blactherighttribe@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    }
  };

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#92928E', }}>
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
        fontFamily: 'Arial, sans-serif',
      }}>
        {/* Header */}
        <div style={{ flex: '20%', textAlign: 'center', maxWidth: '40%' }}>
          <img src="images/a.jpeg" alt="Side Image 2" style={{ width: '100%', maxWidth: '250px', height: '100%', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div style={{ flex: '50%', textAlign: 'center', maxWidth: '40%', backgroundColor: '#3838385B', padding: '20px', borderRadius: '10px' }}>
          <h1 style={{ fontSize: '25px', margin: '0', marginBottom: '10px', fontWeight: 'bolder' }}>WELCOME TO BLAC!</h1>
          <h2 style={{ fontSize: '15px', margin: '0', marginBottom: '10px' }}>THE RIGHT TRIBE</h2>
        </div>
      </div>

      {/* Categories */}
      <div style={{
        marginTop: '40px',
        height: 'fit-content',
        backgroundImage: "url('/images/try2.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white'
      }}>
        <div style={{ backgroundColor: '#5461612D', padding: '20px' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            color: '#FFFFFFFD',
            backgroundColor: '#0000003B',
            padding: '20px',
          }}><b>C A T E G O R I E S</b></h2>
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '10px',
            borderRadius: '10px',
            justifyContent: 'center',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            flexWrap: 'wrap',
          }}>
            {categories.length === 0 ? ( // Display loading animation while categories are being fetched
              <div style={{ textAlign: 'center', width: '100%' }}>
                <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: 'white' }} /> {/* Display spinner icon while loading */}
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    margin: '5px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    flex: '0 0 150px',
                    maxWidth: '200px',
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
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>{category.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Category Page */}
      <div ref={itemsRef}>
        {selectedCategory && (
          <CategoryPage
            categoryName={selectedCategory.categoryName}
            items={selectedCategory.items}
            onBuyConfirmation={handleBuyConfirmation}
          />
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#424442', color: 'white', padding: '20px', textAlign: 'center', marginTop: '30px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 100%', marginBottom: '0px' }}>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '20px', marginTop: '-20px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'black' }}>B L A C !</h3>
          <p style={{ fontSize: '14px', marginBottom: '5px', color: 'black' }}><b>THE RIGHT TRIBE </b></p>
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', marginBottom: '10px', color: 'black' }}>For more information, contact us by pressing the button below:</h2>
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
      </footer>
    </div>
  );
};

const CategoryPage = ({ categoryName, items, onBuyConfirmation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    setLoadingItems(true);
    // Simulate fetching items for demonstration purposes
    setTimeout(() => {
      setLoadingItems(false);
    }, 2000); // Change 2000 to your desired loading duration in milliseconds
  }, []);

  return (
    <div style={{ marginTop: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>{categoryName}</h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {loadingItems ? (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: 'white' }} /> {/* Display spinner icon while loading */}
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                marginBottom: '20px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#424442',
                flex: '0 0 calc(33.33% - 20px)',
                margin: '10px',
                minWidth: '250px',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setSelectedItem(item)}
              onMouseLeave={() => setSelectedItem(null)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={item.itemImage} alt={item.itemName} style={{ width: '100%', height: 'auto', borderRadius: '5px', transition: 'transform 0.3s ease-in-out' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: selectedItem === item ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                  <h3 style={{ color: 'white', fontSize: '20px', margin: 0 }}>{item.itemName}</h3>
                  <p style={{ color: 'white', fontSize: '16px', margin: '5px 0' }}>Price: K{item.itemPrice}</p>
                  <button onClick={() => onBuyConfirmation(item)} style={{ fontSize: '16px', padding: '8px 16px', backgroundColor: 'white', color: 'black', border: 'none', cursor: 'pointer', borderRadius: '5px', marginTop: '10px', display: selectedItem === item ? 'block' : 'none' }}>Buy Now</button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <div>
                  <p style={{ color: 'white', fontSize: '14px', margin: '5px 0' }}><strong>D E S C R I P T I O N:</strong> {item.itemDescription}</p>
                  <p style={{ color: 'white', fontSize: '14px', margin: '5px 0' }}><strong>C A T E G R O R Y:</strong> {item.categoryName}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Index;

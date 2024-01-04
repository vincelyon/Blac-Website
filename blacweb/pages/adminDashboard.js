import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebaseconfig';
import { useRouter } from 'next/router';
import { FaPlus, FaMinus, FaPlusCircle, FaMinusCircle, FaEdit } from 'react-icons/fa'; // Import icons as needed
import withAuth from '../utils/withAuth';

const buttonStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '5px',
  display: 'flex',
  alignItems: 'center',
  width: '100px'
};

const sidebarStyle = {
  backgroundColor: '#333',
  color: '#fff',
  width: '200px',
  minHeight: '100vh',
  padding: '20px',
};

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleAddCategory = () => {
    router.push('/Addcategory');
  };

  const handleRemoveCategory = () => {
    router.push('/DeleteCategory');
  };

  const handleAddItem = () => {
    router.push('/Additem');
  };

  const handleRemoveItem = () => {
    router.push('/DeleteItem');
  };

  const handleEditCategory = () => {
    router.push('/EditCategory');
  };

  const handleEditItem = () => {
    router.push('/EditItem');
  };

  return (
    <div style={{ display: 'flex', backgroundColor:'#969494' }}>
      <div style={sidebarStyle}>
        <div>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' , marginLeft:'15%'}} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button style={buttonStyle} onClick={handleAddCategory}>
            <FaPlus style={{ marginRight: '5px' }} /> Add Category
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button style={buttonStyle} onClick={handleRemoveCategory}>
            <FaMinus style={{ marginRight: '5px' }} /> Remove Category
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button style={buttonStyle} onClick={handleAddItem}>
            <FaPlusCircle style={{ marginRight: '5px' }} /> Add Item
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button style={buttonStyle} onClick={handleRemoveItem}>
            <FaMinusCircle style={{ marginRight: '5px' }} /> Remove Item
          </button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button style={buttonStyle} onClick={handleEditCategory}>
            <FaEdit style={{ marginRight: '5px' }} /> Edit Category
          </button>
        </div>
        <div>
          <button style={buttonStyle} onClick={handleEditItem}>
            <FaEdit style={{ marginRight: '5px' }} /> Edit Item
          </button>
        </div>
      </div>
      <div style={{ padding: '20px'}}>
        <h2>Welcome to Admin Dashboard</h2>
        {user && (
          <button style={{ ...buttonStyle, backgroundColor: '#e74c3c' }} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard);

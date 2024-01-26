import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebaseconfig';
import { useRouter } from 'next/router';
import { FaPlus, FaMinus, FaPlusCircle, FaMinusCircle, FaEdit } from 'react-icons/fa';
import withAuth from '../utils/withAuth';

const buttonStyle = {
  backgroundColor: '#113146',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: '100px',
  marginLeft: '10%',
};

const sidebarStyle = {
  backgroundColor: '#21282E',
  color: '#fff',
  width: '200px',
  minHeight: '100vh',
  padding: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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

  const handleNavigation = (route) => {
    router.push(route);
  };

  const renderButton = (text, icon, onClick) => {
    return (
      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {icon} {text}
        </div>
        <button style={buttonStyle} onClick={onClick}>
          Go
        </button>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#969494' }}>
      <div style={sidebarStyle}>
        <div style={{ marginBottom: '20px' }}>
          {renderButton('Add Category', <FaPlus style={{ marginRight: '5px' }} />, () => handleNavigation('/Addcategory'))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          {renderButton('Remove Category', <FaMinus style={{ marginRight: '5px' }} />, () => handleNavigation('/DeleteCategory'))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          {renderButton('Add Item', <FaPlusCircle style={{ marginRight: '5px' }} />, () => handleNavigation('/Additem'))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          {renderButton('Remove Item', <FaMinusCircle style={{ marginRight: '5px' }} />, () => handleNavigation('/DeleteItem'))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          {renderButton('Edit Category', <FaEdit style={{ marginRight: '5px' }} />, () => handleNavigation('/EditCategory'))}
        </div>
        <div>
          {renderButton('Edit Item', <FaEdit style={{ marginRight: '5px' }} />, () => handleNavigation('/EditItem'))}
        </div>
      </div>
      <div style={{ padding: '20px' }}>
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

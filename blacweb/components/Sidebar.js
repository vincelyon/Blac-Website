import React from 'react';
import { FaPlus, FaMinus, FaPlusCircle, FaMinusCircle, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';

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
  marginBottom: '20px',
  marginLeft: '10%',
};

const cardStyle = {
  backgroundColor: '#fff',
  color: '#000',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const Sidebar = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
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
    <div style={{ ...cardStyle, width: '200px', padding: '20px',  backgroundColor:'#113146'}}>
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
      <button style={{ ...buttonStyle, backgroundColor: '#e74c3c' }} onClick={handleLogout}>
            Logout
      </button>
    </div>
  );
};

export default Sidebar;

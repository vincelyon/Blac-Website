import React from 'react';
import { FaPlus, FaMinus, FaPlusCircle, FaMinusCircle, FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const navbarStyle = {
  backgroundColor: '#113146',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
};

const AdminNavbar = () => {
  return (
    <div style={navbarStyle}>
      <NavLink to="/add-category" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaPlus style={{ marginRight: '5px' }} /> Add Category
      </NavLink>
      <NavLink to="/remove-category" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaMinus style={{ marginRight: '5px' }} /> Remove Category
      </NavLink>
      <NavLink to="/add-item" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaPlusCircle style={{ marginRight: '5px' }} /> Add Item
      </NavLink>
      <NavLink to="/remove-item" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaMinusCircle style={{ marginRight: '5px' }} /> Remove Item
      </NavLink>
      <NavLink to="/edit-category" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaEdit style={{ marginRight: '5px' }} /> Edit Category
      </NavLink>
      <NavLink to="/edit-item" style={{ textDecoration: 'none', color: '#fff' }}>
        <FaEdit style={{ marginRight: '5px' }} /> Edit Item
      </NavLink>
    </div>
  );
};

export default AdminNavbar;

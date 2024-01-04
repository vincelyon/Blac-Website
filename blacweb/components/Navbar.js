import React, { useState, useEffect, useRef } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const listItemStyle = {
    marginBottom: '10px',
    padding: '8px 20px',
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  };

  const listItemHoverStyle = {
    ...listItemStyle,
    backgroundColor: '#2C3E50',
    transform: 'scale(1.05)',
  };

  return (
    <div style={{ position: 'relative' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#92928E', padding: '10px 20px', color: '#fff', height: '50px' }}>
        <div>
          <img src="images/icon.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', outline: 'none', display: 'block', marginLeft: 'auto' }}
            onClick={handleMenuToggle}
          >
            <FontAwesomeIcon icon={faBars} style={{ color: '#fff', fontSize: '24px' }} />
          </button>
          {showMenu && (
            <ul
              ref={menuRef}
              style={{
                listStyle: 'none',
                backgroundColor: '#92928E',
                padding: '0',
                margin: '0',
                width: '200px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: '0',
                opacity: showMenu ? '1' : '0',
                transformOrigin: 'top right',
                transform: `scaleY(${showMenu ? '1' : '0'})`,
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                zIndex: 1000,
                visibility: showMenu ? 'visible' : 'hidden',
              }}
            >
              <li style={listItemStyle}>
                <Link href="/" passHref>
                  <span style={{ ...listItemStyle, textDecoration: 'none' }}>Home</span>
                </Link>
              </li>
              <li style={listItemStyle}>
                <Link href="/about" passHref>
                  <span style={{ ...listItemStyle, textDecoration: 'none' }}>About Us</span>
                </Link>
              </li>
              <li style={listItemStyle}>
                <Link href="/contact" passHref>
                  <span style={{ ...listItemStyle, textDecoration: 'none' }}>Contact Us</span>
                </Link>
              </li>
              <li style={listItemStyle}>
                <Link href="/login" passHref>
                  <span style={{ ...listItemStyle, textDecoration: 'none' }}>Login</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

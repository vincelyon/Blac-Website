// pages/contact.js

import Navbar from '../components/Navbar';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Response from the server
        // You can perform additional actions based on the response here
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenarios here
    }
  };

  const contactContainerStyle = {
    margin: '0 auto',
    padding: '20px',
    backgroundImage: 'url("images/yeyeye.jpg")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    opacity: 0.9,
  };

  const formStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    color:'black'
  };

  return (
    <div>
        <Navbar/>
    <div style={contactContainerStyle}>
      <h1>Contact Us</h1>
      <div>
        <h2>THE RIGHT TRIB</h2>
        <p>Company Name: Blac!</p>
        <p>Email: blactherighttribe@gmail.com</p>
        <p>Phone: +260975479622</p>
        {/* Add more contact information as needed */}
      </div>

      <div style={formStyle}>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contact;

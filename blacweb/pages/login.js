// pages/login.js
import React, { useState } from 'react';
import firebase from '../utils/firebaseconfig';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(); // Initialize authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
      console.log('Logged in:', userCredential.user);
      // Redirect to admin dashboard
      router.push('/adminDashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
       <Navbar/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
     
      <div style={{ width: '300px', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
        <img
          src="images/icon.png" // Replace with your logo URL or path
          alt="Logo"
          style={{ width: '100px', height: '100px', margin: '0 auto', marginBottom: '-10px' }}
        />
        <h2>Login Page</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form style={{ marginTop: '20px' }} onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: '8px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
          /><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '8px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
          /><br />
          <button
            type="submit"
            style={{ padding: '8px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;

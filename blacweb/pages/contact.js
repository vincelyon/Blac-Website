import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import { images } from '@/next.config';

const ContactUsPage = () => {
  // Define sharedContainer separately
  const sharedContainer = {
    width: '100%',
    marginBottom: '20px',
    maxWidth: '600px',  
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.innerContainer}>
        <div style={styles.infoAndFormContainer}>
          <div style={{ ...sharedContainer, ...styles.contactInfoContainer }}>
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', backgroundImage: `url('./images/contactme.jpg')`, backgroundSize:'cover',}}>
              <div style={{backgroundColor:'#FFFFFF44', borderRadius:'10px', padding:'20px'}}>
              <h2 style={{ color: 'Black', fontSize: '24px', textAlign: 'center', marginBottom: '30px'}}>OUR DETAILS</h2>
              <div style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6' }}>
                <FontAwesomeIcon icon={faMapMarker} style={{ fontSize: '20px', marginRight: '10px' }} />
                <span>156 Broadway road,Ndola<br />Copperbelt, Zambia</span>
              </div>
              <div style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6' }}>
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: '20px', marginRight: '10px' }} />
                <span><a href="tel:0975479622" style={{ color: '#333' }}>+260 (975) 479-622</a></span>
              </div>
              <div style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.6' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '20px', marginRight: '10px' }} />
                <span><a href="mailto:Blactherighttribe@gmail.com" style={{ color: '#333' }}>Blactherighttribe@gmail.com</a></span>
              </div>
            </div>
            </div>
          </div>
          <div style={{ ...sharedContainer, ...styles.formContainer }}>
            <div style={styles.formWrapper}>
              <h1 style={{ color: '#fff' }}>BLAC!! <br/> The Right Tribe</h1>
              <p style={{ color: '#fff' }}>If you have any questions or inquiries, feel free to reach out to us!</p>
              <form style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Name:</label>
                  <input type="text" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email:</label>
                  <input type="email" style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message:</label>
                  <textarea rows="4" style={styles.input}></textarea>
                </div>
                <button type="submit" style={styles.submitButton}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#464746',
    textAlign: 'center',
    paddingBottom: '50px',
  },
  innerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',

  },
  imageContainer: {
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  infoAndFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  contactInfoContainer: {},
  formContainer: {},
  formWrapper: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#000000',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff', // Changed label color to white
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  '@media (min-width: 768px)': {
    sharedContainer: {
      width: '20%',
    },
  },
};

export default ContactUsPage;

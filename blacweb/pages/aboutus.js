import React from 'react';
import Navbar from '@/components/Navbar'; // Assuming this component exists

const AboutUsPage = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.innerContainer}>
        <div style={styles.aboutContainer}>
          <h1>ABOUT US</h1>
          <p>
            It all begins with an idea. Tired of seeing the same clothing that didn’t fit well, we decided to change things. We make sure we supply our customers with quality and affordable fits for both male and female.
          </p>

        </div>
        <div style={styles.imageContainer}>
          <img src="/images/a.jpeg" alt="Image 1" style={styles.image} />
          <img src="/images/e.jpeg" alt="Image 2" style={styles.image} />
          <img src="/images/c.jpeg" alt="Image 3" style={styles.image} />
          <img src="/images/d.jpeg" alt="Image 4" style={styles.image} />
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
  aboutContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    color: '#fff',
    textAlign: 'left',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#000000',
    marginBottom:'30px',
    fontFamily: 'Arial, sans-serif',
  },
  imageContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    maxWidth: '270px', // Adjust the maximum width as needed
    marginBottom: '20px',
    borderRadius: '5px',
    height:'350px'
  },
};

export default AboutUsPage;

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
  
      // For demonstration purposes, log the received form data
      console.log('Received form data:');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);
  
      // Simulate sending email by logging a success message
      console.log('Simulating email sending... Email sent successfully.');
  
      // Send a response back to the client
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  
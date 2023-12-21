// Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAITjBnmNzakwA4ihymPCog1oLamEO0_RA",
      authDomain: "blac-69a47.firebaseapp.com",
      projectId: "blac-69a47",
      storageBucket: "blac-69a47.appspot.com",
      messagingSenderId: "386156923266",
      appId: "1:386156923266:web:e37851a5bbc21e5b35279b"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function addUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // User creation successful
      alert(`User created with Email: ${email}`);
      // You can access the created user data
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      // Handle errors during user creation
      alert(`Error creating user: ${error.message}`);
    }
  } else {
    alert('Please enter email and password.');
  }
}

// Functions to display different content based on sidebar clicks
function showCreateUsers() {
  document.getElementById('content').innerHTML = `
    <h1>Create Users</h1>
    <div id="createUserForm">
      <form id="userForm">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>
        <input type="button" value="Create User" onclick="addUser()">
      </form>
    </div>
  `;
}

function showViewUsers() {
  document.getElementById('content').innerHTML = `
    <h1>View Users</h1>
    <p>This section displays existing users.</p>
    <!-- Add table or content to view users -->
  `;
}

function showReviewProducts() {
  document.getElementById('content').innerHTML = `
    <h1>Review Products</h1>
    <p>This section allows you to review products.</p>
    <!-- Add product review interface or content -->
  `;
}

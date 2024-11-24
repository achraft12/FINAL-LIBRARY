<template>
  <div class="login">
    <div class="background-overlay"></div>
    <div class="form-container">
      <h2>Welcome Back</h2>
      <form @submit.prevent="loginUser">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter your email" required />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
        <p class="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
  try {
    console.log('Attempting to log in with email:', this.email, 'password:', this.password);

    const response = await fetch('https://final-librarybackend.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    console.log('Server response status:', response.status);

    let data;
    try {
      data = await response.json();
      console.log('Server response data:', data);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      alert('Server returned invalid data. Please try again.');
      return;
    }

    if (response.ok) {
      // Save token and user information
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', this.email);
      localStorage.setItem('userinfo', JSON.stringify(data.user));
      localStorage.setItem('usertype', data.user.membershipType);
      localStorage.setItem('userLoggedIn', 'true');

      // Alert and redirect
      alert('Login successful');
      this.$router.push("/BookPage").then(() => {
        window.location.reload(); // This will reload the page after the router push
      });
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred while logging in. Please try again later.');
  }
}

  },

};


</script>


<style scoped>
/* Reset */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Poppins', sans-serif;
}

/* Parent container */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/253371.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  z-index: 1;
}

/* Form container */
.form-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  /* Ensures a responsive width */
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

label {
  align-self: flex-start;
  font-size: 1rem;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.8);
}

input {
  width: 94%;
  /* Full width inside form container */
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, background-color 0.3s ease;
}

input:focus {
  border: 1px solid #007bff;
  background: rgba(255, 255, 255, 0.3);
}

button {
  width: 100%;
  /* Full width inside form container */
  padding: 14px;
  background: #007bff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

button:active {
  background-color: #003f7f;
  transform: translateY(0);
}

/* Signup link styling */
.signup-link {
  margin-top: 15px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
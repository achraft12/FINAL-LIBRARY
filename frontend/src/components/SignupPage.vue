<template>
  <div class="signup-page">
    <div class="signup">
      <div class="background-overlay"></div>
      <div class="form-container">
        <h2>Sign Up</h2>
        <form @submit.prevent="signupUser">
          <label for="memberName">Member Name:</label>
          <input type="text" v-model="memberName" required placeholder="Enter your name" />

          <label for="email">Email:</label>
          <input type="email" v-model="email" required placeholder="Enter your email" />

          <label for="password">Password:</label>
          <input type="password" v-model="password" required placeholder="Enter your password" />

          <label for="contactInfo">Contact Info:</label>
          <input type="text" v-model="contactInfo" required placeholder="Enter contact details" />

          <label for="type">Role:</label>
          <select v-model="type" id="type">
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
            <option value="regular">Regular</option>
          </select>

          <h5>Selected role: {{ type }}</h5>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      type: '',
      memberName: '',
      contactInfo: '',
      expiryDate: ''
    };
  },
  methods: {
    async signupUser() {
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            memberName: this.memberName,
            contactInfo: this.contactInfo,
            membershipType: this.type,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Signup successful');
          this.$router.push('/login');
        } else {
          alert('Signup failed: ' + data.message);
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    },
  },
};
</script>
<style scoped>
/* General Reset */
.signup-page {
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background: #f0f0f0;
}

/* Signup Page */
.signup-page .signup {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/253371.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}

.signup-page .background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  z-index: 1;
}

.signup-page .form-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #fff;
}

.signup-page h2 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

.signup-page form {
  display: flex;
  flex-direction: column;
}

.signup-page label {
  margin-bottom: 5px;
  font-size: 1rem;
}

.signup-page input, .signup-page select {
  width: 94%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s, background 0.3s;
}

.signup-page select {
  color: #000;
}

.signup-page input:focus, .signup-page select:focus {
  border-color: #007bff;
  background: rgba(255, 255, 255, 0.3);
}

.signup-page button {
  padding: 12px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.signup-page button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

.signup-page button:active {
  background-color: #003f7f;
  transform: translateY(0);
}

.signup-page h5 {
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
  color: #e0e0e0;
}
</style>

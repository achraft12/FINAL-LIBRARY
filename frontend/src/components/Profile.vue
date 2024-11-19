<template>
  <div class="profile">
    <h1>User Profile</h1>

    <!-- Display User Information -->
    <div class="user-info" v-if="userinfo">
      <div class="info-item">
        <i class="fas fa-envelope"></i>
        <p><strong>Email:</strong> {{ userEmail }}</p>
      </div>
      <div class="info-item">
        <i class="fas fa-user"></i>
        <p><strong>Member Name:</strong> {{ userinfo.memberName }}</p>
      </div>
      <div class="info-item">
        <i class="fas fa-phone"></i>
        <p><strong>Contact Info:</strong> {{ userinfo.contactInfo }}</p>
      </div>
      <div class="info-item">
        <i class="fas fa-id-card"></i>
        <p><strong>Membership Type:</strong> {{ userinfo.membershipType }}</p>
      </div>
      <div class="info-item">
        <i class="fas fa-id-badge"></i>
        <p><strong>Member ID:</strong> {{ userinfo.memberID }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading-state" v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

  
<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userEmail: localStorage.getItem('email'),
      userinfo: null, // Initialize as null, will be populated later
    };
  },
  created() {
    const storedUserinfo = localStorage.getItem('userinfo');
if (storedUserinfo) {
  try {
    this.userinfo = JSON.parse(storedUserinfo); // Safely parse JSON
  } catch (error) {
    console.error("Error parsing userinfo from localStorage:", error);
    this.userinfo = {}; // Fallback to empty object or handle as needed
  }
}

  },
};
</script>
  <style scoped>
  /* General Profile Container */
  .profile {
    padding: 30px;
    width: 90%;
    max-width: 600px;
    background: linear-gradient(145deg, #ffffff, #f1f1f1);
    margin: 40px auto;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
  
  /* Title Styling */
  h1 {
    text-align: center;
    color: #4a4a4a;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  /* User Info Section */
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: #555;
  }
  
  /* Individual Info Items */
  .info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease-in-out;
  }
  
  .info-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Icons for Info */
  .info-item i {
    font-size: 1.5rem;
    color: #4caf50;
  }
  
  .info-item p {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }
  
  /* Loading State */
  .loading-state {
    text-align: center;
    font-size: 1.2rem;
    color: #777;
  }
  </style>
  
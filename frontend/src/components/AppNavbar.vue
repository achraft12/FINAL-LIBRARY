<template>
  <div class="navbar-container">
    <nav>
      <div class="logo">
        <router-link to="/">
          <img src="../assets/library_logo_4k_without_background-removebg-preview.png" alt="Library Logo">
        </router-link>
      </div>
      <ul class="navbar">
        <li><router-link to="/BookPage">Books</router-link></li>

        <!-- User-specific links -->
        <template v-if="isLoggedIn()">
          <li><router-link to="/profile">{{ userUsername }}</router-link></li>
          <li><router-link to="/borrowedbooks">Borrowed Books</router-link></li>
          <li><router-link to="/EventManagement">events</router-link></li>
          <li><button @click="signOut">Sign Out</button></li>

          <!-- Notifications -->
          <li class="notification">
            <span @click="toggleNotifications" class="notification-bell">🔔</span>
            <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
            <div v-if="showNotifications" class="notification-dropdown">
              <p v-if="notifications.length === 0">No new notifications</p>
              <p v-for="notification in notifications" :key="notification.id">
                {{ notification.message }}
                <button @click="markAsRead(notification.id)">Mark as read</button>
              </p>
            </div>
          </li>
        </template>
        <template v-else>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </template>

        <!-- Search bar -->
        <li class="search-container">
          <input type="text" v-model="searchQuery" @input="onSearch" placeholder="Search for books..."
            class="search-bar" />
          <i class="search-icon">🔍</i>
        </li>
      </ul>
    </nav>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  name: 'AppNavbar',
  data() {
    return {
      searchQuery: '',
      searchTimeout: null,
      notifications: [],      // Store notifications here
      showNotifications: false,
      userinfo: null, // // Toggle for dropdown visibility
    };
  },
  computed: {
    userUsername() {
      return localStorage.getItem('email'); // Get username from localStorage
    },
    unreadCount() {
      return this.notifications.filter(notification => notification.status === 'unread').length;
    }
  },
  methods: {
    isLoggedIn() {
      return !!localStorage.getItem('token'); // Check if token exists
    },
    signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userinfo');
      alert('Logged out successfully');
      this.$router.push("/login").then(() => {
        window.location.reload(); // This will reload the page after the router push
      });
    },
    onSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.$emit('search', this.searchQuery);
      }, 300);
    },


    async fetchNotifications() {
      if (!this.userinfo || !this.userinfo.memberID) {
        console.error("MemberID is not available.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/notifications', {
          params: { memberID: this.userinfo.memberID } // Pass memberID as a query parameter
        });
        this.notifications = response.data;
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }


    ,
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },




    async markAsRead(notificationId) {
      // Mark notification as read in the backend
      await fetch(`/notifications/${notificationId}`, { method: 'PATCH' });
      // Update the notification's status locally
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) notification.status = 'read';
    }
  },
  mounted() {
    const storedUserinfo = localStorage.getItem('userinfo');
    console.log("here is the stored" + storedUserinfo)
    if (storedUserinfo) {
      try {
        this.userinfo = JSON.parse(storedUserinfo); // Safely parse userinfo
        if (this.userinfo.memberID) {
          this.fetchNotifications(); // Fetch notifications if memberID exists
        } else {
          console.error("MemberID is missing in userinfo.");
        }
      } catch (error) {
        console.error("Error parsing userinfo from localStorage:", error);
      }
    } else {
      console.error("No userinfo found in localStorage.");
    }
  }

};
</script>

<style scoped>
.navbar-container {
  width: 100%;
  background: linear-gradient(135deg, #1e1e2f, #3b3b58);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  max-width: 1200px;
  margin: auto;
}

.logo img {
  width: 50px;
  height: 50px;
}

.navbar {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.navbar li {
  position: relative;
}

.navbar a {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.navbar a:hover {
  color: #ff9800;
}

button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.notification {
  position: relative;
  cursor: pointer;
}

.notification-bell {
  font-size: 1.4rem;
  color: white;
}

.badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: #e74c3c;
  color: white;
  font-size: 0.75rem;
  padding: 3px 6px;
  border-radius: 50%;
}

.notification-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  background: #fff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  width: 250px;
  z-index: 100;
}

.search-container {
  position: relative;
  margin-left: auto;
  /* Push the search bar to the right */
}

.search-bar {
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  width: 220px;
}

.search-bar::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.search-bar:focus {
  border-color: #ff9800;
  background: rgba(255, 255, 255, 0.25);
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive Design */
@media (max-width: 1024px) {
  nav {
    padding: 10px;
  }

  .navbar {
    gap: 15px;
  }

  .search-bar {
    width: 180px;
  }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
  }

  .logo {
    margin-bottom: 10px;
  }

  .navbar {
    flex-direction: column;
    gap: 10px;
  }

  .search-container {
    width: 100%;
    margin: 10px 0;
  }

  .search-bar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .navbar {
    font-size: 0.9rem;
    gap: 8px;
  }

  .notification-bell {
    font-size: 1.2rem;
  }

  .search-bar {
    font-size: 0.85rem;
  }
}
</style>

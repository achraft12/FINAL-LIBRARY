<template>
  <div id="app">
    <AppNavbar @search="handleSearch" />

    <!-- Display the introduction only on the homepage -->
    <div v-if="isHomePage">
      <div class="intro-section">
        <h2>Welcome to the Library System</h2>
        <p>Explore our vast collection of books or search for your favorite titles!</p>
        <div class="images">
          <div class="introduction">
            <p>
              <span class="span">Online Library</span> <br>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde porro placeat odit explicabo quam vero
              debitis cum sint accusantium molestias! Recusandae necessitatibus quaerat accusantium maiores similique
              sunt deleniti vitae quae!
            </p>
            <button class="b" @click="LoginPage()" aria-label="Login Page" title="Go to Login Page">
              Login
            </button>
          </div>
          <img src="./assets/clay-banks-GX8KBbVmC6c-unsplash.jpg" alt="Library" class="intro-image" />
        </div>
      </div>
    </div>

    <!-- Display search results or search prompt -->
    <router-view :search-query="searchQuery" />

    <footer class="footer">
  <div class="footer-content">
    <div class="about-us">
      <h3>About Us</h3>
      <p>
        Welcome to our online library! Dive into a world of knowledge and discovery with our curated collection of books and resources.
      </p>
    </div>
    <div class="social-media">
      <h3>Follow Us</h3>
      <div class="icons">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="icon facebook">
          <i class="fab fa-facebook-square"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="icon instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="icon twitter">
          <i class="fab fa-twitter-square"></i>
        </a>
      </div>
    </div>
    <div class="team">
      <h3>Our Team</h3>
      <ul>
        <li>Achraf Taki</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Library System. All rights reserved.</p>
  </div>
</footer>


  </div>
</template>


<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query; // Update searchQuery with the value from AppNavbar
    },
    LoginPage() {
      this.$router.push("/login")
    }
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}


#app {
  text-align: center;
  height: 100vh;
  width: 100%;
 
}

.intro-section {
  margin: 20px auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.b {
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 6px;
  background-color: #5555558b;
  color: white;
  padding: auto;
  cursor: pointer;
}

.b:hover {
  scale: 1.1;
}


.intro-section h2 {
  font-size: 36px;
  color: #2C3E50;
  margin-bottom: 20px;
  border-bottom: 3px solid #2C3E50;
  display: inline-block;
  padding-bottom: 5px;
}


.intro-section p {
  font-size: 18px;
  color: #34495E;
  margin-bottom: 30px;

}

.images {
  display: flex;
  align-items: center;
  /* Align items vertically */
  justify-content: space-between;
  /* Space between text and image */
  gap: 30px;
  /* Add spacing between elements */
  margin-top: 30px;
}

.introduction {
  flex: 1;
  /* Allow the text to take up available space */
  text-align: left;
  /* Align text to the left */
  margin-top: 0;
  font-size: 16px;
  line-height: 2;
  color: #555;
}

.span {
  font-weight: bold;
  font-size: 20px;
  color: #2C3E50;
}

.intro-image {
  flex-shrink: 0;
  width: 300px;
  height: auto;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .images {
    flex-direction: column;
    /* Stack text and image vertically */
    align-items: center;
    gap: 20px;
  }

  .intro-image {
    width: 100%;
    /* Let the image scale to fit the container */
    max-width: 400px;
  }

  .introduction {
    text-align: center;
    /* Center-align the text for smaller screens */
  }
}


.footer {
  background: linear-gradient(135deg, #2C3E50, #34495E);
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}

.footer-content h3 {
  font-size: 24px;
  margin-bottom: 15px;
  border-bottom: 2px solid #e67e22;
  display: inline-block;
  padding-bottom: 5px;
}

.footer-content p,
.footer-content ul {
  font-size: 16px;
  line-height: 1.8;
  max-width: 400px;
  margin: 0 auto;
  color: #ecf0f1;
}

.footer-content ul {
  list-style: none;
  padding: 0;
}

.footer-content ul li {
  margin: 5px 0;
}

.team ul li {
  font-size: 16px;
  color: #bdc3c7;
}

/* Social Media */
.social-media .icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.social-media a {
  font-size: 32px;
  color: #ffffff;
  transition: transform 0.3s, color 0.3s;
}

.social-media a.facebook:hover {
  color: #4267B2;
  transform: scale(1.2);
}

.social-media a.instagram:hover {
  color: #C13584;
  transform: scale(1.2);
}

.social-media a.twitter:hover {
  color: #1DA1F2;
  transform: scale(1.2);
}

/* Footer Bottom */
.footer-bottom {
  margin-top: 30px;
  border-top: 1px solid #7f8c8d;
  padding-top: 20px;
}

.footer-bottom p {
  font-size: 14px;
  color: #bdc3c7;
  margin: 0;
}

/* Responsive Footer */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .social-media .icons {
    gap: 20px;
  }

  .team ul {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-content h3 {
    font-size: 20px;
  }

  .footer-content p,
  .footer-content ul li {
    font-size: 14px;
  }

  .social-media a {
    font-size: 28px;
  }
}


</style>

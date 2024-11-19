<template>
  <div>
    <div class="main">
      <ul class="ulbooks">
        <li class="listbooks" v-for="book in filteredBooks" :key="book.BOOK_ID">
          <div class="book-card" @click="goToBookDetails(book.bookID)">
            <img :src="book.imagepath" alt="Book Image" class="book-image" />
            <div class="book-info">
              <h3>{{ book.title }}</h3>
              <p class="author">Author: <strong>{{ book.author }}</strong></p>
              <p class="book-id">Book ID: <span>{{ book.bookID }}</span></p>
              <p class="book-id">
                Return Date:
                <span>{{ formatExpirationDate(book.expirationDate) }}</span>
              </p>

            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // eslint-disable-next-line
  name: 'borrowedbooks',
  props: ['searchQuery'],
  data() {
    return {
      books: [],
      filteredBooks: [],
      userinfo: null
    };
  },
  watch: {
    searchQuery(newQuery) {
      this.handleSearch(newQuery); // Trigger search when searchQuery updates
    },
  },
  created() {
    // Retrieve userinfo from localStorage
    const storedUserinfo = localStorage.getItem('userinfo');
    if (storedUserinfo) {
      try {
        this.userinfo = JSON.parse(storedUserinfo); // Safely parse JSON
        if (this.userinfo && this.userinfo.memberID) {
          const memberID = this.userinfo.memberID;  // Use memberID once it's available
          // Fetch borrowed books after userinfo is loaded
          axios.post('http://localhost:3000/borrowedbooks', { memberID })
            .then(response => {
              this.books = response.data;
              this.filteredBooks = [...this.books];  // Initialize filteredBooks
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        }
      } catch (error) {
        console.error("Error parsing userinfo from localStorage:", error);
        this.userinfo = {}; // Fallback to empty object or handle as needed
      }
    }
  },
  methods: {
    handleSearch(query) {
      if (query) {
        // Filter books based on the query
        this.filteredBooks = this.books.filter(book =>
          (book.title && book.title.toLowerCase().includes(query.toLowerCase())) ||
          (book.author && book.author.toLowerCase().includes(query.toLowerCase()))
        );
      } else {
        // Reset to all books if query is empty
        this.filteredBooks = this.books;
      }
    },
    goToBookDetails(bookID) {
      this.$router.push({ name: 'BookDetails', params: { id: bookID } });
    },
    formatExpirationDate(date) {
      if (!date) return 'No return date available';
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return formattedDate;
    },

  },
};
</script>

\

<style scoped>
/* General Container */
.main {
  width: 90%;
  max-width: 1200px;
  margin: 60px auto;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Book List */
.ulbooks {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Individual Book Cards */
.book-card {
  width: 220px;
  height: 360px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* Book Image */
.book-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

/* Book Info */
.book-info {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  text-align: center;
  color: #333;
}

.book-info h3 {
  font-size: 18px;
  font-weight: bold;
  color: #4a4a4a;
  margin: 0;
}

.book-info .author {
  font-size: 14px;
  color: #777;
}

.book-info .book-id {
  font-size: 13px;
  color: #999;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .book-card {
    width: 180px;
    height: 320px;
  }

  .book-info h3 {
    font-size: 16px;
  }

  .book-info .author,
  .book-info .book-id {
    font-size: 12px;
  }
}
</style>
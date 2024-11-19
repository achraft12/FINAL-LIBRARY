<template>
  <div class="book-details">
    <div class="book-header">
      <img :src="book.imagepath" alt="Book Image" class="book-image" />
      <div class="book-info">
        <h1 class="book-title">{{ book.title }}</h1>
        <p class="book-author"><strong>Author:</strong> {{ book.author }}</p>
        <p class="book-id"><strong>Book ID:</strong> {{ book.bookID }}</p>
      </div>
    </div>

    <div class="book-actions">
      <button v-if="book.isAvailable" class="reserve-button" @click="reserveBook">
        Reserve Book
      </button>
      <p v-else class="unavailable-msg">This book is currently unavailable.</p>
      <button v-if="membertype === 'faculty'" class="delete-button" @click="deleteBook">
        Delete Book
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookDetails",
  data() {
    return {
      book: {},
      memberId: null,
      membertype: null
    };
  },
  created() {
    const bookId = this.$route.params.id;
    axios
      .get(`http://localhost:3000/books/${bookId}`)
      .then((response) => {
        this.book = response.data;
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });

    const storedUserinfo = localStorage.getItem("userinfo");
    if (storedUserinfo) {
      try {
        const userinfo = JSON.parse(storedUserinfo);
        this.memberId = userinfo.memberID;
        this.membertype = userinfo.membershipType
        console.log(userinfo.membershipType)
        console.log(this.membertype)
        this.membertype = userinfo.membershipType.trim().toLowerCase();

      } catch (error) {
        console.error("Error parsing userinfo from localStorage:", error);
      }
    }
  },
  methods: {
    reserveBook() {
      const bookId = this.book.bookID;
      const reservationDate = new Date().toISOString().split("T")[0];
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      const formattedExpirationDate = expirationDate
        .toISOString()
        .split("T")[0];

      axios
        .post("http://localhost:3000/reservations", {
          reservationType: "book",
          memberID: this.memberId,
          bookID: bookId,
          reservationDate: reservationDate,
          expirationDate: formattedExpirationDate,
        })
        .then((response) => {
          console.log("Reservation successful:", response.data);
          alert("Book reserved successfully!");
        })
        .catch((error) => {
          console.error("Error making reservation:", error);
        });
    },
    deleteBook() {
      const bookId = this.book.bookID;
      axios
        .delete(`http://localhost:3000/books/${bookId}`)
        .then((response) => {
          console.log("Book deleted successfully:", response.data);
          alert("Book deleted successfully!");

          // Redirect to the BookPage and reload the page after redirection
          this.$router.push("/BookPage").then(() => {
            window.location.reload(); // Reload the page after redirection
          });
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          alert("Error deleting the book. Please try again.");
        });

    },
  },
};
</script>

<style scoped>
.book-details {
  max-width: 900px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.book-header {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  border-bottom: 2px solid #e6e6e6;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.book-image {
  width: 250px;
  height: 350px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.book-info {
  flex: 1;
  padding: 15px;
}

.book-title {
  font-size: 2.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.book-author,
.book-id {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 12px;
}

.book-actions {
  text-align: center;
  margin-top: 20px;
}

.reserve-button,
.delete-button {
  padding: 12px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease;
}

.reserve-button {
  background-color: #3498db;
  color: white;
}

.reserve-button:hover {
  background-color: #2980b9;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  margin-top: 15px;
  margin-left: 10px;
}

.delete-button:hover {
  background-color: #c0392b;
}

.unavailable-msg {
  font-size: 1.2rem;
  color: #e74c3c;
  font-weight: bold;
}

@media (max-width: 768px) {
  .book-header {
    flex-direction: column;
    align-items: center;
  }

  .book-image {
    width: 200px;
    height: 280px;
  }

  .book-title {
    font-size: 1.8rem;
  }

  .book-info {
    text-align: center;
  }
}
</style>
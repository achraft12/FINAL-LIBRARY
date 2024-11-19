<template>
  <div class="admin-add-book">
    <h2>Add a New Book</h2>
    <form @submit.prevent="submitBook">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="book.title" type="text" id="title" required />
      </div>

      <div class="form-group">
        <label for="author">Author:</label>
        <input v-model="book.author" type="text" id="author" required />
      </div>

      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input v-model="book.isbn" type="text" id="isbn" required />
      </div>

      <div class="form-group">
        <label for="publishYear">Publish Year:</label>
        <input v-model="book.publishYear" type="number" id="publishYear" required />
      </div>

      <div class="form-group">
        <label for="shelfLocation">Shelf Location:</label>
        <input v-model="book.shelfLocation" type="text" id="shelfLocation" />
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select v-model="book.categoryID" id="category" required>
          <option v-for="category in categories" :value="category.categoryID" :key="category.categoryID">
            {{ category.categoryName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="imagepath">Image Path:</label>
        <input v-model="book.imagepath" type="text" id="imagepath" />
      </div>

      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminAddBook',
  data() {
    return {
      book: {
        title: '',
        author: '',
        isbn: '',
        publishYear: null,
        shelfLocation: '',
        categoryID: null,
        imagepath: '',
      },
      categories: [],
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:3000/categories')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    submitBook() {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:3000/admin/add-book', this.book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert('Book added successfully!');
        this.$router.push('/admin');
      })
      .catch(error => {
        console.error('Error adding book:', error);
        if (error.response && error.response.status === 403) {
          alert('You do not have permission to perform this action.');
        }
      });
    }
  },
};
</script>

<style scoped>
.admin-add-book {
  max-width: 600px;
  margin: auto;
  padding: 30px;
  background-color: #f4f4f9; /* Solid background color matching the other pages */
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

button {
  margin-top: 20px;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button:active {
  background-color: #004085;
  transform: translateY(0);
}
</style>

<template>
  <div class="event-management-container">
    <h1 class="title">Event Management</h1>

    <!-- List of Events -->
    <div class="events-list">
      <h2 class="section-title">Upcoming Events</h2>
      <div class="event-cards">
        <div class="event-card" v-for="event in filteredEvents" :key="event.id">
          <h3 class="event-name">{{ event.eventName }}</h3>
          <p class="event-date-location">{{ formatEventDate(event.eventDate) }} - {{ event.location }}</p>
          <p class="event-description">{{ event.description }}</p>
          <div v-if="isFaculty() === 'Faculty'" class="event-actions">
            <button class="edit-btn" @click="editEvent(event.eventID)">Edit</button>
            <button class="delete-btn" @click="deleteEvent(event.eventID)">Delete</button>
          </div>
        </div>
      </div>

    </div>

    <!-- Add New Event Form -->
    <div class="add-event-form" v-if="isFaculty() === 'Faculty'">
      <h2 class="section-title">Add New Event</h2>
      <form @submit.prevent="addEvent" class="form">
        <label for="name">Event Name:</label>
        <input v-model="newEvent.name" type="text" id="name" required class="input-field"
          placeholder="Enter event name" />

        <label for="date">Event Date:</label>
        <input v-model="newEvent.date" type="date" id="date" required class="input-field" />

        <label for="location">Location:</label>
        <input v-model="newEvent.location" type="text" id="location" required class="input-field"
          placeholder="Enter event location" />

        <label for="description">Description:</label>
        <textarea v-model="newEvent.description" id="description" class="textarea-field"
          placeholder="Enter event description"></textarea>

        <button type="submit" class="submit-btn">Create Event</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
/* eslint-disable */
export default {
  props: ['searchQuery'],
  data() {
    return {
      events: [], // To store the list of events
      newEvent: { name: '', date: '', location: '', description: '' }, // Form data for a new event
      filteredEvents: []
    };
  },


  watch: {
    searchQuery(newQuery) {
      this.handleSearch(newQuery); // Trigger search when searchQuery updates
    },
  },

  methods: {


    handleSearch(query) {
      if (query) {
        // Filter events based on the query
        this.filteredEvents = this.events.filter(event =>
          event.description.toLowerCase().includes(query.toLowerCase()) ||
          event.eventName.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        this.filteredEvents = [...this.events]; // If no query, show all events
      }
    },




    isFaculty() {
      return localStorage.getItem('usertype');
    },

    fetchEvents() {
      axios
        .get('http://localhost:3000/events')
        .then((response) => {
          this.events = response.data;
          this.filteredEvents = [...this.events];
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
    },

    addEvent() {
      axios
        .post('http://localhost:3000/events', this.newEvent)
        .then((response) => {
          this.fetchEvents(); // Refresh the list after adding an event
          this.newEvent = { name: '', date: '', location: '', description: '' }; // Reset form
        })
        .catch((error) => {
          console.error('Error creating event:', error);
        });
    },

    deleteEvent(eventId) {
      if (confirm('Are you sure you want to delete this event?')) {
        axios
          .delete(`http://localhost:3000/events/${eventId}`)
          .then((response) => {
            this.fetchEvents(); // Refresh the list after deleting an event
          })
          .catch((error) => {
            console.error('Error deleting event:', error);
          });
      }
    },

    // Format event date to display day, month, and time
    formatEventDate(eventDate) {
      const date = new Date(eventDate);
      const options = {
        weekday: 'long', // Day of the week (e.g., Monday)
        year: 'numeric',
        month: 'long', // Month name (e.g., November)
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleDateString('en-US', options);
    },
  },
  created() {
    this.fetchEvents(); // Fetch events when component is created
  },
};
</script>

<style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', sans-serif;
  background-color: #f4f7fa;
  color: #2c3e50;
}

.event-management-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.75rem;
  color: #34495e;
  margin-bottom: 15px;
}

/* Event Cards */
.event-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.event-card {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-name {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 10px;
}

.event-date-location {
  font-size: 1rem;
  color: #7f8c8d;
}

.event-description {
  margin-top: 15px;
  font-size: 1rem;
  color: #34495e;
  line-height: 1.5;
}

.event-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.edit-btn,
.delete-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover,
.delete-btn:hover {
  background-color: #2980b9;
}

.edit-btn:focus,
.delete-btn:focus {
  outline: 2px solid #3498db;
}

/* Add Event Form */
.add-event-form {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
}

.textarea-field {
  height: 120px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .event-cards {
    grid-template-columns: 1fr;
  }

  .event-management-container {
    padding: 20px;
  }
}
</style>

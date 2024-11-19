import { createRouter, createWebHistory } from 'vue-router';
import BookPage from './components/bookpage.vue';
import BookDetails from './components/BookDetails.vue';
import Login from './components/LoginPage.vue';
import Signup from './components/SignupPage.vue';
import ProfilePage from './components/Profile.vue';
import AdminAddBook from './components/AdminAddBook.vue';
import borrowedbooks from './components/borrowedbooks.vue';
import EventManagement from './components/EventManagement.vue';

// Define the routes array
const routes = [
  {
    path: '/bookPage',  // Changed to lowercase 'bookPage' for consistency
    name: 'BookPage',
    component: BookPage,
    props: route => ({ searchQuery: route.query.searchQuery }),  // Passing query params as props
  },
  {
    path: '/books/:id',  // Correct path for BookDetails
    name: 'BookDetails',
    component: BookDetails
  },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/Profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/admin/add-book',
    name: 'AdminAddBook',
    component: AdminAddBook,
    meta: { requiresAdmin: true }
  },
  {
    path: '/borrowedbooks',
    name: 'borrowedbooks',
    component: borrowedbooks,
   
  },
  {
    path: '/EventManagement',
    name: 'EventManagement',
    component: EventManagement,
   
  }
  
];

// Create the router using createRouter function
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

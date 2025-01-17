// Import our custom CSS
import '../styles/scss/vendors/vendors.scss';
import '../styles/css/main.css';

// custom styling (sass) for profile page
if (window.location.pathname.includes('profile')) {
  import('../styles/css/profile.css');
}

// Import components
import './components/index';

// Import javascript file as needed
import Home from './pages/home';
import Create from './pages/create/create';
import Profile from './pages/profile/profile';

// Auth
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import * as bootstrap from 'bootstrap';

const routes = {
  '/': Home,
  '/create/create.html': Create,
  '/profile/profile.html': Profile,

  '/auth/login.html': Login,
  '/auth/register.html': Register,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});

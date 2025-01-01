// Import our custom CSS
import '../styles/scss/main.scss';
import '../styles/css/main.css';

// Import components
import './components/index';

// Import javascript file as needed
import Home from './pages/home';
import Create from './pages/create/create';
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Home,
  '/create/create.html': Create,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});

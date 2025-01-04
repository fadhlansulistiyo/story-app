const Profile = {
  async init() {
    this.setupMinHeight();
    this.setupHamburgerMenu();
    this.setupScrollListener();
  },

  setupMinHeight() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  },

  setupHamburgerMenu() {
    const hamburgerButton = document.querySelector('#hamburger-btn');

    hamburgerButton.addEventListener('click', () => {
      document.querySelector('ul.nav-items').classList.toggle('active');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        document.querySelector('ul.nav-items').classList.remove('active');
      }
    });
  },

  setupScrollListener() {
    const header = document.querySelector('header');

    document.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        header.querySelector('.navbar-wrapper').classList.add('scrolled');
      } else {
        header.querySelector('.navbar-wrapper').classList.remove('scrolled');
      }
    });
  },
};

export default Profile;

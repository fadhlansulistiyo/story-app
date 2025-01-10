import Auth from '../../network/auth';
import CheckUserAuth from './check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this._registerForm = document.querySelector('#registerForm');
    this._modalNotification = document.querySelector('modal-notification');

    if (!this._registerForm || !this._modalNotification) {
      throw new Error('Required form elements are missing in the DOM!');
    }
  },

  _initialListener() {
    this._registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        this._registerForm.classList.add('was-validated');
        await this._processRegistration();
      },
      false,
    );

    this._modalNotification.addEventListener('confirm', () => {
      if (this._isRegistrationSuccessful) {
        this._goToLoginPage();
      }
    });
  },

  async _processRegistration() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      try {
        const response = await Auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        this._isRegistrationSuccessful = true;
        this._modalNotification.showModal(
          'Registration successful! Redirecting to the login page...',
        );
      } catch (error) {
        console.error('Registration failed:', error);

        this._isRegistrationSuccessful = false;
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            errorMessage = data?.message || 'Invalid registration details.';
          } else if (status >= 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = data?.message || `Error: ${status} - ${error.response.statusText}`;
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        }

        this._modalNotification.showModal(errorMessage);
      }
    } else {
      this._modalNotification.showModal('Please complete all fields.');
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };
  },

  _validateFormData(formData) {
    return Object.values(formData).every((field) => field !== '');
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
  },
};

export default Register;

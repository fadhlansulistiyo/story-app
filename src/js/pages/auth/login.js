import Auth from '../../network/auth';
import Config from '../../config/config';
import Utils from '../../utils/utils';
import CheckUserAuth from './check-user-auth';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this._loginForm = document.querySelector('#loginForm');
    this._modalNotification = document.querySelector('modal-notification');

    if (!this._loginForm || !this._modalNotification) {
      throw new Error('Required form elements are missing in the DOM!');
    }
  },

  _initialListener() {
    this._loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        this._loginForm.classList.add('was-validated');
        await this._processLogin();
      },
      false,
    );

    this._modalNotification.addEventListener('confirm', () => {
      if (this._isLoginSuccessful) {
        this._goToDashboardPage();
      }
    });
  },

  async _processLogin() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      try {
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });

        Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        Utils.setUserToken(Config.USER_NAME, response.data.loginResult.name);
        console.log(response.data.loginResult);
        this._isLoginSuccessful = true;
        this._modalNotification.showModal('Login successful! Redirecting to the dashboard...');
      } catch (error) {
        console.error('Login failed:', error);

        this._isLoginSuccessful = false;
        let errorMessage = 'An unexpected error occurred. Please try again.';

        if (error.response) {
          const { status, data } = error.response;

          if (status === 401) {
            errorMessage = data?.message || 'Invalid email or password.';
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
      this._modalNotification.showModal('Please fill in all fields.');
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value.trim(),
      password: password.value.trim(),
    };
  },

  _validateFormData(formData) {
    return Object.values(formData).every((field) => field !== '');
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Login;

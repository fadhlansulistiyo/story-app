import CheckUserAuth from '../auth/check-user-auth';
import StoryApi from '../../network/story-api';

const Create = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this._imageInput = document.querySelector('input-image-with-preview');
    this._descriptionInput = document.querySelector('textarea-with-validation');
    this._submitButton = document.querySelector('button[type="submit"]');
    this._addRecordForm = document.querySelector('#addRecordForm');
    this._modalNotification = document.querySelector('modal-notification');

    if (
      !this._imageInput ||
      !this._descriptionInput ||
      !this._submitButton ||
      !this._addRecordForm ||
      !this._modalNotification
    ) {
      throw new Error('Required form elements are missing in the DOM!');
    }
  },

  _initialListener() {
    this._addRecordForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        this._addRecordForm.classList.add('was-validated');
        this._postStory();
      },
      false,
    );

    this._modalNotification.addEventListener('confirm', () => {
      this._goToHomePage();
    });
  },

  _getFormData() {
    const imageInput = this._imageInput.querySelector('input[type="file"]');
    if (!imageInput || imageInput.files.length === 0) {
      throw new Error('No image file selected!');
    }

    const photo = imageInput.files[0];
    return {
      description: this._descriptionInput.value,
      photo,
    };
  },

  async _postStory() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      this._handleSpinner(true);

      try {
        await StoryApi.add({
          description: formData.description,
          photo: formData.photo,
        });

        this._modalNotification.showModal('Story successfully added!');
      } catch (error) {
        console.error('Failed to add story:', error);
        this._modalNotification.showModal('Failed to add story. Please try again.');
      } finally {
        this._handleSpinner(false);
      }
    } else {
      alert('Please complete all fields before submitting!');
    }
  },

  _validateFormData(formData) {
    const { description, photo } = formData;
    return Boolean(description && photo);
  },

  _goToHomePage() {
    window.location.href = '/';
  },

  _handleSpinner(isLoading) {
    const shareButton = document.querySelector('#shareButton');
    const shareButtonText = document.querySelector('#shareButtonText');
    const shareSpinner = document.querySelector('#shareSpinner');

    if (isLoading) {
      shareButton.disabled = true;
      shareButtonText.classList.add('d-none');
      shareSpinner.classList.remove('d-none');
    } else {
      shareButton.disabled = false;
      shareButtonText.classList.remove('d-none');
      shareSpinner.classList.add('d-none');
    }
  },
};

export default Create;

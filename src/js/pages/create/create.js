const Create = {
  async init() {
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    this._imageInput = document.querySelector('input-image-with-preview');
    this._descriptionInput = document.querySelector('textarea-with-validation');
    this._submitButton = document.querySelector('button[type="submit"]');
    this._addRecordForm = document.querySelector('#addRecordForm');
    this._toastNotification = document.querySelector('toast-notification');

    if (
      !this._imageInput ||
      !this._descriptionInput ||
      !this._submitButton ||
      !this._addRecordForm ||
      !this._toastNotification
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
  },

  _getFormData() {
    const previewImage = this._imageInput.querySelector(`#${this._imageInput.inputId}-preview`);
    if (!previewImage) {
      throw new Error('Preview image element is missing!');
    }

    return {
      id: `story-${Date.now()}`,
      name: 'fadhlansulistiyo',
      description: this._descriptionInput.value,
      photoUrl: previewImage.src,
      createdAt: new Date().toISOString(),
    };
  },

  _postStory() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      console.log('formData', formData);
      this._toastNotification.showToast('Story successfully added!');

      // this._goToHomePage();
    } else {
      alert('Please complete all fields before submitting!');
    }
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => !item);

    const imageInput = this._imageInput.querySelector('input[type="file"]');
    const imageFileValid = imageInput && imageInput.files.length > 0;

    return formDataFiltered.length === 0 && imageFileValid;
  },

  _goToHomePage() {
    window.location.href = '/';
  },
};

export default Create;

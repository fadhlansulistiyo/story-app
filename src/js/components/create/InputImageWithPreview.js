import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputImageWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    defaultImage: { type: String, reflect: true },
    defaultImageAlt: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.inputId = 'inputImage';
    this.defaultImage = '';
    this.defaultImageAlt = 'Default preview';
    this.validFeedbackMessage = 'Looks good!';
    this.invalidFeedbackMessage = 'Please upload an image.';
    this.required = false;
  }

  render() {
    return html`
      <div class="mb-3">
        <label for="${this.inputId}" class="form-label">Upload Image</label>
        <input
          type="file"
          class="form-control"
          id="${this.inputId}"
          accept="image/*"
          @change="${this._updatePhotoPreview}"
          ?required="${this.required}"
        />
        ${this._feedbackTemplate()} ${this._imagePreviewTemplate()}
      </div>
    `;
  }

  _updatePhotoPreview(event) {
    const input = event.target;
    const previewImage = this.querySelector(`#${this.inputId}-preview`);

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      previewImage.src = this.defaultImage;
    }
  }

  _feedbackTemplate() {
    return html`
      <div class="valid-feedback">${this.validFeedbackMessage}</div>
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }

  _imagePreviewTemplate() {
    return html`
      <div class="mt-3">
        <img
          id="${this.inputId}-preview"
          src="${this.defaultImage}"
          alt="${this.defaultImageAlt}"
          class="img-fluid rounded border"
          style="max-height: 300px; object-fit: cover;"
        />
      </div>
    `;
  }
}

customElements.define('input-image-with-preview', InputImageWithPreview);

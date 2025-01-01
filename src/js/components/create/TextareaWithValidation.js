import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.rows = 5;
    this.required = false;
    this.value = '';
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `The "invalidFeedbackMessage" attribute must be applied to the element ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <div class="mb-3">
        <label for="${this.inputId}" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="${this.inputId}"
          rows="${this.rows}"
          .value="${this.value}"
          @input="${this._handleInput}"
          ?required="${this.required}"
        ></textarea>
        ${this._feedbackTemplate()}
      </div>
    `;
  }

  _handleInput(event) {
    this.value = event.target.value;
  }

  _feedbackTemplate() {
    return html`
      <div class="valid-feedback">${this.validFeedbackMessage || 'Looks good!'}</div>
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);

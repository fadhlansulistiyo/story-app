import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class ToastNotification extends LitWithoutShadowDom {
  static properties = {
    message: { type: String, reflect: true },
    visible: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.message = '';
    this.visible = false;
  }

  render() {
    return html`
      <div
        class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 ${this
          .visible
          ? 'show'
          : ''}"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">${this.message}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="${this._hideToast}"
          ></button>
        </div>
      </div>
    `;
  }

  showToast(message) {
    this.message = message;
    this.visible = true;

    setTimeout(() => {
      this._hideToast();
    }, 3000);
  }

  _hideToast() {
    this.visible = false;
  }
}

customElements.define('toast-notification', ToastNotification);

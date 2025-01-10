import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalNotification extends LitWithoutShadowDom {
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
        class="modal ${this.visible ? 'show' : ''}"
        tabindex="-1"
        style="${this.visible ? 'display: block;' : 'display: none;'}"
        aria-hidden="${!this.visible}"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Notification</h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="${this._hideModal}"
              ></button>
            </div>
            <div class="modal-body">
              <p>${this.message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="${this._confirmAction}">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade ${this.visible ? 'show' : ''}"
        style="${this.visible ? 'display: block;' : 'display: none;'}"
      ></div>
    `;
  }

  showModal(message) {
    this.message = message;
    this.visible = true;
  }

  _hideModal() {
    this.visible = false;
  }

  _confirmAction() {
    this._hideModal();
    this.dispatchEvent(new CustomEvent('confirm'));
  }
}

customElements.define('modal-notification', ModalNotification);

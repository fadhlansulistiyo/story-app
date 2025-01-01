import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    to: { type: String, reflect: true },
    content: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    classes: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.classes = '';
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`The "to" attribute must be applied to the element ${this.localName}`);
    }

    if (!this.hasAttribute('content')) {
      throw new Error(`The "content" attribute must be applied to the element ${this.localName}`);
    }
  }

  render() {
    return html`
      <a class="nav-link ${this.classes}" href=${this.to}>
        ${this._templateIcon()}${this.content}
      </a>
    `;
  }

  _templateIcon() {
    if (this.icon) {
      return html`<i class="bi ${this.icon}"></i>`;
    }

    return html``;
  }
}

customElements.define('nav-link', NavLink);

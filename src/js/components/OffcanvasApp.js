import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class OffcanvasApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Atribut "brandName" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <div
        class="offcanvas-md offcanvas-end bg-body-tertiary"
        tabindex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <!-- Offcanvas header title -->
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="sidebarMenuLabel">${this.brandName}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <!-- Offcanvas menu -->
        <sidebars-app></sidebars-app>
      </div>
    `;
  }
}

customElements.define('offcanvas-app', OffcanvasApp);

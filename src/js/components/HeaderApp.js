import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class HeaderApp extends LitWithoutShadowDom {
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
      <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#"
          >${this.brandName}</a
        >

        <!-- Nav: Menu Hamburger -->
        <ul class="navbar-nav flex-row d-md-none">
          <!-- f -->
          <li class="nav-item text-nowrap">
            <button
              class="nav-link px-3 text-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="bi bi-list"></i>
            </button>
          </li>
        </ul>
      </header>
    `;
  }
}

customElements.define('header-app', HeaderApp);

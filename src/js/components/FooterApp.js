import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="container">
        <footer
          class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
        >
          <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              <i class="bi bi-journal-bookmark-fill"></i>
            </a>
            <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2025 Story App</span>
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('footer-app', FooterApp);

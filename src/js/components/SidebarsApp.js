import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class Sidebars extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul class="nav flex-column">
          <!-- Home -->
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
              <i class="bi bi-house"></i>
              Home
            </a>
          </li>
          <!-- Create Story -->
          <li class="nav-item">
            <nav-link
              classes="d-flex align-items-center gap-2"
              to="/create/create.html"
              icon="bi-plus-circle"
              content="Create"
            ></nav-link>
          </li>
          <!-- Profile -->
          <li class="nav-item">
            <nav-link
              classes="d-flex align-items-center gap-2"
              to="/profile/profile.html"
              icon="bi-person-circle"
              content="Profile"
            ></nav-link>
          </li>
        </ul>
        <hr class="my-3" />

        <ul class="nav flex-column mb-auto">
          <!-- Settings -->
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2" href="#">
              <i class="bi bi-gear"></i>
              Settings
            </a>
          </li>
          <!-- Sign out -->
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2" href="#">
              <i class="bi bi-box-arrow-left"></i>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('sidebars-app', Sidebars);

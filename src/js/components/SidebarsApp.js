import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/auth/check-user-auth';

class Sidebars extends LitWithoutShadowDom {
  render() {
    const userName = Utils.getUserName(Config.USER_NAME) || 'Profile';

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
              content=${userName}
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
            <a class="nav-link d-flex align-items-center gap-2" href="#" @click=${this._userLogOut}>
              <i class="bi bi-box-arrow-left"></i>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    `;
  }

  _userLogOut(event) {
    event.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);

    CheckUserAuth.checkLoginState();
  }
}

customElements.define('sidebars-app', Sidebars);

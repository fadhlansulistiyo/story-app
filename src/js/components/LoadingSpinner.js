import { html, css } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class LoadingSpinner extends LitWithoutShadowDom {
  static properties = {
    visible: { type: Boolean, reflect: true },
  };

  static styles = css`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1050;
    }
    .spinner {
      color: #fff;
    }
  `;

  constructor() {
    super();
    this.visible = false;
  }

  render() {
    return html`
      ${this.visible
        ? html`
            <div class="spinner-overlay">
              <div class="spinner-border spinner" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          `
        : ''}
    `;
  }

  show() {
    console.log('Showing spinner');
    this.visible = true;
  }

  hide() {
    console.log('Hiding spinner');
    this.visible = false;
  }
}

customElements.define('loading-spinner', LoadingSpinner);

import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class StoryItem extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
    classes: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.id = '';
    this.name = '';
    this.description = '';
    this.photoUrl = '';
    this.createdAt = '';
    this.classes = '';
  }

  render() {
    return html`
      <div class="card ${this.classes}">
        <img src="${this.photoUrl}" class="card-img-top" alt="Images Story" />
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.description}</p>
          <p class="card-text">
            <small class="text-body-secondary">${this.createdAt}</small>
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('story-item', StoryItem);

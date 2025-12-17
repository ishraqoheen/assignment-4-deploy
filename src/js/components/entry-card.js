import './app-button.js';

class EntryCard extends HTMLElement {
  #data = null;
  #expanded = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get data() {
    return this.#data;
  }

  set data(value) {
    if (!value) {
      throw new Error("No data has been set");
    }
    this.#data = value;
    this.render();
    this.updateLightDOM();
  }

  get expanded() {
    return this.#expanded;
  }

  set expanded(value) {
    this.#expanded = value;
    this.updateExpandedState();
  }

  connectedCallback() {
    if (this.#data) {
      this.render();
    }
  }

  updateLightDOM() {
    if (!this.#data) return;

    this.innerHTML = '';

    const { name, image, category, description, common_locations, drops } = this.#data;

    const createSlot = (slotName, text) => {
      const el = document.createElement('span');
      el.slot = slotName;
      el.textContent = text;
      return el;
    };

    this.appendChild(createSlot('name', name));
    this.appendChild(createSlot('category', category));

    const img = document.createElement('img');
    img.slot = 'image';
    img.src = image;
    img.alt = name;
    this.appendChild(img);

    this.appendChild(createSlot('description', description));

    const locations = (common_locations && common_locations.length) ? common_locations.join(', ') : 'None';
    this.appendChild(createSlot('locations', locations));

    const dropItems = (drops && drops.length) ? drops.join(', ') : 'None';
    this.appendChild(createSlot('drops', dropItems));
  }

  updateExpandedState() {
    const details = this.shadowRoot.querySelector('#details');
    if (details) {
      if (this.#expanded) {
        details.classList.remove('extra-hidden');
      } else {
        details.classList.add('extra-hidden');
      }
    }
  }

  render() {
    if (!this.#data) {
      throw new Error("No data has been set");
    }

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ccc;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 4px;
          background-color: #fff;
        }
        .card img {
          max-width: 200px;
          display: block;
          margin-bottom: 0.5rem;
        }
        .extra {
          display: block;
        }
        .extra.extra-hidden {
          display: none;
        }
        app-button {
          margin-top: 0.5rem;
        }
      </style>

      <div class="card">
        <h3><slot name="name">NAME</slot></h3>
        <slot name="image">IMAGE</slot>
        <p><strong>Category:</strong> <slot name="category">CATEGORY</slot></p>

        <app-button id="toggle-btn">
          <span slot="label">Toggle Details</span>
        </app-button>

        <div id="details" class="extra extra-hidden">
          <p><strong>Description:</strong> <slot name="description">DESCRIPTION</slot></p>
          <p><strong>Common Locations:</strong> <slot name="locations">LOCATIONS</slot></p>
          <p><strong>Drops:</strong> <slot name="drops">DROPS</slot></p>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#toggle-btn').addEventListener('click', () => {
      this.expanded = !this.expanded;
    });

    this.updateExpandedState();
  }
}

customElements.define('entry-card', EntryCard);
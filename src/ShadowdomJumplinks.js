import { html, css, LitElement } from 'lit-element';

export class ShadowdomJumplinks extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--shadowdom-jumplinks-text-color, #000);
      }
      slot {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    // Start listening to slot changes to transpose content slot changes
    this.shadowRoot
      .querySelector(`slot`)
      .addEventListener('slotchange', this.contentSlotChanged.bind(this));
  }

  /**
   * Transpose default slot to content area in shadowRoot.
   */
  contentSlotChanged(e) {
    // Get a list of all the immediate children in the light dom that do not have a named slot attribute
    clearTimeout(this.__transposeContentRegion);
    this.__transposeContentRegion = setTimeout(() => {
      const contentSlotChildren = [...this.children].filter(
        element => !element.hasAttribute('jumplink')
      );
      console.log(contentSlotChildren)
      for (let element of contentSlotChildren) {
        this.shadowRoot.querySelector("[part='container']").innerHTML = '';
        this.shadowRoot.querySelector("[part='container']").appendChild(element);
      }
    }, 0);
  }

  render() {
    return html`
      <div part="container"></div>
      <div part="slot">
        <slot></slot>
      </div>
    `;
  }
}

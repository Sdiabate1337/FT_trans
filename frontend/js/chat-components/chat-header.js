class ChatHeader extends HTMLElement {
  static get observedAttributes() {
      return ['friend-name', 'friend-image'];
  }

  constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const header = document.createElement('div');
      header.classList.add('chat-header');

      this.img = document.createElement('img');
      this.img.classList.add('friend-image');
      this.img.alt = 'Friend Image'; // Set a default alt text

      // Create span for the friend's name
      this.name = document.createElement('span');
      this.name.classList.add('friend-name');

      header.append(this.img, this.name);

      const style = document.createElement('style');
      style.textContent = `
      :host{
        --classic-color: #ffffff;
        --neon-color: #F941FF;
        --fire-color: #FF774D;
        --water-color: #63CBFF;
        --earth-color: #43FF74;
        --primary-color: #bb07a3;
        --secondary-color: #cb0ccb;
        --tertiary-color: #B821FF;
        --background-color:linear-gradient(45deg, #511569 30%, black 90%);
        --nav-color: linear-gradient(180deg, rgba(132,0,135,1) 0%, rgba(23,0,44,1) 100%);
        --hover-bg-color: white;
        --text-color: white;
        --text-color-light: black;
        --msg-bg-color-green: #239B56;
        --online-color: #00ff00;
        --offline-color: #ff0000;
    }

      .chat-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center; /* Centers image and text */
        text-align: center; /* Ensures text is centered */
        padding: 16px;
      }

      .friend-image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 8px; /* Space between image and name */
      }

      .friend-name {
        font-size: 1.2em;
        font-weight: bold;
        color : #FFFFFF;
      }
      
      @media (max-width: 600px) {
        .chat-header {
          padding: 12px;
          font-size: 1em;
          width: 70%;
        }
        .friend-image {
          width: 40px;
          height: 40px;
        }
        .friend-name {
          font-size: 1em;
        }
      }
    `;

      this.shadowRoot.append(style, header);
  }

  // Lifecycle method called when the element is added to the DOM
  connectedCallback() {
      // Get the attributes once the element is connected to the DOM
      this.img.src = this.getAttribute('friend-image') || '/images/default.png'; // Default image fallback
      this.name.textContent = this.getAttribute('friend-name') || 'Unknown';
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'friend-image') {
          this.img.src = newValue;
      }
      if (name === 'friend-name') {
          this.name.textContent = newValue;
      }
  }
}

customElements.define('chat-header', ChatHeader);



class ChatMessage extends HTMLElement {
    static get observedAttributes() {
        return ['user-image', 'message-content', 'timestamp', 'sender'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('message');

        this.senderElement = document.createElement('div');
        this.senderElement.classList.add('sender');

        this.contentWrapper = document.createElement('div');
        this.contentWrapper.classList.add('content-wrapper');

        this.imageElement = document.createElement('img');
        this.imageElement.classList.add('image'); 
        this.imageElement.alt = 'User image';
        this.imageElement.width = 40;
        this.imageElement.height = 40;

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('message-container');

        this.contentElement = document.createElement('div');
        this.contentElement.classList.add('content');

        this.timeElement = document.createElement('div');
        this.timeElement.classList.add('time');

        this.messageContainer.append(this.contentElement, this.timeElement);

        this.contentWrapper.append(this.messageContainer, this.imageElement);

        wrapper.append(this.contentWrapper);

        const style = document.createElement('style');
        style.textContent = `
            .message {
                margin-bottom: 12px;
                display: flex;
                flex-direction: column;
                color: #FFFFFF;
            }
            .sender {
                font-weight: bold;
                margin-bottom: 4px;
                color: #FFFFFF;
            }
            .content-wrapper {
                display: flex; 
                align-items: flex-start; 
                padding: 12px 16px;
                gap: 8px; 
                max-width: 80%; 
            }
            .image {
                border-radius: 50%;
                margin-left: 8px;
            }
            .message-container {
                display: flex;
                flex-direction: column;
            }
            .content {
                background-color: #EE36A4;
                padding: 15px;
                border-radius: 10px;
                word-wrap: break-word; 
                word-break: break-word; 
                overflow-wrap: break-word;
                max-width: 100%; 
            }
            
            .time {
                font-size: 0.8em;
                color: #CCCCCC;
                margin-top: 4px; 
                text-align: right;
            }

            :host([sender="me"]) .message {
                align-items: flex-end;
            }
            :host([sender="me"]) .content {
                background-color: #A700B6;
            }

            @media (max-width: 600px) {
                .content {
                    padding: 6px;
                    font-size: 0.9em;
                }
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }

    connectedCallback() {
        // Read the 'sender' attribute to set the sender's name
        this.senderElement.textContent = this.getAttribute('sender') || 'you';

        // Initially set content based on attributes if they are present
        this.updateContent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateContent();
        }
    }

    updateContent() {
        const messageContent = this.getAttribute('message-content') || '';
        this.contentElement.textContent = messageContent;

        this.imageElement.src = this.getAttribute('user-image') || '../images/me.png';

        const timestamp = this.getAttribute('timestamp');
        this.timeElement.textContent = timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (this.getAttribute('sender') === 'me') {
            this.contentWrapper.append(this.imageElement);
        } else {
            this.contentWrapper.prepend(this.imageElement);
        }
    }

}

customElements.define('chat-message', ChatMessage);

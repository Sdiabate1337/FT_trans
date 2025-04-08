class ChatMessageList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('message-list');

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                overflow-y: auto; /* Allow scrolling */
            }

            .message-list {
                flex-grow: 1;
                padding: 16px;
                box-sizing: border-box;
                overflow-y: auto;
            }

            /* Ensure messages don't exceed container width */
            chat-message {
                max-width: 100%;
            }

            .date-separator {
                text-align: center;
                font-weight: bold;
                margin: 8px 0;
                color: #aaa;
            }
        `;

        this.shadowRoot.append(style, wrapper);
        this.lastMessageDate = null;
    }

    addMessage(message, sender = 'me', userImage = '', timestamp = null) {
        const msg = document.createElement('chat-message');

        msg.setAttribute('sender', sender);
        msg.setAttribute('user-image', userImage);
        msg.setAttribute('message-content', message);

        const currentDate = timestamp ? new Date(timestamp) : new Date();
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        msg.setAttribute('timestamp', time);

        if (!this.lastMessageDate || !this.isSameDay(currentDate, this.lastMessageDate)) {
            const dateSeparator = document.createElement('div');
            dateSeparator.classList.add('date-separator');
            dateSeparator.textContent = this.getDateSeparatorText(currentDate);
            this.shadowRoot.querySelector('.message-list').appendChild(dateSeparator);
        }

        this.shadowRoot.querySelector('.message-list').appendChild(msg);
        this.lastMessageDate = currentDate; // Update last message date

        // Scroll to the bottom
        this.scrollToBottom();
    }

    scrollToBottom() {
        const msgList = this.shadowRoot.querySelector('.message-list');
        msgList.scrollTop = msgList.scrollHeight;
    }

    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    getDateSeparatorText(date) {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (this.isSameDay(date, today)) {
            return 'Today';
        } else if (this.isSameDay(date, yesterday)) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    }
}

customElements.define('chat-message-list', ChatMessageList);
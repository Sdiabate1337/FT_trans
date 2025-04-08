import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';

class Chat {
    content = document.createElement('span');
    
    constructor() {}

    async render() {
        const page = document.createDocumentFragment();
        const leftBar = renderLeftBar();
        leftBar.className = 'left-bar';
        page.appendChild(leftBar);

        // Load all components
        await Promise.all([
            import('./chat-components/chat-app.js'),
            import('./chat-components/chat-header.js'),
            import('./chat-components/chat-friend-list.js'),
            import('./chat-components/chat-friend-card.js'),
            import('./chat-components/chat-message-list.js'),
            import('./chat-components/chat-message.js'),
            import('./chat-components/chat-input.js'),
            import('./chat-components/chat-search-friend-input.js'),
            import('./chat-components/chat-badge.js'),
        ]);

        this.content.className = 'chat-section';
        const chatApp = document.createElement('chat-app');
        this.content.appendChild(chatApp);

        page.appendChild(this.content);
        page.appendChild(renderRightBar());
        document.body.style.alignItems = 'center';

        return page;
    }
}

export function renderChat() {
    const page = new Chat();
    return page.render();
}

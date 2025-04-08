class ChatSearchFriendInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('outer-container');

        const inputWrapper = document.createElement('div');
        inputWrapper.classList.add('input-container');

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search...';
        searchInput.classList.add('search-input');

        const searchButton = document.createElement('button');
        searchButton.classList.add('chat-input-button');

        const dispatchSearchEvent = () => {
            const searchValue = searchInput.value.trim();
            this.dispatchEvent(new CustomEvent('searchFriend', {
                detail: { searchValue },
                bubbles: true,
                composed: true,
            }));
        };  

        searchInput.addEventListener('input', dispatchSearchEvent);

        inputWrapper.append(searchButton, searchInput);
        wrapper.append(inputWrapper);

        // Styling
        const style = document.createElement('style');
        style.textContent = `
            .outer-container {
                display: flex;
                justify-content: start;
                align-items: center;
                padding: 8px;
                width: 80%;
            }
            .input-container {
                display: flex;
                background-color: #FFFFFF;
                border: 1px solid #FFFFFF;
                border-radius: 4px;
                width: 80%;
            }
            .search-input {
                flex: 1;
                padding: 8px;
                background-color: #FFFFFF;
                border: none;
                width: 100%;
                font-size: 1em;
                font-weight: bold;
            }
            .search-input:focus {
                outline: none;
                border: none;
            }
            .chat-input-button {
                border: none;
                background-color: #FFFFFF;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                position: relative;
                padding-left: 35px;
                width: 40px;
                height: 40px;
            }
            .chat-input-button::before {
                content: "";
                background-image: url('../images/search.png');
                background-size: contain;
                background-repeat: no-repeat;
                width: 20px;
                height: 20px;
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            @media (max-width: 600px) {
                .chat-input-button {
                    padding: 8px 12px;
                    font-size: 0.9em;
                }
                .search-input {
                    padding: 6px;
                    font-size: 0.9em;
                }
            }
        `;

        this.shadowRoot.append(style, wrapper);
    }
}

customElements.define('chat-search-friend-input', ChatSearchFriendInput);
import { logedUser } from '../router.js';
import { showAlert } from '../message-box.js';

class ChatFriendList extends HTMLElement {
    friendList = document.createElement('div');

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.originalFriends = {};
        this.displayedFriends = {};

        const wrapper = document.createElement('div');
        wrapper.classList.add('friend-list-wrapper');

        const searchSection = document.createElement('chat-search-friend-input');
        searchSection.classList.add('search-section');

        this.friendList.classList.add('friend-list');

        const style = document.createElement('style');
        style.textContent = `
            .friend-list-wrapper {
                display: flex;
                flex-direction: column;
                padding-top: 15px;
                width: 100%;
                height: 100%;
            }
            .friend-list {
                width: 100%;
                height: 100%;
                border-right: 1px solid #ccc;
                overflow-y: auto;
                flex-grow: 1;
                padding-bottom: 15px;
            }
        `;

        wrapper.append(searchSection, this.friendList);
        this.shadowRoot.append(style, wrapper);

        searchSection.addEventListener('searchFriend', (event) => {
            this.filterFriends(event.detail.searchValue);
        });

        this.friendList.addEventListener('friendCardClick', (event) => {
            this.handleFriendCardClick(event.detail.card);
        });
        
        this.addEventListener('deselectFriend', this.deselectAllFriends.bind(this));

        logedUser.statusSocket.onmessage = async (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'user_status') {
                this.updateFriendStatusById(data.user_id, data.status === 'online' ? true : false);  
                if (data.status === 'online')
                    logedUser.activeUsers.add(data.user_id);
                else
                    logedUser.activeUsers.delete(data.user_id); 
            }
            else if (data.type === 'active_users_list')
                logedUser.activeUsers = new Set(data.active_users);
            else if (data.type === 'invite_to_game' && data.user_id === logedUser.id)
                showAlert(data.username + ' invited you to a game');
        };
    }

    connectedCallback() {
        this.fetchFriendList();
    }

    async fetchFriendList() {
        try {
            const response = await fetch('http://localhost:8000/api/users/friendList/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error getting friend list: ' + response.statusText);
            }
            const data = await response.json();
            this.originalFriends = data.friends;
            this.displayedFriends = data.friends;
            this.updateFriendList(this.displayedFriends);

        } catch (error) {
            console.error('Error fetching friend list:', error);
        }
    }

    updateFriendList(newFriends) {
        this.friendList.innerHTML = ''; // Clear the list    
        for (const [key, value] of Object.entries(newFriends)) {
            const friendCard = document.createElement('chat-friend-card');
            friendCard.setAttribute('id', key);    
            friendCard.setAttribute('photo', value[1]);
            friendCard.setAttribute('username', value[0]);
            friendCard.setAttribute('status', logedUser.activeUsers ? logedUser.activeUsers.has(Number(key)) : false);
            this.friendList.appendChild(friendCard);
        }
    }

    filterFriends(searchValue) {
        this.displayedFriends = {};
        if (!searchValue) {
            this.updateFriendList(this.originalFriends);
            return;
        }
        const lowerCaseSearchValue = searchValue.toLowerCase();
        for (const [key, value] of Object.entries(this.originalFriends)) {
            if (value[0].toLowerCase().includes(lowerCaseSearchValue)) {
                this.displayedFriends[key] = value;
            }
        }
        this.updateFriendList(this.displayedFriends);
    }

    handleFriendCardClick(clickedCard) {
        // Deselect all cards
        const allCards = this.shadowRoot.querySelectorAll('chat-friend-card');
        allCards.forEach(card => {
            card.shadowRoot.querySelector('.friend-card-component').classList.remove('selected');
        });
        // Select the clicked card
        clickedCard.shadowRoot.querySelector('.friend-card-component').classList.add('selected');
    }

    deselectAllFriends() {
        const allCards = this.shadowRoot.querySelectorAll('chat-friend-card');
        allCards.forEach(card => {
            card.shadowRoot.querySelector('.friend-card-component').classList.remove('selected');
        });
    }

    updateFriendStatusById(friendId, status) {
        const friendCard = this.friendList.querySelector(`chat-friend-card[id="${friendId}"]`);
        if (friendCard)
            friendCard.setStatus(status);
    }

}

customElements.define('chat-friend-list', ChatFriendList);
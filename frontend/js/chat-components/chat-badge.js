class ChatBadge extends HTMLElement {
    static get observedAttributes() {
        return ['username', 'profile-pic', 'blocked'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    
        const container = document.createElement('div');
        container.classList.add('chat-badge');
    
        this.profilePic = document.createElement('img');
        this.profilePic.classList.add('profile-pic');
        this.profilePic.alt = 'Profile Picture';
    
        this.username = document.createElement('span');
        this.username.classList.add('username');
    
        this.menuButton = document.createElement('button');
        this.menuButton.classList.add('menu-button');
        this.menuButton.textContent = '⋮'; // Three vertical dots
    
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        this.menu.innerHTML = `
            <ul>
                <li>Invite to play</li>
                <li>Close chat</li>
                <li id="block-option">Block</li>
            </ul>
        `;
    
        container.append(this.profilePic, this.username, this.menuButton, this.menu);
    
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --primary-color: #6C2DB9;
                --secondary-color: #ffffff;
                --menu-bg-color: #2D2D2D;
                --menu-hover-color: #404040;
                --text-color: #FFFFFF;
                --button-hover-bg: rgba(255, 255, 255, 0.2);
                --profile-border-color: #8A2BE2;
                --badge-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
                --neon-color: #F941FF;
            }
            @font-face {
                font-family: 'Bungee';
                src: url('../images/fonts/Bungee-Regular.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
    
            .chat-badge {
                display: flex;
                align-items: center;
                color: var(--text-color);
                border-radius: 16px;
                padding: 10px 20px;
                font-family: 'Arial', sans-serif;
                position: relative;
                box-shadow: var(--badge-shadow);
                transition: transform 0.2s, box-shadow 0.2s;
                justify-content: center;
                border: 1px solid var(--neon-color);

            }
        
            .chat-badge:hover {
                transform: translateY(-2px);
                box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);

            }
    
            .profile-pic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 15px;
                border: 2px solid var(--neon-color);
                transition: transform 0.2s;
                object-fit: cover;
            }
        
            .profile-pic:hover {
                transform: scale(1.1);
                cursor: pointer;

            }
    
            .username {
                font-size: 1.3rem;
                font-weight: bold;
                fotn-family: 'Bungee';
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
                color: var(--secondary-color);
            }
    
            .menu-button {
                background: none;
                border: none;
                color: var(--secondary-color);
                font-size: 1.5rem;
                cursor: pointer;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: background-color 0.3s;
            }
        
            .menu-button:hover {
                background-color: var(--button-hover-bg);
            }
    
            .menu {
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: rgba(0, 0, 0, 0.8);
                color: var(--text-color);
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                z-index: 1000;
                margin-top: 10px;
            }
    
            .menu ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
        
            .menu li {
                padding: 12px 20px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
        
            .menu li:hover {
                background-color: var(--primary-color);
            }
        
            .menu.show {
                display: block;
            }

            @media (max-width: 768px) {
                .chat-badge {
                    height: 20px;
                }
        
                .profile-pic {
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                }
        
                .username {
                    font-size: 1rem;
                }
        
                .menu-button {
                    width: 50px;
                    height: 50px;
                }
            }
        `;
    
        this.shadowRoot.append(style, container);
    
        // Event listeners
        this.menuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleMenu();
        });
    
        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
            this.hideMenu();
            }
        });
    }
  
    connectedCallback() {
        this.profilePic.src = this.getAttribute('profile-pic') || '/images/default-avatar.png';
        this.username.textContent = this.getAttribute('username') || 'Anonymous';
        this.updateBlockOption(); // Update the Block/Unblock option on load
    
        const menuOptions = this.shadowRoot.querySelectorAll('.menu li');
        const profilePic = this.shadowRoot.querySelector('.profile-pic');
        profilePic.addEventListener('click', () => {
            this.handleGoToProfile();
        }
        );
        menuOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                const action = event.target.textContent.trim();
    
                switch (action) {
                    case 'Close chat':
                        this.handleCloseChat();
                        break;
                    case 'Invite to play':
                        this.handleInviteToPlay();
                        break;
                    case 'Block':
                    case 'Unblock':
                        this.handleBlockUnblock();
                        break;
                    default:
                        console.warn(`Unknown action: ${action}`);
                }
    
                this.hideMenu();
            });
        });
    }
    
    handleGoToProfile() {
        this.dispatchEvent(new CustomEvent('go-profile', { bubbles: true, composed: true }));
    }
    
    handleCloseChat() {
        this.dispatchEvent(new CustomEvent('close-chat', { bubbles: true, composed: true }));
    }

    handleInviteToPlay() {
        this.dispatchEvent(new CustomEvent('invite-play', { bubbles: true, composed: true }));
    }
    
    handleBlockUnblock() {
        const isBlocked = this.getAttribute('blocked') === 'true';
        this.setAttribute('blocked', isBlocked ? 'false' : 'true');
        this.dispatchEvent(new CustomEvent('block-unblock-user', { bubbles: true, composed: true }));   
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'profile-pic') {
            this.profilePic.src = newValue;
        } else if (name === 'username') {
            this.username.textContent = newValue;
        } else if (name === 'blocked') {
            this.updateBlockOption();
        }
    }

    toggleMenu() {
        const isMenuVisible = this.menu.classList.toggle('show');
        this.menuButton.classList.toggle('menu-active', isMenuVisible);
    }
  
    hideMenu() {
        this.menu.classList.remove('show');
        this.menuButton.classList.remove('menu-active');
    }
  
    updateBlockOption() {
        const isBlocked = this.getAttribute('blocked') === 'true';
        const blockOption = this.shadowRoot.querySelector('#block-option');
        blockOption.textContent = isBlocked ? 'Unblock' : 'Block';
    
        blockOption.onclick = () => {
            this.setAttribute('blocked', isBlocked ? 'false' : 'true');
        };
    }
}
  
customElements.define('chat-badge', ChatBadge);
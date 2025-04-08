

import { renderDashboard } from './dashboard.js';
import { renderHomePage } from './homePage.js';
import { renderLoginPage } from './login.js';
import { renderPlayMods } from './play-mods.js';
import { renderRegistrationPage } from './registration.js';
import { renderResetPasswordPage } from './reset_password.js';
import { renderShop } from './shop.js';
import { rendertournamant } from './tournament.js';
import { renderCreateTournament } from './create_tou.js';
import { renderFourPlayers } from './four_players.js';
import { renderEightPlayers } from './eight_players.js';
import { renderJoinTournament } from './list_tou.js';
import { renderSettings } from './settings.js';
import { renderTwoFaConfirmationPage } from './2fa_confirmation.js'
import { renderProfile } from './profile.js'
import { renderFriendList } from './friend_list.js'

import { rendergameonline } from './game_online.js';
import { renderFournames } from './four_names.js';
import { rendertestmatch } from './test_match.js';
import { renderEightnames } from './eight_names.js';
import { renderLocalGame } from './local-game.js';
import { renderGamePlay } from './game-play.js';
import { renderNotFoundPage } from './not-found.js'; // Import the Not Found component

export { renderHomePage } from './homePage.js';
export { renderDashboard } from './dashboard.js';
export { renderRegistrationPage } from './registration.js';
export { renderLoginPage } from './login.js';
export { renderResetPasswordPage } from './reset_password.js';
export { renderShop } from './shop.js'
import { renderChat } from './chat.js';
export { rendertournamant } from './tournament.js'
export { renderCreateTournament } from './create_tou.js'
export { renderFourPlayers } from './four_players.js'
export { renderEightPlayers } from './eight_players.js'
export { renderJoinTournament } from './list_tou.js'
export { renderSettings } from './settings.js'
import { showAlert } from './message-box.js';
export { renderProfile } from './profile.js';
export { rendergameonline } from './game_online.js';
export { renderFournames } from './four_names.js';
export { rendertestmatch } from './test_match.js';
export { renderEightnames } from './eight_names.js';
export { renderLocalGame } from './local-game.js';
export { renderGamePlay } from './game-play.js';



export const logedUser = {
    id: null,
    username: null,
    email: null,
    avatar: null,
    wallet: null,
    statusSocket: null, // Add this
    activeUsers : null,
}

// Add connection setup function
async function setupUserStatusSocket() {
    if (logedUser.id && !logedUser.statusSocket) {
        logedUser.statusSocket = new WebSocket(`ws://localhost:8001/ws/status/`);

        logedUser.statusSocket.onopen = () => {
        };

        logedUser.statusSocket.onclose = () => {
            logedUser.statusSocket = null;
        };

        logedUser.statusSocket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'active_users_list')
                logedUser.activeUsers = new Set(data.active_users);
            else if (data.type === 'invite_to_game' && data.user_id === logedUser.id)
                showAlert(data.username + ' invited you to a game');
        };

    }
}


function renderPage(page) {
    document.body.innerHTML = '';

    const alertBox = document.createElement('div');
    alertBox.id = 'alert-box';
    alertBox.className = 'alert-box';
    document.body.appendChild(alertBox);    

    document.body.appendChild(page);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('message')) {
        const message_text = urlParams.get('message');
        showAlert(message_text);
    }
}

export function navigate(route, param = null) {
    if (param !== null)
        history.pushState({}, '', route + '?user='+param);
    else
        history.pushState({}, '', route);
    loadPage(route).then(() => {
    }).catch((error) => {
        console.error('Error during navigation:',error);
    });
}

async function ask_refreshing_token() {
    try {
        const response = await fetch('http://localhost:8000/api/users/refresh/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

async function loadPage(route) {
    const startRoutes = {   '/': renderHomePage,
                            '/login': renderLoginPage,
                            '/register': renderRegistrationPage,
                            '/password_reset': renderResetPasswordPage,
                            '/2fa_confirmation': renderTwoFaConfirmationPage,
                            '/game-local' : renderLocalGame,
                            '/play-game' : renderGamePlay,
                            };

    const secretRoutes = {  '/dashboard': renderDashboard,
                            '/shop' : renderShop,
                            '/chat': renderChat,
                            '/tournement' : rendertournamant,
                            '/tournement/fournames' : renderFournames,
                            '/tournement/eightnames' : renderEightnames,
                            '/tournement/create' : renderCreateTournament,
                            '/tournement/Fourplayers' : renderFourPlayers,
							'/tournement/Eightplayers' : renderEightPlayers,
                            '/tournement/join' : renderJoinTournament,
							'/settings' : renderSettings,
							'/profile' : renderProfile,
							'/friendList' : renderFriendList,
							'/game-online' : rendergameonline,
							'/tournement/test_match' : rendertestmatch ,
                            '/local-game' : renderLocalGame,
                            '/game-play' : renderGamePlay,
						};
    let isAuthenticated = false;
    try {
        const response = await fetch('http://localhost:8000/api/users/checkAuthentication/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            isAuthenticated = true;
            await fetchLoggedUser();
            await setupUserStatusSocket();
        } else {
            const data = await response.json();
            if (data.error === 'token expired')
                isAuthenticated = await ask_refreshing_token();
        }
    } catch(error) {
        isAuthenticated = false;
    }

    if (startRoutes[route]) {
        if (isAuthenticated) {
            history.pushState({}, '', '/dashboard');
            return renderPage(secretRoutes['/dashboard']());
        }
        return renderPage(startRoutes[route]());
    }
    else if (secretRoutes[route]) {
        if (isAuthenticated){
            const page = await secretRoutes[route]();
            return renderPage(page);
        }
        history.pushState({}, '', '/login');
        return renderPage(startRoutes['/login']());
    }
    else {
        return renderPage(renderNotFoundPage());
    }
}

async function fetchLoggedUser() {
    try {
        const response = await fetch('http://localhost:8000/api/users/userProfile/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            logedUser.id = data.id;
            logedUser.username = data.username;
            logedUser.email = data.email;
            logedUser.avatar = data.avatar;
            logedUser.wallet = data.wallet;
        } else {
        }
    } catch (error) {
        console.error('Error fetching logged user:', error);
    }
}

// Add cleanup function for logout
export function cleanupUserSockets() {
    if (logedUser.statusSocket) {
        logedUser.statusSocket.close();
        logedUser.statusSocket = null;
    }
    // Clear user data
    logedUser.id = null;
    logedUser.username = null;
    logedUser.email = null;
    logedUser.avatar = null;
    logedUser.wallet = null;
    logedUser.activeUsers = null;
}

window.onpopstate = async () => {
   await loadPage(location.pathname);
}

window.onload = async () => {
    await loadPage(location.pathname || '/');
};


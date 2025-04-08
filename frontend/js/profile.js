import { navigate } from "./router.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { showAlert } from "./message-box.js";
import { renderPlayerPhoto } from "./playerPhoto.js";

class Profile {
    content = document.createElement('span');
	
    constructor() {}
    async fetchUserName() {
        try {
            const response = await fetch('http://localhost:8000/api/users/userProfile/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            return data.username;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return 'Guest';
        }
    }
    // fetch user profile picture
    async fetchUserData(username) {

        try {
            const response = await fetch('http://localhost:8000/api/users/ProfileByUsername/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
				body: JSON.stringify({'username' : username})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            return {'avatar': data.avatar, 'wins' : data.wins, 'loses': data.loses};
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
			return {};
        }
    }

    // Fetch match history
    async fetchMatchHistory(username) {
        try {
            const response = await fetch('http://localhost:8000/api/users/UserMatchHistory/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
				body: JSON.stringify({'username' : username})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            return data || []; 
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    }

        /* UPDATES LI DARO : 
        1 = TBDL UI 
        2 = TZADO APIS DYAL FETCH USERNAME AVATAR W MATCH HISTORY
        3 = GAME PLAYED RAH DYNAMIC HOW W WIN RATE
        --- ACH KHAS YTZAD :
        API LI KAYJIB MATCHHISTORY YTZAD FIH PROFILE PIC DYAL KOLA WAHD + STATS WACH GAME SALAT BWIN WLA LOSES 
        LEVEL DYAL PLAYER WCH HANKHLIWH FIX BHAL MATALAN 1337 WKHOIUHA ELA KLKCHI 
        T UDAPTE WIN W LOSE B DATA I JAYA MN API 
        DOK NAV BAR MAEFTCH KI KADIRO TRENDWIWHOM MACHI RESPONSIVE 
        */
    async render() {
		const urlParams = new URLSearchParams(window.location.search);
		let UserName;
		if (urlParams.has('user')) {
			UserName = urlParams.get('user');
		}
		else {
			UserName = await this.fetchUserName();
		}
        const level = 13;
		const userData = await this.fetchUserData(UserName);
        if (Object.keys(userData).length === 0) {
            navigate('/user-dose-not-exist');
            return;
        }
        let wins = userData['wins']; // fch hatzid dok stats dyal user hatytgado hado
        let losses = userData['loses'];
        const rankImage = "../images/ranks/diamond.svg";
        const page = document.createDocumentFragment();
        page.appendChild(renderLeftBar());

        this.content.className = 'profile';
        this.content.innerHTML = /*html*/ `
             <div class="wrapper">
                <div class="profile-card">
                    <div class="profile-container">
                        <div class="banner">
                            <div class="photo-container">
                            </div>
                        </div>
                        <h1 class="username"></h1>
                        <div class="stats">
                            <div class="stat-box1">
                                <h3>LEVEL</h3>
                                <span>${level}</span>
                            </div>
                            <div class="stat-box3">
                                <h3>SCORE</h3>
                                <div class="scroll-container">
                                    <div class="scroll-content">
                                        <h1 class="game-player">Game Played</h1>
                                        <span class="n-game"></span>
                                        <div class="game-win-lose">
                                            <h1 class="game-win">WIN</h1>
                                            <span class="n-win">${wins}</span>
                                            <h1 class="game-lose">LOSE</h1>
                                            <span class="n-lose">${losses}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                            <div class="stat-box2">
                                <h3>RANK</h3>
                                <img src="${rankImage}" class="rank-badge" alt="Rank Badge">
                             </div>
                        </div>
                        <div class="win-rate">
                            <h2>WIN RATE</h2>
                            <div class="circle-container">
                                <svg class="circle-svg" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet">
                                    <path class="circle-bg"
                                          d="M18 2.0845
                                             a 15.9155 15.9155 0 0 1 0 31.831
                                             a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path id="progress-circle" class="circle_"
                                          stroke-dasharray="0, 100"
                                          d="M18 2.0845
                                             a 15.9155 15.9155 0 0 1 0 31.831
                                             a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <text x="18" y="20.35" id="percentage-text" class="percentage">0%</text>
                                </svg>
                            </div>

                        </div>
                        <h2 id="match-history-h2">MATCH HISTORY</h2>
                        <div class="match-history">
                            <div class="matches"></div> 
                        </div>
                    </div>
                </div>
            </div>
        `;

        page.appendChild(this.content);

        const banner = this.content.querySelector('.photo-container');

        banner.appendChild(renderPlayerPhoto());

        // const username = await this.fetchUserName();
        const usernameElement = this.content.querySelector('.username');
        usernameElement.textContent = UserName;
        const avatar = userData['avatar'];
        const bannerImage = banner.querySelector('#player-image');
       

        bannerImage.src = avatar;
        const matchHistory = await this.fetchMatchHistory(UserName);
        const nGame = this.content.querySelector('.n-game');
        nGame.textContent = matchHistory.length;
        const matchesContainer = this.content.querySelector('.matches');
        // hna hta tzid lia fields f api dyal userMatchHistory dyal player1state, player2state, player1image, player2image
        if (matchHistory.length === 0) {
            matchesContainer.innerHTML = '<p id="zero-match";">No matches played yet</p>';
        } 
        else
        matchesContainer.innerHTML = matchHistory.map(match => `
        <div class="match">
            <img src="${avatar}" alt="Player 1" class="player-icon">
            <p class="p1-state ${match.match_data.player1name}">${match.match_data.player1name}</p>
            <p class="score1">${match.match_data.player1score}</p>
            <p class="vss">vs</p>
            <p class="score2">${match.match_data.player2score}</p>
            <p class="p2-state ${match.match_data.player2name}">${match.match_data.player2name}</p>
            <img src="../images/player1.png" alt="Player 2" class="player-icon">
        </div>
    `).join('');

        const winRateElement = this.content.querySelector('.percentage');
        const totalGames = wins + losses;
		let winRateValue;
		if (totalGames === 0)
			winRateValue = 0;
		else
        	winRateValue = ((wins / totalGames) * 100).toFixed(1);
        winRateElement.textContent = `${winRateValue}%`;
        const circle = this.content.querySelector("#progress-circle");
        const dasharray = `${winRateValue}, 100`;
        circle.setAttribute("stroke-dasharray", dasharray);

        page.appendChild(renderRightBar());

        return page;
    }
}

export function renderProfile() {
    const page = new Profile();
    return page.render();
}

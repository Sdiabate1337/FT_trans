import { navigate } from './router.js';
// import { fetchUSerData } from './fetchPlayerData.js';

let player1Name = "player1";
let player2Name;
let player1img = "../images/player1.png";
let player2img;


class localGame {

    content = document.createElement('div');
    constructor()
	{
		if (localStorage.getItem("local-game") === "1")
		{
			localStorage.setItem('Player_Name2', 'Guest');
			localStorage.setItem('img_player2', '../images/player2.png');
			player2Name =  'Guest';
			player2img =  '../images/player1.png';
		}
		else if (localStorage.getItem('tournement8') === "1")
		{

			if (localStorage.getItem('quarterfinal1') === "0")
			{
				player1img = localStorage.getItem('img_player1');
				player2img = localStorage.getItem('img_player2');
				player1Name = localStorage.getItem('Player_Name1');
				player2Name = localStorage.getItem('Player_Name2');
			}
			else if (localStorage.getItem('quarterfinal2') === "0")
			{
				player1img = localStorage.getItem('img_player3');
				player2img = localStorage.getItem('img_player4');
				player1Name = localStorage.getItem('Player_Name3');
				player2Name = localStorage.getItem('Player_Name4');
			}
			else if (localStorage.getItem('quarterfinal3') === "0")
			{
				player1img = localStorage.getItem('img_player5');
				player2img = localStorage.getItem('img_player6');
				player1Name = localStorage.getItem('Player_Name5');
				player2Name = localStorage.getItem('Player_Name6');
			}
			else if (localStorage.getItem('quarterfinal4') === "0")
			{
				player1img = localStorage.getItem('img_player7');
				player2img = localStorage.getItem('img_player8');
				player1Name = localStorage.getItem('Player_Name7');
				player2Name = localStorage.getItem('Player_Name8');
			}
			else if (localStorage.getItem('semifinal1') === "0")
			{
				player1img = localStorage.getItem('img_player_semifinale1');
				player2img = localStorage.getItem('img_player_semifinale2');
				player1Name = localStorage.getItem('player_semifinale1');
				player2Name = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				player1img = localStorage.getItem('img_player_semifinale3');
				player2img = localStorage.getItem('img_player_semifinale4');
				player1Name = localStorage.getItem('player_semifinale3');
				player2Name = localStorage.getItem('player_semifinale4');
			}
			else
			{
				player1img = localStorage.getItem('img_final_1');
				player2img = localStorage.getItem('img_final_2');
				player1Name = localStorage.getItem('Player_final_1');
				player2Name = localStorage.getItem('Player_final_2');
			}
		}
		else if (localStorage.getItem('tournement4') === "1")
		{
			if (localStorage.getItem('semifinal1') === "0")
			{
				player1img = localStorage.getItem('img_player_semifinale1');
				player2img = localStorage.getItem('img_player_semifinale2');
				player1Name = localStorage.getItem('player_semifinale1');
				player2Name = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				player1img = localStorage.getItem('img_player_semifinale3');
				player2img = localStorage.getItem('img_player_semifinale4');
				player1Name = localStorage.getItem('player_semifinale3');
				player2Name = localStorage.getItem('player_semifinale4');
			}
			else
			{
				player1img = localStorage.getItem('img_final_1');
				player2img = localStorage.getItem('img_final_2');
				player1Name = localStorage.getItem('Player_final_1');
				player2Name = localStorage.getItem('Player_final_2');
			}
		}
  
    }
    async setPlayer1Data() {
			try {
				const response = await fetch('http://localhost:8000/api/users/userProfile/', {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				const data = await response.json();
				if (response.ok) {
					if (data.username === null) {
						player1Name = 'Guest';
					} else
					{
						player1Name = data.username;
						localStorage.setItem('Player_Name1', data.username);
					}
					if(data.avatar === null){
						player1img = "images/player1.png";
					} else
					{
						localStorage.setItem('img_player1', data.avatar);
						player1img = data.avatar;
					}
				} else {
					showAlert(data.error || 'failed to load user image');
				}
			} catch (error) {
				showAlert(error || 'failed to fetch user profile ==> error: ');
			}
    }

    render(){
        const page = document.createDocumentFragment();
        this.content.className = 'local-game-container';
        this.content.innerHTML=	`
                    <div class="game-setup">
                        <div  id="return-btn-div" >
                            <btn id="return-btn">Return</btn>
                        </div>
                        <div class="player-section player-left">
                            <div class="player-info">
                                <div class="player-profile">
                                    <div class="player-level">
                                        <span id="level-text">1337</span>
                                    </div>
                                    <div class="player-picture">
                                        <img id="player-pic" src="${player1img}" alt="player1" class="player-pic">
                                    </div>
                                    <div class="player-rank">
                                        <img id="rank-pic" src="images/runk_diamond.svg" alt="rank1" class="rank-pic">
                                    </div>
                                    <div class="player-name">
                                        <h1 id="player-name">${player1Name}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="assets">
                                <div class="asset-group">
                                    <h4 id="assets-selection">Choose Paddle</h4>
                                    <div class="paddles">
                                        <div class="paddle paddle-classic">
                                            <button class="asset-button selected" data-type="paddle" data-name="Classic">
                                                <img src="images/classic-paddle.svg" alt="Classic Paddle">
                                            </button>
                                            <span>Classic</span>
                                        </div>
                                        <div class="paddle paddle-space">
                                            <button class="asset-button" data-type="paddle" data-name="Space">
                                                <img src="images/neon-paddle.svg" alt="Space Paddle">
                                            </button>
                                            <span>Space</span>
                                        </div>
                                        <div class="paddle paddle-earth">
                                            <button class="asset-button" data-type="paddle" data-name="Earth">
                                                <img src="images/earth-paddle.svg" alt="Earth Paddle">
                                            </button>
                                            <span>Earth</span>
                                        </div>
                                        <div class="paddle paddle-water">
                                            <button class="asset-button" data-type="paddle" data-name="Water">
                                                <img src="images/water-paddle.svg" alt="Water Paddle">
                                            </button>
                                            <span>Water</span>
                                        </div>
                                        <div class="paddle paddle-fire">
                                            <button class="asset-button" data-type="paddle" data-name="Fire">
                                                <img src="images/fire-paddle.svg" alt="Fire Paddle">
                                            </button>
                                            <span>Fire</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="asset-group">
                                    <h4 id="assets-selection">Choose Ball</h4>
                                    <div class="balls">
                                        <div class="ball ball-classic">
                                            <button class="asset-button selected" data-type="ball" data-name="Classic">
                                                <img src="images/classic-ball.svg" alt="Classic Ball">
                                            </button>
                                            <span>Classic</span>
                                        </div>
                                        <div class="ball ball-space">
                                            <button class="asset-button" data-type="ball" data-name="Space">
                                                <img src="images/neon-ball.svg" alt="Space Ball">
                                            </button>
                                            <span>Space</span>
                                        </div>
                                        <div class="ball ball-earth">
                                            <button class="asset-button" data-type="ball" data-name="Earth">
                                                <img src="images/earth-ball.svg" alt="Earth Ball">
                                            </button>
                                            <span>Earth</span>
                                        </div>
                                        <div class="ball ball-water">
                                            <button class="asset-button" data-type="ball" data-name="Water">
                                                <img src="images/water-ball.svg" alt="Water Ball">
                                            </button>
                                            <span>Water</span>
                                        </div>
                                        <div class="ball ball-fire">
                                            <button class="asset-button" data-type="ball" data-name="Fire">
                                                <img src="images/fire-ball.svg" alt="Fire Ball">
                                            </button>
                                            <span>Fire</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="vs-section">
                            <img src="images/vs.svg" alt="" id="vs">
                        </div>
                        <div class="player-section player-right">
                            <div class="player-info">
                                <div class="player-profile">
                                    <div class="player-level">
                                        <span id="level-text">1337</span>
                                    </div>
                                    <div class="player-picture">
                                        <img id="player-pic" src="${player2img}" alt="player1" class="player-pic">
                                    </div>
                                    <div class="player-rank">
                                        <img id="rank-pic" src="images/runk_diamond.svg" alt="rank1" class="rank-pic">
                                    </div>
                                    <div class="player-name">
                                        <h1 id="player-name">${player2Name}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="assets">
                                <div class="asset-group">
                                    <h4 id="assets-selection">Choose Paddle</h4>
                                    <div class="paddles">
                                        <div class="paddle paddle-classic">
                                            <button class="asset-button selected" data-type="paddle" data-name="Classic">
                                                <img src="images/classic-paddle.svg" alt="Classic Paddle">
                                            </button>
                                            <span>Classic</span>
                                        </div>
                                        <div class="paddle paddle-space">
                                            <button class="asset-button" data-type="paddle" data-name="Space">
                                                <img src="images/neon-paddle.svg" alt="Space Paddle">
                                            </button>
                                            <span>Space</span>
                                        </div>
                                        <div class="paddle paddle-earth">
                                            <button class="asset-button" data-type="paddle" data-name="Earth">
                                                <img src="images/earth-paddle.svg" alt="Earth Paddle">
                                            </button>
                                            <span>Earth</span>
                                        </div>
                                        <div class="paddle paddle-water">
                                            <button class="asset-button" data-type="paddle" data-name="Water">
                                                <img src="images/water-paddle.svg" alt="Water Paddle">
                                            </button>
                                            <span>Water</span>
                                        </div>
                                        <div class="paddle paddle-fire">
                                            <button class="asset-button" data-type="paddle" data-name="Fire">
                                                <img src="images/fire-paddle.svg" alt="Fire Paddle">
                                            </button>
                                            <span>Fire</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="asset-group">
                                    <h4 id="assets-selection">Choose Ball</h4>
                                    <div class="balls">
                                        <div class="ball ball-classic">
                                            <button class="asset-button selected" data-type="ball" data-name="Classic">
                                                <img src="images/classic-ball.svg" alt="Classic Ball">
                                            </button>
                                            <span>Classic</span>
                                        </div>
                                        <div class="ball ball-space">
                                            <button class="asset-button" data-type="ball" data-name="Space">
                                                <img src="images/neon-ball.svg" alt="Space Ball">
                                            </button>
                                            <span>Space</span>
                                        </div>
                                        <div class="ball ball-earth">
                                            <button class="asset-button" data-type="ball" data-name="Earth">
                                                <img src="images/earth-ball.svg" alt="Earth Ball">
                                            </button>
                                            <span>Earth</span>
                                        </div>
                                        <div class="ball ball-water">
                                            <button class="asset-button" data-type="ball" data-name="Water">
                                                <img src="images/water-ball.svg" alt="Water Ball">
                                            </button>
                                            <span>Water</span>
                                        </div>
                                        <div class="ball ball-fire">
                                            <button class="asset-button" data-type="ball" data-name="Fire">
                                                <img src="images/fire-ball.svg" alt="Fire Ball">
                                            </button>
                                            <span>Fire</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="game-preview">
                        <button class="nav-button" id="prev-button">‹</button>
                            <div class="game-preview-images">
                                <img src="images/classic-map.svg" alt="classic-map">
                                <img src="images/fire-map.svg" alt="fire-map">
                                <img src="images/earth-map.svg" alt="earth-map">
                                <img src="images/neon-map.svg" alt="neon-map">
                                <img src="images/water-map.svg" alt="water-map">
                            </div>
                            <button class="nav-button" id="next-button">›</button>
                    </div>
                    <div class="play-button-container">
                        <button class="play-button">PLAY</button>
                    </div>
                        `;
        page.appendChild(this.content)
        const body = document.body
        body.style.alignItems = 'center';

		if (localStorage.getItem("local-game") === "1")
		{
			this.setPlayer1Data().then(() => {
				const player1NameElement = this.content.querySelector('.player-left .player-name h1');
				player1NameElement.innerText = player1Name;
				const player1ImageElement = this.content.querySelector('.player-left .player-picture img');
				player1ImageElement.src = player1img;
			});
		}

        
        const handleSelection = (playerSection, assetType) => {
            const buttons = playerSection.querySelectorAll(`.${assetType} .asset-button`);
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove(`selected-${assetType}`));
                    button.classList.add(`selected-${assetType}`);
                });
            });
        };
        
        function showNotification(message, iconUrl) {
            
            const notification = document.createElement('div');
            notification.className = 'popup';
        
            
            const icon = document.createElement('img');
            icon.src = iconUrl;
            icon.className = 'popup-icon';
        
            
            const messageElement = document.createElement('div');
            messageElement.innerText = message;
        
            
            notification.appendChild(icon);
            notification.appendChild(messageElement);
        
            
            document.body.appendChild(notification);
        
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
        
            
            setTimeout(() => {
                notification.classList.remove('show');
                
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }, 3000);
        }

        const playerSections = this.content.querySelectorAll('.player-section');
        playerSections.forEach(playerSection => {
            handleSelection(playerSection, 'paddle');
            handleSelection(playerSection, 'ball');
        });
    
        const images = this.content.querySelectorAll('.game-preview-images img');
        let currentIndex = 0;
    
        const updateImageDisplay = () => {
            images.forEach((img, index) => {
                img.style.display = index === currentIndex ? 'block' : 'none';
            });
        };
    
        updateImageDisplay();
    
        this.content.querySelectorAll('.nav-button').forEach((button, index) => {
            button.addEventListener('click', () => {
                currentIndex = index === 0 ? (currentIndex - 1 + images.length) % images.length : (currentIndex + 1) % images.length;
                updateImageDisplay();
            });
        });
        
        const returnButton = this.content.querySelector('#return-btn');
        returnButton.addEventListener('click', () => {
			localStorage.clear();
            navigate('/');
        });

        const playButton = this.content.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            if (validateSelections()) {
                showNotification('Game is starting...', '/images/ping-pong.png');
                setTimeout(() => {
                    navigate('/game-play');
                }, 3000);
            }
        });

        
    
        const validateSelections = () => {

            const player1Section = document.querySelector('.player-left');
            const player2Section = document.querySelector('.player-right');
            try {
                const player1PaddleElement = player1Section.querySelector('.paddle .selected-paddle img');
                if (!player1PaddleElement) {
                    throw new Error("Player 1 Paddle not selected");
                }
                const player1Paddle = player1PaddleElement.src;
        
                const player1BallElement = player1Section.querySelector('.ball .selected-ball img');
                if (!player1BallElement) {
                    throw new Error("Player 1 Ball not selected");
                }
                const player1Ball = player1BallElement.src;
        
                const player2PaddleElement = player2Section.querySelector('.paddle .selected-paddle img');
                if (!player2PaddleElement) {
                    throw new Error("Player 2 Paddle not selected");
                }
                const player2Paddle = player2PaddleElement.src;
        
                const player2BallElement = player2Section.querySelector('.ball .selected-ball img');
                if (!player2BallElement) {
                    throw new Error("Player 2 nBall not selected");s
                }
                const player2Ball = player2BallElement.src;
        
                localStorage.setItem('player1Paddle', player1Paddle);
                localStorage.setItem('player1Ball', player1Ball);
                localStorage.setItem('player2Paddle', player2Paddle);
                localStorage.setItem('player2Ball', player2Ball);
        
                const selectedMap = images[currentIndex].src;
                localStorage.setItem('selectedMap', selectedMap);
        
                return true;
            } catch (e) {
                console.error(e); 
                showNotification(e.message , "/images/alert.svg");
                return;
            }
        };


        return page;
    }
    
}

export function renderLocalGame() {
    const page = new localGame();
    return page.render();
}
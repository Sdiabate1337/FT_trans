import { LeftLine } from "./left_line.js";
import { RightLine } from "./right_line.js";
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';


class EightPlayers
{
	content = document.createElement('span');
	constructor()
	{
	}
	render()
	{
		const page = document.createDocumentFragment();
		// page.appendChild(renderLeftBar());
		this.content.className = 'eight-players';
		this.content.innerHTML = `
				<div id="TOURNEMENT">
					<div class="line">
					</div>
					<div class="TOURNEMENT_">
						<h1> TOURNEMENT </h1>
					</div>
					<div class="line">
					</div>
				</div>
				<div class="tour_8_players">
					<div class="quarter_final_left">
						<div class="quarter_final_left_" id="quarter_final_left1">

						</div>
						<div class="quarter_final_left_" id="quarter_final_left2">

						</div>
					</div>
					<div class="demi_final_left" id="demi_final_left">

					</div>
					<div class="final">
						<div class="container1__">
							<img src="../images/Group1452.svg" width="100%" height="100%">
						</div>
						<div class="container2__">
							<div id="player_final_left">
								<div class="img_player_" id="img_player_semifinal1">
								</div>
							</div>
								<div class="final_8">
								</div>
							<div id="player_final_right">
								<div class="img_player_" id="img_player_semifinal2">
								</div>
							</div>
						</div>
						<div class="container3__">
							<img src="../images/star.svg" width="20%" >
							<div class="img_player_1" id="img_player_winner">
							</div>
							<h1> WINNER </h1>
						</div>
					</div>
					<div class="demi_final_right" id="demi_final_right">

					</div>
					<div class="quarter_final_right">
						<div class="quarter_final_left_" id="quarter_final_right1">

						</div>
						<div class="quarter_final_left_" id="quarter_final_right2">

						</div>
					</div>
				</div>
				<div id="winner_quit">
					<div id="quit">
						<button id="quit-button">Quit</button>
					</div>
				</div>
		`;
		page.appendChild(this.content)
		// page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';


		const quarterfinal1 = new LeftLine(localStorage.getItem('img_player1'), localStorage.getItem('img_player2'));
		const quarterfinal2 = new LeftLine(localStorage.getItem('img_player3'), localStorage.getItem('img_player4'));
        const quarterfinal3 = new RightLine(localStorage.getItem('img_player5'), localStorage.getItem('img_player6'));
        const quarterfinal4 = new RightLine(localStorage.getItem('img_player7'), localStorage.getItem('img_player8'));
		
		const semifinal1 = new LeftLine(localStorage.getItem('img_player_semifinale1'), localStorage.getItem('img_player_semifinale2'));
        const semifinal2 = new RightLine(localStorage.getItem('img_player_semifinale3'), localStorage.getItem('img_player_semifinale4'));


		const leftquarterfinal1 = this.content.querySelector("#quarter_final_left1");
        if (leftquarterfinal1) {
            leftquarterfinal1.appendChild(quarterfinal1.content);
        }
		const leftquarterfinal2 = this.content.querySelector("#quarter_final_left2");
        if (leftquarterfinal2) {
            leftquarterfinal2.appendChild(quarterfinal2.content);
        }
		
		const rightquarterfinal1 = this.content.querySelector("#quarter_final_right1");
        if (rightquarterfinal1) {
            rightquarterfinal1.appendChild(quarterfinal3.content);
        }
		const rightquarterfinal2 = this.content.querySelector("#quarter_final_right2");
        if (rightquarterfinal2) {
            rightquarterfinal2.appendChild(quarterfinal4.content);
        }


		const leftfinal1 = this.content.querySelector("#demi_final_left");
        if (leftfinal1) {
            leftfinal1.appendChild(semifinal1.content);
        }
		const rightfinal2 = this.content.querySelector("#demi_final_right");
        if (rightfinal2) {
            rightfinal2.appendChild(semifinal2.content);
        }

		const quit = this.content.querySelector("#quit-button");
		quit.addEventListener('click', event =>
		{
			event.preventDefault();
			this.navigationCancelled = true;
			localStorage.clear();
			localStorage.setItem('playtour', "0");
			navigate('/tournement/create');
		});


		const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

        const checkAndNavigate = async () => {
            let shouldNavigate = false;
            let msg;

            if (localStorage.getItem('quarterfinal1') === "0") {
                msg = "play quarter final 1";
                shouldNavigate = true;
            } else if (localStorage.getItem('quarterfinal1') === "1") {
				const semifinal1_ = new LeftLine(localStorage.getItem('img_player_semifinale1'), localStorage.getItem('img_player_semifinale2'));
				const leftfinal1_ = this.content.querySelector("#demi_final_left");
       			if (leftfinal1_) {
					leftfinal1_.innerHTML =``;
       			    leftfinal1_.appendChild(semifinal1_.content);
       			}
            }
			
            if (localStorage.getItem('quarterfinal2') === "0" && localStorage.getItem('quarterfinal1') === "1") {
				msg = "play quarter final 2";
                shouldNavigate = true;
            } else if (localStorage.getItem('quarterfinal2') === "1") {
				const semifinal1__ = new LeftLine(localStorage.getItem('img_player_semifinale1'), localStorage.getItem('img_player_semifinale2'));
				const leftfinal1__ = this.content.querySelector("#demi_final_left");
				if (leftfinal1__) {
					leftfinal1__.innerHTML =``;
					leftfinal1__.appendChild(semifinal1__.content);
				}
            }

            if (localStorage.getItem('quarterfinal3') === "0" && localStorage.getItem('quarterfinal2') === "1") {
                msg = "play quarter final 3";
                shouldNavigate = true;
            } else if (localStorage.getItem('quarterfinal3') === "1") {
                const semifinal2_ = new RightLine(localStorage.getItem('img_player_semifinale3'), localStorage.getItem('img_player_semifinale4'));
				const rightfinal2_ = this.content.querySelector("#demi_final_right");
        		if (rightfinal2_) {
					rightfinal2_.innerHTML=``;
        		    rightfinal2_.appendChild(semifinal2_.content);
        		}
            }
			
            if (localStorage.getItem('quarterfinal4') === "0" && localStorage.getItem('quarterfinal3') === "1") {
				msg = "play quarter final 4";
                shouldNavigate = true;
            } else if (localStorage.getItem('quarterfinal4') === "1") {
				const semifinal2__ = new RightLine(localStorage.getItem('img_player_semifinale3'), localStorage.getItem('img_player_semifinale4'));
				const rightfinal2__ = this.content.querySelector("#demi_final_right");
				if (rightfinal2__) {
					rightfinal2__.innerHTML=``;
					rightfinal2__.appendChild(semifinal2__.content);
				}
            }

            if (localStorage.getItem('semifinal1') === "0" && localStorage.getItem('quarterfinal4') === "1") {
                msg = "play semi final 1";
                shouldNavigate = true;
            } else if (localStorage.getItem('semifinal1') === "1") {
                const img_player_semifinal1 = this.content.querySelector("#img_player_semifinal1");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final_1');
                imgElement.className = "img_player_staylee";
                img_player_semifinal1.appendChild(imgElement);
            }

            if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1") {
                msg = "play semi final 2";
                shouldNavigate = true;
            } else if (localStorage.getItem('semifinal2') === "1") {
                const img_player_semifinal2 = this.content.querySelector("#img_player_semifinal2");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final_2');
                imgElement.className = "img_player_staylee";
                img_player_semifinal2.appendChild(imgElement);
            }

            if (localStorage.getItem('end') === "0" && localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1") {
                msg = "play final";
                shouldNavigate = true;
            } else if (localStorage.getItem('final') === "1") {
                const img_player_final = this.content.querySelector("#img_player_winner");
                const imgElement = document.createElement('img');
                imgElement.src = localStorage.getItem('img_final');
                imgElement.className = "img_player_staylee";
                img_player_final.appendChild(imgElement);
            }

            if (shouldNavigate) {
                await sleep(3000);
                if (!this.navigationCancelled) {
                    alert(msg);
					navigate('/local-game');
                }
            }
        };

        if (localStorage.getItem('playtour') === "1") {
            checkAndNavigate();
        }



		return page;

	}
}


export function renderEightPlayers() {
	const page = new EightPlayers();
	return page.render();
}
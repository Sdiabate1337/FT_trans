import { navigate } from './router.js';

export class Match
{
	content = document.createElement('span');
	constructor()
	{
		this.img1;
		this.img2;
		this.player1;
		this.player2;
		
		if (localStorage.getItem('tournement8') === "1")
		{

			if (localStorage.getItem('quarterfinal1') === "0")
			{
				this.img1 = localStorage.getItem('img_player1');
				this.img2 = localStorage.getItem('img_player2');
				this.player1 = localStorage.getItem('Player_Name1');
				this.player2 = localStorage.getItem('Player_Name2');
			}
			else if (localStorage.getItem('quarterfinal2') === "0")
			{
				this.img1 = localStorage.getItem('img_player3');
				this.img2 = localStorage.getItem('img_player4');
				this.player1 = localStorage.getItem('Player_Name3');
				this.player2 = localStorage.getItem('Player_Name4');
			}
			else if (localStorage.getItem('quarterfinal3') === "0")
			{
				this.img1 = localStorage.getItem('img_player5');
				this.img2 = localStorage.getItem('img_player6');
				this.player1 = localStorage.getItem('Player_Name5');
				this.player2 = localStorage.getItem('Player_Name6');
			}
			else if (localStorage.getItem('quarterfinal4') === "0")
			{
				this.img1 = localStorage.getItem('img_player7');
				this.img2 = localStorage.getItem('img_player8');
				this.player1 = localStorage.getItem('Player_Name7');
				this.player2 = localStorage.getItem('Player_Name8');
			}
			else if (localStorage.getItem('semifinal1') === "0")
			{
				this.img1 = localStorage.getItem('img_player_semifinale1');
				this.img2 = localStorage.getItem('img_player_semifinale2');
				this.player1 = localStorage.getItem('player_semifinale1');
				this.player2 = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				this.img1 = localStorage.getItem('img_player_semifinale3');
				this.img2 = localStorage.getItem('img_player_semifinale4');
				this.player1 = localStorage.getItem('player_semifinale3');
				this.player2 = localStorage.getItem('player_semifinale4');
			}
			else
			{
				this.img1 = localStorage.getItem('img_final_1');
				this.img2 = localStorage.getItem('img_final_2');
				this.player1 = localStorage.getItem('Player_final_1');
				this.player2 = localStorage.getItem('Player_final_2');
			}
		}
		else if (localStorage.getItem('tournement4') === "1")
		{
			if (localStorage.getItem('semifinal1') === "0")
			{
				this.img1 = localStorage.getItem('img_player_semifinale1');
				this.img2 = localStorage.getItem('img_player_semifinale2');
				this.player1 = localStorage.getItem('player_semifinale1');
				this.player2 = localStorage.getItem('player_semifinale2');
			}
			else if (localStorage.getItem('semifinal2') === "0")
			{
				
				this.img1 = localStorage.getItem('img_player_semifinale3');
				this.img2 = localStorage.getItem('img_player_semifinale4');
				this.player1 = localStorage.getItem('player_semifinale3');
				this.player2 = localStorage.getItem('player_semifinale4');
			}
			else
			{
				this.img1 = localStorage.getItem('img_final_1');
				this.img2 = localStorage.getItem('img_final_2');
				this.player1 = localStorage.getItem('Player_final_1');
				this.player2 = localStorage.getItem('Player_final_2');
			}
		}
	}
	
	render()
	{
		const page = document.createDocumentFragment();
		this.content.className = "test_match";
		this.content.innerHTML = `

				<div class="player_local1">
					<h1> ${this.player1} </h1>
					<img src="${this.img1}">
					<button class="button" id="winer_local1" >winner</button>
				</div>
				<div class="player_local1">
					<h1> ${this.player2} </h1>
					<img src="${this.img2}">
					<button class="button"  id="winer_local2">winner</button>
				</div>

		`;
		const body = document.body
		body.style.alignItems = 'center';

		page.appendChild(this.content)

		const winer_local1 = this.content.querySelector("#winer_local1");
		winer_local1.addEventListener('click', event =>
		{
			event.preventDefault();
			if (localStorage.getItem('tournement8') === "1")
			{
				if(localStorage.getItem('quarterfinal1') === "0")
				{
					localStorage.setItem('quarterfinal1', "1");
					localStorage.setItem('img_player_semifinale1', this.img1);
					localStorage.setItem('player_semifinale1', this.player1);
				}
				else if (localStorage.getItem('quarterfinal2') === "0" && localStorage.getItem('quarterfinal1') === "1")
				{
					localStorage.setItem('quarterfinal2', "1");
					localStorage.setItem('img_player_semifinale2', this.img1);
					localStorage.setItem('player_semifinale2', this.player1);
				}
				else if (localStorage.getItem('quarterfinal3') === "0" && localStorage.getItem('quarterfinal2') === "1")
				{
					localStorage.setItem('quarterfinal3', "1");
					localStorage.setItem('img_player_semifinale3', this.img1);
					localStorage.setItem('player_semifinale3', this.player1);
				}
				else if (localStorage.getItem('quarterfinal4') === "0" && localStorage.getItem('quarterfinal3') === "1")
				{
					localStorage.setItem('quarterfinal4', "1");
					localStorage.setItem('img_player_semifinale4', this.img1);
					localStorage.setItem('player_semifinale4', this.player1);
				}
				else if (localStorage.getItem('semifinal1') === "0" && localStorage.getItem('quarterfinal4') === "1")
				{
					localStorage.setItem('semifinal1', "1");
					localStorage.setItem('img_final_1', this.img1);
					localStorage.setItem('Player_final_1', this.player1);
				}
				else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('semifinal2', "1");
					localStorage.setItem('img_final_2', this.img1);
					localStorage.setItem('Player_final_2', this.player1);
				}
				else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('final', "1");
					localStorage.setItem('end', "1");
					localStorage.setItem('img_final', this.img1);
					localStorage.setItem('Player_final', this.player1);
				}
			}
			else if (localStorage.getItem('tournement4') === "1")
			{
				if (localStorage.getItem('semifinal1') === "0")
				{
					localStorage.setItem('semifinal1', "1");
					localStorage.setItem('img_final_1', this.img1);
					localStorage.setItem('Player_final_1', this.player1);
				}
				else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('semifinal2', "1");
					localStorage.setItem('img_final_2', this.img1);
					localStorage.setItem('Player_final_2', this.player1);
				}
				else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('final', "1");
					localStorage.setItem('end', "1");
					localStorage.setItem('img_final', this.img1);
					localStorage.setItem('Player_final', this.player1);
				}

			}


			if(localStorage.getItem('tournement8') === "1")
				navigate('/tournement/Eightplayers');
			else
				navigate('/tournement/Fourplayers');
		});
		const winer_local2 = this.content.querySelector("#winer_local2");
		winer_local2.addEventListener('click', event =>
		{
			event.preventDefault();
			if (localStorage.getItem('tournement8') === "1")
			{
				if(localStorage.getItem('quarterfinal1') === "0")
				{
					localStorage.setItem('quarterfinal1', "1");
					localStorage.setItem('img_player_semifinale1', this.img2);
					localStorage.setItem('player_semifinale1', this.player2);
				}
				else if (localStorage.getItem('quarterfinal2') === "0" && localStorage.getItem('quarterfinal1') === "1")
				{
					localStorage.setItem('quarterfinal2', "1");
					localStorage.setItem('img_player_semifinale2', this.img2);
					localStorage.setItem('player_semifinale2', this.player2);
				}
				else if (localStorage.getItem('quarterfinal3') === "0" && localStorage.getItem('quarterfinal2') === "1")
				{
					localStorage.setItem('quarterfinal3', "1");
					localStorage.setItem('img_player_semifinale3', this.img2);
					localStorage.setItem('player_semifinale3', this.player2);
				}
				else if (localStorage.getItem('quarterfinal4') === "0" && localStorage.getItem('quarterfinal3') === "1")
				{
					localStorage.setItem('quarterfinal4', "1");
					localStorage.setItem('img_player_semifinale4', this.img2);
					localStorage.setItem('player_semifinale4', this.player2);
				}
				else if (localStorage.getItem('semifinal1') === "0" && localStorage.getItem('quarterfinal4') === "1")
				{
					localStorage.setItem('semifinal1', "1");
					localStorage.setItem('img_final_1', this.img2);
					localStorage.setItem('Player_final_1', this.player2);
				}
				else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('semifinal2', "1");
					localStorage.setItem('img_final_2', this.img2);
					localStorage.setItem('Player_final_2', this.player2);
				}
				else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('final', "1");
					localStorage.setItem('end', "1");
					localStorage.setItem('img_final', this.img2);
					localStorage.setItem('Player_final', this.player2);
				}
			}
			if (localStorage.getItem('tournement4') === "1")
			{
				if (localStorage.getItem('semifinal1') === "0")
				{
					localStorage.setItem('semifinal1', "1");
					localStorage.setItem('img_final_1', this.img2);
					localStorage.setItem('Player_final_1', this.player2);
				}
				else if (localStorage.getItem('semifinal2') === "0" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('semifinal2', "1");
					localStorage.setItem('img_final_2', this.img2);
					localStorage.setItem('Player_final_2', this.player2);
				}
				else if (localStorage.getItem('semifinal2') === "1" && localStorage.getItem('semifinal1') === "1")
				{
					localStorage.setItem('final', "1");
					localStorage.setItem('end', "1");
					localStorage.setItem('img_final', this.img2);
					localStorage.setItem('Player_final', this.player2);
				}

			}
			if(localStorage.getItem('tournement8') === "1")
				navigate('/tournement/Eightplayers');
			else
				navigate('/tournement/Fourplayers');
		});

		return page;
	}
}

export function rendertestmatch() {
	const page = new Match();
	return page.render();
}

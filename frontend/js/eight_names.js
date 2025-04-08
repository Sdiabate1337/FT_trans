
import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class EightName
{

	content = document.createElement('span');

	constructor()
	{

	}
	render()
	{
		const tournamentName = localStorage.getItem('tournamentName');
		const page = document.createDocumentFragment();

		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);

		this.content.className = 'eightnames';
		this.content.innerHTML = `
			<div class="eightnames_">
				<h1>${tournamentName}</h1>
			</div>
			<div class="eightblocks">
				<div class="eightblocks1">
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/player1.png">
						</div>
						<div class="img_test_1"> 
							<h1> Player 1  </h1>
							<input class="input_player_local" id="input1_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/player4.png">
						</div>
						<div class="img_test_1"> 
							<h1> Player 2  </h1>
							<input class="input_player_local" id="input2_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/player3.png">
						</div>
						<div class="img_test_1"> 
							<h1> Player 3  </h1>
							<input class="input_player_local" id="input3_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/player2.png">
						</div>
						<div class="img_test_1"> 
							<h1> Player 4  </h1>
							<input class="input_player_local" id="input4_player_local" placeholder="" > </input>
						</div>
					</div>
				</div>
				<div class="eightblocks1">
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/gon.jpg">
						</div>
						<div class="img_test_1">
							<h1> Player 5  </h1>
							<input class="input_player_local" id="input5_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/KILLUA.jpg">
						</div>
						<div class="img_test_1">
							<h1> Player 6  </h1>
							<input class="input_player_local" id="input6_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/kurabika.jpg">
						</div>
						<div class="img_test_1">
							<h1> Player 7  </h1>
							<input class="input_player_local" id="input7_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player8">
						<div class="img_test_"> 
							<img src="../images/hessoka.jpg">
						</div>
						<div class="img_test_1">
							<h1> Player 8  </h1>
							<input class="input_player_local" id="input8_player_local" placeholder="" > </input>
						</div>
					</div>
				</div>
			</div>
			<div class="to_play_tou8">
				<button type="quit" id="quitt" class="button__class" >QUIT</button>
				<button type="submit" id="submit" class="button__class" >SUBMIT</button>
			</div>
		`;

		page.appendChild(this.content);
		const body = document.body
		body.style.alignItems = 'center';
		body.style.justifyContent = 'center';


		const quit = this.content.querySelector("#quitt");
		quit.addEventListener('click', event =>
		{
			event.preventDefault();
			localStorage.setItem('tournamentName', "");
			navigate('/tournement');
		});
		const submit = this.content.querySelector("#submit");
		submit.addEventListener('click', event =>
		{
			event.preventDefault();
			

			const input1 = this.content.querySelector('#input1_player_local').value;
			const input2 = this.content.querySelector('#input2_player_local').value;
			const input3 = this.content.querySelector('#input3_player_local').value;
			const input4 = this.content.querySelector('#input4_player_local').value;
			const input5 = this.content.querySelector('#input5_player_local').value;
			const input6 = this.content.querySelector('#input6_player_local').value;
			const input7 = this.content.querySelector('#input7_player_local').value;
			const input8 = this.content.querySelector('#input8_player_local').value;
			

			const inputs = [input1, input2, input3, input4, input5, input6, input7, input8];
			let result = 0;
			
			for (let i = 0; i < inputs.length; i++)
			{
				for (let j = i+1; j < inputs.length; j++) {
					if (inputs[i] === inputs[j])
					{
						result = 1;
					}
				}
			}

			if (input1.length == 0 || input2.length == 0 || input3.length == 0 || input4.length == 0)
				showAlert("ERROR : Empty input");
			else if (input5.length == 0 || input6.length == 0 || input7.length == 0 || input8.length == 0)
				showAlert("ERROR : Empty input");
			else if (result === 1)
			{
				showAlert("ERROR : Duplicates input");
			}
			else
			{
				localStorage.setItem('tournement8', "1");
				localStorage.setItem('img_player1', "../images/player1.png");
				localStorage.setItem('img_player2', "../images/player4.png");
				localStorage.setItem('img_player3', "../images/player3.png");
				localStorage.setItem('img_player4', "../images/player2.png");
				localStorage.setItem('img_player5', "../images/gon.jpg");
				localStorage.setItem('img_player6', "../images/KILLUA.jpg");
				localStorage.setItem('img_player7', "../images/kurabika.jpg");
				localStorage.setItem('img_player8', "../images/hessoka.jpg");
				localStorage.setItem('Player_Name1', input1.trim());
				localStorage.setItem('Player_Name2', input2.trim());
				localStorage.setItem('Player_Name3', input3.trim());
				localStorage.setItem('Player_Name4', input4.trim());
				localStorage.setItem('Player_Name5', input5.trim());
				localStorage.setItem('Player_Name6', input6.trim());
				localStorage.setItem('Player_Name7', input7.trim());
				localStorage.setItem('Player_Name8', input8.trim());
				localStorage.setItem('quarterfinal1', "0");
				localStorage.setItem('quarterfinal2', "0");
				localStorage.setItem('quarterfinal3', "0");
				localStorage.setItem('quarterfinal4', "0");
				localStorage.setItem('semifinal1', "0");
				localStorage.setItem('semifinal2', "0");
				localStorage.setItem('final', "0");
				localStorage.setItem('end', "0");
				localStorage.setItem('playtour', "1");
				navigate('/tournement/Eightplayers');
			}

			
		});


		return page;
	}
}

export function renderEightnames() {
	const page = new EightName();
	return page.render();
}
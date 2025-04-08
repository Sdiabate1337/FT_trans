
import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class FourName
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

		this.content.className = 'fournames';
		this.content.innerHTML = `
			<div class="fournames_">
				<h1>${tournamentName}</h1>
			</div>
			<div class="fourblocks">
				<div class="fourblocks1">
					<div class="local_player">
						<div class="img_test"> 
							<img src="../images/player1.png">
						</div>
						<div class="img_test1"> 
							<h1> Player 1  </h1>
							<input class="input_player_local" id="input1_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player">
						<div class="img_test"> 
							<img src="../images/player4.png">
						</div>
						<div class="img_test1"> 
							<h1> Player 2  </h1>
							<input class="input_player_local" id="input2_player_local" placeholder="" > </input>
						</div>
					</div>
				</div>
				<div class="fourblocks1">
					<div class="local_player">
						<div class="img_test"> 
							<img src="../images/player2.png">
						</div>
						<div class="img_test1">
							<h1> Player 3  </h1>
							<input class="input_player_local" id="input3_player_local" placeholder="" > </input>
						</div>
					</div>
					<div class="local_player">
						<div class="img_test"> 
							<img src="../images/player3.png">
						</div>
						<div class="img_test1">
							<h1> Player 4  </h1>
							<input class="input_player_local" id="input4_player_local" placeholder="" > </input>
						</div>
					</div>
				</div>
			</div>
			<div class="to_play_tou4">
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
			

			const inputs = [input1, input2, input3, input4];
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
			else if (result === 1)
			{
				showAlert("ERROR : Duplicates input");
			}
			else
			{
				localStorage.setItem('tournement4', "1");
				localStorage.setItem('img_player_semifinale1', "../images/player1.png");
				localStorage.setItem('img_player_semifinale2', "../images/player4.png");
				localStorage.setItem('img_player_semifinale3', "../images/player3.png");
				localStorage.setItem('img_player_semifinale4', "../images/player2.png");
				localStorage.setItem('player_semifinale1', input1.trim());
				localStorage.setItem('player_semifinale2', input2.trim());
				localStorage.setItem('player_semifinale3', input3.trim());
				localStorage.setItem('player_semifinale4', input4.trim());
				localStorage.setItem('semifinal1', "0");
				localStorage.setItem('semifinal2', "0");
				localStorage.setItem('final', "0");
				localStorage.setItem('end', "0");
				localStorage.setItem('playtour', "1");
				navigate('/tournement/Fourplayers');
			}
			// function checkForErrors() {
			// 	const values = inputs.map(input => input.value.trim());
			// 	const uniqueValues = new Set(values);
	
			// 	const hasDuplicates = uniqueValues.size !== values.length;
		
		
			// 	if (hasDuplicates) {
			// 		duplicateErrorMessage.style.display = 'block';
			// 	} else {
			// 		duplicateErrorMessage.style.display = 'none';
			// 	}
			// }
		
			// inputs.forEach(input => {
			// 	input.addEventListener('input', checkForErrors);
			// });
			
		});


		return page;
	}
}

export function renderFournames() {
	const page = new FourName();
	return page.render();
}
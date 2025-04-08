import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class GameOnline {
    content = document.createElement('span');
    socket = null;
	user_id;
    constructor() {}

	render() {
		const page = document.createDocumentFragment();
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
	
		this.content.className = 'game_online';
		this.content.innerHTML = `
			<div class="coming-soon-wrapper">
			<div class="overlay"></div>
				<video autoplay muted loop id="bg-video">
        			<source src="../images/bg.mp4" type="video/mp4">
        		Your browser does not support the video tag.
    				</video>
					<audio autoplay loop id="bg-music">
						<source src="../images/music/bg.mp3" type="audio/mp3">
						Your browser does not support the audio tag.
					</audio>
				<div class="coming-soon-content">
					<h1 class="coming-soon-title">Comming Soon ..</h1>
					<p class="coming-soon-subtitle">makaynch hdchi db</p>
					<div class="loader">
						<div class="dot"></div>
						<div class="dot"></div>
						<div class="dot"></div>
					</div>
					</div>
					<btn class="btn-return" id="btn-return">Go Back</btn>
			</div>
		`;

	
		page.appendChild(this.content);
		const btnReturn = this.content.querySelector('#btn-return');
		btnReturn.addEventListener('click', () => {
			navigate('/');
		});
		return page;
	}
	
}

export function rendergameonline() {
    const page = new GameOnline();
    return page.render();
}

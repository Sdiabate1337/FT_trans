import { JoinTournament } from './join_tour.js' ;
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';

class ListTournament
{
	content = document.createElement('span');
	constructor()
	{
	}
	
	render()
	{	
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'create-tournament';
		this.content.innerHTML = `
		<div id="TOURNEMENT">
			<div class="line">
			</div>
			<div class="JOIN_">
				<h1> LIST  TOURNEMENT </h1>
			</div>
			<div class="line">
			</div>
		</div>
		<div id="container-tour">
		</div>
		`

		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}

}

export function renderJoinTournament() {
	const page = new ListTournament();
	return page.render();
}
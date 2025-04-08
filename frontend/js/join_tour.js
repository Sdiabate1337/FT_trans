

export class JoinTournament extends HTMLElement
{
	content = document.createElement('span');
	constructor()
	{

	}
	connectedCallback()
	{
		
	}
	render()
	{
		const name = this.getAttribute('name');
		this.innerHTML = `
			<div class="container_tour">
				<div class="container_tour_">
					<div class="tour_name">
						<img src="../images/Rectangle 1394.svg" width="100%" height="100%">
						<h1 class="h1_class"> ${name} </h1>
					</div>
				</div>
				<div class="container_tour_">
					<h1 class="nmb-player-tour"> 2/4</h1>
				</div>
				<div class="container_tour_">
					<button class="style-button">Join</button>
				</div>
			</div>
		`
	}
}

customElements.define("join-tournament", JoinTournament);
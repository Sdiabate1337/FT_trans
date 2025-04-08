
import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { BallCardsComponent } from './balls_card_component.js';
import { PadlleCardsComponent } from './padlle_card_component.js';
import { navigate } from './router.js';
class Shop
{
	content = document.createElement('span');
	
	constructor()
	{
	}
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());

		this.content.className = 'section2-2-2';
		this.content.innerHTML = `
		<div id="div1">
			<div id="pong-shop">
				<img src="../images/Vector.svg" alt="Vector" height="100%">
				<div id="pong">
					<h1> PONG </h1>
				</div>
				<div id="shop">
					<h1> SHOP </h1>
				</div>
			</div>
			<div id="img">
				<img src="../images/Rectangle 4.jpg" alt="Rectangle" height="100%" width="70%">
			</div>
		</div>
		<div id="div2">
			<div id="div2-1">
				<div class="right-line">
					<div class="line"></div>
					<div class="circlee"></div>
				</div>
				<div id="balls">
					<h1> BALLS </h1>
				</div>
				<div class="right-line">
					<div class="circlee"></div>
					<div class="line"></div>
				</div>
			</div>
			<ballcards-element>
			</ballcards-element>
		</div>
		<div id="div3">
			<div id="div2-1">
				<div class="right-line">
					<div class="line"></div>
					<div class="circlee"></div>
				</div>
				<div id="balls">
					<h1> PADLLE </h1>
				</div>
				<div class="right-line">
					<div class="circlee"></div>
					<div class="line"></div>
				</div>
			</div>
			<padllelcards-element>
			</padllelcards-element>
		</div>`;
		page.appendChild(this.content);
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}
	
}

export function renderShop() {
	const page = new Shop();
	return page.render();
}

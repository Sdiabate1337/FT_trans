import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';

class Tournament
{
	content = document.createElement('span');

	constructor()
	{

	}
	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'tournament-element';
		this.content.innerHTML=	`
		<div id="TOURNEMENT">
			<div class="line">
			</div>
			<div class="TOURNEMENT_">
				<h1> TOURNEMENT </h1>
			</div>
			<div class="line">
			</div>
		</div>
		<div id="TOURNEMENT_img"> 
			<img src="../images/Group2430.svg" width="80%" height="80%">
		</div>
		<div id="create_join_">
			<div id="create">
				<img src="../images/create_img.svg" width="100%" >
			</div>
			<div id="line_">
				<div id="star">
				<svg width="100%" height="100%" viewBox="0 0 74 71" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g filter="url(#filter0_d_1614_5673)">
				<path d="M26.2462 21.621L37 6L47.7538 21.621L66 26.9757L54.4 41.9846L54.923 60.915L37 54.5701L19.077 60.915L19.6 41.9846L8 26.9757L26.2462 21.621Z" fill="white"/>
				<path d="M38.6474 4.86592C38.2742 4.3238 37.6582 4 37 4C36.3418 4 35.7258 4.3238 35.3526 4.86592L25.0016 19.9019L7.43682 25.0566C6.80273 25.2427 6.3015 25.73 6.09759 26.3585C5.89369 26.9871 6.01343 27.6758 6.41754 28.1987L17.581 42.6429L17.0778 60.8598C17.0596 61.5187 17.3672 62.1443 17.9002 62.5322C18.4332 62.92 19.1231 63.0203 19.7444 62.8004L37 56.6917L54.2555 62.8004C54.8769 63.0203 55.5668 62.92 56.0998 62.5321C56.6328 62.1443 56.9404 61.5187 56.9222 60.8598L56.4189 42.6429L67.5825 28.1987C67.9866 27.6758 68.1063 26.9871 67.9024 26.3585C67.6985 25.73 67.1973 25.2427 66.5632 25.0566L48.9984 19.902L38.6474 4.86592Z" stroke="white" stroke-width="4" stroke-linejoin="round"/>
				</g>
				<path d="M26.2462 21.621L37 6L47.7538 21.621L66 26.9757L54.4 41.9846L54.923 60.915L37 54.5701L19.077 60.915L19.6 41.9846L8 26.9757L26.2462 21.621Z" fill="url(#paint0_linear_1614_5673)"/>
				<path opacity="0.4" d="M36.9983 36.3563V6L26.1016 21.4061L36.9983 36.3563Z" fill="url(#paint1_linear_1614_5673)"/>
				<path opacity="0.8" d="M37 36.3574L26.1032 21.4072L8 26.9768L37 36.3574Z" fill="url(#paint2_linear_1614_5673)"/>
				<path opacity="0.5" d="M36.9992 36.3565L19.3553 42.0711L19.0762 60.9153L36.9992 36.3565Z" fill="url(#paint3_linear_1614_5673)"/>
				<path opacity="0.4" d="M54.921 60.9153L54.6419 42.0711L36.998 36.3565L54.921 60.9153Z" fill="url(#paint4_linear_1614_5673)"/>
				<path d="M54.6419 42.071L65.9981 26.9758L36.998 36.3564L54.6419 42.071Z" fill="#FEBA1B"/>
				<path opacity="0.6" d="M65.9981 26.9768L47.8948 21.4072L36.998 36.3574L65.9981 26.9768Z" fill="url(#paint5_linear_1614_5673)"/>
				<defs>
				<filter id="filter0_d_1614_5673" x="0" y="0" width="74" height="70.915" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix"/>
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
				<feOffset dy="2"/>
				<feGaussianBlur stdDeviation="2"/>
				<feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.733333 0 0 0 0 0.105882 0 0 0 1 0"/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1614_5673"/>
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1614_5673" result="shape"/>
				</filter>
				<linearGradient id="paint0_linear_1614_5673" x1="6.50739" y1="6" x2="6.50739" y2="66.7126" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FCA50E"/>
				<stop offset="1" stop-color="#FFC823"/>
				</linearGradient>
				<linearGradient id="paint1_linear_1614_5673" x1="26.1016" y1="-1.58907" x2="8.12504" y2="11.3168" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FFEC36" stop-opacity="0.467505"/>
				<stop offset="1" stop-color="#FFF7AB"/>
				</linearGradient>
				<linearGradient id="paint2_linear_1614_5673" x1="8.18335" y1="25.0975" x2="25.0842" y2="45.9945" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FFED08" stop-opacity="0.8"/>
				<stop offset="1" stop-color="white"/>
				</linearGradient>
				<linearGradient id="paint3_linear_1614_5673" x1="28.0377" y1="67.0549" x2="42.3512" y2="46.1629" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FFED08" stop-opacity="0.01"/>
				<stop offset="1" stop-color="#FFEF63"/>
				</linearGradient>
				<linearGradient id="paint4_linear_1614_5673" x1="36.998" y1="30.2168" x2="22.6846" y2="51.1088" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FFEC36" stop-opacity="0.467505"/>
				<stop offset="1" stop-color="#FFE94A"/>
				</linearGradient>
				<linearGradient id="paint5_linear_1614_5673" x1="36.998" y1="17.6697" x2="32.4812" y2="35.1931" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FFEC36" stop-opacity="0.467505"/>
				<stop offset="1" stop-color="#FFF7AB"/>
				</linearGradient>
				</defs>
				</svg>
				</div>
			</div>
		<div id="join">
			<img src="../images/join_img.svg" width="100%">
		</div>
	</div>
		`;
		page.appendChild(this.content)
		page.appendChild(renderRightBar());
		const body = document.body
		body.style.alignItems = 'center';

		const create = this.content.querySelector("#create");
		create.addEventListener('click', event => {
		event.preventDefault();
		navigate('/tournement/create');
		});
		const join = this.content.querySelector("#join");
		join.addEventListener('click', event => {
		event.preventDefault();
		navigate('/game-online');
		});
		return page;
	}
}
export function rendertournamant() {
	const page = new Tournament();
	return page.render();
}

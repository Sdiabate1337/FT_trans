import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { renderBodyCenter } from './body_center.js';
import { showAlert } from './message-box.js';
import { navigate } from './router.js';

class Dashboard {
	constructor() {}
	render() {
		this.changebackground()
		const page = document.createDocumentFragment();

		page.appendChild(renderLeftBar());
		page.appendChild(renderBodyCenter());
		page.appendChild(renderRightBar());
		let image = page.querySelector("#player-image");
		let username = page.querySelector("#user-name");
		const setPlayerImage = async () => {
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
					image.src = data.avatar;
					username.textContent = data.username;
				}
				else {
					showAlert(data.error || 'failed to load user image');
				}
			} catch (error) {
				showAlert(error || 'failed to fetch user profile ==> error: ');
			}
		};
		setPlayerImage();
		return page;
	}
	changebackground() {
		const body = document.body
		body.style.backgroundImage = "";
		body.style.alignItems = 'unset';	
	}
}
export function renderDashboard() {
	const page = new Dashboard();
	return page.render();
}
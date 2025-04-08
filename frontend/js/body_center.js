import { renderToper } from './toper.js'
import { renderPlayerPhoto } from './playerPhoto.js'
import { renderPlayMods } from './play-mods.js'
class BodyCenter {
	constructor() {}
	render () {
		const body_center = document.createDocumentFragment();
		const content = document.createElement('span');
		content.className = 'contenue';
		content.appendChild(renderToper());
		content.appendChild(renderPlayerPhoto());
		const userName = document.createElement('div');
		userName.className = 'user-name';
		userName.id = 'user-name';
		content.appendChild(userName);
		content.appendChild(renderPlayMods());
		body_center.appendChild(content);
		return body_center;
	}
}

export function renderBodyCenter() {
	const body_center = new BodyCenter();
	return body_center.render();
}
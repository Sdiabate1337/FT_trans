import { navigate } from './router.js';
import { showAlert } from './message-box.js';

export class Notification
{
	constructor(name , img, user_id)
	{
		this.name = name;
		this.img = img;
		this.user_id = user_id;
		this.content = document.createElement("div");

		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		this.content.appendChild(message);



		this.content.className = 'container_tour';
		this.content.innerHTML = `
			<div class="container_tour1">
				<div class="tour_name">
					<img src="${this.img}">
				</div>
				<div class="tour_name1">
					<h2 class="h2_class"> ${this.name} </h2>
				</div>
			</div>
			<div class="container_tour2">
				<button class="style-button1" id="accept_id">
					<img src="../images/accept.png"  width="80%" height="80%">
					</button>
				<button class="style-button2" id="denyreq_id">
					<img src="../images/maki_cross.svg"  width="80%" height="80%">	
				</button>
			</div>
		`
	}
	render()
	{
		async function denyReq(profileId){
			try{
				const response = await fetch('http://localhost:8000/api/friends/DenyRequest/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ sender_id: parseInt(profileId, 10) }),
				})
				if (!response.ok){
					throw new Error('Network response was not ok: ' + response.statusText);
				}
				const responseData = await response.json();
			} catch (error){
				console.error('There was a problem with the fetch operation:', error);
				return;
			}
		}
		async function acceptReq(profileId){
			try{
				const response = await fetch('http://localhost:8000/api/friends/AccebtRequest/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ sender_id: parseInt(profileId, 10) }),
				})
				if (!response.ok){
					throw new Error('Network response was not ok: ' + response.statusText);
				}
				const responseData = await response.json();
			} catch (error){
				console.error('There was a problem with the fetch operation:', error);
				return;
			}
		}
		let accept = this.content.querySelector("#accept_id");
		accept.addEventListener('click', event => {
			event.preventDefault();
			acceptReq(this.user_id);
			showAlert("the friend request accepted");
			navigate('/dashboard');
		});

		let denyreq = this.content.querySelector("#denyreq_id");
		denyreq.addEventListener('click', event => {
			event.preventDefault();
			denyReq(this.user_id);
			showAlert("the friend request refused");
			navigate('/dashboard');
		});


		return this.content;
	}
}

// export default Notification;

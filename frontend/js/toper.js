import { showAlert } from './message-box.js';
import { Notification } from './notification.js' ;
import { navigate } from './router.js';

class Toper {
	constructor() {}
	render() {
		const content = document.createDocumentFragment();
		const toper = document.createElement('div');
		toper.className = 'secondere';
		toper.innerHTML = `
			<div class="div3" id='div33'>
				<button type="button" class='searchButton' id='searchButton'>
					<svg width="100%" height="100%" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
						<style>
							.rect-style {
								fill: white;
							}
							.path-style {
								fill: white;
							}
							.svg-background {
								background-color: #f0f0f0;
							}
						</style>
						<mask id="mask0_2056_1608" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
							<rect width="24" height="24" class="rect-style"/>
						</mask>
						<g mask="url(#mask0_2056_1608)">
							<path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class="path-style"/>
						</g>
					</svg>
				</button>
    			<input type="text" placeholder="Search" class='searchInput' id='searchInput' required>
				<div id='searchResult' class='searchResult'>
					<img id='searchImage'>
					<button id="searchResultButton"><span class='searchUsername' id='searchUsername'>no result</span></button>
				</div>
			</div>
			<div class="div4">
				<div class="wallet">
					1337
					<svg class="diyamonda" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.897 0.670763L14.7476 0.5H14.5207H10.2318H5.94179H5.71489L5.56549 0.670763L1.6237 5.17604L1.34873 5.49031L1.60897 5.81688L9.84075 16.1467L10.2318 16.6374L10.6228 16.1466L18.8535 5.81686L19.1137 5.49029L18.8388 5.17604L14.897 0.670763Z" fill="#ED6FF7" stroke="white"/>
						<path d="M14.5207 1H10.2318H5.94179L2 5.50528L10.2318 15.835L18.4625 5.50528L14.5207 1Z" fill="#ED6FF7"/>
						<path d="M10.2314 5.38794H6.11548L10.2314 15.8351L14.3462 5.38794H10.2314Z" fill="#E249F2"/>
						<path d="M10.2314 1L6.11548 5.38786H14.3462L10.2314 1Z" fill="#FA6AFF"/>
						<path d="M2 5.50528H6.11589L10.2318 1H5.94179L2 5.50528Z" fill="#E249F2"/>
						<path d="M14.8948 5.38786H19.0107L15.0689 1H10.78L14.8948 5.38786Z" fill="#F989FF"/>
					</svg>
				</div>
				<svg class="notification" id="notification_id" width="40%" height="80%" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="50" height="50" rx="25" fill="#840087"/>
					<path d="M18 34C17.45 34 16.9793 33.8043 16.588 33.413C16.1967 33.0217 16.0007 32.5507 16 32V18C16 17.45 16.196 16.9793 16.588 16.588C16.98 16.1967 17.4507 16.0007 18 16H32C32.55 16 33.021 16.196 33.413 16.588C33.805 16.98 34.0007 17.4507 34 18V32C34 32.55 33.8043 33.021 33.413 33.413C33.0217 33.805 32.5507 34.0007 32 34H18ZM25 29C25.6333 29 26.2083 28.8167 26.725 28.45C27.2417 28.0833 27.6 27.6 27.8 27H32V18H18V27H22.2C22.4 27.6 22.7583 28.0833 23.275 28.45C23.7917 28.8167 24.3667 29 25 29Z" fill="#F8F8F8"/>
					<path d="M53 39C53 43.4183 49.4183 47 45 47C40.5817 47 37 43.4183 37 39C37 34.5817 40.5817 31 45 31C49.4183 31 53 34.5817 53 39Z" fill="#FF008A"/>
				</svg>
			</div>
			<div class="notification-div">
			
			</div>
			`;
			content.appendChild(toper);
			const div3 = content.querySelector('#div33');
			const searchButton = content.querySelector("#searchButton");
			const searchResult = content.querySelector('#searchResult');
			const searchInput = content.querySelector('#searchInput');
			div3.addEventListener('click', (event) => {
				event.stopPropagation();
				searchResult.classList.add('show');
				searchInput.classList.add('show');
			});
			document.addEventListener('click', (event) => {
				searchResult.classList.remove('show');
				searchInput.classList.remove('show');
			});
			div3.addEventListener('click', function(event) {
				event.stopPropagation();
			  });
			searchButton.addEventListener('click', async function (event) {
				const searchTerm = document.querySelector("#searchInput").value;
				if (searchTerm.length !== 0) {
					const data = {
						username: searchTerm,  
					};
					try {
						const response = await fetch ('http://localhost:8000/api/users/ProfileByUsername/', {
							method: 'POST',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json',
							},	
							body: JSON.stringify(data),
						});
						const searchImage = document.querySelector('#searchImage');
						const searchUsername = document.querySelector('#searchUsername');
						if (response.ok) {
							const userdata = await response.json();
							if (userdata.avatar && userdata.username) {
								searchImage.src = userdata.avatar;
								searchImage.classList.add('show');
								searchUsername.textContent = userdata.username;
								const searchResultButton = document.querySelector('#searchResultButton');
								if (searchResultButton) {
									searchResultButton.addEventListener('click', (event) => {
										event.preventDefault();
										navigate('/profile', userdata.username);
									});
								}
							} else {
								searchImage.classList.remove('show');
								searchUsername.textContent = 'no result'
							}
						} else {
							showAlert('you are looking for your own username');
						}
						
					} catch (error) {
						showAlert('somthing went wrong please try again later.');
					}
				}
			});
			

			async function fetch_by_id(user_id)
			{
				if (user_id != null) {
					try {
						const response = await fetch(`http://localhost:8000/api/users/ProfileById/?friend=${user_id}`, {
							method: 'GET',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json',
							}
						});
			
						const data = await response.json();
			
						if (response.ok) {
							let test = toper.querySelector(".notification-div");
							const notification = new Notification(data.user_name, data.avatar, user_id);
							test.append(notification.render());
							
						} else {
							showAlert(data.error || 'Failed to load second user data');
						}
					} catch (error) {
						showAlert(error || 'Failed to fetch user profile ==> error: ');
					}
				}
			};


			async function fetchfriendRequestList() 
			{
				const response = await fetch('http://localhost:8000/api/users/friendRequestList/',
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				const data = await response.json();
				if (response.ok) 
				{
					if (data.friendsRequests.length === 0)
						console.log("no friendsRequests");
					else
					{
						data.friendsRequests.forEach((element) => {
							fetch_by_id(element);
						});
					}
				}
				else
				{
					showAlert(data.error || 'failed to fetch friendRequestList');
				}
			};



			const notificationDiv = content.querySelector('.notification-div');
			function toggleNotification(event) {
				event.stopPropagation(); 
				notificationDiv.style.display = "flex";
				notificationDiv.innerHTML=``;
				fetchfriendRequestList();
			  }



			var notification = content.querySelector("#notification_id");
			notification.addEventListener('click', toggleNotification);
			function hideNotification() {
				notificationDiv.style.display = 'none';
			  }
			
			document.addEventListener('click', hideNotification);
			
			notificationDiv.addEventListener('click', function(event) {
				event.stopPropagation();
			  });
			return content;
	}
}
export function renderToper() {
	const toper = new Toper();
	return toper.render();
}
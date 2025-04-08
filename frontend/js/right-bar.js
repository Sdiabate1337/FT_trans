import { showAlert } from "./message-box.js";
import { navigate } from "./router.js";

class RightBar {
	constructor() {}

	render() {
		const content = document.createDocumentFragment();
		const bar = document.createElement('span');
		bar.className = 'right-bar';
		bar.innerHTML = `<div id="up-bar" class="up-bar">
		<div class="user-image">
			<img  id="rightBar-userImage"  alt="">
		</div>
		<svg class="icon"  viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.35 9.42857C5.94953 9.42857 7.25 8.0192 7.25 6.28571C7.25 4.55223 5.94953 3.14286 4.35 3.14286C2.75047 3.14286 1.45 4.55223 1.45 6.28571C1.45 8.0192 2.75047 9.42857 4.35 9.42857ZM24.65 9.42857C26.2495 9.42857 27.55 8.0192 27.55 6.28571C27.55 4.55223 26.2495 3.14286 24.65 3.14286C23.0505 3.14286 21.75 4.55223 21.75 6.28571C21.75 8.0192 23.0505 9.42857 24.65 9.42857ZM26.1 11H23.2C22.4025 11 21.682 11.3487 21.1564 11.9134C22.9825 12.9987 24.2784 14.958 24.5594 17.2857H27.55C28.352 17.2857 29 16.5835 29 15.7143V14.1429C29 12.4094 27.6995 11 26.1 11ZM14.5 11C17.3048 11 19.575 8.53973 19.575 5.5C19.575 2.46027 17.3048 0 14.5 0C11.6952 0 9.425 2.46027 9.425 5.5C9.425 8.53973 11.6952 11 14.5 11ZM17.98 12.5714H17.6039C16.6614 13.0625 15.6147 13.3571 14.5 13.3571C13.3853 13.3571 12.3431 13.0625 11.3961 12.5714H11.02C8.13813 12.5714 5.8 15.1054 5.8 18.2286V19.6429C5.8 20.9442 6.77422 22 7.975 22H21.025C22.2258 22 23.2 20.9442 23.2 19.6429V18.2286C23.2 15.1054 20.8619 12.5714 17.98 12.5714ZM7.84359 11.9134C7.31797 11.3487 6.5975 11 5.8 11H2.9C1.30047 11 0 12.4094 0 14.1429V15.7143C0 16.5835 0.647969 17.2857 1.45 17.2857H4.43609C4.72156 14.958 6.0175 12.9987 7.84359 11.9134Z" fill="white"/>
		</svg>
		<!-- friends will be here -->
	</div>

	<div class="down-bar">
	<svg class="icon3" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M0 9.70945C0 4.34704 3.9427 0 8.80623 0H15.6813C20.5448 0 24.4875 4.34704 24.4875 9.70945C24.4875 15.0718 20.5448 19.419 15.6813 19.419H10.4946V24.1063C10.4946 24.1063 0 21.7626 0 9.70945Z" fill="#F4F5F6"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9087 21.086C19.1747 22.4262 20.8938 23.2499 22.7874 23.2499H25.3624V26.9998C25.3624 26.9998 34.9825 25.1249 34.9825 15.4824C34.9825 11.1924 31.8284 7.71472 27.9376 7.71472H26.0051C26.1562 8.34746 26.2366 9.01174 26.2366 9.69684C26.2366 15.2844 22.6692 19.9533 17.9087 21.086Z" fill="#F4F5F6"/>
	</svg>
	<div class="icon2">
	<svg class="icon" width="70%" height="70%" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M4.35 9.42857C5.94953 9.42857 7.25 8.0192 7.25 6.28571C7.25 4.55223 5.94953 3.14286 4.35 3.14286C2.75047 3.14286 1.45 4.55223 1.45 6.28571C1.45 8.0192 2.75047 9.42857 4.35 9.42857ZM24.65 9.42857C26.2495 9.42857 27.55 8.0192 27.55 6.28571C27.55 4.55223 26.2495 3.14286 24.65 3.14286C23.0505 3.14286 21.75 4.55223 21.75 6.28571C21.75 8.0192 23.0505 9.42857 24.65 9.42857ZM26.1 11H23.2C22.4025 11 21.682 11.3487 21.1564 11.9134C22.9825 12.9987 24.2784 14.958 24.5594 17.2857H27.55C28.352 17.2857 29 16.5835 29 15.7143V14.1429C29 12.4094 27.6995 11 26.1 11ZM14.5 11C17.3048 11 19.575 8.53973 19.575 5.5C19.575 2.46027 17.3048 0 14.5 0C11.6952 0 9.425 2.46027 9.425 5.5C9.425 8.53973 11.6952 11 14.5 11ZM17.98 12.5714H17.6039C16.6614 13.0625 15.6147 13.3571 14.5 13.3571C13.3853 13.3571 12.3431 13.0625 11.3961 12.5714H11.02C8.13813 12.5714 5.8 15.1054 5.8 18.2286V19.6429C5.8 20.9442 6.77422 22 7.975 22H21.025C22.2258 22 23.2 20.9442 23.2 19.6429V18.2286C23.2 15.1054 20.8619 12.5714 17.98 12.5714ZM7.84359 11.9134C7.31797 11.3487 6.5975 11 5.8 11H2.9C1.30047 11 0 12.4094 0 14.1429V15.7143C0 16.5835 0.647969 17.2857 1.45 17.2857H4.43609C4.72156 14.958 6.0175 12.9987 7.84359 11.9134Z" fill="white"/>
	</svg>
	</div>
	<!-- friends will be here -->
	</div>`;
	content.appendChild(bar);
	const setOnlineFriends = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/users/friendList/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			if (response.ok) {
				const data = await response.json();
				const friends = data.friends;
				if (friends) {
					const upBar = bar.querySelector("#up-bar");
					Object.entries(friends).forEach(([key, [username, avatar]]) => {
						const friendDiv = document.createElement('div');
						friendDiv.className = 'online-friends';	
						friendDiv.innerHTML = `<img class="profile-image" src="${avatar}" alt="${username}">
						`;
						upBar.appendChild(friendDiv);
						friendDiv.addEventListener('click', () => {
							navigate('/profile',  username );
						}
						);
					});
				}
			}
			else {
				showAlert(data.error || 'failed to fetsh user friends list');
			}
		} catch (error) {
			showAlert(error || 'error accured: ');
		}
	};
	let imageright = content.querySelector("#rightBar-userImage");
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
					imageright.src = data.avatar;
				}
				else {
					showAlert(data.error || 'failed to load user image');
				}
			} catch (error) {
				showAlert(error || 'failed to fetch user profile ==> error: ');
			}
		};
		setPlayerImage();
		setOnlineFriends();
	
		
	return content;
	}
}

export function renderRightBar() {
	const rightBar = new RightBar();
	return rightBar.render();
}
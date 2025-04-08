import { renderRightBar } from './right-bar.js';
import { renderLeftBar } from './left-bar.js';
import { navigate } from './router.js';

class Profile
{
	content = document.createElement('span');
	constructor()
	{
	}

	async fetchDataById(id){
		try{
			const response = await fetch (`http://localhost:8000/api/users/ProfileById/?friend=${id}`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			if (!response.ok){
				throw new Error('Network response was not ok: ' + response.statusText);
			}
			const data = await response.json();
			return (data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			return null;
		}
	}

	async fetchFriendRequests() {
		try{
			const response = await fetch('http://localhost:8000/api/users/friendRequestList/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			if (!response.ok){
				throw new Error('Network response was not ok: ' + response.statusText);
			}
			const friendRequestList = await response.json();
			return (friendRequestList);
		} catch(error){
			console.error('There was a problem with the fetch operation:', error);
			return;
		}
	}
	
	async fetchFriendList() {
		try{
			const response = await fetch('http://localhost:8000/api/users/friendList/', {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			if (!response.ok){
				throw new Error('Network response was not ok: ' + response.statusText);
			}
			const friendList = await response.json();
			return (friendList);
		} catch(error){
			console.error('There was a problem with the fetch operation:', error);
			return;
		}
	}

	async acceptReq(profileId){
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

	async denyReq(profileId){
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

	async removeFriend(profileId){
		try{
			const response = await fetch('http://localhost:8000/api/users/removeFriend/', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ friend_id: parseInt(profileId, 10) }),
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

	render()
	{
		const page = document.createDocumentFragment();
		page.appendChild(renderLeftBar());
		this.content.className = 'containerFL';
		this.content.innerHTML = `
		<div id="friendsList">
		<div class="tabs">
        <div class="tab active" data-section="friends">Friends List</div>
        <div class="tab" data-section="requests">Friend Requests</div>
		<input type="text" class="searchbar_b" placeholder="Add friend by username...">
        <button class="add-friend-button">Add Friend</button>
        
    </div>
    
    <div class="friends-section">
        <div class="friend-list"></div>
        <div class="friend-requests"></div>
    </div>
    </div>
		`;
		page.appendChild(this.content);
		page.appendChild(renderRightBar());
		// Event Listener for Button Click
		this.content.querySelector('.add-friend-button').addEventListener('click', async () => {
            // Get the entered username
            const username = document.querySelector('.searchbar_b').value.trim();
            if (!username) {
                alert('Please enter a username.');
                return;
            }
            try {
                // Step 1: Fetch Receiver ID from Backend
                const userResponse = await fetch('http://localhost:8000/api/users/getIdByUsername/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
					credentials: 'include',
                    body: JSON.stringify({ username }),
                });
                if (!userResponse.ok) {
                    throw new Error('User not found or error in fetching user ID.');
                }
                const userData = await userResponse.json();
                const recieverId = userData.id;
                // Step 2: Send Friend Request
                const friendResponse = await fetch('http://localhost:8000/api/friends/sendRequest/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
					credentials: 'include',
                    body: JSON.stringify({ reciever_id: recieverId }),
                });
                if (!friendResponse.ok) {
					const errorData = await friendResponse.json();
					if (errorData.error === 'already sent') {
						alert('Friend request has already been sent.');
					} else {
						alert(`Error: ${errorData.error}`);
					}
                }
				else{
					const result = await friendResponse.json();
					alert(result.message);
				}
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'An error occurred.');
            }
        });
		this.fetchFriendRequests().then(friendRequestList => {
			const reqList = friendRequestList.friendsRequests; // list of the requests
			for (let i = 0; i < reqList.length; i++){
				this.fetchDataById(reqList[i]).then(profileData => {
					if (profileData){
						const friendRequestsContainer = this.content.querySelector('.friend-requests');
						if (!friendRequestsContainer) {
							console.error('Friend requests container not found.');
							return;
						}
						const reqCard = document.createElement('div');
						reqCard.className = 'req-card';
						reqCard.innerHTML = `
						<img class="friend-avatar" src="${profileData.avatar || '../images/default-avatar.png'}">
						<div class="friend-info">
							<div class="friend-name">${profileData.user_name}</div>
							<div class="friend-status">Pending Request</div>
						</div>
						<div class="friend-actions">
							<button class="button_b accept" profile-id="${reqList[i]}">Accept</button>
							<button class="button_b decline" profile-id="${reqList[i]}">Decline</button>
						</div>
					`;
					friendRequestsContainer.appendChild(reqCard);
					}
				})
				
			}
		});
		// now fetching the friend list
		this.fetchFriendList().then(friendList => {
			const list = friendList.friends;
			for (const key in list) {
				const value = list[key];
				const friendListCon = this.content.querySelector('.friend-list');
				if (!friendListCon){
					console.error('Friend list container not found.');
					return;
				}
				const profileCard = document.createElement('div');
				profileCard.className = 'friend-card'
				profileCard.innerHTML = `
				<img class="friend-avatar" src="${value[1]}">
                <div class="friend-info">
                    <div class="friend-name">${value[0]}</div>
                </div>
                <div class="friend-actions">
                    <button class="button_b remove" profile-id="${key}">Remove</button>
                </div>
				`
				friendListCon.appendChild(profileCard);
			}
		});
		// Add JavaScript functionality
		// Tab switching functionality
		this.content.querySelectorAll('.tab').forEach(tab => {
			tab.addEventListener('click', (e) => {
				// Remove active class from all tabs
				this.content.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
				// Add active class to clicked tab
				e.target.classList.add('active');
				// Hide all sections
				this.content.querySelector('.friend-list').style.display = 'none';
				this.content.querySelector('.friend-requests').style.display = 'none';
				// Show selected section
				const section = e.target.dataset.section;
				if (section === 'friends') {
					this.content.querySelector('.friend-list').style.display = 'flex';
				} else {
					this.content.querySelector('.friend-requests').style.display = 'flex';
				}
			});
		});
		// Button functionality
		this.content.addEventListener('click', (e) => {
			if (e.target.classList.contains('button_b')) {
				const action = e.target.classList.contains('accept') ? 'accept' :
							   e.target.classList.contains('decline') ? 'decline' :
							   e.target.classList.contains('remove') ? 'remove' : null;
		
				if (!action) return;

				const reqCard = e.target.closest('.req-card');

				if (!reqCard) return;

				const profileId = e.target.getAttribute('profile-id');
				switch (action) {
					case 'accept':
						this.acceptReq(profileId)
						.then(() => reqCard.remove())
						.then(navigate('/friendList'));
						break;
					case 'decline':
						this.denyReq(profileId)
            			.then(() => reqCard.remove())
						break;
				}
			}
		});
		this.content.addEventListener('click', (e) => {
			if (e.target.classList.contains('button_b')){
				const action = e.target.classList.contains('remove') ? 'remove' : null;
				if (!action) return;

				const profileCard = e.target.closest('.friend-card');
				if (!profileCard) return;

				const profileId = e.target.getAttribute('profile-id');
				if (action === 'remove'){
					this.removeFriend(profileId)
					.then(() => profileCard.remove());
				}
			}
		});
		const body = document.body
		body.style.alignItems = 'center';
		return page;
	}
}

export function renderFriendList() {
	const page = new Profile();
	return page.render();
}

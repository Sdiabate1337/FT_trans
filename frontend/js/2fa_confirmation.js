import { navigate } from './router.js';
import { showAlert } from './message-box.js';

class TwoFaConfirmationPage {
	constructor() {}
	render() {
		const page = document.createDocumentFragment();
		this.changebackground();
		const goBackArrow = document.createElement('a');
		goBackArrow.id = 'go-back';
		goBackArrow.innerHTML = `<img src='../images/arrow.svg' alt="" class="goBackArrow">`;
		const message = document.createElement('div');
		message.id = 'alert-box';
		message.className = 'alert-box';
		page.appendChild(message);
		const content = document.createElement('div');
		content.id = 'root';
		content.className = 'box';
		content.innerHTML = `
				<div class="resetPassword-titles">
					<h1> 2FA CONFIRMATION </h1>
				</div>
				<form id="TwoFAForm" action="submit" method="post" class="form-checkbox-container" autocomplete="off">
					<div class="inputdiv-resetPass">
						<input type="text" id="username" name="username" placeholder="Enter your username" autocomplete="off" required>
					</div>
					<div class="inputdiv-resetPass">
						<input type="text" id="code" name="code" placeholder="Enter the verification code" required>
					</div>
					<div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
						<button type="submit" class="button" >SUBMIT</button>
					</div>
				</form>
				<p style="color: white; text-align: center; margin-top: 5%;">For added security, please confirm your identity by entering your username and the verification code sent to your email. This code is unique and valid only for a limited time.</p>
				<div class="signUpDiv">
					<p><a id="redirect-login" >GO BACK TO LOGIN</a></p>
				</div>
		`;
		page.appendChild(goBackArrow);
		page.appendChild(content);
		goBackArrow.addEventListener('click', event => {
			event.preventDefault();
			navigate('/');
		});
		const redirectToLogin = content.querySelector('#redirect-login');
		redirectToLogin.addEventListener('click', event => {
			event.preventDefault();
			navigate('/login');
		});
		content.querySelector('#TwoFAForm').addEventListener('submit', async function (event) {
			event.preventDefault();
			const url = "http://localhost:8000/api/2fa_confirmation/";
			const formData = new FormData(event.target);
			const userData = {
				username: formData.get('username'),
				code: formData.get('code'),
			};

			try {
				const response = await fetch(url, {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});
				const data = await response.json();
				if (response.ok) {
					showAlert(data.message)
					navigate('/dashboard');
				} else {
					showAlert(data.detail || "wrong em");
				}
			} catch (error) {
				console.error("There was an error with the login request", error);
				showAlert(error || "Somthing went wrong");
			}
		});

		return page;
	}
	changebackground() {
		const body = document.body
		body.style.backgroundImage = "url('../images/registrationBackground.svg')";
		body.style.alignItems = 'center';
	}
}
export function renderTwoFaConfirmationPage() {
	const TwoFAPage = new TwoFaConfirmationPage();
	return TwoFAPage.render();
}
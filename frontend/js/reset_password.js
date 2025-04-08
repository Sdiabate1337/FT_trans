import { navigate } from './router.js';
import { showAlert } from './message-box.js';

class resetPasswordPage {
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
		content.innerHTML = `<div class="resetPassword-titles">
		<h1> RESET PASSWOR</h1>
		<h4> ENTER YOUR EMAIL AND A NEW PASSWORD </h2>
	</div>
<form id="resetPasswordForm" action="submit" method="post" class="form-checkbox-container" autocomplete="off">
		<div class="inputdiv-resetPass">
			<input type="email" id="email" name="email" placeholder="Enter your email" autocomplete="off" required>
		</div>
		<div class="inputdiv-resetPass">
			<input type="password" id="password" name="password" placeholder="Enter a new password" required>
			<span class="ayeIcon">
				<img src='../images/closed-eye.svg' id="eye-icon" alt="Show password" width="100%" height="100%">
			</span>
		</div>
		<div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
			<button type="submit" class="button" >RESET</button>
		</div>
</form>
<p style="color: white; text-align: center; margin-top: 5%;">After you click RESET, a confirmation email will be sent to your inbox. Please check your email and follow the instructions to reset your password.</p>
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
		const eyeIcon = content.querySelector('#eye-icon');
		eyeIcon.addEventListener('click', event => {
			const passwordInput = document.getElementById('password');
			const currentType = passwordInput.getAttribute('type');
			if (currentType === 'password') {
				passwordInput.setAttribute('type', 'text');
				eyeIcon.src = "../images/eye.svg";
				eyeIcon.alt = "Hide password";
			} else {
				passwordInput.setAttribute('type', 'password');
				eyeIcon.src = "../images/closed-eye.svg";
				eyeIcon.alt = "Show password";
			}
		});
		const redirectToLogin = content.querySelector('#redirect-login');
		redirectToLogin.addEventListener('click', event => {
			event.preventDefault();
			navigate('/login');
		});
		content.querySelector('#resetPasswordForm').addEventListener('submit', async function (event) {
			event.preventDefault();
			const url = "http://localhost:8000/api/password_reset/";
			const formData = new FormData(event.target);
			const userData = {
				email: formData.get('email'),
				password: formData.get('password'),
			};

			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				});
				if (response.ok) {
					const data = await response.json();
					navigate('/dashboard');
				} else {
					const errorData = await response.json();
					console.error("Error:", errorData);
					showAlert(errorData.error || "wrong email");
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
export function renderResetPasswordPage() {
	const resetPage = new resetPasswordPage();
	return resetPage.render();
}
import { navigate } from './router.js';
import { showAlert } from './message-box.js';

class LoginPage {
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
		<div class="ponglogo">
				<span class="pong-logo-text">P</span>
				<span class="pong-logo-icon ">
					<svg  width="78%" height="60%" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M40.1061 8.2971C30.5754 -1.35189 14.5533 -3.1101 5.74066 5.81194C-3.07195 14.734 -1.33531 30.9551 8.19533 40.6041C14.3654 46.8508 21.7085 48.2032 28.5173 45.9801L28.4881 46.0013L28.7135 45.9125C29.1727 45.7561 29.632 45.5955 30.0828 45.4096C31.2934 44.9954 33.0927 44.429 35.1884 43.9937C38.3986 43.3259 41.3334 46.817 43.7881 49.3021C46.2427 51.7873 51.1521 59.2427 52.3794 60.4853C53.6067 61.7279 54.8341 60.4853 56.0614 59.2427L57.2888 58.0002L58.5161 56.7618C59.7434 55.515 60.9708 54.2724 59.7434 53.0299C58.5161 51.7873 51.1521 46.8212 48.6974 44.336C46.2427 41.8509 42.7987 38.8755 43.4541 35.6253C43.7964 33.9305 44.2222 32.4386 44.5896 31.2679C48.0128 23.8504 47.2572 15.537 40.1061 8.2971Z" fill="white"/>
						<path d="M27.0145 46.4028C27.5197 46.2802 28.0206 46.1408 28.5174 45.9801L28.4882 46.0013L28.7136 45.9125C29.1728 45.7561 29.632 45.5955 30.0829 45.4096C31.2935 44.9954 33.0928 44.429 35.1884 43.9937C38.3987 43.3259 41.3334 46.817 43.7881 49.3021C46.2428 51.7873 51.1521 59.2427 52.3795 60.4853C53.6068 61.7279 54.8341 60.4853 56.0615 59.2427L57.2888 58.0002L58.5161 56.7618C59.7435 55.515 60.9708 54.2724 59.7435 53.0299C58.5161 51.7873 51.1521 46.8212 48.6975 44.3361C46.2428 41.8509 42.7987 38.8755 43.4541 35.6253C43.7965 33.9305 44.2223 32.4386 44.5896 31.2679C45.2075 29.9239 45.6876 28.5545 46.0174 27.1682L27.0145 46.4028Z" fill="white"/>
						<path d="M35.1967 38.1189L37.6514 35.6379L58.5161 56.7617L56.0614 59.2427L35.1967 38.1189Z" fill="white"/>
						<mask id="mask0_401_3914" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="47" y="2" width="14" height="14">
						<path d="M47.6078 2.84497H61V15.8286H47.6078V2.84497Z" fill="white"/>
						</mask>
						<g mask="url(#mask0_401_3914)">
						<path d="M60.7495 9.22688C60.7495 9.63262 60.7119 10.0299 60.6326 10.4272C60.5575 10.8245 60.4406 11.2091 60.2903 11.581C60.1358 11.9529 59.948 12.308 59.7267 12.6461C59.5055 12.98 59.255 13.2927 58.9711 13.5759C58.6914 13.8633 58.3825 14.1169 58.0527 14.3409C57.7187 14.5649 57.3681 14.7551 57.0007 14.9115C56.6333 15.0636 56.2534 15.1819 55.861 15.2622C55.4686 15.3383 55.0762 15.3806 54.6754 15.3806C54.2789 15.3806 53.8823 15.3383 53.4898 15.2622C53.1016 15.1819 52.7217 15.0636 52.3502 14.9115C51.9828 14.7551 51.6321 14.5649 51.3024 14.3409C50.9684 14.1169 50.6636 13.8633 50.3798 13.5759C50.1001 13.2927 49.8454 12.98 49.6242 12.6461C49.4029 12.308 49.215 11.9529 49.0648 11.581C48.9103 11.2091 48.7976 10.8245 48.7183 10.4272C48.639 10.0299 48.6014 9.63262 48.6014 9.22688C48.6014 8.82537 48.639 8.42385 48.7183 8.02657C48.7976 7.63351 48.9103 7.2489 49.0648 6.87275C49.215 6.50082 49.4029 6.1458 49.6242 5.81191C49.8454 5.47379 50.1001 5.16526 50.3798 4.87786C50.6636 4.59469 50.9684 4.33687 51.3024 4.11287C51.6321 3.88887 51.9828 3.69868 52.3502 3.54653C52.7217 3.39015 53.1016 3.27604 53.4898 3.19573C53.8823 3.11543 54.2789 3.07739 54.6754 3.07739C55.0762 3.07739 55.4686 3.11543 55.861 3.19573C56.2534 3.27604 56.6333 3.39015 57.0007 3.54653C57.3681 3.69868 57.7187 3.88887 58.0527 4.11287C58.3825 4.33687 58.6914 4.59469 58.9711 4.87786C59.255 5.16526 59.5055 5.47379 59.7267 5.81191C59.948 6.1458 60.1358 6.50082 60.2903 6.87275C60.4406 7.2489 60.5575 7.63351 60.6326 8.02657C60.7119 8.42385 60.7495 8.82537 60.7495 9.22688Z" fill="white"/>
						</g>
					</svg>
				</span>
				<span class="pong-logo-text">NG</span>
			</div>
		<form id="loginForm" action="login" method="post" class="form-checkbox-container" autocomplete="off">
				<div class="inputdiv">
					<input type="text" id="username" name="username" placeholder="Enter your username" autocomplete="off" required>
				</div>
				<div class="inputdiv">
					<input type="password" id="password" name="password" placeholder="Enter your password" required>
					<span class="ayeIcon">
						<img src='../images/closed-eye.svg' id="eye-icon" alt="Show password" width="100%" height="100%">
					</span>
				</div>
				<div class="ckeckbox-fpass-container">
					<div class="checkbox-div" >
						<label class="checkBoxContainer">
							<input type="checkbox" id="remember-me">
							<svg viewBox="0 0 64 64" height="22px" width="21.52px">
								<path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
							</svg>
						</label>
						<p class="rememberme">Remember Me</p>
					</div>
					<div class="fpass-div">
						<a style="text-decoration: none;" id="forget_password"><p class="text">Forget password?</p></a>
					</div>
				</div>
				<div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
					<button type="submit" class="button" >LOGIN</button>
				</div>
		</form>
	<div class="separation">
		<hr color="white" width="80%" style="max-width: 700px;">
		<div class="orDiv">Or</div>
	</div>
	<div class="authcontainer">
		<button id="oauth_facebook" type="submit" value="facebookAuth" class="button2"  style="background-color: #0472FF;"><img src='../images/facebook.svg' alt=""></button>
		<button id="oauth_42" type="submit" value="42Auth" class="button2"  style="background-color: black;"><img src='../images/42.svg' alt=""></button>
		<button id="oauth_google" type="submit" id="google-auth-btn" value="googleAuth" class="button2" style="background-color: white;"><img src='../images/google.svg' alt=""></button>
	</div>
	<div class="signUpDiv">
		<p>New User? <a id="redirect-registration" >SIGN UP HERE</a></p>
	</div>`;
		page.appendChild(goBackArrow);
		page.appendChild(content);
		goBackArrow.addEventListener('click', event => {
			event.preventDefault();
			navigate('/');
		});
		const redirectToRegistration = content.querySelector('#redirect-registration');
		redirectToRegistration.addEventListener('click', event => {
			event.preventDefault();
			navigate('/register');
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
		content.querySelector('#forget_password').addEventListener('click', async function (event) {
			event.preventDefault();
			navigate('/password_reset');
		});
		content.querySelector('#oauth_google').addEventListener('click', async function (event) {
			try {

				const response = await fetch('http://localhost:8000/api/google_login/',{
					method : 'GET',
				});
				const data = await response.json();
				if (response.ok) {
					const url = data.url;
					window.location.href = url;
				} else {
					showAlert(data.error || 'Failed to fetch Google login URL');
				}
			} catch (error) {
				showAlert(error || 'somthing went wrong')
				console.error('Error during fetch:', error);
			}
           
		});
		content.querySelector('#oauth_facebook').addEventListener('click', async function (event) {
			try {

				const response = await fetch('http://localhost:8000/api/facebook_login/',{
					method : 'GET',
				});
				const data = await response.json();
				if (response.ok) {
					const url = data.url;
					window.location.href = url;
				} else {
					showAlert(data.error || 'Failed to fetch Facebook login URL');
				}
			} catch (error) {
				showAlert(error || 'somthing went wrong')
				console.error('Error during fetch:', error);
			}
           
		});
		content.querySelector('#oauth_42').addEventListener('click', async function (event) {
			try {

				const response = await fetch('http://localhost:8000/api/42_login/',{
					method : 'GET',
				});
				const data = await response.json();
				if (response.ok) {
					const url = data.url;
					window.location.href = url;
				} else {
					showAlert( data.error || 'Failed to fetch 42 login URL');
				}
			} catch (error) {
				showAlert(error || 'somthing went wrong')
				console.error('Error during fetch:', error);
			}
           
		});
		const rememberMe = content.querySelector('#remember-me');
		rememberMe.addEventListener('change', () => {
    		const loginForm = document.getElementById('loginForm');
    		const password = document.getElementById('password');
    		const username = document.getElementById('username');
			loginForm.setAttribute('autocomplete', rememberMe.checked ? 'on' : 'off');
			password.setAttribute('autocomplete', rememberMe.checked ? 'on' : 'off');
			username.setAttribute('autocomplete', rememberMe.checked ? 'on' : 'off');

		});
		content.querySelector('#loginForm').addEventListener('submit', async function (event) {
			event.preventDefault();
			const url = "http://localhost:8000/api/users/login/";
			const formData = new FormData(event.target);
			const userData = {
				username: formData.get('username'),
				password: formData.get('password'),
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
				if (response.ok) {
					const data = await response.json();
					navigate('/dashboard');
				} else {
					const errorData = await response.json();
					console.error("Error:", errorData);
					showAlert(errorData.error || "login failed");
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
export function renderLoginPage() {
	const loginPage = new LoginPage();
	return loginPage.render();
}

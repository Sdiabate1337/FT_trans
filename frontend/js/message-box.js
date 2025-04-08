export function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.textContent = message;
    alertBox.classList.add('show');
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}


export function sendEmailConfirmation(message) {
   
    const send = document.createElement('div');
    send.classList.add('send-email');
    send.textContent = message;
    send.innerHTML += '<button id="send-email-btn">Send Email</button>';
    document.body.appendChild(send);
}
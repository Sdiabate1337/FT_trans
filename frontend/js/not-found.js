import { navigate } from "./router.js";
export function renderNotFoundPage() {
    const page = document.createElement('div');
    page.className = 'not-found';
    page.innerHTML = `
        <h1>404 -  Not Found</h1>
        <p>The page you are looking for does not exist.</p>
         <btn class="btn-nfound" id="btn-nfound">Go to Home</btn>
    `;

    const btn = page.querySelector('#btn-nfound');
    btn.addEventListener('click', () => {
        navigate('/');
    });

    return page;
}
export async function authenticatedFetch(url, options = {}) {
	options.headers = {
		...options.headers,
		'credentials' : 'include'
	};
	const response = await fetch('http://localhost:8000/api/users/checkAuthentication/', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        return fetch(url, options);
    } else {
		throw ("not authenticated");
    }
}
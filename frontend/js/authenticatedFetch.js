export async function authenticatedFetch(url, options = {}) {
    // Set credentials to include for cookies
    options.credentials = 'include';
    
    // Add existing headers if any
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };
    
    try {
        // First check if user is authenticated
        const authCheckResponse = await fetch('http://localhost:8000/api/users/checkAuthentication/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (authCheckResponse.ok) {
            // User is authenticated, proceed with original request
            return fetch(url, options);
        } else if (authCheckResponse.status === 403) {
            // User is not authenticated, redirect to login
            window.location.href = '/login.html';
            throw new Error("Authentication required");
        } else {
            // Other error
            throw new Error("Error checking authentication: " + authCheckResponse.statusText);
        }
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
}
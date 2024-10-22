async function login(email, password) {
    const apiUrl = 'https://vtuapi.honourworld.com/api/v2/user/login';
    
    const raw = JSON.stringify({
        email: email,
        password: password
    });

    const requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.text();
        console.log(result);

        const data = JSON.parse(result);
        
        // Assuming the API returns a token
        if (data.token) {
            // Store the token in localStorage
            localStorage.setItem('authToken', data.token);
        }
        
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Example usage:
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

                try {
                    const result = await login(email, password);
                    console.log('Login successful:', result);
                    // Redirect to dashboard
                    window.location.href = 'dashboard/index.html';
                } catch (error) {
                    console.error('Login failed:', error);
                    // Show error message to user
                    alert('Login failed. Please check your credentials and try again.');
                }
            } else {
                console.error('Email or password input not found');
                alert('Login form is incomplete. Please try again.');
            }
        });
    } else {
        console.error('Login form not found');
    }
});

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// Function to log out
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}
async function register(firstName, lastName, email, phoneNumber, password) {
    const apiUrl = 'https://vtuapi.honourworld.com/api/v2/auth/register';
    
    const raw = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phoneNumber,
        password: password
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            if (data.error && Array.isArray(data.error)) {
                const errorMessage = data.error.map(err => err.msg).join(', ');
                throw new Error(errorMessage || 'Registration failed');
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        }

        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phoneNumber = document.getElementById('phone-number').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const result = await register(firstName, lastName, email, phoneNumber, password);
                console.log('Registration successful:', result);
                alert('Registration successful! Please log in.');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Registration failed:', error);
                alert(`Registration failed: ${error.message}`);
            }
        });
    } else {
        console.error('Register form not found');
    }
});

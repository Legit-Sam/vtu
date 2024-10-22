// Function to fetch user data from the API
async function fetchUserData() {
    const apiUrl = 'https://vtuapi.honourworld.com/api/v2/user/profile';
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        console.error('No auth token found. User might not be logged in.');
        window.location.href = '../login.html';
        return;
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to update the UI with user data
function updateUIWithUserData(userData) {
    // Update user name in the header
    const userNameElement = document.querySelector('.user-info span');
    if (userNameElement) {
        userNameElement.textContent = `${userData.first_name} ${userData.last_name}`;
    }

    // Update user avatar if available
    const userAvatarElement = document.querySelector('.user-info img');
    if (userAvatarElement && userData.avatar) {
        userAvatarElement.src = userData.avatar;
    }

    // Update wallet balance if available
    const walletBalanceElement = document.querySelector('.balance-amount');
    if (walletBalanceElement && userData.wallet_balance) {
        walletBalanceElement.textContent = `₦${userData.wallet_balance.toFixed(2)}`;
    }

    // You can add more UI updates here based on the user data structure
}

// Function to initialize the dashboard
async function initializeDashboard() {
    try {
        const userData = await fetchUserData();
        updateUIWithUserData(userData);
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        // Handle error (e.g., show an error message to the user)
    }
}

// Call initializeDashboard when the page loads
document.addEventListener('DOMContentLoaded', initializeDashboard);

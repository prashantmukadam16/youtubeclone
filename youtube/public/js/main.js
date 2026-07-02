// Main JavaScript file for global functionality

// Token management
function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function clearToken() {
    localStorage.removeItem('token');
}

// Navigation
function navigateTo(url) {
    window.location.href = url;
}

// API calls helper
async function apiCall(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API Error:', error);
        return { error: error.message };
    }
}

// Logout function
function logout() {
    clearToken();
    window.location.href = '/';
}

// Format view count
function formatViewCount(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

console.log('YouTube Clone loaded successfully');

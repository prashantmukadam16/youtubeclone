// Like toggle
async function toggleLike(videoId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/users/login';
            return;
        }

        const response = await fetch(`/videos/${videoId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data.success) {
            alert('Like toggled!');
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Subscribe toggle
async function toggleSubscribe(userId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/users/login';
            return;
        }

        const response = await fetch(`/users/${userId}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data.success) {
            alert(data.subscribed ? 'Subscribed!' : 'Unsubscribed!');
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add comment
async function addComment(videoId) {
    const text = document.getElementById('commentText').value;
    if (!text.trim()) {
        alert('Please enter a comment');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/users/login';
            return;
        }

        const response = await fetch(`/videos/${videoId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        if (data.success) {
            document.getElementById('commentText').value = '';
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

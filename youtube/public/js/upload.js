// Upload video handler
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('visibility', document.getElementById('visibility').value);
    formData.append('videoFile', document.getElementById('videoFile').files[0]);
    formData.append('thumbnail', document.getElementById('thumbnail').files[0]);

    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'block';

    try {
        const response = await fetch('/videos/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        if (data.success) {
            alert('Video uploaded successfully!');
            window.location.href = `/videos/watch/${data.videoId}`;
        } else {
            alert('Upload failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Upload error: ' + error.message);
    }
});

// Upload progress tracking
document.getElementById('videoFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    console.log(`File selected: ${file.name} (${fileSize} MB)`);
});

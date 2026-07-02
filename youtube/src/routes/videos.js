const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', videoController.getAllVideos);
router.get('/search', videoController.searchVideos);
router.get('/watch/:id', videoController.getVideo);

// Protected routes
router.get('/upload', authenticate, videoController.uploadForm);
router.post('/upload', authenticate, videoController.uploadVideo);
router.post('/:id/like', authenticate, videoController.toggleLike);
router.post('/:id/comment', authenticate, videoController.addComment);
router.delete('/:id', authenticate, videoController.deleteVideo);

module.exports = router;

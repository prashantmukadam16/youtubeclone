const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.getProfile);
router.get('/:id/videos', userController.getUserVideos);

// Protected routes
router.post('/:id/subscribe', authenticate, userController.toggleSubscribe);
router.put('/profile', authenticate, userController.updateProfile);

module.exports = router;

const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'YouTube Clone'
  });
});

// Health check endpoint for Azure
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;

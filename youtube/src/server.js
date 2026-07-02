const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(expressLayouts);
app.set('layout', './layouts/main');

// Routes
const indexRoutes = require('./routes/index');
const videoRoutes = require('./routes/videos');
const userRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/videos', videoRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {} 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;

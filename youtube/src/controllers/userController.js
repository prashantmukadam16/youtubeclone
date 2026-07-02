const User = require('../models/User');
const Video = require('../models/Video');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('subscribers', 'username avatar')
      .populate('subscribing', 'username avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const videos = await Video.find({ uploader: user._id, visibility: 'public' })
      .populate('uploader', 'username avatar');

    res.render('users/profile', {
      user,
      videos,
      subscriberCount: user.subscribers.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

// Subscribe/Unsubscribe
exports.toggleSubscribe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subscriberIndex = targetUser.subscribers.indexOf(req.user._id);

    if (subscriberIndex > -1) {
      targetUser.subscribers.splice(subscriberIndex, 1);
      req.user.subscribing = req.user.subscribing.filter(id => id.toString() !== targetUser._id.toString());
    } else {
      targetUser.subscribers.push(req.user._id);
      req.user.subscribing.push(targetUser._id);
    }

    await targetUser.save();
    await req.user.save();

    res.json({ success: true, subscribed: subscriberIndex === -1 });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling subscription', error: err.message });
  }
};

// Get user's videos
exports.getUserVideos = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const videos = await Video.find({ uploader: req.params.id })
      .populate('uploader', 'username avatar');

    res.json({
      success: true,
      user,
      videos
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { firstName, lastName, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        bio,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

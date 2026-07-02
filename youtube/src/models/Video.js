const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 5000
  },
  videoFile: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: '/images/default-thumbnail.png'
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  category: {
    type: String,
    enum: ['Music', 'Entertainment', 'Education', 'Sports', 'News', 'Gaming', 'Other'],
    default: 'Other'
  },
  tags: [String],
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  duration: Number,
  fileSize: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Video', videoSchema);

const Video = require('../models/Video');
const User = require('../models/User');
const path = require('path');
const fs = require('fs').promises;

// Get all public videos
exports.getAllVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ visibility: 'public' })
      .populate('uploader', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Video.countDocuments({ visibility: 'public' });

    res.render('videos/index', {
      videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to fetch videos', error: err });
  }
};

// Search videos
exports.searchVideos = async (req, res) => {
  try {
    const { q, category } = req.query;
    let query = { visibility: 'public' };

    if (q) {
      query.$text = { $search: q };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate('uploader', 'username avatar')
      .sort({ views: -1 })
      .limit(24);

    res.render('videos/search', {
      videos,
      query: q,
      category
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Search failed', error: err });
  }
};

// Get single video
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('uploader', 'username avatar _id')
     .populate('comments.user', 'username avatar');

    if (!video) {
      return res.status(404).render('error', { message: 'Video not found' });
    }

    // Get related videos
    const related = await Video.find({
      category: video.category,
      _id: { $ne: video._id },
      visibility: 'public'
    }).limit(6).populate('uploader', 'username avatar');

    res.render('videos/watch', {
      video,
      related,
      isOwner: req.user && req.user._id.toString() === video.uploader._id.toString()
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to fetch video', error: err });
  }
};

// Upload video form
exports.uploadForm = (req, res) => {
  if (!req.user) {
    return res.redirect('/users/login');
  }
  res.render('videos/upload');
};

// Upload video
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, category, visibility } = req.body;

    if (!title || !req.files || !req.files.videoFile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const videoFile = req.files.videoFile;
    const thumbnail = req.files.thumbnail;

    const video = new Video({
      title,
      description,
      category: category || 'Other',
      visibility: visibility || 'public',
      uploader: req.user._id,
      videoFile: `/uploads/${videoFile.name}`,
      thumbnail: thumbnail ? `/uploads/${thumbnail.name}` : '/images/default-thumbnail.png',
      fileSize: videoFile.size
    });

    await video.save();

    // Move files
    await videoFile.mv(path.join(__dirname, `../../public/uploads/${videoFile.name}`));
    if (thumbnail) {
      await thumbnail.mv(path.join(__dirname, `../../public/uploads/${thumbnail.name}`));
    }

    res.json({ success: true, message: 'Video uploaded successfully', videoId: video._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// Like/Unlike video
exports.toggleLike = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const userId = req.user._id;
    const likeIndex = video.likes.indexOf(userId);

    if (likeIndex > -1) {
      video.likes.splice(likeIndex, 1);
    } else {
      video.likes.push(userId);
      // Remove from dislikes if present
      const dislikeIndex = video.dislikes.indexOf(userId);
      if (dislikeIndex > -1) {
        video.dislikes.splice(dislikeIndex, 1);
      }
    }

    await video.save();
    res.json({ success: true, likes: video.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling like', error: err.message });
  }
};

// Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete files
    const videoPath = path.join(__dirname, `../../public${video.videoFile}`);
    const thumbnailPath = path.join(__dirname, `../../public${video.thumbnail}`);

    try {
      await fs.unlink(videoPath);
    } catch (err) {
      console.error('Error deleting video file:', err);
    }

    if (video.thumbnail !== '/images/default-thumbnail.png') {
      try {
        await fs.unlink(thumbnailPath);
      } catch (err) {
        console.error('Error deleting thumbnail:', err);
      }
    }

    await Video.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting video', error: err.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text } = req.body;
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.comments.push({
      user: req.user._id,
      text
    });

    await video.save();
    res.json({ success: true, message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
};

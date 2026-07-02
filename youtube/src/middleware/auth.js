const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
exports.authenticate = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Authorization for resource owner
exports.authorize = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: 'Not authorized to access this resource' });
  }
  next();
};

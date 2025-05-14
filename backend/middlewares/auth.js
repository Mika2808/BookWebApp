const jwt = require('jsonwebtoken');
const KEY = 'key123';

// Verify JWT and attach user data to the request
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, KEY, (err, user) => {
    if (err && req.user?.role !== 'admin') return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};

// Generate a token (can be used in login controller)
exports.generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role
  }, KEY, { expiresIn: '1h' });
};

// Checking if user is admin
exports.isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  };

// Checking if user is not admin
exports.isNotAdmin = (req, res, next) => {
    if (req.user?.role === 'admin') {
      return res.status(403).json({ error: 'Only user activity' });
    }
    next();
  };

// Checking if user is admin or logged user
exports.isSelfOrAdmin = (req, res, next) => {
    const loggedUserId = req.user.id;
    const paramId = parseInt(req.params.id);
  
    if (req.user.role === 'admin' || loggedUserId === paramId) {
      return next();
    }
  
    return res.status(403).json({ error: 'Not authorized' });
  };

  // Checking if user is logged user
exports.isSelf = (req, res, next) => {
    const loggedUserId = req.user.id;
    const paramId = parseInt(req.params.id);
  
    if (loggedUserId === paramId) {
      return next();
    }
  
    return res.status(403).json({ error: 'Not authorized' });
  };
  
  
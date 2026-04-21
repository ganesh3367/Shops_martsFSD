const { admin } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (admin.apps.length === 0) {
    console.warn('Auth skipped: Firebase Admin not initialized');
    // For development, you might want to allow this or return 503
    return res.status(503).json({ error: 'Authentication service unavailable' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ error: 'Unauthorized' });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    // Also check if admin flag is set in custom claims
    if (req.user && req.user.admin === true) {
      next();
    } else {
      res.status(403).json({ error: 'Admin access required' });
    }
  }
};

module.exports = { verifyToken, isAdmin };

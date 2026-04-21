const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken } = require('../middleware/auth');

// GET /api/auth/profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not initialized. Check backend .env' });

    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not initialized. Check backend .env' });

    const { displayName, phone, address, photoURL } = req.body;
    const update = { updatedAt: new Date().toISOString() };

    if (displayName !== undefined) update.displayName = displayName;
    if (phone       !== undefined) update.phone       = phone;
    if (address     !== undefined) update.address     = address;
    if (photoURL    !== undefined) update.photoURL    = photoURL;

    await db.collection('users').doc(req.user.uid).set(update, { merge: true });

    res.json({ message: 'Profile updated successfully', ...update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

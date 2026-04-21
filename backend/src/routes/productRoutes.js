const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not initialized. Please check backend .env' });
    }
    const productsSnapshot = await db.collection('products').get();
    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const productDoc = await db.collection('products').doc(req.params.id).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = req.body;
    const docRef = await db.collection('products').add({
      ...product,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: docRef.id, ...product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).update(req.body);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).delete();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

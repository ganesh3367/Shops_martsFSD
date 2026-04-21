const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create Order
router.post('/', verifyToken, async (req, res) => {
  try {
    const order = {
      userId: req.user.uid,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      shippingAddress: req.body.shippingAddress,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('orders').add(order);
    res.status(201).json({ id: docRef.id, ...order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').where('userId', '==', req.user.uid).get();
    const orders = [];
    ordersSnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Orders (Admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = [];
    ordersSnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

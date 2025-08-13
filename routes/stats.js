const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Get dashboard statistics (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get total inquiries count
    const [inquiriesResult] = await db.query('SELECT COUNT(*) as count FROM contacts');
    const totalInquiries = inquiriesResult[0].count;

    // Get total admins count
    const [adminsResult] = await db.query('SELECT COUNT(*) as count FROM admins');
    const totalAdmins = adminsResult[0].count;

    res.json({
      inquiries: totalInquiries,
      admins: totalAdmins
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ msg: 'Error fetching statistics', error: err.message });
  }
});

module.exports = router;

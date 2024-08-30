const express = require('express');
const { processPayment } = require('../services/paymentService');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/charge', protect, processPayment);

module.exports = router;

const express = require('express');
const { refillTokens } = require('../controllers/tokenController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/tokens/refill
// @desc    Refill user tokens
// @access  Private
router.post('/refill', protect, refillTokens);

module.exports = router;

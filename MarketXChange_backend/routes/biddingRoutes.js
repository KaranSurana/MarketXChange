const express = require('express');
const { placeBid, getBidsByProduct } = require('../controllers/biddingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/bidding/place
// @desc    Place a new bid
// @access  Private
router.post('/place', protect, placeBid);

// @route   GET /api/bidding/product/:id
// @desc    Get bids for a specific product
// @access  Public
router.get('/product/:id', getBidsByProduct);

module.exports = router;

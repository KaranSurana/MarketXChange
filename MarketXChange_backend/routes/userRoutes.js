const express = require('express');
const { getUserProfile, updateUserProfile, getUserTokens } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

// @route   GET /api/users/tokens
// @desc    Get user token balance
// @access  Private
router.get('/tokens', protect, getUserTokens);

module.exports = router;

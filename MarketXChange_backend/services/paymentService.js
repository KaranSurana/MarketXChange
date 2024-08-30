const User = require('../models/User');

exports.processPayment = async (req, res) => {
    const { amount } = req.body; // Amount is in tokens
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.tokens < amount) {
            return res.status(400).json({ message: 'Insufficient tokens' });
        }

        user.tokens -= amount;
        await user.save();

        res.status(200).json({ message: 'Payment successful', remainingTokens: user.tokens });
    } catch (error) {
        res.status(500).json({ message: 'Payment processing failed' });
    }
};

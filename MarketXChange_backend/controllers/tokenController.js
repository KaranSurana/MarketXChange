const User = require('../models/User');

exports.refillTokens = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.tokens += 3000;
        await user.save();

        res.status(200).json({ message: 'Tokens refilled', currentTokens: user.tokens });
    } catch (error) {
        res.status(500).json({ message: 'Token refill failed' });
    }
};

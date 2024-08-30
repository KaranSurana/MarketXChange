
const Product = require('../models/Product');
const redisClient = require('../config/redis');

exports.getPersonalizedSuggestions = async (userId) => {
    // Example: Retrieve history, analyze, and suggest products
    const history = await User.findById(userId).select('history');
    const suggestions = await Product.find({ category: { $in: history.categories } });

    // Cache the suggestions
    redisClient.setex(`suggestions_${userId}`, 3600, JSON.stringify(suggestions));

    return suggestions;
};

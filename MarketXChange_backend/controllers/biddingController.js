const Bid = require('../models/Bid');
const Product = require('../models/Product');

exports.placeBid = async (req, res) => {
    try {
        const { amount, productId } = req.body;

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Ensure the bid is valid (e.g., higher than the current price)
        if (amount <= product.price) {
            return res.status(400).json({ message: 'Bid must be higher than the current price' });
        }

        // Create a new bid
        const newBid = await Bid.create({
            amount,
            user: req.user._id,
            product: productId
        });

        // Update the product price
        product.price = amount;
        await product.save();

        // Emit the bidPlaced event via Socket.IO
        req.app.get('io').emit('bidPlaced', {
            productId: productId,
            amount: newBid.amount,
            user: { email: req.user.email } // Or any user info you want to emit
        });

        res.status(201).json(newBid);
    } catch (error) {
        console.error('Error placing bid:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// @desc    Get bids for a specific product
// @route   GET /api/bidding/product/:id
// @access  Public
exports.getBidsByProduct = async (req, res) => {
    try {
        const bids = await Bid.find({ product: req.params.id })
            .populate('user', 'email')  // Ensure the user's email is populated
            .sort({ amount: -1 });
        if (bids.length === 0) {
            return res.status(404).json({ message: 'No bids found for this product' });
        }
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

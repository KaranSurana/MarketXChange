const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }] // Array to store bid references
});

module.exports = mongoose.model('Product', productSchema);

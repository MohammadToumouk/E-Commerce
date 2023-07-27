const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
});


const cartSchema = new mongoose.Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

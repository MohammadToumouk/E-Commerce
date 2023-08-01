const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = mongoose.Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  brand: { type: String },
  name: { type: String },
  images: { type: String },
  quantity: { type: Number, default: 1 },
  category: { type: String },
  price: { type: Number },
  description: { type: String, default: "" },
  color: { type: String, default: "" },
  size: { type: String, default: "" },
});

const cartSchema = new mongoose.Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

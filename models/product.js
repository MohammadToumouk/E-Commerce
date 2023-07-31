const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    color: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "products" }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product

const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const errorHandler = require("../middleware/errorHandler");
const verificationMiddleware = require("../middleware/verfiyToken");

// Create a new product
productRouter.post(
  "/",
  upload.single("image"),
  productController.createProduct
);

// Get all products
productRouter.get("/", productController.getAllProducts);

// Get a specific product
productRouter.get("/:id", productController.getProductById);

// Update a specific product
productRouter.put("/:id", productController.updateProduct);

// Delete a specific product
productRouter.delete(
  "/:id",
  verificationMiddleware,
  //authMiddleware(["manager"]),
  productController.deleteProduct
);

module.exports = productRouter;

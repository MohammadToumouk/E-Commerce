const Order = require('../Models/order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, products, total, shippingAddress, paymentStatus, shippingStatus } = req.body;

    const newOrder = new Order({
      user,
      products,
      total,
      shippingAddress,
      paymentStatus,
      shippingStatus,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Update a specific order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { user, products, total, shippingAddress, paymentStatus, shippingStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        user,
        products,
        total,
        shippingAddress,
        paymentStatus,
        shippingStatus,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Delete a specific order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

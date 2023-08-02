const Order = require("../models/order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      total,
      shippingAddress,
      paymentStatus,
      shippingStatus,
    } = req.body;

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
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Update a specific order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      user,
      products,
      total,
      shippingAddress,
      paymentStatus,
      shippingStatus,
    } = req.body;

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
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Delete a specific order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Get orders based on date

const getOrderByDate = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $type: "date" }, // Filter documents where "createdAt" is of type Date
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalOrders: { $sum: 1 }, // Count the number of orders in each group
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: {
            $concat: [
              {
                $switch: {
                  branches: [
                    { case: { $eq: ["$_id.month", 1] }, then: "January" },
                    { case: { $eq: ["$_id.month", 2] }, then: "February" },
                    { case: { $eq: ["$_id.month", 3] }, then: "March" },
                    { case: { $eq: ["$_id.month", 4] }, then: "April" },
                    { case: { $eq: ["$_id.month", 5] }, then: "May" },
                    { case: { $eq: ["$_id.month", 6] }, then: "June" },
                    { case: { $eq: ["$_id.month", 7] }, then: "July" },
                    { case: { $eq: ["$_id.month", 8] }, then: "August" },
                    { case: { $eq: ["$_id.month", 9] }, then: "September" },
                    { case: { $eq: ["$_id.month", 10] }, then: "October" },
                    { case: { $eq: ["$_id.month", 11] }, then: "November" },
                    { case: { $eq: ["$_id.month", 12] }, then: "December" },
                    { case: true, then: "Unknown" },
                  ],
                  default: "Unknown",
                },
              },
            ],
          },
          totalOrders: 1,
        },
      },

      {
        $sort: {
          month: 1,
        },
      },
      {
        $limit: 12, // Limit the results to the first 10 documents
      },
    ];

    const result = await Order.aggregate(pipeline);

    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    result.sort((a, b) => {
      const aIndex = monthOrder.indexOf(a.month.split(" ")[0]);
      const bIndex = monthOrder.indexOf(b.month.split(" ")[0]);
      return aIndex - bIndex;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByDate,
};

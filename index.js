const express = require("express");
const path = require("path");

const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const orderRouter = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const cartRouter = require("./routes/cartRoutes");
require("dotenv/config");
const config = require("./utils/config");

const port = 3069;
const app = express();
app.use(cookieParser());
app.use(express.json());
require("./db");

app.use(express.static(path.join(__dirname, "E-Commerce", "dist")));
//app.use(express.static(path.join(__dirname, "Admin-Dashboard", "dist")));

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = { origin: allowedOrigins, credentials: true };

/*const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};*/

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/customer", customerRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/stripe", stripeRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "E-Commerce", "dist", "index.html"));
  //res.sendFile(path.join(__dirname, "Admin-Dashboard", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on Port: http://localhost:${port}`);
  console.log(process.env.STRIPE_SECRET_KEY);
});

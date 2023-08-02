const express = require("express");

const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const stripeRouter = require("./routes/stripeRoutes")
const orderRouter = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorhandler");
const bodyParser = require('body-parser');
const cartRouter = require("./routes/cartRoutes");
require("dotenv/config");
const config = require('./utils/config')



const port = 3069;
const app = express();
app.use(cookieParser());
app.use(express.json());
require("./db");

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRoutes);
app.use("/cart", cartRouter)
app.use("/stripe", stripeRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on Port: http://localhost:${port}`);
  console.log(process.env.STRIPE_SECRET_KEY)
});

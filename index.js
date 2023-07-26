const express = require('express')
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRouter = require('./routes/orderRoutes');
const cookieParser = require('cookie-parser');
const { errorHandler } = require('./middleware/errorhandler');

const port = 3069;


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}));

require("dotenv/config");
require("./db");

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/customer", customerRoutes)
app.use(errorHandler)





app.listen(port, () => {
  console.log(`Server is running on Port: http://localhost:${port}`);
});


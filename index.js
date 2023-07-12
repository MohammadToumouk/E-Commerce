const express = require('express')
const cors = require('cors');
const userRouter = require('./Routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const port = 3069;
require('dotenv/config');
require('./db')

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)




app.listen(port, () => {
    console.log('Server is running on Port:' + (port))
})
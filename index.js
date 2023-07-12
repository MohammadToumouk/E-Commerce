const express = require('express')
const cors = require('cors')
const port = 3069;
require('dotenv/config');
require('./db')

const app = express();
app.use(express.json());
app.use(cors());


app.listen(port, () => {
    console.log('Server is running on Port:' + (port))
})
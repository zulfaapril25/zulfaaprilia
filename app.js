const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const winston = require('winston');


const book = require('./routes/bookRoutes.js')
const order = require('./routes/orderRoutes.js')
const user = require('./routes/userRoutes.js')
const transaksi = require('./routes/transaksiRoutes.js')

const { Book, Order, User, Transaction } = require("./models");

app.use(bodyParser.json());
app.use(express.json());
app.use(book)
app.use(order)
app.use(user)
app.use(transaksi)

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

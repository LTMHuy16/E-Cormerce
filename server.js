const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const orderRouters = require('./routes/orderRouters');
const { corsOption } = require('./middleware/CORS.JS');

const app = express();

// CONFIG MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOption));

// CONFIG ROUTES
app.use('/order', orderRouters);

app.use(function (error, req, res, next) {
  res.status(500).json(error.message);
});

app.listen(PORT, () => {
  console.log('Server is running');
});

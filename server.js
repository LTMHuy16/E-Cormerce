const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// UTILITIES FUNCTIONS
const { authJwt } = require('./middleware/jwt');
const { errorHandler } = require('./middleware/handleError');

// IMPORT CONTROLLERS
const userRouters = require('./routes/userRouters');
const categoryRouters = require('./routes/categoryRouters');
const productRoutes = require('./routes/productRouters');
const orderRouters = require('./routes/orderRouters');

const app = express();

// CONFIG MIDDLEWARE
app.use(cors());
app.use(authJwt());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// CONFIG ROUTES
app.use('/user', userRouters);
app.use('/category', categoryRouters);
app.use('/products', productRoutes);
app.use('/orders', orderRouters);

// CONFIG GLOBAL ERROR
app.use(errorHandler);

// START SERVER
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => {
    throw new Error("Can't connect to your database");
  });

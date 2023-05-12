const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// UTILITIES FUNCTIONS
const { authJwt } = require('./helpers/jwt');
const { errorHandler } = require('./helpers/handleError');

// CONTROLLERS
const productRoutes = require('./routes/productRouters');
const categoryRouters = require('./routes/categoryRouters');
const userRouters = require('./routes/userRouters');

const app = express();

// CONFIG MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(authJwt());

// CONFIG ROUTES
app.use('/products', productRoutes);
app.use('/category', categoryRouters);
app.use('/user', userRouters);

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

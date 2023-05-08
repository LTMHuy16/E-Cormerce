const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const productRoutes = require('./routes/productRouters');
const categoryRouters = require('./routes/categoryRouters');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(cors());
// app.options;

app.use('/products', productRoutes);
app.use('/category', categoryRouters);

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

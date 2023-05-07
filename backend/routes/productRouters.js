const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { getProducts } = require('../controllers/productController');

router.get('/', getProducts);


module.exports = router;

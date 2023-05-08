const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getFeaturedProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  countProducts,
} = require('../controllers/productController');

router.get('/', getProducts);

router.get('/count', countProducts);

router.get('/feature', getFeaturedProducts);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;

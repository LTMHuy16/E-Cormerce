const express = require('express');
const router = express.Router();
const { upload } = require('../utils/multer/multerStore');
const {
  getProducts,
  getProduct,
  getFeaturedProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  countProducts,
  updateImages,
} = require('../controllers/productController');

router.get('/', getProducts);

router.get('/count', countProducts);

router.get('/feature', getFeaturedProducts);

router.get('/:id', getProduct);

router.post('/', upload.single('image'), createProduct);

router.put('/images/:id', upload.array('images', 20), updateImages);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;

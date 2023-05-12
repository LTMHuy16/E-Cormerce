const {
  checkRequireFields,
  checkMongooseId,
} = require('../helpers/validator');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

async function getProducts(req, res) {
  const products = await Product.find();

  if (!products) res.status(400).json({ error: 'No product was found' });

  res.status(200).json(products);
}

async function getFeaturedProducts(req, res) {
  const featuredProducts = await Product.find({ isFeatured: true });

  if (!featuredProducts)
    res.status(400).json({ error: 'No featured products was found' });

  res.status(200).json(featuredProducts);
}

async function countProducts(req, res) {
  try {
    const productCount = await Product.countDocuments({});

    if (!productCount)
      res.status(404).json({ error: "Can't not get count value." });

    res.status(200).json({ count: productCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    checkRequireFields('id', req.params);
    checkMongooseId(id, 'Product');

    const product = await Product.findById(id).populate('category');

    if (!product) throw Error(`Not found product with id '${id}'`);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    checkRequireFields(
      ['name', 'description', 'category', 'countInStock'],
      req.body
    );
    checkMongooseId(req.body.category, 'Category');

    const category = await Category.findById(req.body.category);
    if (!category) throw new Error("Can't not found category.");

    const newProduct = await Product.create({ ...req.body });

    if (!newProduct)
      return res.status(400).json({ error: "Can't not create this product." });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    checkRequireFields('id', req.params);
    checkMongooseId(req.params.id);

    if (req.body.category) {
      const isValid = await Category.checkExist(req.body.category);
      if (!isValid) throw Error('Invalid category id.');
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!product)
      throw Error(`Can't not updated product with id '${req.params.id}'`);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    checkRequireFields('id', req.params);
    checkMongooseId(req.params.id);

    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product)
      throw Error(`Can't not remove product with id '${req.params.id}'`);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getProducts,
  getFeaturedProducts,
  countProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

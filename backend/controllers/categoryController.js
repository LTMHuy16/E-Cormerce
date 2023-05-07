const Category = require('../models/categoryModel');
const {
  checkRequireFields,
  checkMongooseId,
} = require('../helpers/handleError');

async function getCategories(req, res) {
  const categoryList = await Category.find();

  if (!categoryList) res.status(500).json({ error: 'No category was found' });

  res.status(200).json(categoryList);
}

async function createCategory(req, res) {
  try {
    const { name, icon, color } = req.body;
    checkRequireFields('name', req.body);

    const category = await Category.create({ name, icon, color });

    if (!category)
      return res.status(404).json({ error: "Can't not create this category" });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const categoryId = req.params.id;
    if (!categoryId) throw new Error('Please provide id to remove category');
    checkMongooseId(categoryId);

    const category = await Category.findByIdAndRemove(categoryId);

    if (!category) return res.status(400).json({ error: 'No such category' });

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateCategory(req, res) {
  try {
    const { name, icon, color } = req.body;
    checkRequireFields('name', req.body);

    const category = await Category.create({ name, icon, color });

    if (!category)
      return res.status(404).json({ error: "Can't not create this category" });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};

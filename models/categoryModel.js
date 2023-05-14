const mongoose = require('mongoose');
const { checkMongooseId } = require('../middleware/handleError');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

categorySchema.statics.checkExist = async function (categoryId) {
  if (mongoose.Types.ObjectId.isValid(categoryId)) {
    const category = await this.findById(categoryId);
    if (category) return true;
  }

  return false;
};

categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

categorySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model('Category', categorySchema);

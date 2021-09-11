const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 250
  }
});

const Category = mongoose.model('Category', categorySchema);

const validateCategory = (category) => {
  const schema = Joi.object({
      name: Joi.string().min(4).max(250).required()
  })
  return schema.validate(category);
}

exports.categorySchema = categorySchema;
exports.Category = Category; 
exports.validate = validateCategory;
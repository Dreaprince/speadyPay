const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');


const Product = mongoose.model('Product', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 250
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  quantityAvailable: {
     type: Number,
     required: true,
     min: 0,
     max: 250
  },
   category: {
     type: categorySchema,
     required: true
   },
   dateCreated: { 
    type: Date, 
    required: true,
    default: Date.now
  },

  update: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  }
}))


const validateProduct = (product) => {

  const schema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(4).max(50).required(),
    quantityAvailable: Joi.number().min(0).required(),
    category: Joi.string().required(),
    update: Joi.string().min(0).required()
     
  })

  return schema.validate(product);
}

exports.Product = Product; 
exports.validate = validateProduct;
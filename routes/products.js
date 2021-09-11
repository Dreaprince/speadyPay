const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Product, validate} = require('../models/product')
const {Category} = require('../models/category')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().sort('-update -dateCreated ');
  res.send(products);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOne(req.body.name);
  if(!category) return res.status(400).send('Invalid Category');

  let product = new Product({ 
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    quantityAvailable: req.body.quantityAvailable,
    category:  {
      _id: category._id,
      name: category.name
    }  ,
    dateCreated: req.body.dateCreated ,
    update:  req.body.update
  });

  product = await product.save();
  
  res.send(product);
});

router.put('/:id',  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOne(req.body.name);
  if(!category) return res.status(400).send('Invalid Category');

  const product = await Product.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      quantityAvailable: req.body.quantityAvailable,
      category:  {
        _id: category._id,
        name: category.name
      }  ,
      dateCreated: req.body.dateCreated ,
      update:  req.body.update
    }, { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

router.delete('/:id', async (req, res) => {
  const products = await Product.findByIdAndRemove(req.params.id);

  if (!products) return res.status(404).send('The products with the given ID was not found.');

  res.send(products);
});

router.get('/:id', auth,  async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (!products) return res.status(404).send('The products with the given ID was not found.');

  res.send(products);
});

module.exports = router; 
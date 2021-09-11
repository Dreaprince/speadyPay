const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const categories = require('./routes/categories');
const products = require('./routes/products');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }

mongoose.connect('mongodb://localhost/speedyPay')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
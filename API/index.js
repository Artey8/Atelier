const express = require('express');
const bodyParser = require('body-parser');

const products = require('./products');
const qa = require('./qa');
const reviews = require('./reviews');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', products);
app.use('/qa', qa);
app.use('/reviews', reviews);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});

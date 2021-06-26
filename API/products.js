const express = require('express');
const { getMultipleProducts, getSingleProduct } = require('../DATABASE/Products/controllers/dbQueries');
const { getProductFeatures, getProductStyles } = require('../DATABASE/Products/controllers/dbQueries');
const { getProductRelateds, getStyleSKUs } = require('../DATABASE/Products/controllers/dbQueries');
const { getStylePhotos } = require('../DATABASE/Products/controllers/dbQueries');

const router = express.Router();

router.get('/', (req, res) => {
  const { page, count } = req.query;
  const productStore = [];

  getMultipleProducts(page, count)
    .then((resVal) => {
      resVal.forEach((product) => {
        productStore.push(product);
      });
      res.status(200);
      res.send(productStore);
    })
    .catch((rejVal) => {
      res.status(404);
      res.send(rejVal);
    });
});

router.get('/:id(\\d+$)', (req, res) => {
  const productId = req.params.id;
  const featureStore = [];
  let productStore = {};

  Promise.all([getSingleProduct(productId), getProductFeatures(productId)])
    .then(([productDetails, productFeatures]) => {
      productFeatures.forEach((feature) => {
        featureStore.push(feature.dataValues);
      });
      productStore = {
        ...productDetails[0].dataValues,
        features: featureStore,
      };
      res.status(200);
      res.send(productStore);
    })
    .catch((rejVal) => {
      res.status(404);
      res.send(rejVal);
    });
});

router.get('/:id(\\d+)/styles', (req, res) => {
  const productId = req.params.id;
  const styleRange = [];
  const styleCache = {};
  getProductStyles(productId)
    .then((resVal) => {
      resVal.forEach((style) => {
        styleCache[style.dataValues.id] = {
          ...style.dataValues,
          skus: [],
          photos: [],
        };
        styleRange.push(style.dataValues.id);
      });
      return Promise.all([getStyleSKUs(styleRange), getStylePhotos(styleRange)]);
    })
    .then(([skuVals, photoVals]) => {
      skuVals.forEach((sku) => {
        styleCache[sku.dataValues.style_id].skus.push({
          size: sku.dataValues.size,
          quantity: sku.dataValues.quantity,
        });
      });
      photoVals.forEach((photo) => {
        styleCache[photo.dataValues.style_id].photos.push({
          url: photo.dataValues.url,
          thumbnail_url: photo.dataValues.thumbnail_url,
        });
      });
      res.status(200);
      res.send(Object.values(styleCache));
    })
    .catch((rejVal) => {
      res.status(404);
      res.send(rejVal);
    });
});

router.get('/:id(\\d+)/related', (req, res) => {
  const productId = req.params.id;
  const relatedStore = [];

  getProductRelateds(productId)
    .then((resVal) => {
      resVal.forEach((item) => {
        relatedStore.push(item.dataValues.related_product_id);
      });
      res.status(200);
      res.send(relatedStore);
    })
    .catch((rejVal) => {
      res.status(404);
      res.send(rejVal);
    });
});

module.exports = router;

const { Op } = require('sequelize');
const { Products } = require('../models/product');
const { Features } = require('../models/features');
const { Styles } = require('../models/styles');
const { Skus } = require('../models/skus');
const { Photos } = require('../models/photos');
const { Relateds } = require('../models/related');

function getSingleProduct(productId) {
  const productParams = {
    where: {
      product_id: productId,
    },
  };
  return Products.findAll(productParams);
}

function getMultipleProducts(page = 1, count = 5) {
  const startIndex = ((page - 1) * count) + 1;
  const endIndex = page * count;
  const productParams = {
    where: {
      product_id: {
        [Op.between]: [startIndex, endIndex],
      },
    },
  };
  return Products.findAll(productParams);
}

function getProductFeatures(productId) {
  const featureParams = {
    attributes: ['feature', 'value'],
    where: { product_id: productId },
  };
  return Features.findAll(featureParams);
}

function getProductRelateds(productId) {
  const featureParams = {
    attributes: ['related_product_id'],
    where: { current_product_id: productId },
  };
  return Relateds.findAll(featureParams);
}

function getProductStyles(productId) {
  const featureParams = {
    where: { product_id: productId },
  };
  return Styles.findAll(featureParams);
}

function getStyleSKUs(styleIdRange) {
  const featureParams = {
    where: {
      style_id: {
        [Op.or]: styleIdRange,
      },
    },
  };
  return Skus.findAll(featureParams);
}

function getStylePhotos(styleIdRange) {
  const featureParams = {
    where: {
      style_id: {
        [Op.or]: styleIdRange,
      },
    },
  };
  return Photos.findAll(featureParams);
}

module.exports.getSingleProduct = getSingleProduct;
module.exports.getMultipleProducts = getMultipleProducts;
module.exports.getProductFeatures = getProductFeatures;
module.exports.getProductRelateds = getProductRelateds;
module.exports.getProductStyles = getProductStyles;
module.exports.getStyleSKUs = getStyleSKUs;
module.exports.getStylePhotos = getStylePhotos;

const { sequelize } = require('./sequelizeInit');
const { Products } = require('../models/product');
const { Styles } = require('../models/styles');
const { Features } = require('../models/features');
const { Skus } = require('../models/skus');
const { Photos } = require('../models/photos');
const { Relateds } = require('../models/related');
const { loadData, indexData } = require('../elt/ProductsETL');

const synchronize = async () => {
  try {
    await Products.sync({ force: true });
    await Styles.sync({ force: true });
    await Features.sync({ force: true });
    await Skus.sync({ force: true });
    await Photos.sync({ force: true });
    await Relateds.sync({ force: true });
    console.log('Synchronization successful');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await synchronize();
    await loadData();
    await indexData();
    // await transformData();
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initialize();

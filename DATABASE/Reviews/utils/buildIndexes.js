const { sequelize } = require('../db');

const indexesToBuild = [
  {
    table: 'Reviews',
    name: 'Reviews_product_id_index',
    column: 'product_id',
  },
  {
    table: 'ReviewPhotos',
    name: 'ReviewPhotos_review_id_index',
    column: 'review_id',
  },
  {
    table: 'CharacteristicReviews',
    name: 'CharacteristicReviews_review_id_index',
    column: 'review_id',
  },
  {
    table: 'CharacteristicReviews',
    name: 'CharacteristicReviews_characteristic_id_index',
    column: 'characteristic_id',
  },
  {
    table: 'Characteristics',
    name: 'Characteristics_name_index',
    column: 'name',
  },
  {
    table: 'Characteristics',
    name: 'Characteristics_product_id_index',
    column: 'product_id',
  },
];

const buildIndexes = async (indexes = indexesToBuild) => {
  console.log('Building indexes...');
  const operations = [];
  indexes.forEach((spec) => {
    operations.push(sequelize.query(`CREATE INDEX IF NOT EXISTS "${spec.name}" ON "${spec.table}" (${spec.column});`));
  });
  try {
    await Promise.all(operations);
  } catch (err) {
    console.error(err);
  }
  console.log('Finished building indexes');
};

module.exports = buildIndexes;

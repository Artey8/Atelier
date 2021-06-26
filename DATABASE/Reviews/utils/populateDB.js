const path = require('path');
const { sequelize } = require('../db');
const etlConfig = require('../../etlConfig');

const INPUT_DIR = etlConfig.REVIEWS_INPUT_DIR;
const INPUT_FILE_REVIEWS = etlConfig.REVIEWS_INPUT_FILE_REVIEWS;
const INPUT_FILE_REVIEW_PHOTOS = etlConfig.REVIEWS_INPUT_FILE_REVIEW_PHOTOS;
const INPUT_FILE_CHARACTERISTICS = etlConfig.REVIEWS_INPUT_FILE_CHARACTERISTICS;
const INPUT_FILE_CHARACTERISTICS_REVIEWS = etlConfig.REVIEWS_INPUT_FILE_CHARACTERISTICS_REVIEWS;

const copyReviews = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_REVIEWS);
  await sequelize.query(`COPY "Reviews"(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyReviewPhotos = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_REVIEW_PHOTOS);
  await sequelize.query(`COPY "ReviewPhotos"(id,review_id,url) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyCharacteristics = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_CHARACTERISTICS);
  await sequelize.query(`COPY "Characteristics"(id,product_id,name) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const copyCharacteristicReviews = async () => {
  const INPUT_PATH = path.join(INPUT_DIR, INPUT_FILE_CHARACTERISTICS_REVIEWS);
  await sequelize.query(`COPY "CharacteristicReviews"(id,characteristic_id,review_id,value) FROM '${INPUT_PATH}' DELIMITER ',' CSV HEADER;`);
};

const populateDB = async () => {
  console.log('Copying data into DB (this may take a while)...');
  try {
    await Promise.all([
      copyReviews(),
      copyCharacteristics(),
    ]);
    await Promise.all([
      copyCharacteristicReviews(),
      copyReviewPhotos(),
    ]);
  } catch (err) {
    console.error(err);
  }
  console.log('Finished copying data into DB');
};

module.exports = populateDB;

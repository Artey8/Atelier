const { Review, ReviewPhoto, CharacteristicReview } = require('../models');

const postReview = async (req, res) => {
  const params = req.body;
  let reviewRecord;
  let photos;
  let characteristics;
  let operations;
  try {
    reviewRecord = await Review.create(params);
    const reviewID = reviewRecord.dataValues.id;
    photos = params.photos.map((url) => (
      {
        review_id: reviewID,
        url,
      }
    ));
    characteristics = Object.keys(params.characteristics).map((characteristicID) => (
      {
        review_id: reviewID,
        characteristic_id: characteristicID,
        value: params.characteristics[characteristicID],
      }
    ));
    operations = [
      ReviewPhoto.bulkCreate(photos),
      CharacteristicReview.bulkCreate(characteristics),
    ];
    await Promise.all(operations);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = postReview;

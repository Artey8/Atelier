const { Review } = require('../models');
const { sequelize } = require('../db');

const markHelpful = async (req, res) => {
  const reviewID = req.params.review_id;
  try {
    await Review.update({
      helpfulness: sequelize.literal('helpfulness + 1'),
    }, {
      where: {
        id: reviewID,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};

module.exports = markHelpful;

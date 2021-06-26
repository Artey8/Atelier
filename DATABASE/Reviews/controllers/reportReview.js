const { Review } = require('../models');

const reportReview = async (req, res) => {
  const reviewID = req.params.review_id;
  try {
    await Review.update({
      reported: true,
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

module.exports = reportReview;

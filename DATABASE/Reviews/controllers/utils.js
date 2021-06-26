const { sequelize } = require('../db');

module.exports.rectifyNum = (num, defaultNum = 5, min = 0, max = 500) => {
  let rectifiedNum = num || defaultNum;
  if (typeof rectifiedNum !== 'number' || rectifiedNum < min) {
    rectifiedNum = defaultNum;
  } else if (rectifiedNum > max) {
    rectifiedNum = max;
  }
  return Math.floor(rectifiedNum);
};

module.exports.setSortOrder = (sortMethod = 'newest') => {
  const meth = sortMethod.toLowerCase();
  if (meth === 'helpful') {
    return sequelize.literal('helpfulness DESC');
  }
  if (meth === 'relevant') {
    // TODO: determine expected sort order for 'relevant'
  }
  return sequelize.literal('date DESC');
};

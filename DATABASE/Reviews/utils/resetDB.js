const models = require('../models');

const sequelizeModels = {
  phase1: [
    models.Review,
    models.Characteristic,
  ],
  phase2: [
    models.ReviewPhoto,
    models.CharacteristicReview,
  ],
};

const resetDB = async (dbModels = sequelizeModels) => {
  console.log('Resetting DB...');
  const operations1 = [];
  dbModels.phase1.forEach((model) => {
    operations1.push(model.sync({ force: true }));
  });
  try {
    await Promise.all(operations1);
  } catch (err) {
    console.error(err);
  }
  const operations2 = [];
  dbModels.phase2.forEach((model) => {
    operations2.push(model.sync({ force: true }));
  });
  try {
    await Promise.all(operations2);
  } catch (err) {
    console.error(err);
  }
  console.log('Finished resetting DB');
};

module.exports = resetDB;

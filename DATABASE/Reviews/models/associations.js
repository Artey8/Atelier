const CharacteristicReview = require('./characteristicReview');
const Characteristic = require('./characteristic');
const Review = require('./review');
const ReviewPhoto = require('./reviewPhoto');

Review.hasMany(ReviewPhoto, {
  foreignKey: 'review_id',
  as: 'photos',
});
ReviewPhoto.belongsTo(Review);

/**
 * Below are my many attempts to create a working many-to-many association between the Review and
 * Characteristic models via the CharacteristicReview model. By default, Sequelize creates a column
 *  name for the field used as the foreign key on the join table (e.g. 'reviewId'), and it doesn't
 * match what is in the database (e.g. 'review_id'). Some attempts to overwrite that behavior
 * worked, but when creating queries with nested 'includes' properties on the Reviews model,
 * Sequelize kept generating query strings that had references to these non-existent default column
 * names. I gave up trying to create the formal association with Sequelize and wrote the raw query
 * string myself (see Review model).
 */

// Review.belongsToMany(Characteristic, {
//   through: CharacteristicReview,
//   foreignKey: 'review_id',
//   otherKey: 'characteristic_id',
//   uniqueKey: 'id',
// });
// Characteristic.belongsToMany(Review, {
//   through: CharacteristicReview,
//   foreignKey: 'characteristic_id',
//   otherKey: 'review_id',
//   uniqueKey: 'id',
// });

// Review.hasMany(CharacteristicReview, {
//   foreignKey: 'id',
//   targetKey: 'review_id',
// });
// CharacteristicReview.belongsTo(Review);

// Characteristic.hasMany(CharacteristicReview, {
//   foreignKey: 'characteristic_id',
// });
// CharacteristicReview.belongsTo(Characteristic);

module.exports = {
  CharacteristicReview,
  Characteristic,
  Review,
  ReviewPhoto,
};

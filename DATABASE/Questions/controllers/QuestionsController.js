const Sequelize = require('sequelize');
const { Question } = require('../models/question');
const { Answer } = require('../models/answer');
const { Photo } = require('../models/photo');

const getQuestions = (productId, count) => (
  new Promise((resolve, reject) => {
    Question.findAll({
      include: [
        {
          model: Answer,
          as: 'answers',
          include: [
            {
              model: Photo,
              as: 'photos',
            },
          ],
        },
      ],
      where: {
        product_id: productId,
      },
      limit: count,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

const postQuestion = ({
  body, name, email, productId,
}) => (
  new Promise((resolve, reject) => {
    Question.create({
      product_id: productId,
      body,
      asker_name: name,
      asker_email: email,
      reported: false,
      helpfulness: 0,
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

const updateQuestionHelpfulness = (questionId) => (
  new Promise((resolve, reject) => {
    Question.update({
      helpfulness: Sequelize.literal('helpfulness + 1'),
    }, {
      where: {
        id: questionId,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

const reportQuestion = (questionId) => (
  new Promise((resolve, reject) => {
    Question.update({
      reported: true,
    }, {
      where: {
        id: questionId,
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  })
);

module.exports = {
  getQuestions,
  postQuestion,
  updateQuestionHelpfulness,
  reportQuestion,
};

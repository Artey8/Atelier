require('newrelic');
const express = require('express');
const {
  getQuestions, postQuestion, updateQuestionHelpfulness, reportQuestion,
} = require('../DATABASE/Questions/controllers/QuestionsController');
const {
  getAnswers, postAnswer, updateAnswerHelpfulness, reportAnswer,
} = require('../DATABASE/Questions/controllers/AnswersController');

const router = express.Router();
/// ////////////////QUESTIONS////////////////// ///
router.get('/questions', async (req, res) => {
  const productId = req.body.product_id || req.query.product_id;
  const count = req.body.count || 5;
  const page = req.body.page || 1;
  const response = {
    product_id: productId,
    results: null,
  };
  if (productId === undefined) {
    res.sendStatus(400);
  } else {
    try {
      response.results = await getQuestions(productId, count, page);
      res.send(response);
    } catch (err) {
      console.error(err);
      res.sendStatus(400);
    }
  }
});

router.post('/questions', async (req, res) => {
  try {
    await postQuestion(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

router.put('/questions/:question_id/report', async (req, res) => {
  const questionId = req.params.question_id || req.query.question_id;
  try {
    await reportQuestion(questionId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

router.put('/questions/:question_id/helpful', async (req, res) => {
  const questionId = req.params.question_id || req.query.question_id;
  try {
    await updateQuestionHelpfulness(questionId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});
/// ///////////////////ANSWERS//////////////////// ///
router.get('/questions/:question_id/answers', async (req, res) => {
  const questionId = req.params.question_id || req.query.question_id;
  const count = req.body.count || 5;
  const page = req.body.page || 1;
  if (questionId === undefined) {
    res.sendStatus(400);
  } else {
    try {
      const result = await getAnswers(questionId, count, page);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(504);
    }
  }
});

router.post('/questions/:question_id/answers', async (req, res) => {
  try {
    const result = await postAnswer({ ...req.body, questionId: req.params.id });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(504);
  }
});

router.put('/answers/:answer_id/helpful', async (req, res) => {
  const answerId = req.params.answer_id || req.query.answer_id;
  try {
    await updateAnswerHelpfulness(answerId);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(504);
  }
});

router.put('/answers/:answer_id/report', async (req, res) => {
  const answerId = req.params.answer_id || req.query.answer_id;
  try {
    await reportAnswer(answerId);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(504);
  }
});

module.exports = router;

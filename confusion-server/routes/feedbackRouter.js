const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const mongoose = require('mongoose');
const Feedbacks = require('../models/feedback');


const feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.cors, (req,res,next) => {
  if (req.body != null) {
      Feedbacks.create(req.body)
      .then((feedback) => {
          Feedbacks.findById(feedback._id)
          .then((feedback) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(feedback);
          })
      }, (err) => next(err))
      .catch((err) => next(err));
  }
  else {
      err = new Error('Sorry! Not able to post the comment');
      err.status = 404;
      return next(err);
  }

})

module.exports = feedbackRouter

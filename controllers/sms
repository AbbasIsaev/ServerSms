const Sequelize = require('sequelize');
const op = Sequelize.Op;
const models = require('../models');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = function (req, res) {
  models.sms.findAll({})
    .then(function (result) {
      res.json(result);
    })
    .catch(error => errorHandler(res, error));
};

module.exports.create = function (req, res) {
  console.log(req.body);
  models.sms.create({
    phone: req.body.phone,
    text: req.body.text,
    dateSent: req.body.dateSent
  }).then(result => {
    res.json(result);
  }).catch(error => errorHandler(res, error));
};

module.exports.update = function (req, res) {
  console.log('req.params 11-> ', req.params);
  console.log('req.body 22-> ', req.body);

  models.sms.update({
    isSent: req.body.isSent
  }, {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json({
      id: req.params.id
    });
  }).catch(error => errorHandler(res, error));
};

module.exports.getNotSend = function (req, res) {
  models.sms.findAll({
    where: {
      isSent: false,
      dateSent: {
        [op.lte]: new Date()
      }
    }
  })
    .then(function (result) {
      res.json(result);
    })
    .catch(error => errorHandler(res, error));
};

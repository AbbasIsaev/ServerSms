const express = require('express');
const router = express.Router();

const controller = require('../controllers/sms');

const id = `:id`;

router.get('/', controller.getAll);

router.get('/getNotSentToDate', controller.getNotSentToDate);

router.get('/getNotSentAll', controller.getNotSentAll);

router.post('/', controller.create);

router.put(`/${id}`, controller.update);

router.delete(`/${id}`, controller.remove);

module.exports = router;

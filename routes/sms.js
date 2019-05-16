const express = require('express');
const router = express.Router();

const controller = require('../controllers/sms');

const id = `:id`;

router.get('/', controller.getAll);

router.get('/getNotSend', controller.getNotSend);

router.post('/', controller.create);

router.put(`/${id}`, controller.update);

module.exports = router;
